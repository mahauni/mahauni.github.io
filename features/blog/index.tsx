import React, { useState, useEffect } from "react";

import Post from "./components/Post"
import Prompt from "./components/Prompt"
import { useNavigate } from "@tanstack/react-router";
import { BlogsList } from "./utils/blogsList";

export default function BlogPage() {
  const navigation = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(BlogsList);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredPosts(BlogsList);
      setCurrentPage(0);
    } else {
      const filtered = BlogsList.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
      setCurrentPage(0);
    }
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = currentPage * postsPerPage;
  const endIdx = Math.min(startIdx + postsPerPage, filteredPosts.length);
  const currentPosts = filteredPosts.slice(startIdx, endIdx);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'n') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'p') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-300 p-5 font-mono">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-2 border-b border-neutral-700">
          <div 
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={async () => {
              await navigation({ to: "/" })
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
        <div className="p-5">
          {/* Welcome ASCII Art */}
          <Prompt>
            <span className="text-green-400">cat welcome.txt</span>
          </Prompt>
          <div className="ml-5 my-3 text-blue-400">
            <pre className="text-xs sm:text-sm">
              {` ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
 ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
 ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
 ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
 ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
  ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝`}
            </pre>
            <p className="mt-3 text-gray-300">My terminal blog style</p>
          </div>

          {/* Posts per page selector */}
          <Prompt>
            <span className="text-green-400">
              set posts_per_page=
              <select 
                value={postsPerPage} 
                onChange={(e) => {
                  setPostsPerPage(Number(e.target.value));
                  setCurrentPage(0);
                }}
                className="bg-transparent border-none text-green-400 outline-none cursor-pointer ml-1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </span>
          </Prompt>

          {/* Search */}
          <Prompt>
            <span className="text-green-400">grep -i "</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search..."
              className="bg-transparent border-none text-green-400 outline-none w-32 placeholder-gray-600"
            />
            <span className="text-green-400">" posts/*</span>
          </Prompt>

          {searchTerm && (
            <div className="ml-5 my-3">
              {filteredPosts.length > 0 ? (
                <>
                  <span className="text-green-400">
                    Found {filteredPosts.length} match{filteredPosts.length !== 1 ? 'es' : ''}
                    {filteredPosts.length <= 5 && ':'}
                  </span>
                  {filteredPosts.length <= 5 && (
                    <div className="mt-1">
                      {filteredPosts.map(post => (
                        <div key={post.id}>posts/{post.filename}</div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-red-400">grep: no matches found</span>
              )}
            </div>
          )}

          {/* List current posts */}
          <Prompt>
            <span className="text-green-400">
              ls posts/ | head -n {postsPerPage}
            </span>
          </Prompt>
          <div className="ml-5 my-3">
            <div className="text-green-400">total {filteredPosts.length}</div>
            {currentPosts.map(post => (
              <div key={post.id}>{post.filename}</div>
            ))}
          </div>

          {/* Display current posts */}
          {currentPosts.map(post => (
            <React.Fragment key={post.id}>
              <Prompt>
                <span className="text-green-400">cat posts/{post.filename}</span>
              </Prompt>
              <Post post={post} />
            </React.Fragment>
          ))}

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="ml-5 my-4 flex gap-4 items-center flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="bg-neutral-800 text-blue-400 border border-neutral-700 px-4 py-2 rounded cursor-pointer hover:bg-neutral-700 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ← prev
              </button>
              <span className="text-gray-500 text-sm">
                Page {currentPage + 1} of {totalPages} 
                <span className="text-gray-600 ml-2">
                  (showing {startIdx + 1}-{endIdx} of {filteredPosts.length})
                </span>
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="bg-neutral-800 text-blue-400 border border-neutral-700 px-4 py-2 rounded cursor-pointer hover:bg-neutral-700 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                next →
              </button>
            </div>
          )}

          {/* Closing */}
          {filteredPosts.length > 0 && (
            <>
              <Prompt>
                <span className="text-green-400">echo "Thanks for visiting!"</span>
              </Prompt>
              <div className="ml-5 my-3">Thanks for visiting!</div>
            </>
          )}

          {/* Cursor */}
          <div className="flex items-center mt-4">
            <span className="text-blue-400 mr-2">➜</span>
            <span className="text-blue-400 mr-2">~/blog</span>
            <span className="text-purple-400 mr-2">(main)</span>
            <span className={`inline-block w-2 h-4 bg-gray-300 ml-1 transition-opacity ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

