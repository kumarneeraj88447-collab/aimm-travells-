# Deploy via GitHub

## Repository

Code is hosted at:

**https://github.com/kumarneeraj88447-collab/aimm-travells-**

Push updates:

```bash
git add .
git commit -m "Your message"
git push origin main
```

## Option A — Vercel (recommended, SSR)

1. Open [vercel.com](https://vercel.com) → **Add New Project** → import `aimm-travells-` from GitHub.
2. Build settings (should auto-detect):
   - **Build command:** `npm run build`
   - **Output directory:** leave empty (Nitro writes `.vercel/output`)
3. Deploy. Every push to `main` redeploys automatically.

### GitHub Actions deploy (optional)

If you use the workflow in `.github/workflows/deploy-vercel.yml`, add these **repository secrets**  
(GitHub → Settings → Secrets and variables → Actions):

| Secret | Where to find it |
|--------|------------------|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel project → Settings → General |
| `VERCEL_PROJECT_ID` | Same page |

## Option B — Cloudflare Workers

```bash
npm run build
npx wrangler deploy
```

Use this when `VERCEL` is not set (default local/CI build targets Cloudflare).
