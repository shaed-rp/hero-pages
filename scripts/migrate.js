const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env vars manually
const envPath = path.resolve(__dirname, '../.env.local');
let envVars = {};
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envVars = envContent.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
    }, {});
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mappings = {
    'mullenOneData.json': 'mullenOne',
    'promasterData.json': 'promaster',
    'streetrodData.json': 'streetrod',
    'morganWhData.json': 'morganWh',
    'peterbilt520ev.json': 'peterbilt520ev'
};

async function migrate() {
    const dataDir = path.resolve(__dirname, '../src/data');
    const files = fs.readdirSync(dataDir);

    for (const file of files) {
        if (!mappings[file]) continue;

        const slug = mappings[file];
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        try {
            const json = JSON.parse(content);
            const name = json.siteConfig?.title || slug;

            console.log(`Migrating ${slug}...`);

            const { error } = await supabase
                .from('vehicles')
                .upsert({
                    slug,
                    name,
                    data: json
                }, { onConflict: 'slug' });

            if (error) {
                console.error(`Error migrating ${slug}:`, error);
            } else {
                console.log(`Success: ${slug}`);
            }
        } catch (e) {
            console.error(`Failed to parse or migrate ${file}:`, e);
        }
    }
}

migrate();
