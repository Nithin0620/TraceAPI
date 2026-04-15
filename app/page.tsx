import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <section className="rounded-2xl border msp-border msp-surface p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border msp-border bg-base-100 px-3 py-1 text-xs text-base-content/70">
              Beginner-friendly • Fast • AI-guided
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              Test APIs without the Postman complexity.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-base-content/70 leading-7">
              TraceAPI is a minimal, modern API tester designed for beginners. Build a request,
              send it, and instantly understand the response with AI-powered explanations and
              mistake-spotting.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/test-api" className="btn btn-primary rounded-full">
                Open API Tester
              </Link>
              <a
                href="#how"
                className="btn btn-ghost rounded-full border msp-border"
              >
                How it works
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border msp-border bg-base-100 p-4">
                <div className="text-sm font-medium">Simple requests</div>
                <div className="mt-1 text-sm text-base-content/70">
                  Method, URL, headers, JSON body—only what you need.
                </div>
              </div>
              <div className="rounded-xl border msp-border bg-base-100 p-4">
                <div className="text-sm font-medium">Clear explanations</div>
                <div className="mt-1 text-sm text-base-content/70">
                  Understand status codes, validation errors, and auth issues.
                </div>
              </div>
              <div className="rounded-xl border msp-border bg-base-100 p-4">
                <div className="text-sm font-medium">AI help</div>
                <div className="mt-1 text-sm text-base-content/70">
                  Ask “what went wrong?” and get actionable next steps.
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border msp-border bg-base-100 p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">How to Use</h2>
            <ol id="how" className="mt-4 space-y-3 text-sm text-base-content/80">
              <li className="flex gap-3">
                <span className="badge badge-neutral badge-outline">1</span>
                <span>Enter API URL</span>
              </li>
              <li className="flex gap-3">
                <span className="badge badge-neutral badge-outline">2</span>
                <span>Select method</span>
              </li>
              <li className="flex gap-3">
                <span className="badge badge-neutral badge-outline">3</span>
                <span>Add headers / body</span>
              </li>
              <li className="flex gap-3">
                <span className="badge badge-neutral badge-outline">4</span>
                <span>Click send and view response</span>
              </li>
            </ol>

            <div className="mt-6 rounded-xl border msp-border bg-base-200/40 p-4">
              <div className="text-sm font-medium">Tip</div>
              <div className="mt-1 text-sm text-base-content/70">
                Save common requests as tabs, then reload them instantly from your history.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
