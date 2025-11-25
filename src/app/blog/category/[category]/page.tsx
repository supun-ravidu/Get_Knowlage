'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Eye,
  Bookmark,
  Share2,
  TrendingUp,
  Search,
  Code,
  Palette,
  Brain,
  Rocket,
  Shield,
  Database,
  Smartphone,
  Server
} from 'lucide-react';
import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

// Category metadata
const categoryData: Record<string, {
  name: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
}> = {
  technology: {
    name: 'Technology',
    description: 'Explore cutting-edge technology trends, innovations, and insights that are shaping the digital future. From breakthrough discoveries to practical applications.',
    icon: Code,
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-600'
  },
  'ai-ml': {
    name: 'AI & Machine Learning',
    description: 'Dive deep into artificial intelligence and machine learning. Understand algorithms, neural networks, and how AI is transforming industries.',
    icon: Brain,
    color: 'purple',
    gradient: 'from-purple-600 to-indigo-600'
  },
  programming: {
    name: 'Programming',
    description: 'Master programming languages, frameworks, and best practices. From beginner tutorials to advanced coding techniques and design patterns.',
    icon: Code,
    color: 'green',
    gradient: 'from-green-600 to-emerald-600'
  },
  'web-dev': {
    name: 'Web Development',
    description: 'Learn modern web development with React, Next.js, Vue, and more. Build responsive, performant, and scalable web applications.',
    icon: Code,
    color: 'cyan',
    gradient: 'from-cyan-600 to-blue-600'
  },
  mobile: {
    name: 'Mobile Development',
    description: 'Build native and cross-platform mobile apps with iOS, Android, React Native, and Flutter. Create beautiful mobile experiences.',
    icon: Smartphone,
    color: 'teal',
    gradient: 'from-teal-600 to-cyan-600'
  },
  devops: {
    name: 'DevOps',
    description: 'Master DevOps practices, CI/CD pipelines, containerization, orchestration, and cloud infrastructure for scalable deployments.',
    icon: Server,
    color: 'orange',
    gradient: 'from-orange-600 to-red-600'
  },
  'data-science': {
    name: 'Data Science',
    description: 'Unlock insights from data with analytics, visualization, statistics, and big data technologies. Transform data into actionable intelligence.',
    icon: Database,
    color: 'violet',
    gradient: 'from-violet-600 to-purple-600'
  },
  design: {
    name: 'Design',
    description: 'Explore UI/UX design, design systems, typography, and visual design principles. Create beautiful and intuitive user experiences.',
    icon: Palette,
    color: 'pink',
    gradient: 'from-pink-600 to-rose-600'
  },
  startup: {
    name: 'Startup',
    description: 'Navigate the startup ecosystem with insights on entrepreneurship, funding, growth strategies, and building successful products.',
    icon: Rocket,
    color: 'orange',
    gradient: 'from-orange-600 to-amber-600'
  },
  marketing: {
    name: 'Marketing',
    description: 'Master digital marketing, SEO, content strategy, and growth hacking. Learn how to reach and engage your target audience.',
    icon: TrendingUp,
    color: 'emerald',
    gradient: 'from-emerald-600 to-green-600'
  },
  security: {
    name: 'Security',
    description: 'Stay secure with cybersecurity best practices, encryption, authentication, and protecting data in the digital age.',
    icon: Shield,
    color: 'red',
    gradient: 'from-red-600 to-pink-600'
  }
};

