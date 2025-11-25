# Supabase Edge Functions Configuration

## Environment Variables

Create a `.env` file in the `supabase` directory with the following variables:

```bash
# OpenAI API Key (required for AI coach)
OPENAI_API_KEY=your-openai-api-key-here

# Supabase Configuration (automatically provided by Supabase)
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Secrets Management

For production, set secrets using the Supabase CLI:

```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key-here
```

## Local Development

To run edge functions locally:

```bash
supabase functions serve ai-coach --env-file supabase/.env
```

## Deployment

To deploy the edge function:

```bash
supabase functions deploy ai-coach
```
