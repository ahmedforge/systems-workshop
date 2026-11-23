# Ahmed Ali / Systems Workshop

A personal portfolio for Ahmed Ali (Cole), centered on backend engineering, retrieval systems and infrastructure. Built with the Next.js App Router, TypeScript, Tailwind and Framer Motion. Fonts are bundled locally. No GitHub token is needed.

## Run locally

Use Node 22.13+ and npm. From the portfolio directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview, stop the dev server, run `npm run build`, then `npm start`.

## Edit and verify

- `content.ts` holds public profile copy, project links, skill groups, timeline, and a dated snapshot of public repositories. Source comments identify résumé, brief, README and API data. Empty links render as TODOs.
- `app/page.tsx` reads GitHub at build time, revalidates daily and uses the snapshot if GitHub is unavailable. Vercel supports ISR with the default Next.js preset.
- `components/Bench.tsx` implements a four-token bucket refilled at one per second, a four-request/four-second sliding window, and a four-slot bucket draining one unit per second. Send a burst or pause automatic traffic to compare.
- `components/Workshop.tsx` contains the project index, command palette and terminal. Press Ctrl/Cmd+K or the backtick key. Escape closes either dialog. Expand each project using Enter or Space.
- Theme tokens and responsive styles live in `app/globals.css`. Reduced motion disables animated reveals and title displacement.
- Confirm the email, LinkedIn URL, redacted résumé URL, Substack and Hashnode links. Confirm current project status and hosted demos. Keep the original résumé outside the checkout. The résumé and GitHub profile README give different LinkedIn URLs. No LinkedIn PDF was available.
- Add a production origin via the Vercel environment variable `SITE_URL`, including https://, and redeploy after configuring the domain. The sitemap uses that origin or Vercel’s production URL.

## Push to GitHub

Create an **empty** GitHub repository named `systems-workshop` under `ahmedforge`. From this folder (Git has already been initialized):

```sh
git add .
git status --short
git commit -m "Build personal systems workshop portfolio"
git remote add origin https://github.com/ahmedforge/systems-workshop.git
git push -u origin main
```

If you choose a different repository name, change the remote URL. GitHub may ask you to authenticate.

## Deploy and attach a student domain

1. Sign in to [Vercel New Project](https://vercel.com/new) with GitHub on the Hobby plan. Import the repository, leave the root at the repository root and accept the detected Next.js preset. Select **Deploy**.
2. Sign in to the [GitHub Student Developer Pack](https://education.github.com/pack), select an available domain offer and redeem it through the partner registrar. Choose the domain yourself and review the promotion period and renewal price.
3. In the Vercel project, open **Settings → Domains** and add the exact domain. At the registrar, enter the DNS records Vercel displays for this project. If adding both apex and www, choose a primary and configure the redirect. Wait for Vercel to verify DNS and issue HTTPS.
4. Set `SITE_URL` to the verified primary HTTPS origin in Production environment variables, redeploy, and check `/sitemap.xml`, project links, theme persistence and mobile layout. New pushes to main deploy automatically.

No domain is reserved by this repository. [Vercel domain guide](https://vercel.com/docs/domains/working-with-domains/add-domain)