// Sample articles data
const allArticles = [
  // Technology
  { id: 1, title: 'The Future of Web Development in 2025', excerpt: 'Exploring the latest trends and technologies shaping the future of web development', category: 'technology', author: 'John Doe', date: '2025-11-15', readTime: '8 min', views: 1250, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', trending: true },
  { id: 2, title: 'Understanding Cloud Computing Architecture', excerpt: 'A comprehensive guide to modern cloud infrastructure and services', category: 'technology', author: 'Sarah Johnson', date: '2025-11-14', readTime: '12 min', views: 980, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', popular: true },
  { id: 3, title: 'Blockchain Beyond Cryptocurrency', excerpt: 'Exploring real-world applications of blockchain technology', category: 'technology', author: 'Mike Chen', date: '2025-11-13', readTime: '10 min', views: 850, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80' },
  
  // AI & ML
  { id: 4, title: 'Introduction to Neural Networks', excerpt: 'Understanding the fundamentals of deep learning and neural networks', category: 'ai-ml', author: 'Emily Zhang', date: '2025-11-12', readTime: '15 min', views: 2100, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', popular: true },
  { id: 5, title: 'Natural Language Processing in 2025', excerpt: 'How NLP is transforming human-computer interaction', category: 'ai-ml', author: 'David Park', date: '2025-11-11', readTime: '11 min', views: 1450, image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80', trending: true },
  { id: 6, title: 'Computer Vision Applications', excerpt: 'Real-world uses of computer vision and image recognition', category: 'ai-ml', author: 'Lisa Wang', date: '2025-11-10', readTime: '9 min', views: 1200, image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80' },
  
  // Programming
  { id: 7, title: 'Clean Code Principles for Modern Developers', excerpt: 'Writing maintainable and scalable code that stands the test of time', category: 'programming', author: 'Robert Martin', date: '2025-11-09', readTime: '14 min', views: 1800, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', popular: true },
  { id: 8, title: 'Functional Programming Concepts', excerpt: 'Understanding immutability, pure functions, and higher-order functions', category: 'programming', author: 'Jane Smith', date: '2025-11-08', readTime: '10 min', views: 950, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80' },
  { id: 9, title: 'Design Patterns Every Developer Should Know', excerpt: 'Essential software design patterns and when to use them', category: 'programming', author: 'Alex Turner', date: '2025-11-07', readTime: '16 min', views: 1600, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', trending: true },
  
  // Web Development
  { id: 10, title: 'Mastering React Server Components', excerpt: 'Deep dive into React Server Components and their benefits', category: 'web-dev', author: 'Tom Wilson', date: '2025-11-06', readTime: '13 min', views: 2200, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', popular: true },
  { id: 11, title: 'Next.js 15 New Features', excerpt: 'Exploring the latest features and improvements in Next.js 15', category: 'web-dev', author: 'Anna Lee', date: '2025-11-05', readTime: '8 min', views: 1900, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80', trending: true },
  { id: 12, title: 'Building Performant Web Applications', excerpt: 'Optimization techniques for fast and responsive web apps', category: 'web-dev', author: 'Chris Brown', date: '2025-11-04', readTime: '11 min', views: 1350, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80' },
  
  // Mobile Development
  { id: 13, title: 'React Native vs Flutter in 2025', excerpt: 'Comparing the two leading cross-platform mobile frameworks', category: 'mobile', author: 'Maria Garcia', date: '2025-11-03', readTime: '12 min', views: 1750, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', popular: true },
  { id: 14, title: 'iOS App Development Best Practices', excerpt: 'Building robust and user-friendly iOS applications', category: 'mobile', author: 'James Lee', date: '2025-11-02', readTime: '10 min', views: 1100, image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80' },
  { id: 15, title: 'Android Jetpack Compose Guide', excerpt: 'Modern UI development for Android with Jetpack Compose', category: 'mobile', author: 'Nina Patel', date: '2025-11-01', readTime: '14 min', views: 1400, image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80', trending: true },
  
  // DevOps
  { id: 16, title: 'Kubernetes Best Practices', excerpt: 'Orchestrating containers at scale with Kubernetes', category: 'devops', author: 'Paul Anderson', date: '2025-10-31', readTime: '15 min', views: 1650, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80', popular: true },
  { id: 17, title: 'CI/CD Pipeline Automation', excerpt: 'Building efficient continuous integration and deployment pipelines', category: 'devops', author: 'Rachel Green', date: '2025-10-30', readTime: '11 min', views: 1250, image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80' },
  { id: 18, title: 'Infrastructure as Code with Terraform', excerpt: 'Managing cloud infrastructure through code', category: 'devops', author: 'Kevin White', date: '2025-10-29', readTime: '13 min', views: 1450, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', trending: true },
  
  // Data Science
  { id: 19, title: 'Data Visualization with Python', excerpt: 'Creating insightful visualizations with matplotlib and seaborn', category: 'data-science', author: 'Sophie Turner', date: '2025-10-28', readTime: '12 min', views: 1550, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', popular: true },
  { id: 20, title: 'Big Data Processing with Apache Spark', excerpt: 'Scalable data processing for large datasets', category: 'data-science', author: 'Marcus Hill', date: '2025-10-27', readTime: '16 min', views: 1200, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { id: 21, title: 'Machine Learning Model Deployment', excerpt: 'Taking ML models from development to production', category: 'data-science', author: 'Oliver King', date: '2025-10-26', readTime: '14 min', views: 1800, image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&q=80', trending: true },
];

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const category = categoryData[categorySlug];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  if (!category) {
    return <div>Category not found</div>;
  }

  // Filter articles by category
  const categoryArticles = allArticles.filter(article => article.category === categorySlug);

  // Apply search and sort
  let filteredArticles = categoryArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort articles
  if (sortBy === 'popular') {
    filteredArticles = [...filteredArticles].sort((a, b) => b.views - a.views);
  } else if (sortBy === 'trending') {
    filteredArticles = [...filteredArticles].sort((a, b) => {
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      return b.views - a.views;
    });
  } else {
    filteredArticles = [...filteredArticles].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient}`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {category.name}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                {category.description}
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${category.color}-500`} />
                  <span className="text-gray-400">
                    <span className="text-white font-semibold">{categoryArticles.length}</span> Articles
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-400">
                    Updated <span className="text-white font-semibold">Daily</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Search and Sort Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 flex flex-col md:flex-row gap-4"
            >
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="newest" className="bg-gray-800">Newest First</option>
                <option value="popular" className="bg-gray-800">Most Popular</option>
                <option value="trending" className="bg-gray-800">Trending</option>
              </select>
            </motion.div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-400 text-lg">No articles found matching your search.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Link href={`/blog/${article.title.toLowerCase().replace(/ /g, '-')}`}>
                      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {(article.trending || article.popular) && (
                            <div className="absolute top-4 right-4 flex gap-2">
                              {article.trending && (
                                <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-medium flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  Trending
                                </span>
                              )}
                              {article.popular && (
                                <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                                  Popular
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                            {article.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{article.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Explore Other Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(categoryData)
                  .filter(([slug]) => slug !== categorySlug)
                  .slice(0, 4)
                  .map(([slug, cat]) => {
                    const CatIcon = cat.icon;
                    return (
                      <Link key={slug} href={`/blog/category/${slug}`}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} mb-3`}>
                            <CatIcon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-white font-semibold">{cat.name}</h3>
                        </motion.div>
                      </Link>
                    );
                  })}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
