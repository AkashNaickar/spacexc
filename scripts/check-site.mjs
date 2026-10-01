#!/usr/bin/env node
// Static-site checks: required head metadata, local link/asset integrity,
// image alt text and duplicate ids. Runs with no dependencies.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const htmlFiles = readdirSync(root)
  .filter((file) => file.endsWith(".html"))
  .sort();

const errors = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);

// Anything with a scheme, a protocol-relative URL or a bare fragment is not a
// local file we can resolve on disk.
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
const stripQuery = (url) => url.replace(/&amp;/g, "&").split("#")[0].split("?")[0];

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), "utf8");

  if (!/<html[^>]*\slang\s*=/i.test(html)) fail(file, "missing <html lang>");
  if (!/<meta[^>]*charset/i.test(html)) fail(file, "missing <meta charset>");
  if (!/<meta[^>]*name=["']viewport["']/i.test(html)) fail(file, "missing viewport meta");

  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!title || title[1].trim() === "") fail(file, "missing or empty <title>");

  if (!/<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html)) {
    fail(file, 'missing <meta name="description">');
  }

  for (const match of html.matchAll(/\s(?:src|href)=["']([^"']+)["']/gi)) {
    const raw = match[1];
    if (EXTERNAL.test(raw)) continue;
    const path = stripQuery(raw);
    if (!path) continue;
    const target = resolve(dirname(join(root, file)), path);
    if (!existsSync(target)) fail(file, `broken reference: ${raw}`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt\s*=\s*["'][^"']*["']/i.test(match[0])) {
      fail(file, `image without alt attribute: ${match[0].slice(0, 60)}`);
    }
  }

  const seen = new Set();
  for (const match of html.matchAll(/\sid=["']([^"']+)["']/gi)) {
    if (seen.has(match[1])) fail(file, `duplicate id: ${match[1]}`);
    seen.add(match[1]);
  }
}

if (errors.length > 0) {
  console.error(`check-site: ${errors.length} problem(s) found`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`check-site: OK - ${htmlFiles.length} HTML file(s) checked.`);
