# Getting Started

This guide will help you set up the **Commercial EVs Showcase** project locally for development.

## Prerequisites

- **Node.js**: Version 18 or higher (Recommended: v20 LTS)
- **Docker**: (Optional) For containerized development and deployment
- **Git**: For version control

## Local Development (Standard)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shaed-rp/hero-pages.git
    cd hero-site-main
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **View the site:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Development (Team Standard)

We use a `Makefile` to simplify Docker commands. Ensure Docker Desktop is running.

1.  **Build the Docker image:**
    ```bash
    make docker-local
    ```
    *This builds an image tagged `hero-site:local`.*

2.  **Run the container:**
    ```bash
    make docker-run
    ```
    *This runs the container on port 3000.*

3.  **One-step Dev Command:**
    You can build and run in one go:
    ```bash
    make docker-dev
    ```

## Project Structure Overview

- **`src/app`**: Next.js App Router pages and layouts.
- **`src/components`**: Reusable UI components (Navbar, Footer, etc.).
- **`src/data`**: JSON files containing all vehicle content (Text, Images, Specs).
- **`src/config`**: Configuration files mapping data to pages.
