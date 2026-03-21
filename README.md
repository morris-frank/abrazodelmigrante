# Milonga Findel Mundo

Simple editable website for guided tango tours and lessons, built with Astro, Decap CMS, GitHub, and Cloudflare Pages.

## What is in the repo

- `src/content/pages/home.yaml`: homepage sections and copy
- `src/content/settings/site.yaml`: navigation, contact links, footer text
- `src/content/experiences/*.md`: editable experience cards and detail pages
- `public/images/placeholders/`: starter artwork you can replace later
- `public/images/uploads/`: CMS upload target
- `public/admin/`: Decap CMS entrypoint
- `functions/api/`: Cloudflare Pages Functions for GitHub OAuth

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Start Astro:

   ```bash
   npm run dev
   ```

4. In a second terminal, start the local Decap backend:

   ```bash
   npm run cms
   ```

5. Open:

   - Site: `http://localhost:4321`
   - CMS: `http://localhost:4321/admin`

## Cloudflare Pages setup

Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

Public environment variables:

- `PUBLIC_SITE_URL=https://milongafindelmundo.com`
- `PUBLIC_DISPLAY_URL=https://milongafindelmundo.com`
- `PUBLIC_GITHUB_REPO=your-github-user/milongafindelmundo`
- `PUBLIC_GITHUB_BRANCH=main`
- `PUBLIC_DECAP_OAUTH_BASE_URL=https://milongafindelmundo.com`

Cloudflare secret variables:

- `GITHUB_OAUTH_CLIENT_ID`
- `GITHUB_OAUTH_CLIENT_SECRET`
- `GITHUB_OAUTH_SCOPE=repo user`

## GitHub OAuth app

Create a GitHub OAuth App and use this callback URL:

```text
https://milongafindelmundo.com/api/callback
```

Notes:

- The CMS uses the GitHub backend, so signed-in editors need push access to the repository.
- The OAuth flow is served by Cloudflare Pages Functions at `/api/auth` and `/api/callback`.
- `_routes.json` limits Pages Function invocations to `/api/*`.

## Editing content

Once deployed, go to `/admin` and edit:

- Homepage copy and section structure
- Contact details
- Experience cards and their detail pages
- Uploaded images

The initial visuals are placeholders, so the real photography can be swapped in later without changing templates or styles.
