'use client';

import { motion } from 'framer-motion';
import {
  Megaphone,
  Download,
  Mail,
  Phone,
  Users,
  Eye,
  TrendingUp,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const advertisingOptions = [
  {
    icon: Eye,
    title: 'Banner Ads',
    description: 'Premium banner placements across our high-traffic pages with guaranteed impressions.',
    features: ['Multiple sizes available', 'A/B testing included', 'Real-time analytics'],
    price: 'Starting at $299/month'
  },
  {
    icon: Users,
    title: 'Sponsored Content',
    description: 'Native sponsored articles and content integration that resonates with our audience.',
    features: ['Custom content creation', 'Social media promotion', 'Performance tracking'],
    price: 'Starting at $999/month'
  },
  {
    icon: TrendingUp,
    title: 'Newsletter Sponsorship',
    description: 'Reach our engaged subscriber base through exclusive newsletter placements.',
    features: ['Dedicated newsletter issue', 'Custom call-to-action', 'Subscriber data insights'],
    price: 'Starting at $499/month'
  },
  {
    icon: Star,
    title: 'Premium Partnership',
    description: 'Full partnership package with multiple touchpoints and co-branding opportunities.',
    features: ['All advertising options', 'Co-branded content', 'Priority support'],
    price: 'Custom pricing'
  }
];

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleDownload = () => {
    // Simulate media kit download
    const link = document.createElement('a');
    link.href = '/media-kit.pdf'; // Placeholder
    link.download = 'GetKnowledge_MediaKit.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#141414] relative">
      {/* Animated Background */}
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
              >
                <Megaphone className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Advertising Opportunities</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Reach Your Audience
              </h1>

              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Partner with GetKnowledge to connect with tech-savvy professionals, developers, and innovators.
                Our engaged community of over 50,000 monthly visitors is ready to discover your brand.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Media Kit
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact for Sponsorships
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Advertising Options */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Advertising Options
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Choose from our flexible advertising packages designed to maximize your brand's visibility and engagement.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advertisingOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
                    >
                      <option.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                      <p className="text-gray-400 mb-4">{option.description}</p>

                      <ul className="space-y-2 mb-6">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="text-blue-400 font-semibold">{option.price}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-8"
              >
                <Download className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Media Kit
              </h2>

              <p className="text-xl text-gray-400 mb-8">
                Download our comprehensive media kit to learn more about our audience demographics,
                traffic statistics, and available advertising opportunities.
              </p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                Download Media Kit (PDF)
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Contact for Sponsorships
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ready to partner with us? Get in touch to discuss custom sponsorship opportunities
                and create something amazing together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Email</div>
                        <a href="mailto:advertise@getknowledge.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                          advertise@getknowledge.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Phone</div>
                        <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition-colors">
                          +1 (234) 567-8900
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Why Partner With Us?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      50,000+ monthly engaged visitors
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      Tech-focused, high-value audience
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      Proven track record of successful partnerships
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      Transparent reporting and analytics
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Tell us about your sponsorship goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
