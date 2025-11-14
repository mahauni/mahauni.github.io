import { type BlogPost } from "../types/types";
import article1 from "../../../blogs/article1.md?raw";
import article2 from "../../../blogs/article2.md?raw";

export const BlogsList: BlogPost[] = [
  {
    id: 0,
    filename: "2025-10-14-getting-started.md",
    title: "Why I did this",
    date: "October 14, 2025",
    author: "admin",
    tags: "zsh, terminal, idk",
    content: `This is the website and why i did this way

This is the reason why I build this (in the end you should just build something)
And why I did in the way I did, and not like the other ones`,
    blog: article1,
  },
  {
    id: 1,
    filename: "2025-11-14-new-htop.md",
    title: "Creating a new htop visualization",
    date: "November 14, 2025",
    author: "admin",
    tags: "cli, htop, visualization",
    content: `Why I'm doing this, if htop already exist and other already try to do something like this`,
    blog: article2,
  },
];
