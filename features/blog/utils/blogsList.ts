import { type BlogPost } from "../types/types";
import article1 from "../../../blogs/article1.md?raw"

export const BlogsList: BlogPost[] = [
  {
    id: 0,
    filename: '2025-10-14-getting-started.md', 
    title: 'Why I did this',
    date: 'October 14, 2025',
    author: 'admin',
    tags: 'zsh, terminal, idk',
    content: `This is the website and why i did this way

This is the reason why I build this (in the end you should just build something)
And why I did in the way I did, and not like the other ones`,
    blog: article1
  },
  {
    id: 1,
    filename: '2024-03-10-terminal-magic.md', 
    title: 'PLACEHOLDER The Magic of Terminal Workflows',
    date: 'March 10, 2024',
    author: 'admin',
    tags: 'productivity, cli',
    content: ` PLACEHOLDER There's something incredibly satisfying about working entirely in the terminal. The speed, the efficiency, the aesthetic - it all comes together beautifully.

$ alias and functions become your best friends. You start automating everything. Your fingers fly across the keyboard.

Once you go terminal, you never go back. 🚀`
  },
  {
    id: 2,
    filename: '2024-03-01-why-cli.md', 
    title: 'PLACEHOLDER Why I Chose the Command Line',
    date: 'March 1, 2024',
    author: 'admin',
    tags: 'philosophy, cli',
    content: ` PLACEHOLDER In a world of flashy GUIs and overwhelming interfaces, the command line remains a sanctuary of simplicity and power.

Every command is intentional. Every output is meaningful. There's no distraction, no clutter - just you and the machine, communicating in the most direct way possible.

This blog is a tribute to that philosophy. Simple. Functional. Beautiful.`
  },
  {
    id: 3,
    filename: '2024-02-20-mastering-vim.md', 
    title: 'PLACEHOLDER Mastering Vim: A Journey',
    date: 'February 20, 2024',
    author: 'admin',
    tags: 'vim, editor',
    content: ` PLACEHOLDER Learning Vim is like learning to ride a bike. At first, you'll fall. A lot. You'll accidentally delete entire paragraphs. You'll get stuck in modes you didn't know existed.

But then something clicks. Your fingers start dancing across the keyboard. dd, yy, :wq become second nature.

And suddenly, you can't imagine editing text any other way.`
  },
  {
    id: 4,
    filename: '2024-02-10-shell-scripting.md', 
    title: 'PLACEHOLDER The Art of Shell Scripting',
    date: 'February 10, 2024',
    author: 'admin',
    tags: 'bash, automation',
    content: ` PLACEHOLDER Shell scripts are like little magic spells. A few lines of code, and suddenly hours of repetitive work vanish into thin air.

# A simple but powerful example:
for file in *.log; do gzip "$file"; done

Start small. Automate one task. Then another. Before you know it, you've built an entire automation ecosystem.`
  }
];
