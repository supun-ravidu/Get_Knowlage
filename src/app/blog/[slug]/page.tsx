'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Eye,
  Bookmark,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  Send,
  Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

// Sample blog post data (in a real app, this would come from a database/API)
const sampleBlogPost = {
  id: 1,
  slug: 'future-of-web-development-2025',
  title: 'The Future of Web Development in 2025',
  subtitle: 'Exploring the latest trends and technologies shaping the future of web development',
  category: 'Technology',
  author: {
    name: 'John Doe',
    role: 'Senior Web Developer',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff',
    bio: 'John is a passionate web developer with over 10 years of experience in building scalable web applications. He loves sharing his knowledge through writing and speaking at tech conferences.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  date: '2025-11-15',
  readTime: '8 min',
  views: 1250,
  likes: 89,
  image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  content: `
    <h2 id="introduction">Introduction</h2>
    <p>The landscape of web development is constantly evolving, and 2025 is shaping up to be a transformative year. From AI-powered development tools to the rise of WebAssembly, developers are facing exciting new challenges and opportunities.</p>
    
    <p>In this comprehensive guide, we'll explore the key trends that are defining the future of web development, and what you need to know to stay ahead of the curve.</p>

    <h2 id="ai-integration">AI Integration in Development</h2>
    <p>Artificial Intelligence is no longer just a buzzword—it's becoming an integral part of the development process. AI-powered code completion, automated testing, and even design generation are revolutionizing how we build web applications.</p>
    
    <h3>Key AI Tools</h3>
    <ul>
      <li><strong>GitHub Copilot:</strong> AI pair programming that suggests code completions</li>
      <li><strong>ChatGPT for Developers:</strong> Natural language to code conversion</li>
      <li><strong>Automated Testing AI:</strong> Intelligent test case generation</li>
    </ul>

    <h2 id="webassembly">The Rise of WebAssembly</h2>
    <p>WebAssembly (Wasm) is enabling near-native performance in web browsers. This opens up possibilities for running complex applications—from video editing to 3D gaming—directly in the browser without plugins.</p>

    <blockquote>
      "WebAssembly is not just about performance; it's about bringing entire ecosystems of languages and tools to the web platform."
    </blockquote>

    <h2 id="serverless">Serverless Architecture</h2>
    <p>Serverless computing continues to gain traction, allowing developers to focus on code rather than infrastructure. Edge computing is taking this concept further by bringing computation closer to users for reduced latency.</p>

    <h3>Benefits of Serverless</h3>
    <ul>
      <li>Reduced operational costs</li>
      <li>Automatic scaling</li>
      <li>Faster time to market</li>
      <li>Built-in redundancy</li>
    </ul>

    <h2 id="frameworks">Modern Frameworks and Tools</h2>
    <p>The framework ecosystem is more diverse than ever. React, Vue, and Angular remain popular, but newcomers like Svelte and Solid.js are gaining momentum with their innovative approaches to reactivity and performance.</p>

    <h3>Framework Comparison</h3>
    <table>
      <thead>
        <tr>
          <th>Framework</th>
          <th>Performance</th>
          <th>Learning Curve</th>
          <th>Ecosystem</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>React</td>
          <td>High</td>
          <td>Medium</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>Vue</td>
          <td>High</td>
          <td>Low</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>Svelte</td>
          <td>Excellent</td>
          <td>Low</td>
          <td>Growing</td>
        </tr>
      </tbody>
    </table>

    <h2 id="conclusion">Conclusion</h2>
    <p>The future of web development is bright and full of possibilities. By staying informed about these trends and continuously learning, developers can build better, faster, and more innovative web applications.</p>

    <p>What trends are you most excited about? Share your thoughts in the comments below!</p>
  `,
  tableOfContents: [
    { id: 'introduction', title: 'Introduction' },
    { id: 'ai-integration', title: 'AI Integration in Development' },
    { id: 'webassembly', title: 'The Rise of WebAssembly' },
    { id: 'serverless', title: 'Serverless Architecture' },
    { id: 'frameworks', title: 'Modern Frameworks and Tools' },
    { id: 'conclusion', title: 'Conclusion' },
  ],
  relatedArticles: [
    {
      id: 2,
      title: 'Mastering Design Systems',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80',
      slug: 'mastering-design-systems'
    },
    {
      id: 3,
      title: 'AI and Machine Learning Basics',
      category: 'AI',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
      slug: 'ai-machine-learning-basics'
    },
    {
      id: 4,
      title: 'Building Scalable APIs',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
      slug: 'building-scalable-apis'
    },
  ]
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
      date: '2025-11-16',
      content: 'Great article! The insights on AI integration are particularly interesting. I\'ve been using GitHub Copilot and it\'s definitely changed my workflow.',
      likes: 12
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=ec4899&color=fff',
      date: '2025-11-16',
      content: 'WebAssembly is definitely the future. We\'ve started migrating some of our performance-critical modules to Wasm and the results are impressive.',
      likes: 8
    }
  ]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setBlogPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (!blogPost?.tableOfContents) return;

      const sections = blogPost.tableOfContents.map((item: any) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { id: item.id, top: rect.top };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find((section: any) => section && section.top > 0 && section.top < 200);
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blogPost]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          author: 'You',
          avatar: 'https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff',
          date: new Date().toISOString().split('T')[0],
          content: comment,
          likes: 0
        },
        ...comments
      ]);
      setComment('');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-[#141414] relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
              <p className="text-gray-400 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Back to Blog
                </motion.button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="py-8 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Back Button */}
            <Link href="/blog">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </motion.button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Table of Contents - Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block lg:col-span-3"
              >
                <div className="sticky top-24 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {blogPost.tableOfContents?.map((item: any) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.aside>

              {/* Main Content */}
              <div className="lg:col-span-6">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl overflow-hidden"
                >
                  {/* Featured Image */}
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={blogPost.image}
                      alt={blogPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium mb-4">
                        {blogPost.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Header */}
                  <div className="p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {blogPost.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">
                      {blogPost.subtitle}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{blogPost.readTime} read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{blogPost.views} views</span>
                      </div>
                    </div>

                    {/* Social Sharing */}
                    <div className="flex items-center gap-4 mb-8">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setLiked(!liked)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          liked ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-foreground'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{blogPost.likes + (liked ? 1 : 0)}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setBookmarked(!bookmarked)}
                        className={`p-2 rounded-lg transition-colors ${
                          bookmarked ? 'bg-yellow-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-foreground'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </motion.button>
                      <Link href="/admin/dashboard">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="hidden sm:inline">Create Blog</span>
                        </motion.button>
                      </Link>
                      <div className="flex-1" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground hidden md:inline">Share:</span>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blogPost.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                          <LinkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />

                    {/* Author Bio */}
                    <div className="mt-12 pt-8 border-t border-border">
                      <h3 className="text-xl font-bold text-foreground mb-6">About the Author</h3>
                      <div className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={blogPost.author.avatar}
                            alt={blogPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground">{blogPost.author.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{blogPost.author.role}</p>
                          <p className="text-sm text-muted-foreground mb-4">{blogPost.author.bio}</p>
                          <div className="flex items-center gap-3">
                            <a
                              href={blogPost.author.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-blue-500 transition-colors"
                            >
                              <Twitter className="w-5 h-5" />
                            </a>
                            <a
                              href={blogPost.author.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-blue-700 transition-colors"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12 pt-8 border-t border-border">
                      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6" />
                        Comments ({comments.length})
                      </h3>

                      {/* Comment Form */}
                      <form onSubmit={handleComment} className="mb-8">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your thoughts..."
                          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          rows={4}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="mt-3 flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-shadow"
                        >
                          <Send className="w-4 h-4" />
                          Post Comment
                        </motion.button>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-6">
                        {comments.map((comment) => (
                          <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-4"
                          >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={comment.avatar}
                                alt={comment.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-foreground">{comment.author}</span>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(comment.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-muted-foreground mb-2">{comment.content}</p>
                              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{comment.likes}</span>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>

              {/* Related Articles Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3"
              >
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {blogPost.relatedArticles?.map((article: any) => (
                        <Link key={article.id} href={`/blog/${article.slug}`}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group cursor-pointer"
                          >
                            <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <span className="inline-block px-2 py-1 rounded bg-blue-600/20 text-blue-400 text-xs font-medium mb-2">
                              {article.category}
                            </span>
                            <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
