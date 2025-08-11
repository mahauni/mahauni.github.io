import React from "react";
import { motion } from "framer-motion";

// Single-file portfolio app (TypeScript + Tailwind + Framer Motion)
// Notes:
// - This file is intended to be used inside a React + Tailwind project.
// - Make sure framer-motion and lucide-react are installed.
// - Tailwind must be configured in your project. The file uses Tailwind JIT-friendly classes
//   and also a small inline <style> block for CSS variables to keep the color-scheme central.

export type Project = {
    id: number;
    title: string;
    description: string;
    tech: string[];
    url?: string;
};

const projects: Project[] = [
    {
        id: 1,
        title: "Awesome SaaS Dashboard",
        description:
            "A responsive analytics dashboard built with React, Typescript and charting libs. Features role-based views and realtime updates.",
        tech: ["React", "TypeScript", "Tailwind", "WebSocket"],
        url: "#",
    },
    {
        id: 2,
        title: "Mobile App (React Native)",
        description:
            "Cross-platform mobile app with an offline-first sync strategy and native-feel UX.",
        tech: ["React Native", "Expo", "SQLite"],
        url: "#",
    },
    {
        id: 3,
        title: "E-commerce Microsite",
        description:
            "A performant e-commerce microsite with incremental static generation and a small cart microservice.",
        tech: ["Next.js", "TypeScript", "Stripe"],
        url: "#",
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen antialiased text-gray-100" style={{ background: "linear-gradient(180deg,#0f0b10 0%, #0b0810 100%)" }}>
            {/* CSS variables for color scheme */}
            <style>{`
        :root{
          --primary: #5f43b2; /* violet */
          --accent: #3a3153;  /* deep plum */
          --glass: rgba(255,255,255,0.04);
          --muted: rgba(255,255,255,0.55);
        }
      `}</style>

            <header className="max-w-5xl mx-auto p-6 flex items-center justify-between">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold tracking-tight"
                >
                    <span style={{ color: "var(--primary)" }}>Lucas</span>
                    <span className="ml-2 text-sm text-gray-300">• Full‑Stack Dev</span>
                </motion.h1>

                <nav className="flex gap-4 items-center">
                    <a href="#projects" className="text-sm hover:underline">
                        Projects
                    </a>
                    <a href="#about" className="text-sm hover:underline">
                        About
                    </a>
                    <a href="#contact" className="text-sm hover:underline">
                        Contact
                    </a>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8 grid gap-12">
                {/* Hero */}
                <section className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-8 grid gap-6 md:grid-cols-2 items-center">
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl font-extrabold tracking-tight" style={{ color: "var(--primary)" }}>
                            Hi, I’m Lucas.
                        </h2>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                            I build beautiful, performant apps with a focus on clean UX and scalable architecture. I work with
                            TypeScript, React, Next.js, Node and mobile technologies.
                        </p>

                        <div className="flex gap-3 items-center">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md"
                                style={{ background: "linear-gradient(90deg,var(--primary), var(--accent))" }}
                            >
                                <span>Contact me</span>
                            </a>

                            <a href="#projects" className="text-sm px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.06)]">
                                View projects
                            </a>
                        </div>

                        <div className="flex gap-3 mt-2">
                            <a aria-label="Github" href="#" className="p-2 rounded-md bg-[var(--glass)]">
                                github
                            </a>
                            <a aria-label="LinkedIn" href="#" className="p-2 rounded-md bg-[var(--glass)]">
                                linkedin
                            </a>
                            <a aria-label="Email" href="#contact" className="p-2 rounded-md bg-[var(--glass)]">
                                mail
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-[rgba(95,67,178,0.14)] to-[rgba(58,49,83,0.08)] p-6 rounded-2xl"
                    >
                        <div className="rounded-lg border border-[rgba(255,255,255,0.03)] p-6 bg-[rgba(255,255,255,0.02)]">
                            <h3 className="text-lg font-semibold">Featured Project</h3>
                            <p className="text-sm text-[var(--muted)] mt-2">
                                A modular component library with design tokens, automated visual tests and a themeable design
                                system — built for scale.
                            </p>

                            <div className="mt-4 flex gap-2 flex-wrap">
                                <span className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.02)]">React</span>
                                <span className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.02)]">Storybook</span>
                                <span className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.02)]">Chromatic</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Projects */}
                <section id="projects">
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: "var(--primary)" }}>
                        Projects
                    </h3>

                    <div className="grid gap-6 md:grid-cols-3">
                        {projects.map((p) => (
                            <motion.a
                                key={p.id}
                                href={p.url}
                                whileHover={{ y: -6 }}
                                className="block p-4 rounded-2xl border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)]"
                            >
                                <h4 className="font-semibold">{p.title}</h4>
                                <p className="text-sm text-[var(--muted)] mt-2">{p.description}</p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.tech.map((t) => (
                                        <span key={t} className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.02)]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section id="about" className="bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl">
                    <div className="md:flex md:gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold" style={{ color: "var(--primary)" }}>
                                About me
                            </h3>
                            <p className="text-sm text-[var(--muted)] mt-4">
                                I enjoy turning complex problems into simple, beautiful interfaces. I focus on maintainable code,
                                testing and small incremental improvements that compound. Outside of work I enjoy climbing and
                                exploring new coffee shops.
                            </p>

                            <ul className="mt-4 grid gap-2 text-sm">
                                <li>• Strong TypeScript & React experience</li>
                                <li>• API design and backend fundamentals (Node / PHP)</li>
                                <li>• CI/CD, testing and code reviews</li>
                            </ul>
                        </div>

                        <motion.div
                            initial={{ rotate: -6, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-40 h-40 rounded-xl flex-shrink-0 mt-6 md:mt-0"
                            style={{ background: "linear-gradient(135deg,var(--primary), var(--accent))" }}
                        />
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)]">
                    <h3 className="text-2xl font-semibold" style={{ color: "var(--primary)" }}>
                        Contact
                    </h3>

                    <div className="mt-4 md:flex gap-6">
                        <form className="flex-1 space-y-4">
                            <div>
                                <label className="text-xs">Name</label>
                                <input className="w-full mt-1 p-3 rounded-md bg-transparent border border-[rgba(255,255,255,0.04)]" />
                            </div>

                            <div>
                                <label className="text-xs">Email</label>
                                <input className="w-full mt-1 p-3 rounded-md bg-transparent border border-[rgba(255,255,255,0.04)]" />
                            </div>

                            <div>
                                <label className="text-xs">Message</label>
                                <textarea className="w-full mt-1 p-3 rounded-md bg-transparent border border-[rgba(255,255,255,0.04)]" rows={4} />
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg font-medium"
                                    style={{ background: "linear-gradient(90deg,var(--primary), var(--accent))" }}
                                >
                                    Send message
                                </button>
                            </div>
                        </form>

                        <div className="w-80 mt-6 md:mt-0">
                            <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)]">
                                <h4 className="font-medium">Get in touch</h4>
                                <p className="text-sm text-[var(--muted)] mt-2">I’m open to freelance or full-time opportunities.</p>

                                <div className="mt-4 flex flex-col gap-3">
                                    <a className="flex items-center gap-2 text-sm" href="#">
                                        Github @yourusername
                                    </a>
                                    <a className="flex items-center gap-2 text-sm" href="#">
                                        Linkedin linkedin.com/in/yourname
                                    </a>
                                    <a className="flex items-center gap-2 text-sm" href="mailto:you@example.com">
                                        mail you@example.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="py-6 text-center text-xs text-[var(--muted)]">
                    © {new Date().getFullYear()} Lucas • Built with TypeScript, Tailwind & Framer Motion
                </footer>
            </main>
        </div>
    );
}

