'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Brain, 
  Rocket, 
  TrendingUp, 
  Shield,
  Database,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const categories = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'Explore the latest in web development, software engineering, programming languages, and emerging tech trends. From frameworks to best practices, stay ahead of the curve.',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    articleCount: 42,
    bgPattern: 'dots'
  },
  {
    id: 2,
    name: 'Design',
    slug: 'design',
    description: 'Dive into UI/UX design, design systems, typography, color theory, and creative inspiration. Learn how to craft beautiful and functional user experiences.',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    articleCount: 28,
    bgPattern: 'grid'
  },
  {
    id: 3,
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Discover artificial intelligence, machine learning algorithms, neural networks, and the future of intelligent systems. From basics to advanced implementations.',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
    articleCount: 35,
    bgPattern: 'waves'
  },
  {
    id: 4,
    name: 'Startup & Business',
    slug: 'startup',
    description: 'Navigate the startup ecosystem with insights on entrepreneurship, business strategy, funding, growth hacking, and building successful products.',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    articleCount: 19,
    bgPattern: 'dots'
  },
  {
    id: 5,
    name: 'Marketing & Growth',
    slug: 'marketing',
    description: 'Master digital marketing, SEO, content strategy, social media, and analytics. Learn how to grow your audience and drive meaningful engagement.',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    articleCount: 24,
    bgPattern: 'grid'
  },
  {
    id: 6,
    name: 'Security & Privacy',
    slug: 'security',
    description: 'Stay secure with cybersecurity best practices, encryption, authentication, privacy policies, and protecting user data in the digital age.',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    articleCount: 16,
    bgPattern: 'waves'
  },
  {
    id: 7,
    name: 'Data Science',
    slug: 'data-science',
    description: 'Unlock insights with data analysis, visualization, statistics, and big data technologies. Transform raw data into actionable intelligence.',
    icon: Database,
    color: 'from-violet-500 to-purple-500',
    articleCount: 21,
    bgPattern: 'dots'
  },
  {
    id: 8,
    name: 'Mobile Development',
    slug: 'mobile',
    description: 'Build amazing mobile experiences with iOS, Android, React Native, and Flutter. From native apps to cross-platform solutions.',
    icon: Smartphone,
    color: 'from-teal-500 to-cyan-500',
    articleCount: 18,
    bgPattern: 'grid'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100
    }
  }
};

export default function CategoriesPage() {
  const totalArticles = categories.reduce((sum, cat) => sum + cat.articleCount, 0);

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
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Explore by{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Category
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Browse our comprehensive collection of articles organized by topics. 
                Find exactly what you're looking for.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-400">
                    <span className="text-white font-semibold">{categories.length}</span> Categories
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-gray-400">
                    <span className="text-white font-semibold">{totalArticles}</span> Total Articles
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-400">
                    <span className="text-white font-semibold">Weekly</span> Updates
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.03,
                      rotateY: 5,
                      rotateX: 5
                    }}
                    style={{ perspective: 1000 }}
                  >
                    <Link href={`/blog?category=${category.slug}`}>
                      <div className="relative group h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          {category.bgPattern === 'dots' && (
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                              backgroundSize: '20px 20px'
                            }} />
                          )}
                          {category.bgPattern === 'grid' && (
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                              backgroundSize: '20px 20px'
                            }} />
                          )}
                          {category.bgPattern === 'waves' && (
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
                            </svg>
                          )}
                        </div>

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                        <div className="relative p-8">
                          {/* Icon */}
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          {/* Content */}
                          <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {category.name}
                          </h2>
                          
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {category.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                              <span className="text-sm font-medium text-muted-foreground">
                                {category.articleCount} Articles
                              </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Popular Tags Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Popular Tags
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  'JavaScript', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
                  'Node.js', 'Python', 'AI', 'Machine Learning', 'Web3',
                  'Blockchain', 'Cloud', 'DevOps', 'AWS', 'Docker',
                  'Kubernetes', 'GraphQL', 'REST API', 'Microservices', 'Testing'
                ].map((tag, index) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.03 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 text-sm font-medium"
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20 text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                <div className="relative">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Can't find what you're looking for?
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    Use our powerful search to find articles across all categories, 
                    or suggest a topic you'd like us to cover.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/blog">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
                      >
                        Browse All Articles
                      </motion.button>
                    </Link>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors"
                      >
                        Suggest a Topic
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
