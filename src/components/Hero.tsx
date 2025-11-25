'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, Zap, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

const words = ['Transforms', 'Inspires', 'Empowers', 'Elevates'];
const floatingIcons = [
  { Icon: Sparkles, delay: 0, duration: 3 },
  { Icon: Zap, delay: 0.5, duration: 4 },
  { Icon: Target, delay: 1, duration: 3.5 },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/95 via-purple-50/95 to-pink-50/95 dark:from-gray-900/95 dark:via-purple-900/90 dark:to-gray-800/95 py-20 md:py-32 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, duration }, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
          className="absolute hidden lg:block"
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 20}%`,
          }}
        >
          <Icon className="w-12 h-12 text-blue-400 dark:text-blue-500" />
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="space-y-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-lg">
              <BookOpen className="w-4 h-4" />
              <span>Your Knowledge Hub</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl">
              Discover Knowledge That{' '}
              <span className="relative inline-block">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {words[wordIndex]}
                </motion.span>
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                />
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore curated articles, insights, and resources that help you learn, grow, and stay ahead in your field.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg">
              Get Started
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-foreground font-medium transition-all">
              Browse Articles
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-8 pt-8 flex-wrap justify-center">
            {[
              { value: '1000+', label: 'Articles', delay: 0.7 },
              { value: '50K+', label: 'Readers', delay: 0.8 },
              { value: '20+', label: 'Categories', delay: 0.9 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay }}
                whileHover={{ scale: 1.1 }}
                className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
