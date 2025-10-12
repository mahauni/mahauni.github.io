import { type ReactNode } from "react"

interface PromptProps {
    children: ReactNode
}

export default function Prompt({ children }: PromptProps) {
  return (
    <div className="flex items-center mt-4">
      <span className="text-blue-400 mr-2">➜</span>
      <span className="text-blue-400 mr-2">~/blog</span>
      <span className="text-purple-400 mr-2">(main)</span>
      {children}
    </div>
  )
}
