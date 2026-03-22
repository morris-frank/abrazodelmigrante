# Abrazo del migrante

Editable Astro site for an authentic milonga experience in Buenos Aires, with Decap CMS, GitHub, and Cloudflare Pages.

## What is in the repo

- `src/pages/index.astro`: multilingual landing page in Spanish, English, and German
- `src/content/settings/site.yaml`: site identity, contact links, and multilingual navigation metadata
- `src/content/experiences/*.md`: legacy editable experience pages still available in the build
- `public/images/placeholders/`: watercolor-style starter artwork
- `public/images/uploads/`: CMS upload target
- `public/admin/`: Decap CMS entrypoint
- `functions/api/`: Cloudflare Pages Functions for GitHub OAuth

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Astro:

   ```bash
   npm run dev
   ```

3. In a second terminal, start the local Decap backend if you need the CMS:

   ```bash
   npm run cms
   ```

4. Open:

   - Site: `http://localhost:4321`
   - CMS: `http://localhost:4321/admin`

## Cloudflare Pages setup

Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

Public environment variables:

- `PUBLIC_SITE_URL=https://abrazodelmigrante.com`
- `PUBLIC_DISPLAY_URL=https://abrazodelmigrante.com`
- `PUBLIC_GITHUB_REPO=your-github-user/abrazodelmigrante`
- `PUBLIC_GITHUB_BRANCH=main`
- `PUBLIC_DECAP_OAUTH_BASE_URL=https://abrazodelmigrante.com`

Cloudflare secret variables:

- `GITHUB_OAUTH_CLIENT_ID`
- `GITHUB_OAUTH_CLIENT_SECRET`
- `GITHUB_OAUTH_SCOPE=repo user`

## GitHub OAuth app

Create a GitHub OAuth App and use this callback URL:

```text
https://abrazodelmigrante.com/api/callback
```

## Notes

- The homepage content is implemented directly in the Astro template so the multilingual brochure copy stays tightly controlled.
- The CMS and the legacy experience detail pages still work, but they are no longer the primary homepage structure.
