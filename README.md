# Gun Collection Tracker (Texas build)

A static, client-only gun collection wishlist: browse by category, filter NFA and standard items, search by name or caliber, and mark acquisitions stored in the browser (local storage).

- **Source:** modular ES modules under `src/` (data, lib, UI).
- **Custom wishlist items:** add via the form on the page; they are stored in the browser with key `gunCustom` (acquired still uses `gunAcq`). Remove with the row **Remove** button.
- **Notion link:** set `NOTION_DOCS_URL` in [`src/config.js`](src/config.js), then use the footer link to open your Notion page.
- **Open Graph** `og:url` in `index.html` points at the project Pages URL; `npm run site:build` can still rewrite a placeholder if you use `OG_SITE_BASE_URL` in a fork.
- **Tests:** `npm test`
- **Backup (JSON):** use **Download backup** to save custom rows + checkmarks. **Import** replaces them (browser only, no cloud).
- **Share a filtered view:** set category / NFA / search, then **Copy view link** — the URL encodes `?cat=&nfa=&q=` for bookmarks or Notion.
- **Install / PWA:** `manifest.json` + `icon.svg` let some browsers “install” the site or set icon when bookmarked.

## Local

```bash
npm ci
npm test
# Serve the repo root (or _site/ after `GITHUB_REPOSITORY=owner/repo npm run site:build`):
npx --yes http-server -p 8080 .
```

## GitHub Pages

The repository is **public**. The site deploys with **“Deploy GitHub Pages”** on each push to `main`:

- **Live site:** <https://kissmeh02.github.io/gun-wishlist/>
- In **Notion**, use an **Embed** or a bookmark with that URL (embed may take a few minutes after the first deploy to return 200).

**Branch rules** and **auto-merge** can be set under **Settings → Branches** if you use pull requests; private-repo limits no longer apply to Pages.

## Security

See [SECURITY.md](SECURITY.md). This project has no server or database; treat any future API keys and DB URLs as production secrets (e.g. Google Secret Manager, GitHub Environments) and never commit them.

## License

Private project; all rights reserved unless you add a license.
