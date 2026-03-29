# Authentication & Database Setup Guide

This guide walks you through setting up authentication and database persistence using Supabase.

## Prerequisites

- A Supabase account (free tier available at https://supabase.com)
- Vercel account (for deployment)

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in project details:
   - **Name**: `careergraph` (or your preference)
   - **Database Password**: Save this securely
   - **Region**: Choose closest to your users
4. Wait for the project to be created (2-5 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - `NEXT_PUBLIC_SUPABASE_URL` → Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Anon/Public API Key
3. Add them to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Set Up Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `schema.sql` from the project root
4. Paste it into the SQL editor
5. Click **Run**

This creates:
- `profiles` table - stores user profile information
- `career_reports` table - stores generated career reports
- RLS policies - ensures users can only access their own data
- Triggers - automatically creates profile on signup and updates timestamps

## Step 4: Configure Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** (should be enabled by default)
3. Go to **Settings** → **Email Templates**
4. (Optional) Customize email confirmation template

## Step 5: Test Locally

1. Run the development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000`

3. Test the flow:
   - Click "Sign Up" and create an account
   - Check your email for confirmation link (in development, Supabase sends to the console)
   - Click the confirmation link
   - Sign in with your credentials
   - Upload a resume and run an analysis
   - Your report will be saved to the database

## Step 6: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New** → **Project**
4. Select your GitHub repository
5. In **Environment Variables**, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   OPENAI_API_KEY=sk-your-key
   RAPIDAPI_KEY=your-rapidapi-key
   ```
6. Click **Deploy**

## Step 7: Configure Production Email

For production, configure a real email provider:

1. In Supabase Settings → **Email** → **SMTP Settings**
2. Add your email provider (SendGrid, Mailgun, etc.)
3. Or use Supabase's built-in email (free tier has limits)

## File Structure

```
├── middleware.ts                      # Route protection
├── schema.sql                         # Database schema (run in Supabase)
├── .env.local                         # Local environment variables
├── src/
│   ├── app/
│   │   ├── login/page.tsx            # Login page
│   │   ├── signup/page.tsx           # Sign up page
│   │   └── api/analyze/route.ts      # Analysis with auto-save
│   ├── contexts/
│   │   └── AuthContext.tsx           # Auth state management
│   ├── components/
│   │   └── Navbar.tsx                # Updated with auth UI
│   └── lib/supabase/
│       ├── client.ts                 # Client-side Supabase
│       ├── server.ts                 # Server-side Supabase
│       ├── types.ts                  # Database types
│       └── database.ts               # Database utility functions
```

## Features

✅ **User Authentication**
- Sign up with email
- Email confirmation
- Secure login/logout
- Protected routes (/analyze, /results)

✅ **User Accounts**
- Automatic profile creation on signup
- User email stored securely
- Full name field optional

✅ **Career Report Persistence**
- Reports automatically saved after analysis
- Each user can view their report history
- Reports linked to user account

✅ **Database**
- PostgreSQL with Supabase
- Row-level security enabled
- Automatic timestamps for created_at/updated_at

## Debugging

### Issue: User can't sign up
- Check email provider settings in Supabase
- Ensure environment variables are correct
- Check browser console for errors

### Issue: Reports not saving
- Verify user is authenticated
- Check browser DevTools → Network → /api/analyze response
- Check Supabase dashboard for career_reports table data

### Issue: Session lost after refresh
- Ensure cookies are being set properly
- Check Supabase URL and Anon Key are correct
- Clear browser cache and try again

## Next Steps

1. **Add password reset functionality** - Use Supabase's built-in password recovery
2. **Add social login** - Google, GitHub auth via Supabase
3. **Add user profile page** - Let users update their info
4. **Add report sharing** - Share reports with friends/recruiters
5. **Add Razorpay integration** - Complete the payment flow for premium features

## Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Auth Patterns](https://nextjs.org/docs/app/building-your-application/authentication)
- [NextAuth.js vs Supabase Auth](https://supabase.com/docs/guides/auth/auth-methods)
