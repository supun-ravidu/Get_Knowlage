'use client';

import { motion } from 'framer-motion';
import { 
  FileText,
  Scale,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Users,
  Book,
  Code,
  Ban,
  Gavel,
  Info,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const quickLinks = [
  { icon: Book, title: 'Usage Guidelines', href: '#usage' },
  { icon: Shield, title: 'Content Policies', href: '#content' },
  { icon: Users, title: 'User Responsibilities', href: '#responsibilities' },
  { icon: AlertTriangle, title: 'Disclaimer', href: '#disclaimer' }
];

const acceptableUse = [
  'Read and share articles with proper attribution',
  'Use code snippets in your projects (respecting licenses)',
  'Leave constructive comments and feedback',
  'Subscribe to newsletters and updates',
  'Reference our content with citations',
  'Participate in community discussions'
];

const prohibitedActivities = [
  'Scraping or copying content without permission',
  'Using automated tools to access the site excessively',
  'Posting malicious code, spam, or harmful content',
  'Impersonating others or providing false information',
  'Violating intellectual property rights',
  'Engaging in harassment or abusive behavior',
  'Attempting to hack or compromise security',
  'Distributing malware or viruses'
];

const contentGuidelines = [
  {
    icon: CheckCircle,
    title: 'Educational Content',
    description: 'All content is provided for educational and informational purposes',
    color: 'text-green-500'
  },
  {
    icon: Code,
    title: 'Code Examples',
    description: 'Code snippets are provided as-is; test thoroughly before production use',
    color: 'text-blue-500'
  },
  {
    icon: Book,
    title: 'Attribution Required',
    description: 'When sharing our content, please provide proper attribution and links',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Copyright Protection',
    description: 'All content is protected by copyright and intellectual property laws',
    color: 'text-orange-500'
  }
];

const userResponsibilities = [
  {
    title: 'Account Security',
    items: [
      'Keep your account credentials secure',
      'Use strong, unique passwords',
      'Notify us immediately of unauthorized access',
      'Do not share your account with others'
    ]
  },
  {
    title: 'Content Usage',
    items: [
      'Verify code examples before implementation',
      'Respect copyright and licensing terms',
      'Provide attribution when required',
      'Use content ethically and legally'
    ]
  },
  {
    title: 'Community Conduct',
    items: [
      'Be respectful to other users',
      'Contribute constructively to discussions',
      'Report inappropriate content or behavior',
      'Follow community guidelines'
    ]
  }
];

export default function TermsPage() {
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
                Terms of{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
                Please read these terms carefully before using GetKnowledge. By accessing our platform, you agree to be bound by these terms.
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

            {/* Acceptance of Terms */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                  <Gavel className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Acceptance of Terms</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  By accessing and using GetKnowledge, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.
                </p>
                <p className="mb-4">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform after changes are posted constitutes your acceptance of the modified terms.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Important Notice</h4>
                      <p>
                        These terms constitute a legally binding agreement between you and GetKnowledge. Please review them carefully and contact us if you have any questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Usage Guidelines */}
            <motion.section
              id="usage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Usage Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Acceptable Use */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl p-1"
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-green-600">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Acceptable Use</h3>
                    </div>
                    <ul className="space-y-3">
                      {acceptableUse.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Prohibited Activities */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-1"
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-red-600">
                        <Ban className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Prohibited Activities</h3>
                    </div>
                    <ul className="space-y-3">
                      {prohibitedActivities.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Content Policies */}
            <motion.section
              id="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Content Policies
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contentGuidelines.map((guideline, index) => {
                  const Icon = guideline.icon;
                  return (
                    <motion.div
                      key={guideline.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6"
                    >
                      <Icon className={`w-12 h-12 ${guideline.color} mb-4`} />
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {guideline.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {guideline.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Intellectual Property */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Intellectual Property Rights
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  All content on GetKnowledge, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and code snippets, is the property of GetKnowledge or its content providers and is protected by international copyright laws.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      Our Rights
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Exclusive ownership of original content</li>
                      <li>• Right to modify or remove content</li>
                      <li>• Protection under copyright laws</li>
                      <li>• Trademark rights to logos and branding</li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-500" />
                      Your License
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Personal, non-commercial use</li>
                      <li>• Must include attribution when sharing</li>
                      <li>• Cannot modify without permission</li>
                      <li>• Subject to these Terms of Service</li>
                    </ul>
                  </div>
                </div>
                <p>
                  If you believe any content on our platform infringes your intellectual property rights, please contact us immediately with detailed information about the alleged infringement.
                </p>
              </div>
            </motion.section>

            {/* User Responsibilities */}
            <motion.section
              id="responsibilities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                User Responsibilities
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {userResponsibilities.map((responsibility, index) => (
                  <motion.div
                    key={responsibility.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {responsibility.title}
                    </h3>
                    <ul className="space-y-3">
                      {responsibility.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Disclaimer */}
            <motion.section
              id="disclaimer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl p-1 mb-12"
            >
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-red-600">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Disclaimer</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">No Warranty</h3>
                    <p>
                      GetKnowledge is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the service will be uninterrupted, secure, or error-free.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Content Accuracy</h3>
                    <p>
                      While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the completeness, accuracy, reliability, or currency of any content. Technology evolves rapidly, and information may become outdated.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Limitation of Liability</h3>
                    <p>
                      In no event shall GetKnowledge, its affiliates, or its contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your use or inability to use the service</li>
                      <li>Any unauthorized access to or use of our servers</li>
                      <li>Any bugs, viruses, or harmful code</li>
                      <li>Any errors or omissions in content</li>
                      <li>Any conduct of third parties on the platform</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Professional Advice</h3>
                    <p>
                      The content on GetKnowledge is for educational and informational purposes only. It should not be considered professional, legal, financial, or technical advice. Always consult with qualified professionals for specific situations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Code Examples</h3>
                    <p>
                      Code snippets and examples are provided for educational purposes. Test thoroughly in a development environment before using in production. We are not liable for any issues, damages, or losses arising from the use of our code examples.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">External Links</h3>
                    <p>
                      Our website may contain links to external sites. We are not responsible for the content, privacy policies, practices, or availability of third-party websites. Access to external sites is at your own risk.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Termination
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  We reserve the right to suspend or terminate your access to GetKnowledge at any time, without prior notice, for any reason, including but not limited to:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Violation of these Terms of Service',
                    'Fraudulent or illegal activities',
                    'Abuse of the platform or its users',
                    'Providing false information',
                    'Engaging in activities that harm the platform'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Upon termination, your right to use the platform will immediately cease. All provisions that should reasonably survive termination will continue to apply.
                </p>
              </div>
            </motion.section>

            {/* Governing Law */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Governing Law & Jurisdiction
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  These Terms of Service shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these terms or your use of GetKnowledge shall be subject to the exclusive jurisdiction of the courts of Sri Lanka. You agree to submit to the personal jurisdiction of such courts.
                </p>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
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
                  <FileText className="w-16 h-16 text-white mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Questions About These Terms?
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    If you have any questions or concerns about our Terms of Service, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
                      >
                        <Mail className="w-5 h-5" />
                        Contact Us
                      </motion.button>
                    </Link>
                    <Link href="/privacy">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors"
                      >
                        Privacy Policy
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
