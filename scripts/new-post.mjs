#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLOGS_DIR = join(ROOT, "blogs");
const DIACRITICS = /[\u0300-\u036f]/g;

function slugify(title) {
  return title
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function printUsage() {
  console.log(
    'Usage: npm run new-post -- "Post Title" ["tag1, tag2"] [author]',
  );
}

const [titleArg, tagsArg, authorArg] = process.argv.slice(2);

if (!titleArg || !titleArg.trim()) {
  printUsage();
  process.exit(1);
}

const title = titleArg.trim();
const tags = tagsArg?.trim() ?? "";
const author = authorArg?.trim() || "admin";
const date = todayISO();
const slug = slugify(title);

if (!slug) {
  console.error("Could not derive a slug from that title.");
  process.exit(1);
}

const filename = `${date}-${slug}.md`;
const filepath = join(BLOGS_DIR, filename);

if (existsSync(filepath)) {
  console.error(`Post already exists: blogs/${filename}`);
  process.exit(1);
}

const template = `---
title: ${title}
date: ${date}
author: ${author}
tags: ${tags}
---

# ${title}

TODO: write the post.
`;

if (!existsSync(BLOGS_DIR)) {
  mkdirSync(BLOGS_DIR, { recursive: true });
}

writeFileSync(filepath, template);

console.log(`Created blogs/${filename}`);
