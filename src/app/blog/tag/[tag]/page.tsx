'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Eye,
  TrendingUp,
  Search,
  Tag,
  Hash
} from 'lucide-react';
import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

// Tag metadata
const tagData: Record<string, {
  name: string;
  description: string;
  color: string;
  gradient: string;
  relatedTags: string[];
}> = {
  'nextjs': {
    name: 'Next.js',
    description: 'The React framework for production. Learn about server components, routing, data fetching, and building full-stack applications with Next.js.',
    color: 'black',
    gradient: 'from-gray-900 to-gray-700',
    relatedTags: ['react', 'typescript', 'vercel', 'javascript']
  },
  'react': {
    name: 'React',
    description: 'A JavaScript library for building user interfaces. Master hooks, components, state management, and modern React patterns.',
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-500',
    relatedTags: ['nextjs', 'javascript', 'typescript', 'redux']
  },
  'python': {
    name: 'Python',
    description: 'A versatile programming language for web development, data science, AI, automation, and more. Explore Python libraries and frameworks.',
    color: 'yellow',
    gradient: 'from-yellow-600 to-blue-600',
    relatedTags: ['django', 'flask', 'data-science', 'machine-learning']
  },
  'javascript': {
    name: 'JavaScript',
    description: 'The language of the web. Learn modern JavaScript features, ES6+, async programming, and building interactive web applications.',
    color: 'yellow',
    gradient: 'from-yellow-500 to-yellow-600',
    relatedTags: ['typescript', 'nodejs', 'react', 'vue']
  },
  'typescript': {
    name: 'TypeScript',
    description: 'JavaScript with syntax for types. Build scalable applications with type safety, better IDE support, and fewer runtime errors.',
    color: 'blue',
    gradient: 'from-blue-600 to-blue-700',
    relatedTags: ['javascript', 'react', 'nextjs', 'nodejs']
  },
  'nodejs': {
    name: 'Node.js',
    description: 'JavaScript runtime built on Chrome\'s V8 engine. Build scalable backend applications, APIs, and server-side solutions.',
    color: 'green',
    gradient: 'from-green-600 to-green-700',
    relatedTags: ['javascript', 'express', 'typescript', 'mongodb']
  },
  'vue': {
    name: 'Vue.js',
    description: 'The progressive JavaScript framework. Build reactive user interfaces with an approachable, versatile, and performant framework.',
    color: 'green',
    gradient: 'from-green-500 to-teal-500',
    relatedTags: ['javascript', 'typescript', 'nuxt', 'vite']
  },
  'angular': {
    name: 'Angular',
    description: 'Platform for building web applications. Develop scalable enterprise applications with TypeScript and comprehensive tooling.',
    color: 'red',
    gradient: 'from-red-600 to-pink-600',
    relatedTags: ['typescript', 'rxjs', 'javascript', 'material-ui']
  },
  'tailwind': {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework. Build modern, responsive designs quickly without leaving your HTML.',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    relatedTags: ['css', 'react', 'nextjs', 'vue']
  },
  'docker': {
    name: 'Docker',
    description: 'Containerization platform for developing, shipping, and running applications. Learn container orchestration and deployment.',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    relatedTags: ['kubernetes', 'devops', 'linux', 'cloud']
  },
  'kubernetes': {
    name: 'Kubernetes',
    description: 'Container orchestration platform. Automate deployment, scaling, and management of containerized applications.',
    color: 'blue',
    gradient: 'from-blue-600 to-purple-600',
    relatedTags: ['docker', 'devops', 'cloud', 'aws']
  },
  'aws': {
    name: 'AWS',
    description: 'Amazon Web Services cloud platform. Build, deploy, and scale applications using AWS services and infrastructure.',
    color: 'orange',
    gradient: 'from-orange-500 to-yellow-600',
    relatedTags: ['cloud', 'devops', 'kubernetes', 'terraform']
  },
  'mongodb': {
    name: 'MongoDB',
    description: 'NoSQL database for modern applications. Build flexible, scalable databases with document-oriented data models.',
    color: 'green',
    gradient: 'from-green-600 to-green-700',
    relatedTags: ['nodejs', 'database', 'express', 'mongoose']
  },
  'postgresql': {
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database. Build reliable, feature-rich applications with SQL and ACID compliance.',
    color: 'blue',
    gradient: 'from-blue-700 to-blue-800',
    relatedTags: ['sql', 'database', 'nodejs', 'django']
  },
  'graphql': {
    name: 'GraphQL',
    description: 'Query language for APIs. Build efficient, powerful, and flexible APIs with precise data fetching.',
    color: 'pink',
    gradient: 'from-pink-500 to-purple-600',
    relatedTags: ['api', 'nodejs', 'react', 'apollo']
  },
  'machine-learning': {
    name: 'Machine Learning',
    description: 'Build intelligent systems that learn from data. Explore algorithms, neural networks, and AI applications.',
    color: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    relatedTags: ['python', 'tensorflow', 'pytorch', 'ai']
  },
  'tensorflow': {
    name: 'TensorFlow',
    description: 'Open-source machine learning framework. Build and deploy ML models for various applications.',
    color: 'orange',
    gradient: 'from-orange-600 to-red-600',
    relatedTags: ['python', 'machine-learning', 'ai', 'keras']
  },
  'git': {
    name: 'Git',
    description: 'Distributed version control system. Master branching, merging, and collaboration workflows.',
    color: 'orange',
    gradient: 'from-orange-600 to-red-500',
    relatedTags: ['github', 'devops', 'gitlab', 'version-control']
  },
  'github': {
    name: 'GitHub',
    description: 'Code hosting and collaboration platform. Learn GitHub workflows, Actions, and open-source contribution.',
    color: 'gray',
    gradient: 'from-gray-800 to-gray-900',
    relatedTags: ['git', 'devops', 'ci-cd', 'open-source']
  },
  'vscode': {
    name: 'VS Code',
    description: 'Popular code editor by Microsoft. Boost productivity with extensions, shortcuts, and customization.',
    color: 'blue',
    gradient: 'from-blue-600 to-blue-700',
    relatedTags: ['editor', 'productivity', 'javascript', 'typescript']
  }
};

