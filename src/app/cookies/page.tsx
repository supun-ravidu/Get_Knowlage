'use client';

import { motion } from 'framer-motion';
import { 
  Cookie,
  Shield,
  Settings,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Globe,
  BarChart,
  Palette,
  Lock,
  Eye,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const quickLinks = [
  { icon: Cookie, title: 'Cookie Types', href: '#types' },
  { icon: Settings, title: 'Manage Cookies', href: '#manage' },
  { icon: Shield, title: 'Consent', href: '#consent' },
  { icon: XCircle, title: 'Opt-Out', href: '#optout' }
];

const cookieTypes = [
  {
    icon: Lock,
    title: 'Essential Cookies',
    color: 'from-blue-600 to-cyan-600',
    description: 'Necessary for the website to function properly',
    canDisable: false,
    examples: [
      'Session management and authentication',
      'Security and fraud prevention',
      'Load balancing and performance',
      'User preferences and settings',
      'Shopping cart functionality'
    ],
    duration: 'Session or up to 1 year',
    purpose: 'These cookies are strictly necessary to provide you with services available through our website and to use some of its features.'
  },
  {
    icon: BarChart,
    title: 'Analytics Cookies',
    color: 'from-purple-600 to-pink-600',
    description: 'Help us understand how visitors interact with our website',
    canDisable: true,
    examples: [
      'Page views and visit duration',
      'Traffic sources and referrals',
      'Popular content and features',
      'User navigation patterns',
      'Device and browser information'
    ],
    duration: 'Up to 2 years',
    purpose: 'These cookies help us understand how our website is performing and how visitors are using it, allowing us to improve our services.'
  },
  {
    icon: Palette,
    title: 'Preference Cookies',
    color: 'from-green-600 to-emerald-600',
    description: 'Remember your preferences and personalize your experience',
    canDisable: true,
    examples: [
      'Language and region settings',
      'Theme preferences (dark/light mode)',
      'Font size and accessibility options',
      'Cookie consent choices',
      'Display layout preferences'
    ],
    duration: 'Up to 1 year',
    purpose: 'These cookies enable the website to remember choices you make and provide enhanced, more personalized features.'
  },
  {
    icon: Globe,
    title: 'Marketing Cookies',
    color: 'from-orange-600 to-red-600',
    description: 'Track visitor behavior for advertising purposes',
    canDisable: true,
    examples: [
      'Ad personalization and targeting',
      'Campaign performance tracking',
      'Social media integration',
      'Third-party advertising networks',
      'Conversion tracking'
    ],
    duration: 'Up to 13 months',
    purpose: 'These cookies are used to make advertising messages more relevant to you and your interests.'
  }
];

const thirdPartyCookies = [
  {
    name: 'Google Analytics',
    purpose: 'Website analytics and performance tracking',
    cookies: ['_ga', '_gid', '_gat'],
    duration: 'Up to 2 years',
    policy: 'https://policies.google.com/privacy'
  },
  {
    name: 'YouTube',
    purpose: 'Video content embedding',
    cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'PREF'],
    duration: 'Up to 8 months',
    policy: 'https://policies.google.com/privacy'
  },
  {
    name: 'Cloudflare',
    purpose: 'CDN and security services',
    cookies: ['__cfduid', '__cf_bm'],
    duration: 'Up to 30 days',
    policy: 'https://www.cloudflare.com/privacypolicy/'
  }
];

const browserInstructions = [
  {
    browser: 'Google Chrome',
    steps: [
      'Click the three dots menu in the top right corner',
      'Select "Settings" → "Privacy and security"',
      'Click "Cookies and other site data"',
      'Choose your preferred cookie settings',
      'To block all cookies, select "Block all cookies"'
    ]
  },
  {
    browser: 'Mozilla Firefox',
    steps: [
      'Click the menu button and select "Settings"',
      'Select "Privacy & Security" panel',
      'Under "Cookies and Site Data", adjust your settings',
      'Check "Delete cookies when Firefox is closed" if desired',
      'Click "Manage Data" to remove specific cookies'
    ]
  },
  {
    browser: 'Microsoft Edge',
    steps: [
      'Click the three dots menu in the top right',
      'Select "Settings" → "Cookies and site permissions"',
      'Click "Cookies and site data"',
      'Toggle "Block third-party cookies"',
      'Add sites to block or allow list'
    ]
  },
  {
    browser: 'Safari',
    steps: [
      'Open Safari Preferences from the menu',
      'Go to the "Privacy" tab',
      'Adjust "Cookies and website data" settings',
      'Check "Block all cookies" to disable them',
      'Click "Manage Website Data" to remove specific cookies'
    ]
  }
];

