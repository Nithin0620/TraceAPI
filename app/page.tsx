import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Simple Interface",
    desc: "Method, URL, headers, JSON body — only what you need. Zero bloat.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "AI-Powered Insights",
    desc: "Understand status codes, errors, and auth issues with AI explanations.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Get actionable next steps the moment something goes wrong.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    ),
    title: "Save Requests",
    desc: "Save common requests and reload them instantly. Never lose work.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "100% Private",
    desc: "All data stored locally in your browser. Your API keys stay private.",
    color: "text-error",
    bg: "bg-error/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Request History",
    desc: "Automatic request history for quick access and instant replay.",
    color: "text-info",
    bg: "bg-info/10",
  },
];

const STEPS = [
  { step: 1, title: "Enter URL", desc: "Paste your API endpoint" },
  { step: 2, title: "Choose Method", desc: "GET, POST, PUT, or DELETE" },
  { step: 3, title: "Add Headers & Body", desc: "Optional headers and JSON body" },
  { step: 4, title: "Send & Review", desc: "See response with AI-powered insights" },
];

export default function Home() {
  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      <div className="aurora-bg" aria-hidden="true" />
      <div className="particle-bg" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      <div className="floating-orb floating-orb-1" aria-hidden="true" />
      <div className="floating-orb floating-orb-2" aria-hidden="true" />
      <div className="floating-orb floating-orb-3" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">

          {/* ── Hero Section ── */}
          <section className="animate-slide-up">
            <div className="glass-card rounded-3xl p-8 sm:p-12">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs sm:text-sm font-medium text-primary mb-8 animate-fade-in magnetic-btn">
                <span className="relative inline-block w-2 h-2 bg-primary rounded-full enhanced-status-dot" />
                Beginner-friendly · Fast · AI-guided
              </div>

              {/* Enhanced Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-base-content mb-6 text-reveal">
                Test APIs{" "}
                <span className="gradient-text">without the complexity</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-base-content/60 leading-8 mb-10 max-w-xl">
                TraceAPI is a minimal, modern API tester designed for beginners
                and developers. Build, send, and{" "}
                <span className="font-semibold text-base-content/80">
                  understand
                </span>{" "}
                every response with AI.
              </p>

              {/* Enhanced CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <Link
                  href="/test-api"
                  className="btn btn-primary btn-lg rounded-full font-bold px-8 gap-2 glow-primary-sm hover:glow-primary transition-all duration-300 magnetic-btn pulse-ring"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Start Testing
                </Link>
                <a
                  href="#features"
                  className="btn btn-ghost btn-lg rounded-full font-semibold border border-base-300/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 magnetic-btn smooth-scroll"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>

              {/* Enhanced Features Grid */}
              <div
                id="features"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children parallax-slow"
              >
                {FEATURES.map((f, index) => (
                  <div
                    key={f.title}
                    className="feature-card animate-slide-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl ${f.bg} ${f.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        {f.icon}
                      </div>
                      <div className="text-sm font-bold text-base-content transition-colors duration-300 group-hover:text-primary">
                        {f.title}
                      </div>
                    </div>
                    <div className="text-sm text-base-content/60 leading-relaxed transition-colors duration-300 group-hover:text-base-content/80">
                      {f.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Enhanced Sidebar ── */}
          <aside className="animate-slide-left parallax-medium" style={{ animationDelay: "0.15s" }}>
            <div className="glass-card rounded-3xl p-8 sm:p-10 sticky top-20 gradient-border">
              <h2 className="text-xl font-bold tracking-tight text-base-content mb-8 flex items-center gap-2 text-reveal">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary magnetic-btn">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
                How It Works
              </h2>

              <ol className="space-y-6 stagger-children">
                {STEPS.map((item, index) => (
                  <li
                    key={item.step}
                    className="flex gap-4 animate-slide-up group"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-content font-bold text-sm flex-shrink-0 group-hover:glow-primary-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 magnetic-btn">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </div>
                      <div className="text-sm text-base-content/60 mt-1 group-hover:text-base-content/80 transition-colors duration-300">
                        {item.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Enhanced Pro Tip */}
              <div className="mt-10 rounded-2xl border border-success/20 bg-success/5 p-5 backdrop-blur-sm magnetic-btn hover:border-success/40 hover:bg-success/10 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/15 text-success flex-shrink-0 animate-scale-in">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-success text-sm">
                      Pro Tip
                    </div>
                    <div className="text-sm text-base-content/60 mt-1 leading-relaxed">
                      Save common requests as tabs for instant reload. Your API
                      workflow just got 10x faster.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js", "Groq AI", "LocalStorage", "CORS Proxy"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="badge badge-sm badge-outline text-base-content/50 font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