// Sample articles with tags
const allArticles = [
  { id: 1, title: 'Building Full-Stack Apps with Next.js 15', excerpt: 'Complete guide to server components, routing, and data fetching', tags: ['nextjs', 'react', 'typescript'], author: 'John Doe', date: '2025-11-15', readTime: '12 min', views: 2340, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', trending: true },
  { id: 2, title: 'Mastering React Hooks', excerpt: 'Deep dive into useState, useEffect, and custom hooks', tags: ['react', 'javascript', 'typescript'], author: 'Sarah Lee', date: '2025-11-14', readTime: '10 min', views: 1890, image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80', popular: true },
  { id: 3, title: 'Python for Data Science', excerpt: 'Essential Python libraries for data analysis and visualization', tags: ['python', 'data-science', 'machine-learning'], author: 'Mike Chen', date: '2025-11-13', readTime: '15 min', views: 2100, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80' },
  { id: 4, title: 'Modern JavaScript Features', excerpt: 'ES6+ features every developer should know', tags: ['javascript', 'typescript', 'nodejs'], author: 'Emma Wilson', date: '2025-11-12', readTime: '8 min', views: 1560, image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80', trending: true },
  { id: 5, title: 'TypeScript Best Practices', excerpt: 'Writing type-safe, maintainable code', tags: ['typescript', 'javascript', 'react'], author: 'David Park', date: '2025-11-11', readTime: '11 min', views: 1780, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80', popular: true },
  { id: 6, title: 'Building APIs with Node.js', excerpt: 'Creating RESTful APIs with Express and TypeScript', tags: ['nodejs', 'typescript', 'express', 'mongodb'], author: 'Lisa Wang', date: '2025-11-10', readTime: '13 min', views: 1920, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80' },
  { id: 7, title: 'Vue 3 Composition API', excerpt: 'Modern Vue development with composition API', tags: ['vue', 'javascript', 'typescript'], author: 'Tom Brown', date: '2025-11-09', readTime: '9 min', views: 1340, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', trending: true },
  { id: 8, title: 'Angular Standalone Components', excerpt: 'Building modular Angular applications', tags: ['angular', 'typescript', 'rxjs'], author: 'Anna Garcia', date: '2025-11-08', readTime: '12 min', views: 1450, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80' },
  { id: 9, title: 'Styling with Tailwind CSS', excerpt: 'Utility-first CSS for rapid UI development', tags: ['tailwind', 'css', 'react', 'nextjs'], author: 'Chris Lee', date: '2025-11-07', readTime: '7 min', views: 2230, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80', popular: true },
  { id: 10, title: 'Docker for Developers', excerpt: 'Containerizing applications with Docker', tags: ['docker', 'devops', 'kubernetes'], author: 'Rachel Green', date: '2025-11-06', readTime: '14 min', views: 1670, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80' },
  { id: 11, title: 'Kubernetes Essentials', excerpt: 'Container orchestration for scalable apps', tags: ['kubernetes', 'docker', 'devops', 'cloud'], author: 'Paul White', date: '2025-11-05', readTime: '16 min', views: 1890, image: 'https://images.unsplash.com/photo-1667372335962-5fd503a8ae5b?w=800&q=80', trending: true },
  { id: 12, title: 'AWS Cloud Architecture', excerpt: 'Building scalable systems on AWS', tags: ['aws', 'cloud', 'devops'], author: 'Kevin Hill', date: '2025-11-04', readTime: '15 min', views: 2010, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', popular: true },
  { id: 13, title: 'MongoDB Schema Design', excerpt: 'Best practices for NoSQL database design', tags: ['mongodb', 'database', 'nodejs'], author: 'Sophie Turner', date: '2025-11-03', readTime: '11 min', views: 1540, image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80' },
  { id: 14, title: 'PostgreSQL Performance', excerpt: 'Optimizing queries and indexing strategies', tags: ['postgresql', 'sql', 'database'], author: 'Marcus King', date: '2025-11-02', readTime: '13 min', views: 1620, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', trending: true },
  { id: 15, title: 'GraphQL API Development', excerpt: 'Building flexible APIs with GraphQL', tags: ['graphql', 'api', 'nodejs', 'typescript'], author: 'Oliver James', date: '2025-11-01', readTime: '12 min', views: 1760, image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80' },
  { id: 16, title: 'Machine Learning with Python', excerpt: 'Getting started with scikit-learn and pandas', tags: ['machine-learning', 'python', 'data-science'], author: 'Nina Patel', date: '2025-10-31', readTime: '14 min', views: 2150, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', popular: true },
  { id: 17, title: 'TensorFlow for Beginners', excerpt: 'Building your first neural network', tags: ['tensorflow', 'machine-learning', 'python'], author: 'James Wilson', date: '2025-10-30', readTime: '16 min', views: 1980, image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80', trending: true },
  { id: 18, title: 'Git Workflow Best Practices', excerpt: 'Branching strategies and collaboration', tags: ['git', 'github', 'devops'], author: 'Emily Clark', date: '2025-10-29', readTime: '9 min', views: 1430, image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80' },
  { id: 19, title: 'GitHub Actions CI/CD', excerpt: 'Automating deployments with GitHub Actions', tags: ['github', 'ci-cd', 'devops', 'git'], author: 'Alex Turner', date: '2025-10-28', readTime: '13 min', views: 1850, image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80', popular: true },
  { id: 20, title: 'VS Code Productivity Tips', excerpt: 'Extensions and shortcuts to boost your workflow', tags: ['vscode', 'productivity', 'editor'], author: 'Maya Anderson', date: '2025-10-27', readTime: '8 min', views: 2340, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', trending: true },
];

export default function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = use(params);
  const tagSlug = resolvedParams.tag;
  const tag = tagData[tagSlug];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  if (!tag) {
    return <div>Tag not found</div>;
  }

  // Filter articles by tag
  const tagArticles = allArticles.filter(article => 
    article.tags.includes(tagSlug)
  );

  // Apply search and sort
  let filteredArticles = tagArticles.filter(article =>
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

  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Tag Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${tag.gradient}`}>
                  <Hash className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                #{tag.name}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                {tag.description}
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${tag.color}-500`} />
                  <span className="text-gray-400">
                    <span className="text-white font-semibold">{tagArticles.length}</span> Articles
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-400">
                    <span className="text-white font-semibold">Active</span> Community
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
                  placeholder={`Search ${tag.name} articles...`}
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

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map(t => (
                              <span 
                                key={t}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  t === tagSlug 
                                    ? `bg-gradient-to-r ${tag.gradient} text-white` 
                                    : 'bg-gray-100 dark:bg-gray-700 text-muted-foreground'
                                }`}
                              >
                                #{t}
                              </span>
                            ))}
                          </div>

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

            {/* Related Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Related Tags
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {tag.relatedTags.map((relatedTag) => {
                  const relatedData = tagData[relatedTag];
                  if (!relatedData) return null;
                  return (
                    <Link key={relatedTag} href={`/blog/tag/${relatedTag}`}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-full bg-gradient-to-r ${relatedData.gradient} text-white font-medium hover:shadow-lg transition-shadow flex items-center gap-2`}
                      >
                        <Tag className="w-4 h-4" />
                        {relatedData.name}
                      </motion.button>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* All Tags Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Explore More Topics
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(tagData)
                  .filter(([slug]) => slug !== tagSlug && !tag.relatedTags.includes(slug))
                  .slice(0, 12)
                  .map(([slug, t]) => (
                    <Link key={slug} href={`/blog/tag/${slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 text-sm font-medium"
                      >
                        #{t.name}
                      </motion.button>
                    </Link>
                  ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
