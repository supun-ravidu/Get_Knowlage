'use client';

import { motion, useInView } from 'framer-motion';
import { Award, Users, Star, TrendingUp } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

function CountUpAnimation({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const indicators = [
  {
    id: 1,
    icon: Users,
    value: '50,000+',
    label: 'Active Readers',
    description: 'Growing community of learners'
  },
  {
    id: 2,
    icon: Star,
    value: '4.9/5',
    label: 'Reader Rating',
    description: 'Based on 2,500+ reviews'
  },
  {
    id: 3,
    icon: Award,
    value: '15+',
    label: 'Industry Awards',
    description: 'Recognized for quality content'
  },
  {
    id: 4,
    icon: TrendingUp,
    value: '98%',
    label: 'Satisfaction Rate',
    description: 'Readers who recommend us'
  }
];

const trustedBy = [
  { name: 'Google', logo: 'G' },
  { name: 'Microsoft', logo: 'M' },
  { name: 'Amazon', logo: 'A' },
  { name: 'Meta', logo: 'F' },
  { name: 'Apple', logo: 'A' },
  { name: 'Netflix', logo: 'N' }
];

export default function TrustIndicators() {
  return (
    <section className="py-16 md:py-24 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            const numericValue = parseInt(indicator.value.replace(/[^0-9]/g, ''));
            const suffix = indicator.value.replace(/[0-9]/g, '');
            
            return (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white mb-4 shadow-lg"
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {indicator.value.includes('/') ? indicator.value : <CountUpAnimation end={numericValue} suffix={suffix} />}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {indicator.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {indicator.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustedBy.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "tween",
                  y: {
                    duration: 2 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="group"
              >
                <div className="w-16 h-16 rounded-lg bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm border border-border flex items-center justify-center text-2xl font-bold text-muted-foreground group-hover:text-foreground group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-all shadow-md">
                  {company.logo}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="p-8 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-border">
            <div className="text-4xl text-blue-600 dark:text-blue-400 mb-4">"</div>
            <p className="text-lg text-foreground mb-6 italic">
              GetKnowledge has transformed the way I stay updated with industry trends. The quality of content and depth of insights are unmatched.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                SK
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Sarah Kim</div>
                <div className="text-sm text-muted-foreground">Senior Developer, Tech Corp</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
