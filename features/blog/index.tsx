import React, { useEffect, useMemo, useState } from "react";

export default function BlogPage() {
  const STORAGE_KEY = "hn_clone_posts_v1";

  const sample = [
    {
      id: 1,
      title: "Show HN: Minimal static site generator in 200 lines",
      url: "https://example.com/minimal-ssg",
      points: 124,
      author: "alice",
      comments: [
        { id: 1, author: "bob", text: "Neat! Does it support incremental builds?" },
      ],
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
      id: 2,
      title: "Ask HN: What editor plugins do you actually use?",
      url: "",
      points: 67,
      author: "carol",
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 60 * 6,
    },
    {
      id: 3,
      title: "A deep dive into Vite's plugin system",
      url: "https://example.com/vite-plugins",
      points: 42,
      author: "dave",
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 30,
    },
  ];

  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return sample;
      return JSON.parse(raw);
    } catch (e) {
      return sample;
    }
  });

  const [view, setView] = useState({ page: "list", postId: null });
  const [sortBy, setSortBy] = useState("points");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ title: "", url: "", author: "" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const upvote = (id) => {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, points: x.points + 1 } : x)));
  };
  const downvote = (id) => {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, points: Math.max(0, x.points - 1) } : x)));
  };

  const addPost = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newPost = {
      id: Math.max(0, ...posts.map((p) => p.id)) + 1,
      title: form.title.trim(),
      url: form.url.trim(),
      points: 1,
      author: form.author.trim() || "anonymous",
      comments: [],
      createdAt: Date.now(),
    };
    setPosts((p) => [newPost, ...p]);
    setForm({ title: "", url: "", author: "" });
    setView({ page: "list", postId: null });
  };

  const addComment = (postId, author, text) => {
    if (!text.trim()) return;
    setPosts((p) =>
      p.map((post) =>
        post.id === postId
          ? {
            ...post,
            comments: [
              ...post.comments,
              { id: (post.comments.length ? post.comments[post.comments.length - 1].id + 1 : 1), author: author || "anon", text: text.trim() },
            ],
          }
          : post
      )
    );
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let res = posts.filter((p) => (q ? p.title.toLowerCase().includes(q) || (p.url || "").toLowerCase().includes(q) : true));
    if (sortBy === "points") res = res.sort((a, b) => b.points - a.points || b.createdAt - a.createdAt);
    if (sortBy === "new") res = res.sort((a, b) => b.createdAt - a.createdAt);
    return res;
  }, [posts, query, sortBy]);

  const openPost = (post) => {
    if (post.url) window.open(post.url, "_blank");
    setView({ page: "post", postId: post.id });
  };

  const currentPost = posts.find((p) => p.id === view.postId);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold">Hacker News — Mini Clone</h1>
          <nav className="space-x-2">
            <button className="text-sm px-3 py-1 rounded-md hover:bg-slate-100" onClick={() => setView({ page: "list", postId: null })}>
              Home
            </button>
            <button className="text-sm px-3 py-1 rounded-md hover:bg-slate-100" onClick={() => setView({ page: "submit", postId: null })}>
              Submit
            </button>
          </nav>
        </div>
        <p className="mt-2 text-sm text-slate-600">A lightweight, local-first Hacker News style blog. Data persists to localStorage.</p>
      </header>

      <main className="max-w-3xl mx-auto">
        {view.page === "list" && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search titles or URLs" className="flex-1 px-3 py-2 border rounded-md" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded-md">
                <option value="points">Top</option>
                <option value="new">Newest</option>
              </select>
            </div>

            <ul className="space-y-3">
              {filtered.map((post, idx) => (
                <li key={post.id} className="bg-white p-3 rounded-lg shadow-sm flex gap-3 items-start">
                  <div className="flex flex-col items-center w-12">
                    <button onClick={() => upvote(post.id)} className="text-sm font-bold">▲</button>
                    <span className="text-xs mt-1">{post.points}</span>
                    <button onClick={() => downvote(post.id)} className="text-sm font-bold mt-1">▼</button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-lg font-semibold cursor-pointer hover:underline" onClick={() => openPost(post)}>{post.title}</h2>
                      <span className="text-xs text-slate-500">{Math.round((Date.now() - post.createdAt) / 1000 / 60)}m</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {post.url ? (
                        <a href={post.url} target="_blank" rel="noreferrer" className="break-words">{new URL(post.url).hostname}</a>
                      ) : (
                        <span>self.post</span>
                      )}
                      <span className="mx-2">•</span>
                      <span>by {post.author}</span>
                      <span className="mx-2">•</span>
                      <button onClick={() => setView({ page: "post", postId: post.id })} className="underline text-sm">{post.comments.length} comments</button>
                    </div>
                  </div>
                </li>
              ))}

              {filtered.length === 0 && <li className="text-sm text-slate-500">No posts found.</li>}
            </ul>
          </section>
        )}

        {view.page === "submit" && (
          <section className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Submit a new link or story</h2>
            <form onSubmit={addPost} className="space-y-3">
              <div>
                <label className="text-sm block mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm block mb-1">URL (leave empty for a "self" post)</label>
                <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm block mb-1">Your name</label>
                <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 rounded-md bg-slate-800 text-white">Submit</button>
                <button type="button" onClick={() => setView({ page: "list", postId: null })} className="px-4 py-2 rounded-md border">Cancel</button>
              </div>
            </form>
          </section>
        )}

        {view.page === "post" && currentPost && (
          <article className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{currentPost.title}</h2>
                <div className="text-sm text-slate-500 mt-1">by {currentPost.author} • {currentPost.points} points</div>
                {currentPost.url && (
                  <a href={currentPost.url} target="_blank" rel="noreferrer" className="text-sm block mt-2 underline">Visit link</a>
                )}
              </div>
              <div>
                <button onClick={() => setView({ page: "list", postId: null })} className="px-3 py-1 border rounded-md">Back</button>
              </div>
            </div>

            <section className="mt-4">
              <h3 className="font-semibold">Comments ({currentPost.comments.length})</h3>
              <CommentList comments={currentPost.comments} />

              <AddComment
                onAdd={(author, text) => addComment(currentPost.id, author, text)}
              />
            </section>
          </article>
        )}
      </main>

      <footer className="max-w-3xl mx-auto mt-8 text-center text-sm text-slate-500">Built for learning — open to improvements. Data stored locally.</footer>
    </div>
  );
}

function CommentList({ comments }) {
  if (!comments.length) return <div className="text-sm text-slate-500 mt-2">No comments yet.</div>;
  return (
    <ul className="mt-2 space-y-2">
      {comments.map((c) => (
        <li key={c.id} className="bg-slate-50 p-2 rounded">
          <div className="text-sm text-slate-700">{c.text}</div>
          <div className="text-xs text-slate-500 mt-1">— {c.author}</div>
        </li>
      ))}
    </ul>
  );
}

function AddComment({ onAdd }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(author, text);
        setAuthor("");
        setText("");
      }}
      className="mt-3 space-y-2"
    >
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="name (optional)" className="w-full px-3 py-2 border rounded-md" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="add a comment" className="w-full px-3 py-2 border rounded-md" rows={3} />
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-md bg-slate-800 text-white" type="submit">Add comment</button>
      </div>
    </form>
  );
}

