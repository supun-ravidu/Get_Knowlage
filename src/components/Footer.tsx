'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mail, 
  MapPin, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowUp,
  Heart,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/categories' },
    { label: 'Advertise', href: '/advertise' },
  ],
  Resources: [
    { label: 'All Articles', href: '/blog' },
    { label: 'Technology', href: '/blog/category/technology' },
    { label: 'Programming', href: '/blog/category/programming' },
    { label: 'Web Development', href: '/blog/category/web-dev' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Legal Info', href: '/legal' },
    { label: 'Admin Login', href: '/admin/login' },
  ],
  Tags: [
    { label: 'React', href: '/blog/tag/react' },
    { label: 'Next.js', href: '/blog/tag/nextjs' },
    { label: 'TypeScript', href: '/blog/tag/typescript' },
    { label: 'Python', href: '/blog/tag/python' },
  ],
};

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
  { Icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-500' },
  { Icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-600' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/supun-ravidu-bandara-rathnayaka-7a1523294/', color: 'hover:text-blue-700' },
  { Icon: Github, href: 'https://github.com/supun-ravidu', color: 'hover:text-gray-900 dark:hover:text-white' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(true);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                >
                  <BookOpen className="w-7 h-7 text-white" />
                </motion.div>
                <span className="text-2xl font-bold">GetKnowledge</span>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                Your trusted source for quality content, insights, and knowledge across technology, design, and innovation.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:supunravidubandara@gmail.com" className="text-sm hover:text-white transition-colors">
                    supunravidubandara@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+94776824351" className="text-sm hover:text-white transition-colors">
                    +94 77 682 4351
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Sri Lanka</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ Icon, href, color }, index) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className={`w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all"
                      />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 border-t border-white/10"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Stay Updated
              </h3>
              <p className="text-gray-400">
                Subscribe to our newsletter for the latest articles and insights
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-medium shadow-lg"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left flex items-center gap-2 flex-wrap justify-center"
            >
              <span>© 2025 GetKnowledge. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Developed with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by 
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Supun Rathnayaka
                </motion.span>
              </span>
            </motion.p>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <span>•</span>
              <a href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-center z-50 hover:shadow-2xl transition-shadow"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </footer>
  );
}
