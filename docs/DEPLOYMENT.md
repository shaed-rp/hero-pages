# Deployment Guide

## Docker (Standard)

We use Docker for consistent production deployments. The project includes a `Dockerfile` and a `Makefile` to streamline the process.

### 1. Build the Image
To build the production image:
```bash
make dockerbuild
```
*This builds the image and attempts to push it to the registry defined in the Makefile (`localhost:5000` by default).*

**Important:** You must provide the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables to the container at runtime.

### 2. Run Locally (Preview)
To test the production build locally:
```bash
make docker-run
```

### 3. Kubernetes / Helm
The project includes a `helm/` directory for Kubernetes deployments.
- **Values:** Configure `helm/values.yaml` for environment-specific settings.
- **Deploy:** Use standard Helm commands (e.g., `helm install hero-site ./helm`).

## Vercel (Alternative)

For quick previews or non-production environments, the project is compatible with Vercel.

1.  **Connect Repository:** Link your GitHub repository to Vercel.
2.  **Build Settings:** Vercel automatically detects Next.js.
    - **Build Command:** `next build`
    - **Output Directory:** `.next`
3.  **Environment Variables:** Configure the following in the Vercel dashboard:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Note:** While Vercel is supported, **Docker is the source of truth** for production releases to ensure environment consistency.
