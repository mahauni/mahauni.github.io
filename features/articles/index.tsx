import ReactMarkdown from "react-markdown"
import { BlogsList } from "../blog/utils/blogsList"
import { useNavigate } from "@tanstack/react-router";

interface ArticlesPageProps {
    id: number
}

export default function ArticlesPage({ id }: ArticlesPageProps) {
  const navigation = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-300 p-5 font-mono">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-2 border-b border-neutral-700">
          <div 
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={async () => {
              await navigation({ to: "/blog" })
            }}
            title="Close"
          ></div>
          <div 
            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:opacity-70 transition-opacity"
            title="Minimize"
          ></div>
          <div 
            className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:opacity-70 transition-opacity"
            title="Maximize"
          ></div>
          <span className="ml-3 text-gray-500 text-sm">mahauni@debian: ~/blog</span>
        </div>

        {/* Terminal Content */}
        <div className="p-8">
          {/* Command prompt */}
          <div className="flex items-center mb-6">
            <span className="text-blue-400 mr-2">➜</span>
            <span className="text-blue-400 mr-2">~/blog</span>
            <span className="text-purple-400 mr-2">(main)</span>
            <span className="text-green-400">cat {BlogsList[id].filename}</span>
          </div>

          {/* Markdown Content with Terminal Styling */}
          <div className="ml-5 border-l-4 border-blue-400 pl-6 py-2 prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                // Headings
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-yellow-400 mb-4 mt-6">
                    # {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-yellow-400 mb-3 mt-5">
                    ## {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-yellow-400 mb-2 mt-4">
                    ### {children}
                  </h3>
                ),
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                // Links
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                // Lists
                ul: ({ children }) => (
                  <ul className="list-none mb-4 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-none mb-4 space-y-1 counter-reset-list">
                    {children}
                  </ol>
                ),
                // @ts-expect-error - ReactMarkdown types don't include ordered prop
                li: ({ children, ordered }) => (
                  <li className="text-gray-300 ml-4">
                    <span className="text-green-400 mr-2">
                      {ordered ? '→' : '-'}
                    </span>
                    {children}
                  </li>
                ),
                // Code blocks
                // @ts-expect-error - ReactMarkdown types don't include inline prop
                code: ({ inline, className, children }) => {
                  if (inline) {
                    return (
                      <code className="bg-neutral-800 text-green-400 px-2 py-1 rounded text-sm border border-neutral-700">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={`block bg-neutral-800 text-green-400 p-4 rounded my-4 overflow-x-auto border border-neutral-700 ${className || ''}`}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="my-4">
                    {children}
                  </pre>
                ),
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-400 pl-4 py-2 my-4 italic text-gray-400 bg-neutral-800/50">
                    {children}
                  </blockquote>
                ),
                // Strong/Bold
                strong: ({ children }) => (
                  <strong className="text-blue-400 font-bold">
                    {children}
                  </strong>
                ),
                // Emphasis/Italic
                em: ({ children }) => (
                  <em className="text-purple-400 italic">
                    {children}
                  </em>
                ),
                // Horizontal Rule
                hr: () => (
                  <hr className="border-t border-neutral-700 my-6" />
                ),
              }}
            >
              {BlogsList[id].blog}
            </ReactMarkdown>
          </div>

          {/* End prompt */}
          <div className="flex items-center mt-8">
            <span className="text-blue-400 mr-2">➜</span>
            <span className="text-blue-400 mr-2">~/blog</span>
            <span className="text-purple-400 mr-2">(main)</span>
            <span className="inline-block w-2 h-4 bg-gray-300 ml-1 animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
