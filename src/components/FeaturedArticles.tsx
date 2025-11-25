'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const featuredArticles = [
  {
    id: 1,
    title: 'The Future of Web Development in 2025',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    category: 'Technology',
    author: 'John Doe',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    featured: true
  },
  {
    id: 2,
    title: 'Mastering Design Systems',
    excerpt: 'Learn how to build and maintain scalable design systems for modern applications.',
    category: 'Design',
    author: 'Jane Smith',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    featured: true
  },
  {
    id: 3,
    title: 'AI and Machine Learning Basics',
    excerpt: 'A comprehensive guide to understanding the fundamentals of AI and ML.',
    category: 'AI',
    author: 'Mike Johnson',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    featured: true
  }
];

export default function FeaturedArticles() {
  return (
    <section className="py-16 md:py-24 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked stories that inspire and inform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 text-xs font-medium text-foreground">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{article.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
                  Read More
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
