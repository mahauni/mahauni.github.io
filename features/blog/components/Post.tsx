import { type BlogPost } from "../types/types"

interface PostProps {
    post: BlogPost
}

export default function Post({ post }: PostProps) {
  return (
    <div className="ml-5 my-4 p-4 border-l-4 border-blue-400 bg-neutral-900">
      <div className="text-yellow-400 text-lg font-bold mb-2"># {post.title}</div>
      <div className="text-gray-500 text-xs mb-3">
        📅 {post.date} | 👤 {post.author} | 🏷️ {post.tags}
      </div>
      <div className="text-gray-300 whitespace-pre-line">{post.content}</div>
    </div>
  )
}
