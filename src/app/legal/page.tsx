'use client';

import { motion } from 'framer-motion';
import { 
  Shield,
  FileText,
  Lock,
  Eye,
  Cookie,
  Scale,
  AlertCircle,
  CheckCircle,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const legalPages = [
  {
    title: 'Privacy Policy',
    icon: Eye,
    description: 'How we collect, use, and protect your data',
    color: 'from-blue-600 to-cyan-600',
    href: '#privacy'
  },
  {
    title: 'Terms of Service',
    icon: FileText,
    description: 'Terms and conditions for using our platform',
    color: 'from-purple-600 to-pink-600',
    href: '#terms'
  },
  {
    title: 'Cookie Policy',
    icon: Cookie,
    description: 'How we use cookies and similar technologies',
    color: 'from-orange-600 to-red-600',
    href: '#cookies'
  },
  {
    title: 'Disclaimer',
    icon: AlertCircle,
    description: 'Important information about content liability',
    color: 'from-green-600 to-emerald-600',
    href: '#disclaimer'
  }
];

export default function LegalPage() {
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
                <Scale className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Legal{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Information
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Your privacy and trust matter to us. Read our policies and terms to understand how we protect your data and ensure transparency.
              </p>
            </motion.div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {legalPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <motion.a
                    key={page.title}
                    href={page.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 cursor-pointer group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${page.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {page.description}
                    </p>
                  </motion.a>
                );
              })}
            </div>

            {/* Privacy Policy */}
            <motion.section
              id="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong>Last updated:</strong> November 18, 2025
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Information We Collect</h3>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Name and email address when you subscribe to our newsletter</li>
                  <li>Comments and feedback you provide on articles</li>
                  <li>Usage data and analytics through cookies and similar technologies</li>
                  <li>Device information and IP address for security purposes</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h3>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you newsletters and updates (with your consent)</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Protect against fraud and abuse</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Data Protection</h3>
                <p className="text-muted-foreground mb-6">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and encrypted during transmission.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Rights</h3>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </div>
            </motion.section>

            {/* Terms of Service */}
            <motion.section
              id="terms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Terms of Service</h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong>Last updated:</strong> November 18, 2025
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Acceptance of Terms</h3>
                <p className="text-muted-foreground mb-6">
                  By accessing and using GetKnowledge, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Use of Content</h3>
                <p className="text-muted-foreground mb-4">
                  All content on GetKnowledge is provided for educational and informational purposes. You may:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Read and share articles with proper attribution</li>
                  <li>Use code snippets in your projects (check individual licenses)</li>
                  <li>Reference our content in your own work with citation</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Prohibited Activities</h3>
                <p className="text-muted-foreground mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Scrape or copy content without permission</li>
                  <li>Use automated tools to access our platform excessively</li>
                  <li>Post malicious code or spam in comments</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Intellectual Property</h3>
                <p className="text-muted-foreground mb-6">
                  All content, including text, graphics, logos, and code, is the property of GetKnowledge or our content providers and is protected by copyright and intellectual property laws.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  GetKnowledge is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our platform.
                </p>
              </div>
            </motion.section>

            {/* Cookie Policy */}
            <motion.section
              id="cookies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-red-600">
                  <Cookie className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Cookie Policy</h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong>Last updated:</strong> November 18, 2025
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">What Are Cookies</h3>
                <p className="text-muted-foreground mb-6">
                  Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and analyze how our platform is used.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Types of Cookies We Use</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Essential Cookies</h4>
                      <p className="text-muted-foreground">Required for the website to function properly.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Analytics Cookies</h4>
                      <p className="text-muted-foreground">Help us understand how visitors use our site.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Preference Cookies</h4>
                      <p className="text-muted-foreground">Remember your settings and preferences.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Managing Cookies</h3>
                <p className="text-muted-foreground">
                  You can control and/or delete cookies through your browser settings. However, disabling cookies may affect your experience on our website.
                </p>
              </div>
            </motion.section>

            {/* Disclaimer */}
            <motion.section
              id="disclaimer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Disclaimer</h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong>Last updated:</strong> November 18, 2025
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Content Accuracy</h3>
                <p className="text-muted-foreground mb-6">
                  While we strive to provide accurate and up-to-date information, GetKnowledge makes no representations or warranties regarding the completeness, accuracy, or reliability of any content. Technology evolves rapidly, and information may become outdated.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Professional Advice</h3>
                <p className="text-muted-foreground mb-6">
                  The content on GetKnowledge is for educational purposes only and should not be considered professional advice. Always consult with qualified professionals for specific situations.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">External Links</h3>
                <p className="text-muted-foreground mb-6">
                  Our website may contain links to external sites. We are not responsible for the content, privacy policies, or practices of third-party websites.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Code Examples</h3>
                <p className="text-muted-foreground">
                  Code snippets and examples are provided for educational purposes. Test thoroughly before using in production environments. We are not liable for any issues arising from the use of our code examples.
                </p>
              </div>
            </motion.section>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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
                  <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Questions About Our Policies?
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    If you have any questions or concerns about our legal policies, please don't hesitate to contact us.
                  </p>
                  <Link href="#contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
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
