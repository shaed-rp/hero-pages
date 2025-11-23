# Architecture Overview

This project is a **Next.js 15** application built with a **Data-Driven Architecture**. This means that the content (text, images, specs) is decoupled from the presentation logic (React components).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS Modules (`*.module.scss`)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Containerization:** Docker

## Data-Driven Design

Instead of hardcoding text into pages, we use JSON files to store data.

### 1. Data Source (Supabase)
We use **Supabase** (PostgreSQL) as our headless CMS.
- **Table:** `vehicles`
- **Schema:** Each row contains a `slug` (e.g., `mullenOne`) and a `data` JSONB column that holds the entire configuration for that vehicle.
- **Migration:** Legacy JSON files in `src/data/*.json` were migrated to the database but are kept as a reference/backup.

### 2. Data Fetching (`src/utils/vehicleService.ts`)
We fetch data asynchronously on the server.
- `getVehicleData(slug)`: Fetches the JSON blob for a specific vehicle from Supabase.

### 3. Page Implementation (`src/app/[vehicle]/page.tsx`)
We use a **Server Component** pattern for performance and SEO.
- **Server Component (`page.tsx`):** Fetches data from Supabase and passes it to the client.
- **Client Component (`[Vehicle]Client.tsx`):** Receives the data and handles the UI rendering (interactive elements, modals, etc.).

## Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── components/      # Shared UI components (Navbar, Footer, Modal)
│   ├── [vehicle]/       # Vehicle-specific pages (mullenOne, promaster, etc.)
│   │   ├── components/  # Components specific to that vehicle page
│   │   └── page.tsx     # Main page entry point
│   └── layout.tsx       # Root layout (Global styles, Analytics)
├── config/              # Configuration mapping logic
├── data/                # JSON content files (EDIT HERE to change text)
├── styles/              # Global SCSS variables and mixins
└── utils/               # Helper functions (Analytics, Config helpers)
```
