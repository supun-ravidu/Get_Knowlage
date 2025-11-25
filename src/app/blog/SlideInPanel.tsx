'use client';

import { motion } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Eye,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Send,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

function SlideInPanel({ blogPost, onClose }: { blogPost: any; onClose: () => void }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(blogPost.comments || []);

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          author: 'You',
          avatar: 'https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff',
          date: new Date().toISOString().split('T')[0],
          content: comment,
          likes: 0,
        },
        ...comments,
      ]);
      setComment('');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#141414] z-50 shadow-lg overflow-y-auto"
      style={{ boxShadow: 'rgba(0,0,0,0.8) -4px 0px 16px' }}
    >
      <div className="relative h-full flex flex-col p-6">
        <button onClick={onClose} aria-label="Close Panel" className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-md transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Featured Image */}
        <div className="relative h-56 rounded-lg overflow-hidden mb-4">
          <Image src={blogPost.image} alt={blogPost.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
              {blogPost.category}
            </span>
          </div>
        </div>

        {/* Title and Meta */}
        <h2 className="text-2xl font-bold text-white mb-2">{blogPost.title}</h2>
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(blogPost.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{blogPost.readTime} read</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{blogPost.views} views</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              liked ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{(Number(blogPost.likes) || 0) + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <a href="/admin/dashboard" className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Blog</span>
          </a>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-invert max-w-none overflow-y-auto flex-grow"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Author Bio */}
        <div className="mt-6 pt-6 border-t border-gray-700 flex gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src={blogPost.author.avatar || '/default-avatar.png'} 
              alt={blogPost.author.name || 'Author Avatar'} 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">{blogPost.author.name}</h3>
            <p className="text-gray-400 text-sm">{blogPost.author.role}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-2 flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-shadow"
            >
              <Send className="w-4 h-4" />
              Post Comment
            </motion.button>
          </form>

          {/* Comments List */}
          <div className="space-y-4 max-h-48 overflow-y-auto">
            {comments.map((comment: Comment) => (
              <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{comment.author}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-400 mb-1">{comment.content}</p>
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default SlideInPanel;
