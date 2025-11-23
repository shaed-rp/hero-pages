# Content Management Guide

This guide explains how to update text, images, and specifications for vehicles, and how to add new vehicles to the site.

## Editing Existing Content

All content is now managed via **Supabase**.

1.  **Login:** Go to your Supabase Dashboard.
2.  **Table:** Open the `vehicles` table.
3.  **Edit:** Find the row for the vehicle you want to edit (e.g., `slug: mullenOne`).
4.  **Update JSON:** Click on the `data` column to open the JSON editor.
    *   **Text:** Change values like `title`, `description`.
    *   **Images:** Update URL paths.
    *   **Visibility:** Toggle `true`/`false` in `sectionVisibility`.
5.  **Save:** Click "Save" in the dashboard. The site will update on the next refresh.

## Adding a New Vehicle

To add a completely new vehicle page (e.g., "CyberTruck"):

1.  **Create Data File:**
    *   Duplicate an existing data file (e.g., `mullenOneData.json`) and rename it to `cyberTruckData.json`.
    *   Update the content inside to match the new vehicle.

2.  **Create Page Route:**
    *   Create a new folder in `src/app/` named `cybertruck`.
    *   Copy `src/app/mullenOne/page.tsx` into `src/app/cybertruck/page.tsx`.

3.  **Update Page Component:**
    *   In the new `page.tsx`, update the imports to point to your new JSON file.
    *   Change the component name (e.g., `export default function CyberTruck() { ... }`).
    *   Update the `vehicleId` prop passed to the `Navbar` component.

4.  **Register Configuration:**
    *   Open `src/config/vehicleConfig.ts`.
    *   Import your new data file.
    *   Add a new entry to the `vehicleConfigs` object.

5.  **Verify:**
    *   Go to `http://localhost:3000/cybertruck` to see your new page.
