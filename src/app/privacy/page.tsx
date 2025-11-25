'use client';

import { motion } from 'framer-motion';
import { 
  Shield,
  Eye,
  Lock,
  Cookie,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Database,
  Key,
  Settings,
  Trash2,
  Download,
  UserCheck,
  Mail,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const quickLinks = [
  { icon: Eye, title: 'Data Collection', href: '#data-collection' },
  { icon: Cookie, title: 'Cookie Policy', href: '#cookies' },
  { icon: UserCheck, title: 'Your Rights', href: '#rights' },
  { icon: Lock, title: 'Data Protection', href: '#protection' }
];

const dataCollection = [
  {
    title: 'Personal Information',
    icon: Users,
    items: [
      'Name and email address (when you subscribe)',
      'Profile information (if you create an account)',
      'Comments and feedback on articles',
      'Contact form submissions'
    ]
  },
  {
    title: 'Technical Data',
    icon: Database,
    items: [
      'IP address and device information',
      'Browser type and version',
      'Operating system',
      'Pages visited and time spent',
      'Referring website or source'
    ]
  },
  {
    title: 'Usage Analytics',
    icon: Settings,
    items: [
      'Articles read and engagement metrics',
      'Search queries within our site',
      'Click patterns and navigation paths',
      'Performance and error logs'
    ]
  }
];

const userRights = [
  {
    icon: Eye,
    title: 'Right to Access',
    description: 'Request a copy of all personal data we hold about you'
  },
  {
    icon: Settings,
    title: 'Right to Rectification',
    description: 'Request correction of inaccurate or incomplete data'
  },
  {
    icon: Trash2,
    title: 'Right to Erasure',
    description: 'Request deletion of your personal data (right to be forgotten)'
  },
  {
    icon: Lock,
    title: 'Right to Restriction',
    description: 'Request limitation on how we process your data'
  },
  {
    icon: Download,
    title: 'Right to Portability',
    description: 'Receive your data in a structured, machine-readable format'
  },
  {
    icon: UserCheck,
    title: 'Right to Object',
    description: 'Object to processing of your data for marketing purposes'
  }
];

const protectionMeasures = [
  {
    icon: Lock,
    title: 'Encryption',
    description: 'All data transmissions are encrypted using SSL/TLS protocols'
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Data stored on secure servers with restricted access'
  },
  {
    icon: Key,
    title: 'Access Control',
    description: 'Strict authentication and authorization mechanisms'
  },
  {
    icon: Database,
    title: 'Regular Backups',
    description: 'Automated backups to prevent data loss'
  },
  {
    icon: AlertCircle,
    title: 'Breach Detection',
    description: 'Continuous monitoring for security threats'
  },
  {
    icon: FileText,
    title: 'Audit Logs',
    description: 'Comprehensive logging of all data access activities'
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-6"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Privacy{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>
              <p className="text-sm text-gray-500">
                Last updated: November 18, 2025
              </p>
            </motion.div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-4 gap-6 mb-20">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.title}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer group"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                  </motion.a>
                );
              })}
            </div>

            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Introduction
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  Welcome to GetKnowledge's Privacy Policy. We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
                <p className="mb-4">
                  By using GetKnowledge, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
                <p>
                  We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </motion.section>

            {/* Data Collection */}
            <motion.section
              id="data-collection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                What Data We Collect
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {dataCollection.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8"
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* How We Use Data */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                How We Use Your Data
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Primary Purposes</h3>
                  <ul className="space-y-3">
                    {[
                      'Provide and maintain our services',
                      'Send newsletters and updates (with consent)',
                      'Respond to your comments and questions',
                      'Improve user experience and content',
                      'Monitor and analyze usage patterns'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Additional Uses</h3>
                  <ul className="space-y-3">
                    {[
                      'Personalize content recommendations',
                      'Detect and prevent fraud or abuse',
                      'Comply with legal obligations',
                      'Communicate about service changes',
                      'Conduct research and analytics'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Cookie Policy */}
            <motion.section
              id="cookies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl p-1 mb-12"
            >
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-red-600">
                    <Cookie className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Cookie Policy</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-6">
                    We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-6">
                      <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                      <h4 className="font-bold text-foreground mb-2">Essential Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Required for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-6">
                      <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                      <h4 className="font-bold text-foreground mb-2">Analytics Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors use our site and improve performance.
                      </p>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-6">
                      <CheckCircle className="w-8 h-8 text-purple-500 mb-3" />
                      <h4 className="font-bold text-foreground mb-2">Preference Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Remember your settings and preferences for a better experience.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-500" />
                      Managing Cookies
                    </h4>
                    <p className="text-muted-foreground">
                      You can control and/or delete cookies through your browser settings. However, disabling cookies may affect the functionality of our website. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* User Rights */}
            <motion.section
              id="rights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Your Rights
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRights.map((right, index) => {
                  const Icon = right.icon;
                  return (
                    <motion.div
                      key={right.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {right.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {right.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-center"
              >
                <p className="text-muted-foreground mb-4">
                  To exercise any of these rights, please contact us at:
                </p>
                <Link href="mailto:supunravidubandara@gmail.com">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow"
                  >
                    <Mail className="w-5 h-5" />
                    supunravidubandara@gmail.com
                  </motion.button>
                </Link>
              </motion.div>
            </motion.section>

            {/* Data Protection */}
            <motion.section
              id="protection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Data Protection Measures
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                We implement comprehensive security measures to protect your personal information from unauthorized access, use, or disclosure.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {protectionMeasures.map((measure, index) => {
                  const Icon = measure.icon;
                  return (
                    <motion.div
                      key={measure.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + index * 0.05 }}
                      className="bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl p-6 border border-white/10"
                    >
                      <Icon className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {measure.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {measure.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Third-Party Services */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Third-Party Services
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  We may use third-party service providers to help us operate our website and deliver our services. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-foreground mb-3">Third-party services we use include:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>Analytics providers (Google Analytics, etc.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>Hosting and infrastructure services</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>Email service providers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>Content delivery networks (CDNs)</span>
                    </li>
                  </ul>
                </div>
                <p>
                  These third parties have their own privacy policies. We encourage you to review them to understand how they collect, use, and protect your information.
                </p>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>
                <div className="relative">
                  <Shield className="w-16 h-16 text-white mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Questions About Privacy?
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    If you have any questions or concerns about our Privacy Policy or how we handle your data, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
                      >
                        Contact Us
                      </motion.button>
                    </Link>
                    <Link href="/legal">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors"
                      >
                        Legal Information
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
