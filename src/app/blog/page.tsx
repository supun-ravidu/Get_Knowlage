'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  TrendingUp,
  Eye,
  Bookmark,
  Share2,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import SlideInPanel from './SlideInPanel';

const categories = ['All', 'Technology', 'Design', 'AI', 'Startup', 'Marketing', 'Security'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const openPost = (post: any) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = '';
  };

  const sampleBlogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development in 2025',
      excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
      category: 'Technology',
      author: 'John Doe',
      date: '2025-11-15',
      readTime: '8 min',
      views: 1250,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      trending: true,
      popular: true,
      content: '<p>This is detailed blog content for "The Future of Web Development in 2025".</p>'
    },
    {
      id: 2,
      title: 'Mastering Design Systems',
      excerpt: 'Learn how to build and maintain scalable design systems for modern applications.',
      category: 'Design',
      author: 'Jane Smith',
      date: '2025-11-14',
      readTime: '12 min',
      views: 980,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
      popular: true,
      content: '<p>This is detailed blog content for "Mastering Design Systems".</p>'
    },
    {
      id: 3,
      title: 'AI and Machine Learning Basics',
      excerpt: 'A comprehensive guide to understanding the fundamentals of AI and ML.',
      category: 'AI',
      author: 'Mike Johnson',
      date: '2025-11-13',
      readTime: '15 min',
      views: 2100,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      trending: true,
      content: '<p>This is detailed blog content for "AI and Machine Learning Basics".</p>'
    },
    {
      id: 4,
      title: 'Building Scalable APIs with Node.js',
      excerpt: 'Learn best practices for creating robust and scalable REST APIs.',
      category: 'Technology',
      author: 'Sarah Lee',
      date: '2025-11-12',
      readTime: '6 min',
      views: 750,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      content: '<p>This is detailed blog content for "Building Scalable APIs with Node.js".</p>'
    },
    {
      id: 5,
      title: 'The Psychology of Color in Design',
      excerpt: 'Understanding how colors affect user behavior and emotions.',
      category: 'Design',
      author: 'Emily Davis',
      date: '2025-11-11',
      readTime: '5 min',
      views: 1420,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      popular: true,
      content: '<p>This is detailed blog content for "The Psychology of Color in Design".</p>'
    },
    {
      id: 6,
      title: 'Introduction to Neural Networks',
      excerpt: 'A beginner-friendly guide to understanding neural networks.',
      category: 'AI',
      author: 'David Chen',
      date: '2025-11-10',
      readTime: '10 min',
      views: 1680,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      trending: true,
      content: '<p>This is detailed blog content for "Introduction to Neural Networks".</p>'
    },
    {
      id: 7,
      title: 'Growth Hacking Strategies for Startups',
      excerpt: 'Proven techniques to accelerate your startup growth.',
      category: 'Startup',
      author: 'Alex Turner',
      date: '2025-11-09',
      readTime: '7 min',
      views: 890,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
      content: '<p>This is detailed blog content for "Growth Hacking Strategies for Startups".</p>'
    },
    {
      id: 8,
      title: 'SEO in 2025: What You Need to Know',
      excerpt: 'Stay ahead with the latest SEO trends and strategies.',
      category: 'Marketing',
      author: 'Lisa Wang',
      date: '2025-11-08',
      readTime: '8 min',
      views: 1150,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80',
      content: '<p>This is detailed blog content for "SEO in 2025: What You Need to Know".</p>'
    },
    {
      id: 9,
      title: 'Securing Your Web Applications',
      excerpt: 'Essential security practices every developer should know.',
      category: 'Security',
      author: 'Tom Brown',
      date: '2025-11-07',
      readTime: '9 min',
      views: 1890,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      popular: true,
      content: '<p>This is detailed blog content for "Securing Your Web Applications".</p>'
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogPosts(data.blogs || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
        // Fallback to sample data
        setBlogPosts(sampleBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'popular') {
        return b.views - a.views;
      } else if (sortBy === 'trending') {
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Popular posts
  const popularPosts = blogPosts
    .filter(post => post.popular)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);


  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Explore Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Articles</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Dive into expert insights, tutorials, and industry trends
              </p>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 dark:bg-gray-700/50 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white/10 dark:bg-gray-700/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Filter Button (Mobile) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-8`}
              >
                {/* Categories */}
                <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Categories</h3>
                    {showFilters && (
                      <button
                        onClick={() => setShowFilters(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 group cursor-pointer"
                        onClick={() => openPost(post)}
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <Eye className="w-3 h-3" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.aside>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Results Count */}
                <div className="text-gray-400">
                  Showing {paginatedPosts.length} of {filteredPosts.length} articles
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
                      onClick={() => openPost(post)}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
                            {post.category}
                          </span>
                          {post.trending && (
                            <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-xs font-medium flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Author & Views */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-sm text-gray-400">{post.author}</span>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                </motion.article>
              ))}
            </div>

            <AnimatePresence>
              {selectedPost && (
                <>
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={closePost}
                    className="fixed inset-0 bg-black z-40"
                    aria-label="Close blog panel overlay"
                  />
                  <SlideInPanel key="slidein-panel" blogPost={selectedPost} onClose={closePost} />
                </>
              )}
            </AnimatePresence>

            {/* Render SlideInPanel */}
            <AnimatePresence>
              {selectedPost && (
                <>
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={closePost}
                    className="fixed inset-0 bg-black z-40"
                    aria-label="Close blog panel overlay"
                  />
                  <SlideInPanel key="slidein-panel" blogPost={selectedPost} onClose={closePost} />
                </>
              )}
            </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
