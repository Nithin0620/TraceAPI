import { NextResponse } from "next/server";

type ProxyBody = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
};

function isHttpUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export async function POST(req: Request) {
  let body: ProxyBody;
  try {
    body = (await req.json()) as ProxyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.url || !isHttpUrl(body.url)) {
    return NextResponse.json({ error: "Only http(s) URLs are supported" }, { status: 400 });
  }

  const start = performance.now();
  const upstream = await fetch(body.url, {
    method: body.method,
    headers: body.headers,
    body:
      body.method === "GET" || body.method === "DELETE"
        ? undefined
        : body.body?.length
          ? body.body
          : undefined,
    // We do not forward cookies by default.
  });

  const timeMs = Math.round(performance.now() - start);
  const text = await upstream.text();
  const headers: Record<string, string> = {};
  upstream.headers.forEach((v, k) => (headers[k] = v));

  return NextResponse.json(
    {
      status: upstream.status,
      statusText: upstream.statusText,
      timeMs,
      headers,
      bodyText: text,
    },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}

