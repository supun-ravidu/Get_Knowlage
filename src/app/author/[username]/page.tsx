'use client';

import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Users,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Clock,
  Eye,
  Heart,
  Star,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

type Author = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  imageUrl: string;
  role?: string;
  location?: string;
  joinDate?: string;
  email?: string;
  website?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  stats?: {
    articles: number;
    followers: number;
    totalViews: number;
    totalLikes: number;
  };
  expertise?: { name: string; level: number; color: string }[];
  specializations?: string[];
  achievements?: { title: string; description: string; icon: string }[];
};

type Article = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
};

import { use } from 'react';

async function fetchAuthorData(username: string) {
  try {
    const res = await fetch('/api/authors');
    if (!res.ok) throw new Error('Failed to fetch authors');
    const data = await res.json();
    const foundAuthor = data.authors.find((a: Author) => a.slug === username);
    if (!foundAuthor) {
      throw new Error('Author Not Found');
    }

    // Fetch articles by this author from blogs API filtered by author name
    const articlesRes = await fetch(`/api/blogs?author=${encodeURIComponent(foundAuthor.name)}`);
    let articles = [];
    if (articlesRes.ok) {
      const articlesData = await articlesRes.json();
      articles = articlesData.blogs || [];
    }

    return { author: foundAuthor, articles };
  } catch (error) {
    throw error;
  }
}

export default function AuthorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [author, setAuthor] = useState<Author | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'articles' | 'about'>('articles');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const { author, articles } = await fetchAuthorData(username);
        setAuthor(author);
        setArticles(articles);
        setNotFound(false);
      } catch (error) {
        console.error('Error fetching author:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white text-lg font-semibold">
          Loading author...
        </div>
      </div>
    );
  }

  if (notFound || !author) {
    return (
      <div className="min-h-screen bg-[#141414] relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center text-white">
          <Navbar />
          <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
            <p className="text-gray-400 mb-8">The author you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              >
                Back to Blog
              </motion.button>
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const joinYear = author.joinDate ? new Date(author.joinDate).getFullYear() : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#141414] relative text-white">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Author Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="relative"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-blue-600/20">
                    {author.imageUrl ? (
                      <Image
                        src={author.imageUrl}
                        alt={author.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-400">
                        <User size={64} />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                {/* Author Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {author.name}
                      </h1>
                      <p className="text-xl text-blue-600 dark:text-blue-400 mb-3">
                        {author.role}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{author.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {joinYear}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${author.email}`} className="hover:text-blue-600 transition-colors">
                            {author.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                      {author.socialLinks?.github && (
                        <a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer">
                          <motion.div
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </motion.div>
                        </a>
                      )}
                      {author.socialLinks?.linkedin && (
                        <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <motion.div
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </motion.div>
                        </a>
                      )}
                      {author.socialLinks?.twitter && (
                        <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <motion.div
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
                          </motion.div>
                        </a>
                      )}
                      {author.website && (
                        <a href={author.website} target="_blank" rel="noopener noreferrer">
                          <motion.div
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-colors"
                          >
                            <Globe className="w-5 h-5" />
                          </motion.div>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {author.bio}
                  </p>

                  {/* Stats */}
                  {author.stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-xl p-4 border border-blue-600/20">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-muted-foreground">Articles</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{author.stats.articles}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl p-4 border border-purple-600/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-muted-foreground">Followers</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{author.stats.followers.toLocaleString()}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-xl p-4 border border-green-600/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">Total Views</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{author.stats.totalViews.toLocaleString()}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-xl p-4 border border-orange-600/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-muted-foreground">Total Likes</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{author.stats.totalLikes.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'articles'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-muted-foreground hover:text-foreground'
                }`}
              >
                Articles ({articles.length})
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'about'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-muted-foreground hover:text-foreground'
                }`}
              >
                About
              </button>
            </div>

            {/* Content */}
            {activeTab === 'articles' && (
              <motion.div
                key="articles-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {articles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <Link href={`/blog/${article.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={800}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="px-2 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{article.likes}</span>
                            </div>
                          </div>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Expertise */}
                {author.expertise && author.expertise.length > 0 && (
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      Technical Expertise
                    </h2>
                    <div className="space-y-4">
                      {author.expertise.map((skill: any, index: number) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specializations */}
                {author.specializations && author.specializations.length > 0 && (
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      Specializations
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {author.specializations.map((spec: string, index: number) => (
                        <motion.div
                          key={spec}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-3 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-600/20 text-center font-medium text-foreground"
                        >
                          {spec}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {author.achievements && author.achievements.length > 0 && (
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Award className="w-6 h-6 text-orange-500" />
                      Achievements & Recognition
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {author.achievements.map((achievement: any, index: number) => {
                        // Simple icon mapping based on achievement.icon string
                        const getIcon = (iconName: string) => {
                          switch (iconName) {
                            case 'Award': return Award;
                            case 'Star': return Star;
                            case 'CheckCircle': return CheckCircle;
                            case 'BookOpen': return BookOpen;
                            default: return Award;
                          }
                        };
                        const Icon = getIcon(achievement.icon);

                        return (
                          <motion.div
                            key={achievement.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-orange-600/10 to-yellow-600/10 border border-orange-600/20"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-yellow-600 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-1">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Want to Connect?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Feel free to reach out for collaborations, questions, or just to say hi!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={`mailto:${author.email}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
                      >
                        <Mail className="w-5 h-5" />
                        Send Email
                      </motion.button>
                    </a>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors"
                      >
                        Contact Form
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
