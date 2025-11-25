'use client';

import { motion } from 'framer-motion';
import { 
  Mail,
  Send,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Globe,
  CheckCircle,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'supunravidubandara@gmail.com',
    href: 'mailto:supunravidubandara@gmail.com',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+94 77 682 4351',
    href: 'tel:+94776824351',
    color: 'from-purple-600 to-pink-600'
  },
  {
    icon: Smartphone,
    title: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/94776824351',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: 'from-orange-600 to-red-600'
  }
];

const socialLinks = [
  { icon: Github, name: 'GitHub', href: 'https://github.com/supun-ravidu', color: 'hover:bg-gray-900' },
  { icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/supun-ravidu-bandara-rathnayaka-7a1523294/', color: 'hover:bg-blue-600' },
  { icon: Twitter, name: 'Twitter', href: 'https://twitter.com', color: 'hover:bg-blue-400' },
  { icon: Facebook, name: 'Facebook', href: 'https://facebook.com', color: 'hover:bg-blue-700' },
  { icon: Instagram, name: 'Instagram', href: 'https://instagram.com', color: 'hover:bg-pink-600' },
];

const faqs = [
  {
    question: 'How quickly will I receive a response?',
    answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please mention "URGENT" in your subject line.'
  },
  {
    question: 'Can I request a specific topic for an article?',
    answer: 'Absolutely! We love hearing from our community. Use the contact form to suggest topics you\'d like us to cover, and we\'ll do our best to create content that meets your needs.'
  },
  {
    question: 'Do you offer consulting or development services?',
    answer: 'Yes! We provide web development and Android mobile development services. Contact us with your project details, and we\'ll discuss how we can help.'
  },
  {
    question: 'How can I contribute to GetKnowledge?',
    answer: 'We welcome guest contributions! Reach out to us with your article pitch or topic idea. We\'ll review it and get back to you with feedback.'
  },
  {
    question: 'Can I republish your articles?',
    answer: 'Please contact us for permission to republish content. We generally allow republishing with proper attribution and a link back to the original article.'
  },
  {
    question: 'Do you offer technical support for code examples?',
    answer: 'While we can\'t provide direct technical support, you can leave comments on articles or reach out with specific questions. We\'ll do our best to help!'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
                <MessageCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Get in{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you. 
                Drop us a message and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 h-full cursor-pointer group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {info.value}
                    </p>
                  </motion.div>
                );

                return info.href ? (
                  <Link key={info.title} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {content}
                  </Link>
                ) : (
                  <div key={info.title}>
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-10">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>
                  
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Business Info & Social */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {/* Business Email */}
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-1">
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Business Email
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          For business inquiries, partnerships, or collaboration opportunities
                        </p>
                        <Link href="mailto:supunravidubandara@gmail.com">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="text-blue-600 font-semibold hover:underline break-all"
                          >
                            supunravidubandara@gmail.com
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-red-600">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Response Time
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We typically respond within <span className="text-foreground font-semibold">24 hours</span> during business days (Monday - Friday).
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span>Business Hours: 9:00 AM - 6:00 PM (GMT+5:30)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Connect on Social Media
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:text-white transition-colors ${social.color}`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{social.name}</span>
                          </motion.button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 text-left hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0 ${openFaq === index ? 'rotate-90' : ''} transition-transform`}>
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {faq.question}
                          </h3>
                          <motion.div
                            initial={false}
                            animate={{
                              height: openFaq === index ? 'auto' : 0,
                              opacity: openFaq === index ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-muted-foreground pt-2">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
