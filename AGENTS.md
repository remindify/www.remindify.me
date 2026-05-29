# Remindify Landing Page — Agent Guide

## Project Overview

This repository contains the static landing page for **Remindify** (`www.remindify.me`), a personal safety service that automates check-ins via Telegram and alerts emergency contacts when a user misses check-ins. The site is a single-page marketing landing page built with plain HTML and CSS.

- **Owner:** Base87 Technologies (https://www.base87.tech)
- **Deployment target:** GitHub Pages
- **Primary domain:** www.remindify.me

## Technology Stack

- **Markup:** HTML5 (single file: `index.html`)
- **Styling:** CSS3 with custom properties (single file: `style.css`)
- **Fonts:** Inter (via Google Fonts CDN)
- **Icons:**
  - Custom PNG icons in `resources/`
  - Social icons from Icons8 CDN
- **Analytics:** Google Tag Manager (`GTM-K7CRTXMS`)
- **Build tools:** Node.js/npm for local minification and artifact generation
- **No JavaScript frameworks.**

## Project Structure

```
.
├── .github/workflows/static.yml   # GitHub Actions deployment workflow
├── .gitignore                     # Ignores .idea/, dist/, node_modules/
├── package.json                   # Build scripts and devDependencies
├── index.html                     # Single-page landing site (source)
├── style.css                      # All styles, responsive breakpoints, CSS variables
├── robots.txt                     # Allows all crawlers
├── sitemap.xml                    # Single-page sitemap
└── resources/
    ├── favicon.ico
    ├── logo.png
    ├── logo.svg
    ├── icon_ack.png
    ├── icon_alert.png
    ├── icon_checkin.png
    ├── icon_goal.png
    ├── icon_simple_chat.png
    └── icon_start_journey.png
```

Source files are authored directly as static files. Production artifacts are minified and emitted to `dist/`.

## Build and Test Commands

Install dependencies once:
```bash
npm install
```

Build the production site (minifies HTML/CSS and copies assets to `dist/`):
```bash
npm run build
```

Preview the built site locally:
```bash
npm run serve
```

Clean build artifacts:
```bash
npm run clean
```

- **No automated tests** are present.
- Manual browser testing remains the primary verification method.

## Deployment Process

Deployment is handled automatically by GitHub Actions.

- **Workflow file:** `.github/workflows/static.yml`
- **Trigger:** Push to `main` that changes site files (`index.html`, `style.css`, `resources/**`, `robots.txt`, `sitemap.xml`, or the workflow itself), or manual dispatch.
- **Target:** GitHub Pages.
- **Behavior:** The workflow prepares a `dist/` directory containing only the minified site files and deploys that artifact. The entire repository root is **not** uploaded.

### Important notes for agents
- Do not commit changes directly to `main` unless you intend to deploy immediately.
- The workflow uses `actions/deploy-pages@v4` and requires the repository to have GitHub Pages enabled (source: GitHub Actions).
- Run `npm run build` locally to verify the `dist/` output before pushing.

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (`header`, `section`, `footer`).
- Maintain the existing indentation (4 spaces) in source files.
- Keep external CDN links in the `<head>`; add new ones near the existing Google Fonts / Icons8 links.
- All user-visible text is in English.

### CSS
- Use the existing CSS custom properties declared in `:root` (e.g., `--primary-blue`, `--text-dark`, `--accent-teal`).
- Prefer `rem` and `px` units as used throughout the file.
- Responsive breakpoints: the only media query is at `768px` for mobile layouts.
- Add new sections following the existing naming convention (e.g., `.section-name`, `.container`, `.section-header`).

## Testing Instructions

- **Manual browser testing** is the primary verification method.
- Test at widths below and above `768px` to confirm responsive behavior.
- Verify that all `resources/` assets load correctly (check browser devtools Network tab).
- Ensure the newsletter form and any new `mailto:` links work as expected.
- Confirm Google Analytics / GTM script remains intact if making `<head>` changes.
- After running `npm run build`, inspect `dist/index.html` and `dist/style.css` to ensure minification succeeded.

## Security Considerations

- **No secrets or API keys** are stored in this repository.
- **No backend or server-side code** is present; it is purely client-side HTML/CSS.
- **External CDN resources:** The page loads scripts/styles from `googletagmanager.com`, `fonts.googleapis.com`, `cdnjs.cloudflare.com`, and `img.icons8.com`. When adding new external resources, prefer HTTPS and reputable CDNs.
- **Form handling:** The newsletter signup form (`<form class="newsletter-form">`) currently has no `action` attribute and is non-functional. If integrating a backend, ensure the endpoint uses HTTPS and implements appropriate anti-spam measures.
- External links should use `target="_blank" rel="noopener noreferrer"` where appropriate.

## Things to Know When Editing

- The page is intentionally a **single-page marketing site**. Adding new pages requires creating additional `.html` files and updating navigation links.
- The "Coming Soon" button and social links currently use placeholder `#` URLs.
- The `.idea/` directory contains JetBrains IDE metadata and is ignored by `.gitignore`.
