import { NextResponse } from "next/server";

type GroqChatRequest = {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  temperature?: number;
  max_tokens?: number;
};

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY. Add it to your environment to enable AI." },
      { status: 500 },
    );
  }

  let body: GroqChatRequest;
  try {
    body = (await req.json()) as GroqChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Messages array is required and cannot be empty" }, { status: 400 });
  }

  try {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: body.messages,
        temperature: body.temperature ?? 0.2,
        max_tokens: body.max_tokens ?? 500,
      }),
    });

    const text = await upstream.text();
    
    if (!upstream.ok) {
      try {
        const error = JSON.parse(text);
        return NextResponse.json(
          { 
            error: error.error?.message || "Groq request failed",
            detail: text 
          },
          { status: upstream.status },
        );
      } catch {
        return NextResponse.json(
          { error: "Groq request failed", detail: text },
          { status: upstream.status },
        );
      }
    }

    // Parse and validate response
    try {
      const json = JSON.parse(text) as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (json.error) {
        return NextResponse.json(
          { error: json.error.message || "Groq returned an error" },
          { status: 400 },
        );
      }

      const content = json.choices?.[0]?.message?.content;
      if (!content) {
        return NextResponse.json(
          { error: "No response content from AI" },
          { status: 502 },
        );
      }

      return NextResponse.json({ content });
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid response format from AI", detail: text },
        { status: 502 },
      );
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to reach AI service: " + errorMessage },
      { status: 503 },
    );
  }
}

