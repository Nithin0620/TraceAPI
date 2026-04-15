# TraceAPI

Modern, minimal, high-performance **API testing web app** (beginner-friendly) with **AI guidance** via Groq.

## Features

- **Navbar**: SPA navigation (Home / Test API), logo via `react-icons`, DaisyUI theme switcher (persisted)
- **Home**: clean Stitch/MSP-inspired layout + “How to Use”
- **Test API**:
  - **Resizable + collapsible** left/right sidebars
  - Request builder (method, URL, headers, JSON body)
  - Response viewer (status, time, pretty JSON, copy)
  - AI recommendation panel (explain response + likely mistakes)
  - Browser-like **tabs** (close prompts “save?”, per-tab state)
  - **Saved (limit 10)** + **History (limit 10)** persisted in `localStorage`
  - AI chat that can run commands like: `Send GET request to https://example.com`

## Setup

1) Install deps

```bash
npm install
```

2) Configure Groq

- Create `.env` from `.env.example`
- Put your Groq key in `GROQ_API_KEY`

3) Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Notes

- AI calls are proxied through `app/api/groq/route.ts` so the key stays server-side.
- Saved requests are limited to 10; if exceeded you’ll see **“Storage limit reached”**.