import { type BlogPost } from "../types/types";
import article1 from "../../../blogs/article1.md?raw"

export const BlogsList: BlogPost[] = [
  {
    id: 0,
    filename: '2024-03-15-getting-started.md', 
    title: 'Getting Started with Terminal Blogging',
    date: 'March 15, 2024',
    author: 'admin',
    tags: 'tutorial, zsh',
    content: `Welcome to my terminal-style blog! If you're reading this, you probably appreciate the beauty of a clean command-line interface.

This blog is built with React and Tailwind CSS to recreate that authentic ZSH experience we all know and love. Modern tools, classic aesthetic.

# Key features:
- Syntax highlighting
- Git branch indicators
- Familiar ZSH prompts
- Minimalist design
- Search and pagination`,
    blog: article1
  },
  {
    id: 1,
    filename: '2024-03-10-terminal-magic.md', 
    title: 'The Magic of Terminal Workflows',
    date: 'March 10, 2024',
    author: 'admin',
    tags: 'productivity, cli',
    content: `There's something incredibly satisfying about working entirely in the terminal. The speed, the efficiency, the aesthetic - it all comes together beautifully.

$ alias and functions become your best friends. You start automating everything. Your fingers fly across the keyboard.

Once you go terminal, you never go back. 🚀`
  },
  {
    id: 2,
    filename: '2024-03-01-why-cli.md', 
    title: 'Why I Chose the Command Line',
    date: 'March 1, 2024',
    author: 'admin',
    tags: 'philosophy, cli',
    content: `In a world of flashy GUIs and overwhelming interfaces, the command line remains a sanctuary of simplicity and power.

Every command is intentional. Every output is meaningful. There's no distraction, no clutter - just you and the machine, communicating in the most direct way possible.

This blog is a tribute to that philosophy. Simple. Functional. Beautiful.`
  },
  {
    id: 3,
    filename: '2024-02-20-mastering-vim.md', 
    title: 'Mastering Vim: A Journey',
    date: 'February 20, 2024',
    author: 'admin',
    tags: 'vim, editor',
    content: `Learning Vim is like learning to ride a bike. At first, you'll fall. A lot. You'll accidentally delete entire paragraphs. You'll get stuck in modes you didn't know existed.

But then something clicks. Your fingers start dancing across the keyboard. dd, yy, :wq become second nature.

And suddenly, you can't imagine editing text any other way.`
  },
  {
    id: 4,
    filename: '2024-02-10-shell-scripting.md', 
    title: 'The Art of Shell Scripting',
    date: 'February 10, 2024',
    author: 'admin',
    tags: 'bash, automation',
    content: `Shell scripts are like little magic spells. A few lines of code, and suddenly hours of repetitive work vanish into thin air.

# A simple but powerful example:
for file in *.log; do gzip "$file"; done

Start small. Automate one task. Then another. Before you know it, you've built an entire automation ecosystem.`
  }
];