export default function CookiesPage() {
  const [selectedBrowser, setSelectedBrowser] = useState(0);

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
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-red-600 mb-6"
              >
                <Cookie className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Cookie{' '}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
                Learn about the cookies we use, why we use them, and how you can manage your cookie preferences on GetKnowledge.
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
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-orange-600 transition-colors">
                      {link.title}
                    </h3>
                  </motion.a>
                );
              })}
            </div>

            {/* What Are Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">What Are Cookies?</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.
                </p>
                <p className="mb-4">
                  Cookies allow websites to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Eye className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Your Control</h4>
                      <p>
                        You have full control over cookies. You can delete existing cookies, prevent cookies from being set, or be notified before a cookie is stored on your device. Learn how to manage cookies in the sections below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Cookie Types */}
            <motion.section
              id="types"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Types of Cookies We Use
              </h2>
              <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                We use different types of cookies for various purposes. Here's a detailed breakdown of each type and how we use them.
              </p>
              <div className="space-y-8">
                {cookieTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <motion.div
                      key={type.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`bg-gradient-to-br ${type.color} p-1 rounded-3xl`}
                    >
                      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-10">
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 md:mb-0`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <h3 className="text-2xl font-bold text-foreground mb-2 md:mb-0">
                                {type.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                  type.canDisable 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}>
                                  {type.canDisable ? 'Optional' : 'Required'}
                                </span>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {type.description}
                            </p>
                            <div className="mb-4">
                              <h4 className="font-bold text-foreground mb-2">Purpose:</h4>
                              <p className="text-sm text-muted-foreground">{type.purpose}</p>
                            </div>
                            <div className="mb-4">
                              <h4 className="font-bold text-foreground mb-3">Examples of Use:</h4>
                              <ul className="grid md:grid-cols-2 gap-2">
                                {type.examples.map((example, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{example}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Info className="w-4 h-4" />
                              <span><strong>Duration:</strong> {type.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Third-Party Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Third-Party Cookies
              </h2>
              <p className="text-muted-foreground mb-8">
                We use services from trusted third-party providers that may set their own cookies on your device. Here are the main third-party services we use:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {thirdPartyCookies.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.purpose}</p>
                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground">Cookies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.cookies.map(cookie => (
                            <span key={cookie} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-mono">
                              {cookie}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Duration:</strong> {service.duration}
                      </div>
                    </div>
                    <a
                      href={service.policy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Privacy Policy
                      <Globe className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Consent Management */}
            <motion.section
              id="consent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl p-1 mb-12"
            >
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Cookie Consent</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                  <p className="mb-6">
                    When you first visit GetKnowledge, you'll see a cookie consent banner that allows you to choose which types of cookies you want to accept. We respect your choices and only set the cookies you've approved.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-foreground mb-2">What We Do</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Ask for your consent before setting non-essential cookies</li>
                            <li>• Provide clear information about each cookie type</li>
                            <li>• Allow you to accept or reject specific categories</li>
                            <li>• Remember your preferences for future visits</li>
                            <li>• Make it easy to change your mind at any time</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Settings className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-foreground mb-2">Your Choices</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Accept all cookies for full functionality</li>
                            <li>• Reject optional cookies (analytics, marketing)</li>
                            <li>• Customize your preferences by category</li>
                            <li>• Change your settings at any time</li>
                            <li>• View details about each cookie type</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* How to Manage Cookies */}
            <motion.section
              id="manage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                How to Manage Cookies
              </h2>
              <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                You can manage cookies through your browser settings. Here's how to do it in popular browsers:
              </p>
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                {/* Browser Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {browserInstructions.map((browser, index) => (
                    <button
                      key={browser.browser}
                      onClick={() => setSelectedBrowser(index)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedBrowser === index
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {browser.browser}
                    </button>
                  ))}
                </div>

                {/* Instructions */}
                <motion.div
                  key={selectedBrowser}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {browserInstructions[selectedBrowser].browser}
                  </h3>
                  <ol className="space-y-4">
                    {browserInstructions[selectedBrowser].steps.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-red-600 text-white flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>

                <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Important Note</h4>
                      <p className="text-sm text-muted-foreground">
                        If you disable cookies, some features of GetKnowledge may not function properly. Essential cookies are required for basic functionality like security and authentication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Opt-Out Instructions */}
            <motion.section
              id="optout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-pink-600">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Opt-Out Options</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-6">
                  Beyond browser settings, you can opt out of specific types of tracking and cookies:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-blue-500" />
                      Google Analytics Opt-Out
                    </h4>
                    <p className="text-sm mb-4">
                      Install the Google Analytics Opt-out Browser Add-on to prevent Google Analytics from collecting your data across all websites.
                    </p>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Download Add-on
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-purple-500" />
                      Do Not Track (DNT)
                    </h4>
                    <p className="text-sm mb-4">
                      Enable "Do Not Track" in your browser settings to send a signal to websites that you don't want to be tracked.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Note: Not all websites honor DNT requests, but we respect this preference where possible.
                    </p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-green-500" />
                      Cookie Preference Center
                    </h4>
                    <p className="text-sm mb-4">
                      Access our Cookie Preference Center at any time to review and change your cookie consent choices.
                    </p>
                    <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                      Manage Preferences
                    </button>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-orange-500" />
                      Advertising Opt-Out
                    </h4>
                    <p className="text-sm mb-4">
                      Opt out of personalized advertising from participating companies through industry opt-out tools.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="https://optout.aboutads.info/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Digital Advertising Alliance
                      </a>
                      <a
                        href="https://www.youronlinechoices.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Your Online Choices (EU)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Impact of Opting Out</h4>
                      <p className="text-sm">
                        Opting out of cookies may impact your experience on GetKnowledge. You may need to re-enter information more frequently, some personalization features may not work, and certain site functionalities may be limited. Essential cookies cannot be disabled as they are required for the site to function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Updates to This Policy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Updates to This Policy
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make significant changes, we will:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Update the "Last updated" date at the top of this page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Notify you through a banner on our website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Request your renewed consent if required by law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Send an email to registered users about material changes</span>
                  </li>
                </ul>
                <p>
                  We encourage you to review this policy periodically to stay informed about how we use cookies and how you can protect your privacy.
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
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>
                <div className="relative">
                  <Cookie className="w-16 h-16 text-white mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Questions About Cookies?
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    If you have questions about our use of cookies or need help managing your preferences, we're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-orange-600 font-semibold hover:shadow-xl transition-shadow"
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
