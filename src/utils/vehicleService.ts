import { supabase } from './supabaseClient';

export async function getVehicleData(slug: string) {
    const { data, error } = await supabase
        .from('vehicles')
        .select('data')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(`Error fetching vehicle data for ${slug}:`, error);
        return null;
    }

    return data?.data || null;
}
