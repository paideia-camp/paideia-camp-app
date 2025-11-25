import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CoachRequest {
  essayText: string;
  context?: string;
  userId?: string;
}

interface CoachResponse {
  structureScore: number;
  clarityScore: number;
  mindsetScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: Array<{
    type: "structure" | "clarity" | "mindset" | "impact";
    title: string;
    message: string;
    priority: "high" | "medium" | "low";
  }>;
  highlightedIssues: Array<{
    text: string;
    issue: string;
    suggestion: string;
    startIndex: number;
    endIndex: number;
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { essayText, context, userId }: CoachRequest = await req.json();

    // Validate input
    if (!essayText || essayText.trim().length < 100) {
      return new Response(
        JSON.stringify({
          error: "Essay text must be at least 100 characters long",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    // Prepare the prompt for OpenAI
    const systemPrompt = `You are an expert application coach specializing in fellowship, scholarship, and accelerator applications. Your role is to analyze essays and personal statements, providing constructive feedback on:

1. Structure: Organization, flow, and logical progression
2. Clarity: Readability, conciseness, and coherence
3. Mindset: Demonstration of leadership, global citizenship, systems thinking, and impact
4. Impact: Compelling narrative and memorability

Provide specific, actionable feedback with examples from the text.`;

    const userPrompt = `Analyze the following essay and provide detailed feedback:

${context ? `Context: ${context}\n\n` : ""}Essay:
${essayText}

Please provide:
1. Scores (0-100) for structure, clarity, and mindset alignment
2. 3-5 key strengths
3. 3-5 areas for improvement
4. Specific suggestions with examples
5. Highlighted issues with exact text snippets and suggestions

Format your response as JSON matching this structure:
{
  "structureScore": number,
  "clarityScore": number,
  "mindsetScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": [
    {
      "type": "structure" | "clarity" | "mindset" | "impact",
      "title": string,
      "message": string,
      "priority": "high" | "medium" | "low"
    }
  ],
  "highlightedIssues": [
    {
      "text": string,
      "issue": string,
      "suggestion": string
    }
  ]
}`;

    // Call OpenAI API
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview", // or "gpt-3.5-turbo" for lower cost
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
          max_tokens: 2000,
        }),
      }
    );

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
    }

    const openaiData = await openaiResponse.json();
    const analysis = JSON.parse(openaiData.choices[0].message.content);

    // Calculate overall score
    const overallScore = Math.round(
      (analysis.structureScore +
        analysis.clarityScore +
        analysis.mindsetScore) /
        3
    );

    // Add text indices for highlighted issues
    const highlightedIssues = analysis.highlightedIssues.map((issue: any) => {
      const startIndex = essayText.indexOf(issue.text);
      return {
        ...issue,
        startIndex: startIndex !== -1 ? startIndex : 0,
        endIndex: startIndex !== -1 ? startIndex + issue.text.length : 0,
      };
    });

    const response: CoachResponse = {
      ...analysis,
      overallScore,
      highlightedIssues,
    };

    // Store the analysis in Supabase (optional)
    if (userId) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase.from("coach_analyses").insert({
        user_id: userId,
        essay_text: essayText,
        context: context,
        analysis: response,
        created_at: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred processing your request";
    console.error("Error in ai-coach function:", error);
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
