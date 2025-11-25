'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const recentPosts = [
  {
    id: 1,
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn best practices for creating robust and scalable REST APIs.',
    category: 'Development',
    date: 'Nov 15, 2025',
    readTime: '6 min read'
  },
  {
    id: 2,
    title: 'The Psychology of Color in Design',
    excerpt: 'Understanding how colors affect user behavior and emotions.',
    category: 'Design',
    date: 'Nov 14, 2025',
    readTime: '5 min read'
  },
  {
    id: 3,
    title: 'Introduction to Neural Networks',
    excerpt: 'A beginner-friendly guide to understanding neural networks.',
    category: 'AI',
    date: 'Nov 13, 2025',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'Growth Hacking Strategies for Startups',
    excerpt: 'Proven techniques to accelerate your startup growth.',
    category: 'Startup',
    date: 'Nov 12, 2025',
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'SEO in 2025: What You Need to Know',
    excerpt: 'Stay ahead with the latest SEO trends and strategies.',
    category: 'Marketing',
    date: 'Nov 11, 2025',
    readTime: '8 min read'
  },
  {
    id: 6,
    title: 'Securing Your Web Applications',
    excerpt: 'Essential security practices every developer should know.',
    category: 'Security',
    date: 'Nov 10, 2025',
    readTime: '9 min read'
  }
];

export default function RecentPosts() {
  return (
    <section className="py-16 md:py-24 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Recent Posts
            </h2>
            <p className="text-lg text-muted-foreground">
              Fresh content published this week
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all">
            View All
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.03,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              className="group cursor-pointer p-6 rounded-xl border border-border hover:border-blue-300 dark:hover:border-blue-700 transition-all bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-3 mb-3 text-sm">
                <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                  {post.category}
                </span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border text-foreground font-medium hover:bg-accent transition-colors">
            View All Posts
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
