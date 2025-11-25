'use client';

import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Code,
  Lightbulb,
  Target,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Zap
} from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Users,
    title: 'Consulting Services',
    description: 'Expert guidance to transform your business with cutting-edge technology solutions and strategic insights.',
    features: [
      'Technology strategy consulting',
      'Digital transformation planning',
      'System architecture design',
      'Performance optimization',
      'Security assessments'
    ],
    price: 'Starting at $150/hour'
  },
  {
    icon: BookOpen,
    title: 'Training Programs',
    description: 'Comprehensive training programs designed to upskill your team in the latest technologies and best practices.',
    features: [
      'Custom curriculum development',
      'Hands-on workshops',
      'Certification preparation',
      'Team training sessions',
      'Ongoing mentorship'
    ],
    price: 'Starting at $500/person'
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored software solutions built from the ground up to meet your unique business requirements.',
    features: [
      'Web application development',
      'Mobile app development',
      'API development & integration',
      'Database design & optimization',
      'Cloud infrastructure setup'
    ],
    price: 'Custom pricing'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechStart Inc.',
    content: 'The consulting services helped us modernize our entire tech stack. Highly recommend!',
    rating: 5
  },
  {
    name: 'David Kim',
    role: 'Founder, InnovateLab',
    content: 'Outstanding training programs. Our team gained valuable skills that boosted productivity.',
    rating: 5
  },
  {
    name: 'Maria Rodriguez',
    role: 'Product Manager, DevCorp',
    content: 'Custom development exceeded our expectations. Professional, timely, and innovative.',
    rating: 5
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Professional Services</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Empower Your Business
              </h1>

              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                From strategic consulting to custom development, we provide comprehensive solutions
                to help your business thrive in the digital age.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg flex items-center gap-2"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  Get Started
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Services
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Comprehensive solutions designed to accelerate your business growth and technological advancement.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-gray-400 mb-6">{service.description}</p>

                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 font-semibold">{service.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedService(service.title)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium"
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose Us?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We combine expertise, innovation, and dedication to deliver exceptional results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Results-Driven</h3>
                <p className="text-gray-400">We focus on measurable outcomes that drive your business forward.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto"
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Expert Team</h3>
                <p className="text-gray-400">Our experienced professionals bring deep industry knowledge and skills.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto"
                >
                  <Clock className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Timely Delivery</h3>
                <p className="text-gray-400">We respect your time and deliver projects on schedule, every time.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 px-4 md:px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto"
              >
                <Lightbulb className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Get Started?
              </h2>

              <p className="text-xl text-gray-400">
                Let's discuss how we can help transform your business with our professional services.
              </p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                Contact Us Today
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
