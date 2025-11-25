'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SubscriptionBenefits from '@/components/newsletter/SubscriptionBenefits';
import FrequencyAndContent from '@/components/newsletter/FrequencyAndContent';
import NewsletterArchive from '@/components/newsletter/NewsletterArchive';
import SuccessStories from '@/components/newsletter/SuccessStories';
import NewsletterSignup from '@/components/NewsletterSignup';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NewsletterPage = () => {
  return (
    <div className="relative min-h-screen bg-[#141414]">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <NewsletterSignup />
        <motion.main
          className="max-w-5xl mx-auto px-4 py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-center mb-12 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Newsletter Features
          </motion.h1>
          <SubscriptionBenefits />
          <FrequencyAndContent />
          <NewsletterArchive />
          <SuccessStories />
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};

export default NewsletterPage;
