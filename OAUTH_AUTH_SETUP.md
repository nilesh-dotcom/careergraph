# OAuth and Authentication Configuration Guide

## Overview

CareerGraph.ai uses Supabase for authentication with support for:
- Email/Password authentication
- Google OAuth
- GitHub OAuth
- Password reset functionality
- Account management

## Prerequisites

1. **Supabase Account**: Create one at https://supabase.com
2. **Environment Variables**: Set up `.env.local` with required keys
3. **OAuth Providers**: Configure Google and GitHub apps

## Step 1: Supabase Setup

### Get API Keys

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy these values and add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## Step 2: Configure OAuth Providers

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Create OAuth 2.0 Client ID (Web Application):
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://your-domain.com`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
     - `https://your-domain.com/auth/callback`
     - `https://[project-id].supabase.co/auth/v1/callback`

5. In Supabase console, go to **Authentication** → **Providers** → **Google**
6. Enable Google provider
7. Add your Google OAuth Client ID and Client Secret

### GitHub OAuth

1. Go to GitHub Settings → **Developer settings** → **OAuth Apps**
2. Create a new OAuth App with:
   - Application name: `CareerGraph`
   - Authorization callback URL:
     - `http://localhost:3000/auth/callback` (dev)
     - `https://your-domain.com/auth/callback` (prod)
     - `https://[project-id].supabase.co/auth/v1/callback`

3. Copy Client ID and Client Secret
4. In Supabase console, go to **Authentication** → **Providers** → **GitHub**
5. Enable GitHub provider
6. Add your GitHub OAuth Client ID and Client Secret

## Step 3: Email Configuration

### Development

In development, Supabase sends confirmation emails to the console. Check your browser console for email links.

### Production

For production email delivery, configure:

1. In Supabase, go to **Authentication** → **Email Templates**
2. Either:
   - Use Supabase's built-in email (limited free tier)
   - Or configure SMTP provider (SendGrid, Mailgun, etc.)

In **Settings** → **Email**, add SMTP configuration:

```
SMTP Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: your-sendgrid-api-key
```

## Step 4: Local Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Test Authentication Flow

1. **Sign Up**: Visit `http://localhost:3000/signup`
   - Create account with email/password
   - OAuth with Google or GitHub

2. **Email Confirmation**: 
   - In dev: Check browser console for confirmation link
   - Click link to verify email

3. **Sign In**: Visit `http://localhost:3000/login`
   - Sign in with credentials or OAuth

4. **Protected Routes**:
   - `/analyze` - Requires authentication
   - `/results` - Requires authentication
   - `/profile` - Account management

## Step 5: Environment Variables

Create `.env.local` in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: OAuth (auto-fetched from Supabase if not set)
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
# NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
```

## Step 6: Deploy to Production

### Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Update OAuth redirect URIs to include production domain

### Update OAuth Callbacks

In your OAuth providers (Google/GitHub), add production URLs:

**Google Console:**
- Authorized JavaScript origins: `https://your-domain.com`
- Authorized redirect URIs: `https://your-domain.com/auth/callback`

**GitHub OAuth App:**
- Authorization callback URL: `https://your-domain.com/auth/callback`

## Authentication Routes

### Public Routes
- `/` - Home page
- `/login` - Sign in
- `/signup` - Create account
- `/forgot-password` - Password reset
- `/reset-password` - Set new password

### Protected Routes
- `/analyze` - Resume analysis
- `/results` - View results
- `/profile` - Account settings

## Features

### Email/Password Authentication
- Sign up with email and password
- Sign in with credentials
- Email verification required
- Password reset via email

### OAuth Authentication
- Google Sign-in/Sign-up
- GitHub Sign-in/Sign-up
- Auto-profile creation
- Identity linking (coming soon)

### Account Management (`/profile`)
- View/edit profile information
- Security settings
- Logout
- Two-factor authentication (future)

## File Structure

```
src/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   ├── login/
│   │   ├── page.tsx
│   │   └── login-form.tsx        # Login component with OAuth
│   ├── signup/
│   │   └── page.tsx              # Signup with OAuth
│   ├── forgot-password/
│   │   └── page.tsx              # Password reset request
│   ├── reset-password/
│   │   └── page.tsx              # Password reset form
│   ├── profile/
│   │   └── page.tsx              # Account management
│   ├── layout.tsx                # AuthProvider wrapper
│   ├── middleware.ts             # Route protection
│   └── ...
├── contexts/
│   └── AuthContext.tsx           # Auth state management
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── database.ts           # Database operations
└── ...
```

## Troubleshooting

### OAuth Not Working

**Issue**: "Invalid redirect_uri" error

**Solution**: 
- Update OAuth redirect URIs in Google/GitHub settings
- Ensure callback URL matches: `{domain}/auth/callback`
- Check Supabase provider settings

### Email Not Sending

**Issue**: Confirmation emails not received

**Solution**:
- Development: Check browser console for links
- Production: Configure SMTP in Supabase settings
- Check spam folder
- Verify email templates in Supabase

### Session Not Persisting

**Issue**: User logged out after refresh

**Solution**:
- Cookies must be enabled
- Check middleware.ts for proper auth setup
- Verify `AuthProvider` wraps entire app in layout.tsx

### Protected Routes Not Working

**Issue**: Can access `/analyze` without login

**Solution**:
- Check middleware.ts config
- Restart development server
- Clear browser cookies
- Verify AuthProvider is properly set up

## Support

For issues:
1. Check [Supabase Documentation](https://supabase.com/docs)
2. Review [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
3. Check browser console for errors
4. Review application logs

## Next Steps

- [ ] Enable Two-Factor Authentication
- [ ] Add social identity linking
- [ ] Implement role-based access control
- [ ] Add email preferences
- [ ] Set up webhook handlers for auth events
