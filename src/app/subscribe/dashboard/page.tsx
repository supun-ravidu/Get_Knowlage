'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SubscriptionBenefits from '@/components/newsletter/SubscriptionBenefits';
import FrequencyAndContent from '@/components/newsletter/FrequencyAndContent';
import NewsletterArchive from '@/components/newsletter/NewsletterArchive';
import SuccessStories from '@/components/newsletter/SuccessStories';
import { LogOut, User, Mail, Calendar, CheckCircle } from 'lucide-react';

export default function SubscribeDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/subscribe/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center"
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Subscription Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user.email}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Subscription</h2>
              <p className="text-gray-600 dark:text-gray-400">You're receiving our weekly newsletter</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-400">Email: {user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600 dark:text-gray-400">Joined: {new Date(user.metadata.creationTime).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-600 dark:text-gray-400">Status: Active</span>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Subscription Benefits
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Enjoy exclusive access to premium content, insights, and community features.
            </p>
          </div>

          <SubscriptionBenefits />
          <FrequencyAndContent />
          <NewsletterArchive />
          <SuccessStories />
        </motion.main>
      </div>
    </div>
  );
}