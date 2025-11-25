# AI Coach - Supabase Edge Function Setup Guide

## Overview

The AI Coach feature uses Supabase Edge Functions to provide AI-powered essay analysis using OpenAI's GPT-4. This guide covers setup, deployment, and usage.

## Architecture

```
User → Frontend (Coach.tsx) → Supabase Edge Function (ai-coach) → OpenAI API → Response
```

## Prerequisites

1. **Supabase Project**: Active Supabase project with authentication enabled
2. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **Supabase CLI**: Install for local development and deployment

## Installation

### 1. Install Supabase CLI

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or use NPM
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link Your Project

```bash
cd /path/to/paideia-camp-app
supabase link --project-ref your-project-ref
```

Find your project ref in your Supabase dashboard URL: `https://app.supabase.com/project/YOUR-PROJECT-REF`

## Configuration

### 1. Set Environment Variables

Create `supabase/.env` file:

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Supabase (automatically provided in production)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Set Secrets for Production

```bash
# Set OpenAI API key as a secret
supabase secrets set OPENAI_API_KEY=sk-your-openai-api-key-here
```

## Database Setup (Optional)

If you want to store analysis history, create the `coach_analyses` table:

```sql
-- Create coach_analyses table
CREATE TABLE coach_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  essay_text TEXT NOT NULL,
  context TEXT,
  analysis JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE coach_analyses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own analyses
CREATE POLICY "Users can view own analyses"
  ON coach_analyses FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own analyses
CREATE POLICY "Users can insert own analyses"
  ON coach_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_coach_analyses_user_id ON coach_analyses(user_id);
CREATE INDEX idx_coach_analyses_created_at ON coach_analyses(created_at DESC);
```

## Local Development

### 1. Start Supabase Locally (Optional)

```bash
supabase start
```

### 2. Serve Edge Function Locally

```bash
supabase functions serve ai-coach --env-file supabase/.env
```

The function will be available at: `http://localhost:54321/functions/v1/ai-coach`

### 3. Test Locally

```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/ai-coach' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "essayText": "Your essay text here (minimum 100 words)...",
    "context": "Optional context about the essay"
  }'
```

## Deployment

### 1. Deploy the Edge Function

```bash
supabase functions deploy ai-coach
```

### 2. Verify Deployment

```bash
supabase functions list
```

You should see `ai-coach` in the list with status `ACTIVE`.

### 3. Test Production Function

The function will be available at:

```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/ai-coach
```

## Frontend Integration

The frontend is already configured to use the edge function. Make sure your `.env.local` has:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Usage

### From the UI

1. Navigate to `/coach` in the application
2. Paste your essay (minimum 100 words)
3. Click "Analyze Essay"
4. View AI-generated feedback with scores and suggestions

### API Response Format

```typescript
{
  structureScore: number,      // 0-100
  clarityScore: number,        // 0-100
  mindsetScore: number,        // 0-100
  overallScore: number,        // Average of above
  strengths: string[],         // 3-5 key strengths
  weaknesses: string[],        // 3-5 areas for improvement
  suggestions: [
    {
      type: "structure" | "clarity" | "mindset" | "impact",
      title: string,
      message: string,
      priority: "high" | "medium" | "low"
    }
  ],
  highlightedIssues: [
    {
      text: string,           // Exact text from essay
      issue: string,          // What's wrong
      suggestion: string,     // How to fix it
      startIndex: number,     // Position in essay
      endIndex: number
    }
  ]
}
```

## Cost Considerations

### OpenAI API Costs

- **GPT-4 Turbo**: ~$0.01 per 1K input tokens, ~$0.03 per 1K output tokens
- **GPT-3.5 Turbo**: ~$0.0005 per 1K input tokens, ~$0.0015 per 1K output tokens

**Estimated cost per essay analysis:**

- GPT-4 Turbo: $0.05 - $0.15 per analysis
- GPT-3.5 Turbo: $0.005 - $0.015 per analysis

To use GPT-3.5 instead, edit `supabase/functions/ai-coach/index.ts`:

```typescript
model: "gpt-3.5-turbo", // Change from "gpt-4-turbo-preview"
```

### Supabase Costs

- Edge Functions: Free tier includes 500K invocations/month
- Database: Free tier includes 500MB storage

## Monitoring

### View Function Logs

```bash
supabase functions logs ai-coach
```

### View Real-time Logs

```bash
supabase functions logs ai-coach --follow
```

### Check Function Stats

Visit your Supabase dashboard:
`https://app.supabase.com/project/YOUR-PROJECT-REF/functions/ai-coach`

## Troubleshooting

### "OpenAI API key not configured"

**Solution**: Set the secret:

```bash
supabase secrets set OPENAI_API_KEY=your-key
```

### "Failed to get coach feedback"

**Possible causes:**

1. OpenAI API key is invalid or expired
2. OpenAI API rate limit exceeded
3. Essay text is too short (< 100 characters)
4. Network connectivity issues

**Solution**: Check function logs:

```bash
supabase functions logs ai-coach
```

### CORS Errors

The edge function includes CORS headers. If you still see CORS errors:

1. Verify your Supabase URL in `.env.local`
2. Check that you're using the correct anon key
3. Ensure the function is deployed

### Rate Limiting

OpenAI has rate limits. For high-volume usage:

1. Upgrade your OpenAI plan
2. Implement caching for similar essays
3. Add rate limiting on the frontend

## Security Best Practices

1. **Never expose service role key**: Only use anon key in frontend
2. **Enable RLS**: Protect the `coach_analyses` table with RLS policies
3. **Validate input**: The edge function validates essay length
4. **Monitor usage**: Set up alerts for unusual API usage
5. **Rotate keys**: Regularly rotate your OpenAI API key

## Advanced Features

### Custom Prompts

Edit the `systemPrompt` in `supabase/functions/ai-coach/index.ts` to customize the AI's behavior:

```typescript
const systemPrompt = `Your custom prompt here...`;
```

### Context-Aware Analysis

Pass additional context for better analysis:

```typescript
const result = await getCoachFeedback(
  essayText,
  "This is for a Rhodes Scholarship application"
);
```

### Storing Analysis History

The function automatically stores analyses if `userId` is provided. Query them:

```sql
SELECT * FROM coach_analyses
WHERE user_id = 'user-uuid'
ORDER BY created_at DESC
LIMIT 10;
```

## Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Deno Documentation](https://deno.land/manual)

## Support

For issues:

1. Check function logs: `supabase functions logs ai-coach`
2. Review OpenAI API status: https://status.openai.com/
3. Check Supabase status: https://status.supabase.com/

---

**Next Steps:**

1. Get an OpenAI API key
2. Deploy the edge function
3. Test with a sample essay
4. Monitor costs and usage
