# Gun Collection Tracker (Texas build)

A static, client-only gun collection wishlist: browse by category, filter NFA and standard items, search by name or caliber, and mark acquisitions stored in the browser (local storage).

- **Source:** modular ES modules under `src/` (data, lib, UI).
- **Notion link:** set `NOTION_DOCS_URL` in [`src/config.js`](src/config.js), then use the footer link to open your Notion page.
- **Open Graph** `og:url` in `index.html` is replaced with your GitHub Pages base URL at deploy time (`npm run site:build` with `GITHUB_REPOSITORY` set, or the Pages workflow).
- **Tests:** `npm test`

## Local

```bash
npm ci
npm test
# Serve the repo root (or _site/ after `GITHUB_REPOSITORY=owner/repo npm run site:build`):
npx --yes http-server -p 8080 .
```

## GitHub Pages

The repository is **private**; a free plan often **cannot** enable GitHub Pages for private repositories (the API may return 422). Options: [upgrade the account](https://github.com/pricing) for private Pages, **make the repository public** to use free Pages, or host the `static-site` **workflow artifact** (from the “Site build and verify” action) on Netlify, Cloudflare Pages, or S3+CloudFront.

## Security

See [SECURITY.md](SECURITY.md). This project has no server or database; treat any future API keys and DB URLs as production secrets (e.g. Google Secret Manager, GitHub Environments) and never commit them.

## License

Private project; all rights reserved unless you add a license.
