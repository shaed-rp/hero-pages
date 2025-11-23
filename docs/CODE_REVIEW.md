# Codebase Review & Audit

**Date:** November 22, 2025
**Version:** 1.0

This document provides a comprehensive technical review of the **Commercial EVs Showcase** project. It highlights strengths, identifies areas for improvement, and provides a roadmap for future development.

## 1. Executive Summary

The project is well-structured and uses a modern tech stack (Next.js 15, TypeScript). The **Data-Driven Architecture** is a standout feature, allowing for easy content management without code changes. However, the current implementation relies too heavily on **Client-Side Rendering (CSR)** for entire pages, which impacts performance and SEO. Refactoring to **Server Components** is the highest priority recommendation.

## 2. Detailed Findings

### 2.1 Architecture & Structure
*   **✅ Strength:** The directory structure follows Next.js App Router best practices (`src/app`, `src/components`).
*   **✅ Strength:** The separation of content (`src/data/*.json`) from logic is excellent for scalability.
*   **⚠️ Weakness:** Vehicle pages (e.g., `src/app/mullenOne/page.tsx`) are monolithic. They contain too much layout logic that could be abstracted.

### 2.2 Performance & Rendering (Critical)
*   **🔴 Critical:** Main page files use `'use client'` at the top level.
    *   **Impact:** This forces the *entire page* and all its children to be bundled and sent to the browser. It negates the benefits of Next.js Server Components (smaller bundles, faster First Contentful Paint, better SEO).
    *   **Recommendation:** Refactor pages to be **Server Components**. Only interactive islands (like the Navbar, Modals, and Carousels) should be Client Components.

### 2.3 Code Quality & Maintainability
*   **✅ Strength:** Consistent naming conventions and use of SCSS Modules avoid style conflicts.
*   **⚠️ Weakness:** **Repetitive Logic.** In `page.tsx`, there are repeated `if` blocks checking for section visibility:
    ```typescript
    // Repeated 10+ times for different sections
    if (data.sectionVisibility.overview && data.overview.specs.some(...)) { ... }
    ```
    *   **Recommendation:** Implement a dynamic `<SectionRenderer />` component that iterates through the configuration and renders sections automatically. This would reduce `page.tsx` from ~300 lines to ~50 lines.

### 2.4 Type Safety
*   **⚠️ Weakness:** Global types (like `window.dataLayer` for analytics) are defined in multiple places or cast as `any`.
*   **Recommendation:** Centralize all global type definitions in a `src/types/global.d.ts` file to ensure consistency.

### 2.5 Hardcoded Values
*   **ℹ️ Observation:** Some logic in `Nav.tsx` checks for specific vehicle IDs (e.g., `if (vehicleId === 'promaster')`).
*   **Recommendation:** Move these specific behaviors (like logo sizing) into the `vehicleConfig` or JSON data to keep components generic and reusable.

## 3. Recommended Roadmap

We recommend addressing these items in the following order:

### Phase 1: Performance (High Impact)
- [ ] **Refactor Pages to Server Components:** Remove `'use client'` from `page.tsx`. Move state (modals) to a wrapper component.
- [ ] **Optimize Images:** Ensure all `next/image` usage has proper sizing and priority attributes for LCP elements (Hero images).

### Phase 2: Refactoring (Developer Experience)
- [ ] **Create SectionRenderer:** Replace the repetitive `if` statements in pages with a map loop.
- [ ] **Centralize Types:** Clean up TypeScript definitions.

### Phase 3: Features
- [ ] **CMS Integration:** The current JSON structure is ready to be replaced by a Headless CMS (like Contentful or Sanity) in the future if needed.
