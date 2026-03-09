import Anthropic from "npm:@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { logs } = await req.json();

    if (!logs || logs.length === 0) {
      return new Response(
        JSON.stringify({ error: "No logs provided" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const client = new Anthropic({
      apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
    });

    const logsText = logs.map((log: any) =>
      `Date: ${log.created_at}, Mood: ${log.mood}/10${log.note ? `, Note: ${log.note}` : ""}${log.symptoms?.length ? `, Symptoms: ${log.symptoms.join(", ")}` : ""}`
    ).join("\n");

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a compassionate wellness coach. Analyze these mood and symptom logs and provide a brief, encouraging insight (2-3 sentences) about patterns you notice and one actionable suggestion. Be warm and supportive, not clinical.

Logs:
${logsText}

Provide insight in the same language the notes are written in (if notes are in Portuguese, respond in Portuguese).`,
        },
      ],
    });

    const insight = message.content[0].type === "text" ? message.content[0].text : "";

    return new Response(
      JSON.stringify({ insight }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});