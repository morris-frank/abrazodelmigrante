<p align="center">
  <a href="https://abrazodelmigrante.com">
    <img src="https://img.shields.io/badge/%E2%86%97%20abrazodelmigrante.com-8EDE3D?style=for-the-badge&amp;labelColor=16211B" alt="Open abrazodelmigrante.com">
  </a>
</p>

<img src="public/favicon.svg" align="left" width="128" hspace="16" alt="Abrazo del migrante icon">

<h3>Abrazo del migrante</h3>

<p>
  <sub>A MILONGA IN BUENOS AIRES</sub>
  <br>
  <strong>Editable multilingual site: Astro, a git-backed CMS, and Cloudflare Pages.</strong>
  <br>
  <br>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-6-8EDE3D?style=flat-square&amp;labelColor=16211B" alt="Astro 6"></a>
  <img src="https://img.shields.io/badge/languages-ES%20%C2%B7%20EN%20%C2%B7%20DE-8EDE3D?style=flat-square&amp;labelColor=16211B" alt="Spanish, English, German">
  <a href="#notes"><img src="https://img.shields.io/badge/CMS-Sveltia-1AB172?style=flat-square&amp;labelColor=16211B" alt="Sveltia CMS"></a>
  <a href="#cloudflare-pages-setup"><img src="https://img.shields.io/badge/hosting-Cloudflare%20Pages-1AB172?style=flat-square&amp;labelColor=16211B" alt="Cloudflare Pages"></a>
</p>

<br clear="left">

Editors change text or drop in photos at `/admin` and press Save; that commits to `main`, Cloudflare Pages rebuilds, and the live site updates in about a minute.

## What is in the repo

- `src/pages/index.astro`: multilingual landing page in Spanish, English, and German
- `src/content/settings/site.yaml`: site identity, contact links, and multilingual navigation metadata
- `src/content/pages/home.yaml`: multilingual homepage content source of truth
- `public/images/placeholders/`: watercolor-style starter artwork
- `public/images/uploads/`: CMS upload target
- `public/admin/`: Sveltia CMS entrypoint
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

3. Open:

   - Site: `http://localhost:4321`
   - CMS: `http://localhost:4321/admin` (use "Work with Local Repository" and pick this folder —
     Sveltia edits the working tree directly, so no local backend server is needed)

## Cloudflare Pages setup

One-time, in the Cloudflare dashboard (git-connected Pages projects cannot be created from the CLI):

1. Workers & Pages -> Create -> Pages -> Connect to Git -> `morris-frank/abrazodelmigrante`, branch `main`.
2. Build command `npm run build`, output directory `dist`.
3. Environment variables (production and preview):

   - `PUBLIC_SITE_URL=https://abrazodelmigrante.com`
   - `PUBLIC_DISPLAY_URL=https://abrazodelmigrante.com`
   - `PUBLIC_GITHUB_REPO=morris-frank/abrazodelmigrante`
   - `PUBLIC_GITHUB_BRANCH=main`
   - `PUBLIC_DECAP_OAUTH_BASE_URL=https://abrazodelmigrante.com`

4. Secrets (encrypted, production and preview): `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`, `GITHUB_OAUTH_SCOPE=public_repo user`.
5. Custom domains: add `abrazodelmigrante.com` and `www.abrazodelmigrante.com`. DNS is created automatically because the zone is already on this Cloudflare account.

## GitHub OAuth app

The editor login uses a GitHub OAuth App owned by the repo owner. Its Authorization callback URL must be:

```text
https://abrazodelmigrante.com/api/callback
```

## Editor access

The CMS writes commits to this repo, so each editor needs a free GitHub account with write access:
`gh api -X PUT repos/morris-frank/abrazodelmigrante/collaborators/<username> -f permission=push`.
After accepting the invite they log in at `https://abrazodelmigrante.com/admin` with "Sign in with GitHub".

Editing flow: change text or drop in new photos, press Save. That commits to `main`, Cloudflare Pages rebuilds,
and the live site updates in about a minute. No further involvement from the technical host.

## Notes

- The admin UI is [Sveltia CMS](https://sveltiacms.app), pinned to an exact version in `public/admin/index.html`,
  and configured from `src/pages/admin/config.yml.ts`. It is Decap-config compatible and reuses the same
  `functions/api/` OAuth client.
- The homepage content lives in `src/content/pages/home.yaml`, validated by the Zod schemas in `src/content.config.ts`.
  A CMS field added there must also be added to the schema, or the build fails.
- Uploaded images land in `public/images/uploads/` and are referenced as `/images/uploads/<file>`.
- The old `/experiences/*` route family has been removed to avoid stale public pages and broken navigation.
