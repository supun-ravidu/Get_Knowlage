'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { BookOpen, Search, Menu, X, Sun, Moon, ChevronDown, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

type Author = {
  id: string;
  name: string;
  slug: string;
};

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
    submenu: [
      { name: 'All Articles', href: '/blog' },
      { name: 'Technology', href: '/blog/category/technology' },
      { name: 'AI & ML', href: '/blog/category/ai-ml' },
      { name: 'Programming', href: '/blog/category/programming' },
      { name: 'Web Dev', href: '/blog/category/web-dev' },
      { name: 'Mobile', href: '/blog/category/mobile' },
      { name: 'DevOps', href: '/blog/category/devops' },
      { name: 'Data Science', href: '/blog/category/data-science' },
    ]
  },
  {
    label: 'Authors',
    href: '/author',
    submenu: [] as { name: string; href: string }[], // Will be populated dynamically
  },
  {
    label: 'Resources',
    href: '/blog',
    submenu: [
      { name: 'Categories', href: '/categories' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Legal Info', href: '/legal' },
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await fetch('/api/authors');
        if (res.ok) {
          const data = await res.json();
          setAuthors(data.authors || []);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    }
    fetchAuthors();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  // Build dynamic navItems with authors
  const dynamicNavItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Blog',
      href: '/blog',
      submenu: [
        { name: 'All Articles', href: '/blog' },
        { name: 'Technology', href: '/blog/category/technology' },
        { name: 'AI & ML', href: '/blog/category/ai-ml' },
        { name: 'Programming', href: '/blog/category/programming' },
        { name: 'Web Dev', href: '/blog/category/web-dev' },
        { name: 'Mobile', href: '/blog/category/mobile' },
        { name: 'DevOps', href: '/blog/category/devops' },
        { name: 'Data Science', href: '/blog/category/data-science' },
      ]
    },
    {
      label: 'Authors',
      href: '/author',
      submenu: [
        ...authors.map(author => ({ name: author.name, href: `/author/${author.slug}` })),
        { name: 'All Authors', href: '/author' },
      ]
    },
    {
      label: 'Resources',
      href: '/blog',
      submenu: [
        { name: 'Categories', href: '/categories' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Legal Info', href: '/legal' },
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 blur-md -z-10"
                />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GetKnowledge
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {dynamicNavItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-lg text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium flex items-center gap-1 group"
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    )}
                  </motion.a>
                  
                  {/* Submenu */}
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-border overflow-hidden"
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <motion.a
                          key={subItem.name}
                          href={subItem.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.05 }}
                          className="block px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-foreground"
                        >
                          {subItem.name}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Search className="w-5 h-5 text-foreground" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDark ? (
                    <Moon className="w-5 h-5 text-foreground" />
                  ) : (
                    <Sun className="w-5 h-5 text-foreground" />
                  )}
                </motion.div>
              </motion.button>

              {/* CTA Button */}
              <motion.a
                href="/subscribe/login"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Subscribe
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {dynamicNavItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className="block px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-muted-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            <motion.a
              href="/subscribe/login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: dynamicNavItems.length * 0.1 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Subscribe
            </motion.a>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-20" />
    </>
  );
}
