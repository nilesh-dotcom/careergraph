# CareerGraph.ai — MVP

A data-backed career assessment tool for mid-to-senior Indian tech professionals.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your keys:

| Key | Where to get it | Required |
|-----|----------------|----------|
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/api-keys) | Yes (for real analysis) |
| `RAPIDAPI_KEY` | [rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) | Yes (for real job data) |

> **Without API keys:** The app runs in **demo mode** and returns a realistic mock report. This lets you test the full UI flow before adding real keys.

### 3. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/analyze` | 3-step input form (resume + preferences) |
| `/results` | Career report dashboard |
| `/api/analyze` | POST endpoint — the core analysis pipeline |

## Architecture

```
Resume (PDF/DOCX)
    ↓
Text Extraction (pdf-parse / jszip)
    ↓
Profile Parsing (OpenAI GPT-4o)
    ↓
Job Data Fetch (JSearch via RapidAPI)
    ↓
Skill Comparison + Insight Generation (OpenAI GPT-4o)
    ↓
Results Dashboard
```

## Monetization

The results page shows:
- **Free:** Career Positioning + Top 3 Career Paths
- **Locked (₹499):** Skill Gap Analysis, Market Insights, 90-Day Action Plan, All Job Matches

Razorpay integration is stubbed in `src/app/results/page.tsx` — look for the `handleUnlock` function.

## Adding Razorpay

1. Add your key to `.env.local`: `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx`
2. In `src/app/results/page.tsx`, replace the `handleUnlock` function with:

```ts
const handleUnlock = () => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: 49900, // ₹499 in paise
    currency: "INR",
    name: "CareerGraph.ai",
    description: "Full Career Report",
    handler: () => setIsUnlocked(true),
  };
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};
```

And add the Razorpay script to `src/app/layout.tsx`:
```html
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
```

## Deployment

Deploy to Vercel in one click:
```bash
npx vercel
```

Add your environment variables in the Vercel dashboard.
