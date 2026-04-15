# TraceAPI

TraceAPI is a modern, minimal, and high-performance API testing web application built with React, Next.js, and AI-powered guidance. It's designed to be a lightweight, beginner-friendly alternative to tools like Postman, with a focus on clean UX and actionable AI assistance.

## 🚀 Key Features

- **Minimalist API Tester**: A focused workspace for sending HTTP requests (GET, POST, PUT, DELETE).
- **Tab-based Workspace**: Manage multiple request drafts simultaneously, just like browser tabs.
- **AI Insight (Powered by Groq)**: After every request, AI explains the result and suggests fixes for common mistakes (auth, CORS, JSON syntax, etc.).
- **AI Chat Command Center**: Control the tester using natural language (e.g., `"Send GET request to https://api.example.com"`).
- **Persistent Storage**: Saved requests and history are automatically persisted to `localStorage`.
- **Modern UI/UX**: Built with Stitch-inspired MSP principles, featuring resizable sidebars, dark/light themes (DaisyUI), and smooth transitions.

---

## 🛠️ Project Architecture

### Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: React Icons (FaPiedPiperAlt)
- **AI Backend**: Groq API via Serverless Functions
- **State Management**: React Hooks (useMemo, useToasts, Context)

### Directory Structure
```text
app/
├── api/
│   ├── groq/             # Server-side proxy for AI requests
│   └── proxy/            # Server-side proxy for API calls (to bypass CORS)
├── components/           # Shared UI (Navbar, ThemeContext)
└── test-api/             # Core Logic
    ├── Resizable.tsx      # Sidebar resizing components
    ├── TestApiApp.tsx     # Main application state and UI logic
    ├── storage.ts         # localStorage management
    ├── types.ts           # Shared TypeScript definitions
    └── utils.ts           # Fetching logic, AI parsing, and UID generation
```

---

## 🧠 Core Logic & Workflow

### 1. Request Handling (`utils.ts` & `TestApiApp.tsx`)
When a user clicks "Send":
- **Proxy Layer**: For absolute URLs, the app routes requests through `/api/proxy`. This is crucial for web-based testers to bypass browser **CORS (Cross-Origin Resource Sharing)** restrictions that would otherwise block requests to external domains.
- **Draft & Tab State**: Each tab maintains its own `RequestDraft` (method, URL, headers, body).
- **Response Processing**: The system captures status codes, response time, and attempts to "pretty-print" JSON bodies.

### 2. AI Intelligence
The app integrates with Groq to provide two layers of assistance:
- **The Whisper Panel**: After a request finishes, the `groqChat` utility sends the request context and response details to the AI. It returns a concise explanation and troubleshooting steps tailored for beginners.
- **The Control Chat**: Located in the right sidebar, it uses a pattern-matcher and AI to parse user commands. Commands like `"GET https://example.com"` are automatically extracted to fill the request builder and trigger a run.

### 3. Persistence (`storage.ts`)
The app uses a robust wrapper around `localStorage`:
- **Saved Requests**: Limit of 10 persisted requests.
- **History**: Automatically records the last 10 successful/failed runs.
- **Tab Management**: Closing a tab prompts the user to save it to their local library.

---

## 🚦 Getting Started

1. **Install Dependencies**: `npm install`
2. **Environment Setup**: Add your `GROQ_API_KEY` to your `.env.local` file.
3. **Run Dev Server**: `npm run dev`

---

Built with ❤️ by TraceAPI Team.