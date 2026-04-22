# Security policy

## Scope

This application is a **static site**: HTML, CSS, and ES modules run in the browser. There is no application server, database, or network API in the default setup.

## Reporting

If you find a security issue, open a private advisories request with details to reproduce, or use repository issues if private reporting is not enabled.

## Hardening checklist for a public / cloud deploy

- **Secrets:** do not put API keys, DB URLs, or signing keys in the repo. Use a secrets manager (e.g. Google Secret Manager, AWS Secrets Manager) or GitHub Environments/Actions secrets, and inject at deploy or runtime in the backend.
- **`.env`:** keep local-only; use `.env.example` as documentation without real values. Add `.env` to `.gitignore` (done).
- **If you add a backend:** prefer HTTPS only, short-lived auth tokens, rate limiting, and least-privilege data access. Validate and sanitize all inputs.
- **Content-Security-Policy** and other security headers: configure on the **reverse proxy** (CloudFront, Nginx, Cloudflare) in production, not only in meta tags.
- **Dependencies:** run `npm audit` regularly and keep dev tooling updated.
- **localStorage** data is visible on the same device/browser profile; it is not suitable for high-sensitivity data without additional protection.

## Current client-side notes

- Rendering uses `createElement` and `textContent` for list data to avoid HTML injection.
- The catalog is static data; there is no user-supplied HTML stored and re-rendered as markup.
