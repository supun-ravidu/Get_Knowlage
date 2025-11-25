'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Brain, Rocket, TrendingUp, Shield } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Development',
    icon: Code,
    count: 245,
    color: 'bg-blue-500',
    description: 'Code tutorials and best practices'
  },
  {
    id: 2,
    name: 'Design',
    icon: Palette,
    count: 189,
    color: 'bg-purple-500',
    description: 'UI/UX and creative insights'
  },
  {
    id: 3,
    name: 'AI & ML',
    icon: Brain,
    count: 156,
    color: 'bg-green-500',
    description: 'Artificial intelligence guides'
  },
  {
    id: 4,
    name: 'Startup',
    icon: Rocket,
    count: 134,
    color: 'bg-orange-500',
    description: 'Entrepreneurship and growth'
  },
  {
    id: 5,
    name: 'Marketing',
    icon: TrendingUp,
    count: 167,
    color: 'bg-pink-500',
    description: 'Digital marketing strategies'
  },
  {
    id: 6,
    name: 'Security',
    icon: Shield,
    count: 98,
    color: 'bg-red-500',
    description: 'Cybersecurity essentials'
  }
];

export default function CategoryHighlights() {
  return (
    <section className="py-16 md:py-24 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into topics that matter to you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div                   className="p-6 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-border hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className={`${category.color} p-3 rounded-lg text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      <span className="text-sm font-medium text-muted-foreground">
                        {category.count} articles
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
