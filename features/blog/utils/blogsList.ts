import { type BlogPost } from "../types/types";
import { parseFrontmatter, excerptFrom } from "./frontmatter";

const modules = import.meta.glob("/blogs/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const BlogsList: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace("/blogs/", "").replace(/\.md$/, "");
    const { data, content } = parseFrontmatter(raw);

    return {
      id: slug,
      filename: `${slug}.md`,
      title: data.title ?? slug,
      date: data.date ?? "",
      author: data.author ?? "",
      tags: data.tags ?? "",
      content: excerptFrom(content),
      blog: content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
