'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { User, Search, Filter, MapPin, Mail, Globe, Award, BookOpen, Users, Eye, Heart, Star } from 'lucide-react';

type Author = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  imageUrl: string;
  role?: string;
  location?: string;
  email?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    [key: string]: string | undefined;
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

export default function AuthorsPage() {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'followers' | 'articles'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await fetch('/api/authors');
        if (res.ok) {
          const data = await res.json();
          setAuthors(data.authors);
          setFilteredAuthors(data.authors);
        } else {
          console.error('Failed to fetch authors');
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthors();
  }, []);

  useEffect(() => {
    let filtered = authors.filter(author => {
      const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           author.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (author.role && author.role.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSpecialization = !selectedSpecialization ||
                                   (author.specializations && author.specializations.some(spec =>
                                     spec.toLowerCase().includes(selectedSpecialization.toLowerCase())
                                   ));

      return matchesSearch && matchesSpecialization;
    });

    // Sort authors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          return (b.stats?.followers || 0) - (a.stats?.followers || 0);
        case 'articles':
          return (b.stats?.articles || 0) - (a.stats?.articles || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredAuthors(filtered);
  }, [authors, searchTerm, selectedSpecialization, sortBy]);

  const allSpecializations = Array.from(
    new Set(authors.flatMap(author => author.specializations || []))
  ).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white text-lg font-semibold">
          Loading authors...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] relative text-white">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Meet Our Authors
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the talented writers, developers, and creators behind our content.
              From tech experts to creative minds, explore their stories and expertise.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-white/10"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search authors by name, bio, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Specializations</option>
                  {allSpecializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'followers' | 'articles')}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="followers">Sort by Followers</option>
                  <option value="articles">Sort by Articles</option>
                </select>

                <div className="flex rounded-xl bg-white/10 border border-white/20 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`px-4 py-3 ${viewMode === 'masonry' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Masonry
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Authors Grid */}
          {filteredAuthors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-400">No authors found matching your criteria.</p>
            </motion.div>
          ) : (
            <motion.div
              className={viewMode === 'masonry'
                ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                : "grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredAuthors.map((author, index) => (
                <motion.div
                  key={author.id}
                  className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : 'flex flex-col'} cursor-pointer`}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => router.push(`/author/${author.slug}`)}
                >
                    {/* Author Image */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-4 ring-blue-600/20 mb-4 group">
                      {author.imageUrl ? (
                        <Image
                          src={author.imageUrl}
                          alt={author.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400">
                          <User size={64} />
                        </div>
                      )}
                      {author.stats && (
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {author.stats.followers.toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Author Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{author.name}</h3>
                        {author.role && (
                          <p className="text-blue-400 font-medium text-sm">{author.role}</p>
                        )}
                      </div>

                      <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">{author.bio}</p>

                      {/* Stats */}
                      {author.stats && (
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>{author.stats.articles}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{author.stats.totalViews.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{author.stats.totalLikes.toLocaleString()}</span>
                          </div>
                        </div>
                      )}

                      {/* Specializations */}
                      {author.specializations && author.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {author.specializations.slice(0, 2).map((spec, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">
                              {spec}
                            </span>
                          ))}
                          {author.specializations.length > 2 && (
                            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                              +{author.specializations.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="flex items-center gap-3 text-gray-400 text-sm">
                        {author.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{author.location}</span>
                          </div>
                        )}
                        {author.email && (
                          <a href={`mailto:${author.email}`} className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {author.website && (
                          <a href={author.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center gap-3">
                        {author.socialLinks.twitter && (
                          <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center hover:bg-blue-600/40 transition-colors">
                            <span className="text-blue-400 text-sm font-bold">T</span>
                          </a>
                        )}
                        {author.socialLinks.linkedin && (
                          <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-blue-700/20 flex items-center justify-center hover:bg-blue-700/40 transition-colors">
                            <span className="text-blue-600 text-sm font-bold">L</span>
                          </a>
                        )}
                        {author.socialLinks.github && (
                          <a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-700/20 flex items-center justify-center hover:bg-gray-700/40 transition-colors">
                            <span className="text-gray-400 text-sm font-bold">G</span>
                          </a>
                        )}
                      </div>
                    </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
