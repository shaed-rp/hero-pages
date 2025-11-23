# Content Management Guide

This guide explains how to update text, images, and specifications for vehicles, and how to add new vehicles to the site.

## Editing Existing Content

All content is stored in JSON files located in `src/data/`.

1.  **Locate the file:** Find the JSON file for the vehicle you want to edit (e.g., `src/data/mullenOneData.json`).
2.  **Edit the JSON:**
    *   **Text:** Change the values of keys like `title`, `description`, `header`.
    *   **Images:** Update the `imageUrl` or `src` paths. Ensure new images are placed in the `public/` folder.
    *   **Toggles:** Change `isVisible: true` to `false` in the `sectionVisibility` object to hide an entire section.
3.  **Save:** Saving the file will automatically update the local development server.

**Example JSON Snippet:**
```json
"hero": {
  "title": "The New Standard",  <-- Change this text
  "description": "Efficient and reliable.",
  "bgImage": "/images/hero-bg.jpg" <-- Change this image path
}
```

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
