# Ashrafali M. | Portfolio

Personal portfolio of **Ashrafali M.**, AI Developer based in Manama, Bahrain.

**Live site:** [ashrafali-m.github.io/Personal-Portfolio-React](https://ashrafali-m.github.io/Personal-Portfolio-React/)

## About

The site is presented as an agent console: visitors can ask a question and receive an answer.
Every answer is written by hand and shipped with the site. There is no AI model, API key or
network call behind the console.

It includes five case studies:

- **Layla:** a WhatsApp AI sales agent
- **Enterprise AI Platform:** the AI layer on a real-estate ERP
- **ERP AI Automations:** signal radars, investigators, drafters and document readers
- **Skin Cancer Detection:** research project
- **Smart Agriculture AI:** research project

The ASK Real Estate case studies are sanitized overviews. Their diagrams and code samples are
recreated for illustration and do not disclose confidential details.

## Tech stack

- React 18 and Vite 5
- Hand-written CSS, no framework
- Canvas 2D for the animated agent graph
- Fully static: no backend or database

## Getting started

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Public site URL, used for SEO metadata, the sitemap and analytics |
| `VITE_CONTACT_EMAIL` | Contact email address |
| `VITE_CONTACT_WHATSAPP` | WhatsApp number, digits only, with country code |

## Project structure

```
src/
  App.jsx          App shell, routing and command palette shortcut
  agent/           Console answers, command palette and agent graph
  components/      Page sections (Work, Practice, Experience, Stack, Education, Contact)
  case-studies/    Case study pages, loaded on demand
  lib/             Small helpers (theme, dates, motion)
public/
  og.jpg           Social preview image
```

## Deployment

Pushing to `main` builds the site and publishes it to GitHub Pages through
`.github/workflows/main.yml`.

## Accessibility

Supports keyboard navigation, reduced motion and light and dark themes.

---

© 2026 Ashrafali M.
