'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  LogOut,
  Shield,
  Activity,
  Eye,
  MessageSquare,
  Calendar,
  Settings,
  X,
  User,
  Plus,
  Edit2,
  Trash2,
  User as UserIcon,
  Mail,
  Globe,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  BookOpen,
  Heart,
  Eye as EyeIcon,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    // for blog or author form, dynamic switching
  });
  const [submitting, setSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [mode, setMode] = useState<'blog' | 'author'>('blog');

  // New state for dashboard navigation section selection
  const [activeSection, setActiveSection] = useState<'dashboard' | 'blogs' | 'authors' | 'subscribers'>('dashboard');
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);  // Selected author for detail view

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBlogs();
        fetchAuthors();
        fetchSubscribers();
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/authors');
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.authors);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/subscribers');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditBlog = (blog: any) => {
    setMode('blog');
    setEditingItem(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      image: blog.image,
      tags: blog.tags ? blog.tags.join(', ') : '',
      published: blog.published,
    });
    setShowCreateForm(true);
  };

  const handleEditAuthor = (author: any) => {
    setMode('author');
    setEditingItem(author);
    setFormData({
      name: author.name,
      slug: author.slug,
      bio: author.bio,
      imageUrl: author.imageUrl,
      role: author.role || '',
      location: author.location || '',
      joinDate: author.joinDate || '',
      email: author.email || '',
      website: author.website || '',
      twitter: author.socialLinks?.twitter || '',
      linkedin: author.socialLinks?.linkedin || '',
      github: author.socialLinks?.github || '',
      articles: author.stats?.articles || 0,
      followers: author.stats?.followers || 0,
      totalViews: author.stats?.totalViews || 0,
      totalLikes: author.stats?.totalLikes || 0,
      expertise: author.expertise ? author.expertise.map((e: any) => `${e.name}:${e.level}:${e.color}`).join('\n') : '',
      specializations: author.specializations ? author.specializations.join(', ') : '',
      achievements: author.achievements ? author.achievements.map((a: any) => `${a.title}|${a.description}|${a.icon}`).join('\n') : '',
    });
    setShowCreateForm(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Blog post deleted successfully!');
        fetchBlogs();
      } else {
        const error = await response.json();
        alert(`Error deleting blog: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog post. Please try again.');
    }
  };

  const handleDeleteAuthor = async (authorId: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/authors?id=${encodeURIComponent(authorId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Author deleted successfully!');
        fetchAuthors();
      } else {
        const errorText = await response.text();
        try {
          const error = JSON.parse(errorText);
          alert(`Error deleting author: ${error.error}`);
        } catch {
          alert(`Error deleting author: ${errorText || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error deleting author:', error);
      alert('Error deleting author. Please try again.');
    }
  };

  const handleApproveSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to approve this subscriber?')) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/subscribers/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ subscriberId }),
      });

      if (response.ok) {
        alert('Subscriber approved successfully! They can now log in.');
        fetchSubscribers();
      } else {
        const error = await response.json();
        alert(`Error approving subscriber: ${error.error}`);
      }
    } catch (error) {
      console.error('Error approving subscriber:', error);
      alert('Error approving subscriber. Please try again.');
    }
  };

  const handleRejectSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to reject this subscriber?')) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/subscribers/${subscriberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (response.ok) {
        alert('Subscriber rejected successfully!');
        fetchSubscribers();
      } else {
        const error = await response.json();
        alert(`Error rejecting subscriber: ${error.error}`);
      }
    } catch (error) {
      console.error('Error rejecting subscriber:', error);
      alert('Error rejecting subscriber. Please try again.');
    }
  };

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/subscribers/${subscriberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Subscriber deleted successfully!');
        fetchSubscribers();
      } else {
        const error = await response.json();
        alert(`Error deleting subscriber: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      alert('Error deleting subscriber. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (mode === 'blog') {
        const tagsArray = formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);

        const blogData = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          image: formData.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
          tags: tagsArray,
          published: formData.published,
          author: user?.email || 'Admin',
        };

        let response;
        if (editingItem) {
          const token = await user.getIdToken();
          response = await fetch(`/api/blogs/${editingItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(blogData),
          });
        } else {
          response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
          });
        }

        if (response.ok) {
          const result = await response.json();
          alert(`Blog post ${editingItem ? 'updated' : 'created'} successfully!`);
          setShowCreateForm(false);
          setEditingItem(null);
          setFormData({});
          fetchBlogs();
        } else {
          const error = await response.json();
          alert(`Error ${editingItem ? 'updating' : 'creating'} blog: ${error.error}`);
        }
      } else {
        // Author mode submit
        const expertise = formData.expertise ? formData.expertise.split('\n').filter((line: string) => line.trim()).map((line: string) => {
          const [name, level, color] = line.split(':');
          return { name: name?.trim() || '', level: parseInt(level?.trim() || '0'), color: color?.trim() || 'from-blue-600 to-blue-700' };
        }) : [];

        const specializations = formData.specializations ? formData.specializations.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [];

        const achievements = formData.achievements ? formData.achievements.split('\n').filter((line: string) => line.trim()).map((line: string) => {
          const [title, description, icon] = line.split('|');
          return { title: title?.trim() || '', description: description?.trim() || '', icon: icon?.trim() || 'Award' };
        }) : [];

        const authorData = {
          name: formData.name,
          slug: formData.slug,
          bio: formData.bio,
          imageUrl: formData.imageUrl,
          role: formData.role,
          location: formData.location,
          joinDate: formData.joinDate || new Date().toISOString(),
          email: formData.email,
          website: formData.website,
          socialLinks: {
            twitter: formData.twitter,
            linkedin: formData.linkedin,
            github: formData.github,
          },
          stats: {
            articles: parseInt(formData.articles || '0'),
            followers: parseInt(formData.followers || '0'),
            totalViews: parseInt(formData.totalViews || '0'),
            totalLikes: parseInt(formData.totalLikes || '0'),
          },
          expertise,
          specializations,
          achievements,
        };

        let response;
        if (editingItem) {
          const token = await user.getIdToken();
          response = await fetch(`/api/authors?id=${encodeURIComponent(editingItem.id)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(authorData),
          });
        } else {
          response = await fetch('/api/authors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(authorData),
          });
        }

        if (response.ok) {
          const result = await response.json();
          alert(`Author ${editingItem ? 'updated' : 'created'} successfully!`);
          setShowCreateForm(false);
          setEditingItem(null);
          setFormData({});
          fetchAuthors();
        } else {
          const errorText = await response.text();
          try {
            const error = JSON.parse(errorText);
            alert(`Error ${editingItem ? 'updating' : 'creating'} author: ${error.error}`);
          } catch {
            alert(`Error ${editingItem ? 'updating' : 'creating'} author: ${errorText || 'Unknown error'}`);
          }
        }
      }
    } catch (error) {
      console.error(`Error ${editingItem ? 'updating' : 'creating'} ${mode}:`, error);
      alert(`Error ${editingItem ? 'updating' : 'creating'} ${mode}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
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

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      icon: Users,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Total Articles',
      value: '1,429',
      change: '+8.2%',
      icon: FileText,
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'Page Views',
      value: '45,231',
      change: '+15.3%',
      icon: Eye,
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'Comments',
      value: '892',
      change: '+5.7%',
      icon: MessageSquare,
      color: 'from-orange-600 to-orange-700'
    },
    {
      title: 'Total Authors',
      value: authors.length.toString(),
      change: '+5.0%',
      icon: User,
      color: 'from-pink-600 to-pink-700'
    }
  ];

  const recentActivities = [
    { action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { action: 'Article published: "React Best Practices"', time: '15 minutes ago', type: 'article' },
    { action: 'Comment approved', time: '1 hour ago', type: 'comment' },
    { action: 'User reported spam', time: '2 hours ago', type: 'report' },
    { action: 'Newsletter sent', time: '3 hours ago', type: 'newsletter' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user.email}</p>
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
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-lg rounded-xl p-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'dashboard'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection('blogs')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'blogs'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveSection('authors')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'authors'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Authors ({authors.length})
          </button>
          <button
            onClick={() => setActiveSection('subscribers')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'subscribers'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Subscribers ({subscribers.length})
          </button>
        </div>

        {activeSection === 'dashboard' && (
          <div className="text-right mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMode('blog');
                setShowCreateForm(true);
                setEditingItem(null);
                setFormData({});
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-xl transition-shadow"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add New Blog
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMode('author');
                setShowCreateForm(true);
                setEditingItem(null);
                setFormData({});
              }}
              className="ml-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-shadow"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add New Author
            </motion.button>
          </div>
        )}

        {activeSection === 'blogs' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMode('blog');
                  setShowCreateForm(true);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-xl transition-shadow"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add New Blog
              </motion.button>
            </div>
            <div className="grid gap-4">
              {blogs.map((blog: any) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {blog.author}</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded ${blog.published ? 'bg-green-600' : 'bg-yellow-600'} text-white text-xs`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditBlog(blog)}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'authors' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Authors</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMode('author');
                  setShowCreateForm(true);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-shadow"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add New Author
              </motion.button>
            </div>
            <div className="grid gap-4">
              {authors.map((author: any) => (
                <motion.div
                  key={author.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-blue-600/20">
                        {author.imageUrl ? (
                          <Image
                            src={author.imageUrl}
                            alt={author.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-400">
                            <User size={32} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{author.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{author.bio}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {author.role && <span>{author.role}</span>}
                          {author.location && <span>{author.location}</span>}
                          {author.email && <span>{author.email}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditAuthor(author)}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteAuthor(author.id)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'subscribers' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Subscribers</h2>
            </div>
            <div className="grid gap-4">
              {subscribers.map((subscriber: any) => (
                <motion.div
                  key={subscriber.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{subscriber.name || 'Anonymous'}</h3>
                      <p className="text-gray-400 text-sm mb-2">{subscriber.email}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Applied: {new Date(subscriber.createdAt).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded ${subscriber.status === 'approved' ? 'bg-green-600' : subscriber.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-600'} text-white text-xs`}>
                          {subscriber.status}
                        </span>
                      </div>
                      {subscriber.approvedAt && (
                        <div className="text-sm text-gray-500 mt-1">
                          Approved: {new Date(subscriber.approvedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {subscriber.status === 'pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApproveSubscriber(subscriber.id)}
                            className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRejectSubscriber(subscriber.id)}
                            className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {showCreateForm && (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-200 shadow-2xl max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>

            {mode === 'blog' ? (
              <div className="relative z-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {editingItem ? '📝 Edit Blog Post' : '✍️ Create New Blog Post'}
                  </h2>
                  <p className="text-gray-600">Share your knowledge with the world</p>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Content Details</h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FileText className="w-4 h-4 mr-2 text-blue-500" />
                        Title *
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 text-black"
                        placeholder="Enter an engaging title..."
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                        Excerpt *
                      </label>
                      <textarea
                        id="excerpt"
                        value={formData.excerpt || ''}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 text-black"
                        rows={3}
                        placeholder="Brief summary of your article..."
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                        Content *
                      </label>
                      <textarea
                        id="content"
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 text-black"
                        rows={8}
                        placeholder="Write your amazing content here..."
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Metadata Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    <Settings className="w-5 h-5 text-orange-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Metadata & Settings</h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Award className="w-4 h-4 mr-2 text-red-500" />
                          Category *
                        </label>
                        <input
                          id="category"
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="Technology, Design, etc."
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <UserIcon className="w-4 h-4 mr-2 text-pink-500" />
                          Featured Image URL
                        </label>
                        <input
                          id="image"
                          type="text"
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="https://example.com/image.jpg"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2 mb-6"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                        Tags (comma separated)
                      </label>
                      <input
                        id="tags"
                        type="text"
                        value={formData.tags || ''}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 text-black"
                        placeholder="react, javascript, tutorial"
                      />
                      <p className="text-xs text-gray-500">Separate tags with commas</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <input
                        id="published"
                        type="checkbox"
                        checked={formData.published || false}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <div>
                        <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">
                          Publish immediately
                        </label>
                        <p className="text-xs text-gray-500">Make this post live for all readers</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="relative z-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {editingItem ? '✏️ Edit Author' : '🚀 Create New Author'}
                  </h2>
                  <p className="text-gray-600">Build an amazing author profile with our creative form</p>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <span className="ml-2 text-sm font-medium text-gray-700">Basic Info</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">2</div>
                      <span className="ml-2 text-sm font-medium text-gray-500">Social & Stats</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">3</div>
                      <span className="ml-2 text-sm font-medium text-gray-500">Expertise</span>
                    </div>
                  </div>
                </div>

                {/* Basic Information Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    <UserIcon className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <UserIcon className="w-4 h-4 mr-2 text-blue-500" />
                          Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="John Doe"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Globe className="w-4 h-4 mr-2 text-green-500" />
                          Slug *
                        </label>
                        <input
                          id="slug"
                          type="text"
                          value={formData.slug || ''}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="john-doe"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Award className="w-4 h-4 mr-2 text-purple-500" />
                          Role
                        </label>
                        <input
                          id="role"
                          type="text"
                          value={formData.role || ''}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="Senior Developer"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <MapPin className="w-4 h-4 mr-2 text-red-500" />
                          Location
                        </label>
                        <input
                          id="location"
                          type="text"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="New York, USA"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Mail className="w-4 h-4 mr-2 text-orange-500" />
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="john@example.com"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Globe className="w-4 h-4 mr-2 text-teal-500" />
                          Website
                        </label>
                        <input
                          id="website"
                          type="url"
                          value={formData.website || ''}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="https://johndoe.com"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-6 space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        value={formData.bio || ''}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-6 space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <UserIcon className="w-4 h-4 mr-2 text-pink-500" />
                        Profile Image URL
                      </label>
                      <input
                        id="imageUrl"
                        type="text"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                        placeholder="https://example.com/profile.jpg"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Social Links & Stats Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Social Links & Statistics</h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                          Twitter
                        </label>
                        <input
                          id="twitter"
                          type="text"
                          value={formData.twitter || ''}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="@johndoe"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                          LinkedIn
                        </label>
                        <input
                          id="linkedin"
                          type="text"
                          value={formData.linkedin || ''}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Github className="w-4 h-4 mr-2 text-gray-700" />
                          GitHub
                        </label>
                        <input
                          id="github"
                          type="text"
                          value={formData.github || ''}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                          placeholder="https://github.com/johndoe"
                        />
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                          Articles
                        </label>
                        <input
                          id="articles"
                          type="number"
                          value={formData.articles || 0}
                          onChange={(e) => setFormData({ ...formData, articles: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 text-black"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Users className="w-4 h-4 mr-2 text-blue-500" />
                          Followers
                        </label>
                        <input
                          id="followers"
                          type="number"
                          value={formData.followers || 0}
                          onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <EyeIcon className="w-4 h-4 mr-2 text-purple-500" />
                          Total Views
                        </label>
                        <input
                          id="totalViews"
                          type="number"
                          value={formData.totalViews || 0}
                          onChange={(e) => setFormData({ ...formData, totalViews: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Heart className="w-4 h-4 mr-2 text-red-500" />
                          Total Likes
                        </label>
                        <input
                          id="totalLikes"
                          type="number"
                          value={formData.totalLikes || 0}
                          onChange={(e) => setFormData({ ...formData, totalLikes: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Expertise & Achievements Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    <Award className="w-5 h-5 text-yellow-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Expertise & Achievements</h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                        Expertise (one per line: name:level:color)
                      </label>
                      <textarea
                        id="expertise"
                        value={formData.expertise || ''}
                        onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80"
                        rows={4}
                        placeholder="React:90:from-blue-600 to-cyan-600&#10;Node.js:80:from-green-600 to-emerald-600"
                      />
                      <p className="text-xs text-gray-500">Format: SkillName:ProficiencyLevel:GradientColors</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Award className="w-4 h-4 mr-2 text-orange-500" />
                        Specializations (comma separated)
                      </label>
                      <input
                        id="specializations"
                        type="text"
                        value={formData.specializations || ''}
                        onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80"
                        placeholder="Web Development, UI/UX Design, DevOps"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Achievements (one per line: title|description|icon)
                      </label>
                      <textarea
                        id="achievements"
                        value={formData.achievements || ''}
                        onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80"
                        rows={4}
                        placeholder="Top Contributor 2023|Recognized for outstanding community contributions|Award&#10;Published Author|Authored 5 technical books|BookOpen"
                      />
                      <p className="text-xs text-gray-500">Format: Title|Description|IconName</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200"
            >
              <motion.button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="px-8 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 border border-gray-300"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className={`px-8 py-3 rounded-xl bg-gradient-to-r ${mode === 'blog' ? 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {mode === 'blog' ? (editingItem ? 'Update Post' : 'Create Post') : (editingItem ? 'Update Author' : 'Create Author')}
                  </div>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}

        {/* Recent Activities */}
        <div className="mt-12 max-w-5xl mx-auto">
          <h2 className="text-white text-xl font-bold mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 flex justify-between items-center">
                <span className="text-white">{activity.action}</span>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
