import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const repo = process.env.GITHUB_REPOSITORY || '';
const [owner, repoName] = repo ? repo.split('/') : ['', ''];
const siteBase =
  owner && repoName
    ? `https://${owner.toLowerCase()}.github.io/${repoName}/`
    : 'https://example.github.io/gun-wishlist/';

const outDir = process.env.SITE_DIR || join(process.cwd(), '_site');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const root = process.cwd();
cpSync(join(root, 'styles'), join(outDir, 'styles'), { recursive: true });
cpSync(join(root, 'src'), join(outDir, 'src'), { recursive: true });

const indexPath = join(root, 'index.html');
let html = readFileSync(indexPath, 'utf8');
if (html.includes('OG_SITE_BASE_URL')) {
  html = html.replaceAll('OG_SITE_BASE_URL', siteBase);
}
writeFileSync(join(outDir, 'index.html'), html, 'utf8');

process.stdout.write(`Site assembled at ${outDir}\npublic URL: ${siteBase}\n`);
