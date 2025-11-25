import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedArticles from '@/components/FeaturedArticles';
import CategoryHighlights from '@/components/CategoryHighlights';
import NewsletterSignup from '@/components/NewsletterSignup';
import RecentPosts from '@/components/RecentPosts';
import TrustIndicators from '@/components/TrustIndicators';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414] relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <FeaturedArticles />
          <CategoryHighlights />
          <RecentPosts />
          <NewsletterSignup />
          <TrustIndicators />
        </main>
        <Footer />
      </div>
    </div>
  );
}
