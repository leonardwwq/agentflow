# Customize this marketing shell

This repo is set up as a **SaaS landing / marketing prototype**. Edit the files below in order.

## 1. Brand and navigation

**`lib/site-config.ts`**

- `name`, `logo`, `tagline`, `description`
- `nav` — menu items (routes can stay as-is until you rename folders)
- `social`, `contact`, `hero`, `sections`

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.

## 2. Product content

**`lib/marketing-data.ts`**

- `productFeatures` — homepage + `/projects` feature cards
- `highlightCards` — homepage highlights section
- `roadmapItems` — homepage + `/workbench` roadmap

## 3. Changelog

**`lib/blog-data.tsx`**

- Add or edit posts (used on `/blog` and `/blog/[slug]`)

## 4. Visual identity

**`app/globals.css`**

- Theme colors (`@theme`, CSS variables)

Optional: replace `public/icon.svg` and add `public/og-image.png`.

## 5. Connect your real app (later)

When the SaaS backend exists:

1. Set `NEXT_PUBLIC_APP_URL` in `.env.local`
2. Point hero/footer CTAs to login or signup
3. Keep this repo as marketing-only

## Route map

| URL | Purpose |
|-----|---------|
| `/` | Landing |
| `/projects` | Features (rename folder to `/features` when ready) |
| `/workbench` | Roadmap |
| `/blog` | Changelog |
| `/introduction` | About |

## Attribution

See [NOTICE.md](./NOTICE.md). Footer links to the original UI template.
