'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SubscriptionBenefits = () => {
  const benefits = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Exclusive Insights',
      description: 'Get weekly articles and resources that you won’t find anywhere else.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Early Access',
      description: 'Be the first to know about new content, products, and special offers.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
      title: 'Community Updates',
      description: 'Stay connected with the latest news, events, and discussions.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className="mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-white"
        variants={itemVariants}
      >
        Why Subscribe?
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 border border-gray-700"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {benefit.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
            <p className="text-gray-300">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SubscriptionBenefits;
