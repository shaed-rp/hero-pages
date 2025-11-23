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

### 1. Data Source (`src/data/*.json`)
Each vehicle has a dedicated JSON file (e.g., `mullenOneData.json`). This file contains:
- **Site Config:** Brand colors, logos, titles.
- **Section Visibility:** Toggles to show/hide sections (Overview, Specs, Gallery, etc.).
- **Content:** The actual text, image URLs, and specifications for each section.

### 2. Configuration (`src/config/vehicleConfig.ts`)
This file acts as the "brain". It imports the raw JSON data and maps it to the application's structure.
- It exports a `vehicleConfigs` object keyed by vehicle ID (e.g., `mullenOne`).
- It uses `createVehicleConfig` utility to merge the data with the section definitions.

### 3. Page Implementation (`src/app/[vehicle]/page.tsx`)
The page components (e.g., `src/app/mullenOne/page.tsx`) are consumers of this configuration.
- They import the JSON data.
- They conditionally render sections based on `sectionVisibility` flags in the JSON.
- They pass the data down to reusable components (e.g., `<Hero />`, `<Specs />`).

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
