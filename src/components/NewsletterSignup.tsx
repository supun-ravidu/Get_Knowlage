'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsletterSignup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/subscribe/login');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss an Update
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest articles, insights, and exclusive content delivered straight to your inbox every week.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <motion.input
              whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(255,255,255,0.3)" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 rounded-lg bg-white text-blue-600 font-medium transition-all"
            >
              Subscribe
            </motion.button>
          </motion.form>

          <p className="text-sm text-white/75 mt-4">
            Join 50,000+ subscribers. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
