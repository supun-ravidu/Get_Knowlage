'use client';

import { motion } from 'framer-motion';
import { 
  Target,
  Users,
  Award,
  Rocket,
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Code,
  Smartphone,
  Github,
  Linkedin,
  Mail,
  Globe,
  Calendar,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const stats = [
  { label: 'Articles Published', value: '200+', icon: Award },
  { label: 'Active Readers', value: '50K+', icon: Users },
  { label: 'Countries Reached', value: '120+', icon: Globe },
  { label: 'Years Experience', value: '5+', icon: Calendar },
];

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Empowering developers and tech enthusiasts with high-quality, actionable knowledge that drives innovation and growth.',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'Building a supportive community where knowledge is shared freely and everyone can learn and grow together.',
    color: 'from-pink-600 to-rose-600'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Staying at the forefront of technology trends and sharing cutting-edge insights with our community.',
    color: 'from-yellow-600 to-orange-600'
  },
  {
    icon: Shield,
    title: 'Quality Content',
    description: 'Every article is thoroughly researched, fact-checked, and crafted to provide real value to our readers.',
    color: 'from-green-600 to-emerald-600'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'GetKnowledge was founded with a mission to democratize tech education and make quality content accessible to everyone.',
    icon: Rocket
  },
  {
    year: '2021',
    title: 'Community Growth',
    description: 'Reached 10,000 monthly readers and established our presence across multiple countries.',
    icon: Users
  },
  {
    year: '2022',
    title: 'Content Expansion',
    description: 'Expanded coverage to include AI/ML, DevOps, and mobile development topics.',
    icon: TrendingUp
  },
  {
    year: '2023',
    title: 'Platform Enhancement',
    description: 'Launched interactive features, improved UX, and introduced personalized content recommendations.',
    icon: Zap
  },
  {
    year: '2024',
    title: 'Recognition',
    description: 'Featured in top tech publications and won "Best Tech Blog" award.',
    icon: Award
  },
  {
    year: '2025',
    title: 'Innovation Hub',
    description: 'Launched AI-powered learning paths and became a trusted resource for developers worldwide.',
    icon: Target
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Hero Section */}
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
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GetKnowledge
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to make technology education accessible, engaging, and impactful. 
                Join thousands of developers and tech enthusiasts learning, growing, and building amazing things.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mission & Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-20"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Our Story & Mission
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      GetKnowledge was born from a simple belief: <strong className="text-foreground">quality tech education should be accessible to everyone</strong>, regardless of their background or location.
                    </p>
                    <p>
                      What started as a personal blog has evolved into a comprehensive knowledge platform serving thousands of developers, designers, and tech enthusiasts worldwide. We cover everything from web development and mobile apps to AI, DevOps, and emerging technologies.
                    </p>
                    <p>
                      Our mission is to empower the next generation of innovators by providing <strong className="text-foreground">practical, actionable content</strong> that bridges the gap between theory and real-world application.
                    </p>
                    <p>
                      Every article, tutorial, and guide is crafted with care, thoroughly researched, and designed to help you level up your skills and advance your career.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src="https://drive.google.com/uc?export=view&id=1uvoPTQJ363cXTiGr43lFe5gaXlJ5Jz06"
                      alt="GetKnowledge Mission"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Our Core Values
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 blur-3xl`} />
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} mb-4`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Developer Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Meet the Developer
              </h2>
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-1">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Profile Image */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="md:col-span-1"
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="https://scontent.fcmb4-2.fna.fbcdn.net/v/t39.30808-1/578796508_2321235334967267_2077302185250955972_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHxnqvnEU_tIcTZxkDpikXxYlDE2JLEAvhiUMTYksQC-Pm51u7DbW63lF776ZTowFsQHf0poBIJX68_DvSH1tWT&_nc_ohc=kguxHJ4zxhQQ7kNvwHR3vXF&_nc_oc=AdnKTH1Ua1wKKPLZ8-ww_MOLcHJVORAUM1OKCWmRiu_tCmVuSS_pi1UwYpUW-Q5NzCD_VA97LWe3XvDerhavmsnP&_nc_zt=24&_nc_ht=scontent.fcmb4-2.fna&_nc_gid=ExzIFOPYgv1nZLQQo0erZg&oh=00_AfhAhzMxHtd0uvT3QrHPuMvv6lyNTdbkY9RFIOUTJ_sGTQ&oe=69228224"
                          alt="Supun Ravidu Bandara Rathnayaka"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent" />
                      </div>
                    </motion.div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Supun Ravidu Bandara Rathnayaka
                      </h3>
                      <p className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Web & Mobile Developer
                      </p>
                      
                      <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
                        <p>
                          Full-stack web developer and Android mobile developer with a passion for creating innovative digital solutions. 
                          Specializing in modern web technologies and mobile app development.
                        </p>
                        <p>
                          With expertise in cutting-edge frameworks and a commitment to clean, efficient code, 
                          I build scalable applications that solve real-world problems and deliver exceptional user experiences.
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          Specializations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {['Web Development', 'Android Development', 'React', 'Next.js', 'Node.js', 'Mobile Apps', 'Full-Stack'].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex flex-wrap gap-3">
                        <Link href="https://github.com/supun-ravidu" target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                            GitHub
                          </motion.button>
                        </Link>
                        <Link href="https://www.linkedin.com/in/supun-ravidu-bandara-rathnayaka-7a1523294/" target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                          </motion.button>
                        </Link>
                        <Link href="https://wa.me/94776824351" target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            <Smartphone className="w-5 h-5" />
                            WhatsApp
                          </motion.button>
                        </Link>
                        <Link href="tel:+94776824351">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-shadow"
                          >
                            <Smartphone className="w-5 h-5" />
                            +94 77 682 4351
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Milestones Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Our Journey
              </h2>
              <div className="max-w-4xl mx-auto">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="relative pl-8 pb-12 last:pb-0"
                    >
                      {/* Timeline Line */}
                      {index !== milestones.length - 1 && (
                        <div className="absolute left-[15px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />
                      )}
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 text-white" />
                      </div>

                      {/* Content */}
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {milestone.year}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-blue-600/50 to-transparent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Join Our Community
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    Be part of our growing community of developers, designers, and tech enthusiasts. 
                    Subscribe to get the latest articles delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/blog">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
                      >
                        Explore Articles
                      </motion.button>
                    </Link>
                    <Link href="#contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors"
                      >
                        Get in Touch
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
