import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <section className="rounded-2xl border msp-border msp-surface p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border msp-border bg-base-100 px-4 py-2 text-xs sm:text-sm font-medium text-base-content/70 mb-8">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              Beginner-friendly • Fast • AI-guided
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-tight text-base-content mb-6">
              Test APIs <span className="text-primary">without the complexity</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-base-content/70 leading-8 mb-8">
              TraceAPI is a minimal, modern API tester designed for beginners and developers. Build a request, send it, and instantly understand the response with AI-powered explanations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/test-api" className="btn btn-primary btn-lg rounded-full font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Testing
              </Link>
              <a
                href="#features"
                className="btn btn-outline btn-lg rounded-full border msp-border font-semibold"
              >
                Learn More
              </a>
            </div>

            {/* Features Grid */}
            <div id="features" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border msp-border bg-base-100 p-6 hover:bg-base-100/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-3a1 1 0 000-2h2a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-bold">Simple Interface</div>
                </div>
                <div className="text-sm text-base-content/70 leading-relaxed">
                  Method, URL, headers, JSON body—only what you need. No bloat.
                </div>
              </div>

              <div className="rounded-xl border msp-border bg-base-100 p-6 hover:bg-base-100/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10 text-success">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-bold">Clear Explanations</div>
                </div>
                <div className="text-sm text-base-content/70 leading-relaxed">
                  Understand status codes, errors, and auth issues at a glance.
                </div>
              </div>

              <div className="rounded-xl border msp-border bg-base-100 p-6 hover:bg-base-100/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-info/10 text-info">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-bold">AI Help</div>
                </div>
                <div className="text-sm text-base-content/70 leading-relaxed">
                  Get actionable next steps when something goes wrong.
                </div>
              </div>

              <div className="rounded-xl border msp-border bg-base-100 p-6 hover:bg-base-100/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10 text-warning">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-bold">Save Requests</div>
                </div>
                <div className="text-sm text-base-content/70 leading-relaxed">
                  Save common requests and reload them instantly. Never lose work.
                </div>
              </div>

              <div className="rounded-xl border msp-border bg-base-100 p-6 hover:bg-base-100/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-error/10 text-error">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-bold">Local Storage</div>
                </div>
                <div className="text-sm text-base-content/70 leading-relaxed">
                  All data stored locally. Your API requests stay private.
                </div>
              </div>

              <div className="rounded-xl border msp-border bg-base-100 p-6 hover:bg-base-100/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 text-secondary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path>
                      <path fillRule="evenodd" d="M3 8a1 1 0 012 0v3.764a2 2 0 00.732 1.732C7.084 14.06 8.15 15 10 15c1.85 0 2.916-.94 3.268-2.504A2 2 0 0014 11.764V8a1 1 0 012 0v3.764c0 .286.104.564.304.804.493.665.973 1.419.973 2.236 0 1.65-1.35 2.5-4.273 2.5A4.5 4.5 0 0110 18.5c-2.747 0-5.008-1.79-5.277-4.18C4.104 14.564 4 14.286 4 14V8a1 1 0 012 0v3.764a2 2 0 00.732 1.732z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-bold">History</div>
                </div>
                <div className="text-sm text-base-content/70 leading-relaxed">
                  Automatic request history for quick access and testing.
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="rounded-2xl border msp-border bg-base-100 p-6 sm:p-10 sticky top-20">
            <h2 className="text-xl font-bold tracking-tight text-base-content mb-6">How It Works</h2>
            <ol className="space-y-5">
              {[
                { step: 1, title: "Enter URL", desc: "Paste your API endpoint" },
                { step: 2, title: "Choose Method", desc: "GET, POST, PUT, or DELETE" },
                { step: 3, title: "Add Headers & Body", desc: "Optional headers and JSON" },
                { step: 4, title: "Send & Review", desc: "See response with AI help" }
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-content font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base-content">{item.title}</div>
                    <div className="text-sm text-base-content/70 mt-1">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-xl border msp-border bg-base-100/50 p-5 bg-success/5">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-base-content text-sm">Pro Tip</div>
                  <div className="text-sm text-base-content/70 mt-1">Save common requests as tabs for instant reload. Your API workflow just got 10x faster.</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
