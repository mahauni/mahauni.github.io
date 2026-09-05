export interface ParsedMarkdown {
  data: Record<string, string>;
  content: string;
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = raw.match(FRONTMATTER_PATTERN);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const [, frontmatterBlock, content] = match;
  const data: Record<string, string> = {};

  for (const line of frontmatterBlock.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    data[key] = value;
  }

  return { data, content: content.trim() };
}

export function excerptFrom(content: string): string {
  const withoutHeadings = content
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n")
    .trim();

  return (withoutHeadings.split(/\n\s*\n/)[0] ?? "").trim();
}
