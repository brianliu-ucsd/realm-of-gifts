# Realm of Gifts

## Overview
An all-in-one gift discovery website at **realmofgifts.com**. Helps users find gift ideas through interactive tools powered by Amazon affiliate links.

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, TypeScript, CSS Modules
- **Hosting:** Vercel (with Vercel Analytics)
- **Dependencies:** react-confetti, @vercel/analytics

## Site Structure
- **Header:** Logo + nav links to each tool. On mobile: logo + hamburger menu.
- **Footer:** Amazon affiliate disclaimer. Responsive text sizing.
- **Home page (`/`):** Site description + links to tools.

## Current Feature: Random Gift Generator
- Spinning wheel randomly selects an Amazon product and displays it via a product card.
- Products are hardcoded in `data/products.ts` (11 products, 5 categories).
- Fisher-Yates shuffle ensures no repeats until all products shown.
- Preloads next 3 product images in background.
- Responsive: desktop shows wheel + card side-by-side; mobile replaces wheel with full-screen card.

## Frontend Goals
- **Aesthetic:** Modern / minimal — clean lines, bold typography, restrained color palette.
- Eliminate dead space; make interactions (especially the spin) feel engaging and draw users to interact.
- Wheel should feel prominent and exciting; product card should feel premium and enticing.
- All changes must remain fully responsive (desktop + mobile).

## Roadmap

### 1. Category Filtering System
- Users can filter products by: age range, gender, interests, price range.
- **UX:** Progressive approach — optional setup/filter screen on first visit; filters remain accessible as a collapsible panel alongside the wheel.
- Product data schema needs expansion: each product in `data/products.ts` must be tagged with filterable attributes (age, gender, interests, priceRange).
- Filter results must gracefully handle small result sets (current pool is only 11 products).
- Schema should be forward-compatible with Amazon Product Advertising API (future integration after 10 affiliate sales).

### 2. Technical SEO
- Add sitemap.xml, robots.txt, structured data (JSON-LD), Open Graph / Twitter card meta tags.
- Ensure proper heading hierarchy and semantic HTML.
- Focus on optimizing the existing experience (no content pages planned yet).

### 3. Increased Visibility
- Gift guide pages for SEO: (e.g.) /gifts/under-25 or /gifts/for-him... includes products AND a unique "Spin the Wheel" which is essentially our spinner with the filters applied. Name pages with long-tail keywords with buying intent, like "unique gifts for 12 year old girl" and underserved niches like "gifts for new homeowners". Find queries that lead to low-quality sites - seek to beat them with a better UX.
- Pinterest pins?
- Sharable spin results (every user becomes a marketer)
- Seasonal pushes on Reddit/socials

## Commands
- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run test` — Not yet implemented

## MCP Integrations
- **Playwright MCP:** Browser automation for viewing/testing the frontend locally. Navigate to `localhost:3001` to inspect the running dev server.
- **Vercel MCP:** Connected to the Vercel account hosting this project. Use for checking deployments, build logs, runtime logs, and project settings.

## Claude Folder
The `Claude/` directory at the project root stores Claude Code working artifacts (screenshots, notes, exploration logs). It is gitignored and should not be committed. When taking screenshots of the frontend with Playwright MCP, save them to `Claude/`.
