# Naily Portfolio Foundation

A production-minded portfolio starter built with Next.js, TypeScript, Tailwind CSS, Motion, and Lucide.

## Included

- App Router and typed project data
- Editorial typography and restrained cool-toned visual foundation
- Light → dark → light homepage pacing
- Responsive header, hero, about, featured work, approach, toolkit, contact, and footer
- Dynamic project case-study routes
- Metadata, sitemap, robots, custom 404, keyboard focus, and reduced-motion support
- Motion used only for purposeful entrance transitions

## Start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Important placeholders

Update `src/data/site.ts` before deployment:

- Production URL
- Email
- LinkedIn URL
- Resume path

Update `src/data/projects.ts` with the final project content and links.

Place the resume at `public/resume.pdf` when ready.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Structure

```text
src/
  app/
    projects/[slug]/
  components/
    layout/
    sections/
    ui/
  data/
  lib/
```
