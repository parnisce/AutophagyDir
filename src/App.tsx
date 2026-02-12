import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { DirectoryGrid } from './components/DirectoryGrid';
import { EncyclopediaDrawer } from './components/EncyclopediaDrawer';
import { BlogPostDetail } from './components/BlogPostDetail';
import { TrendingPage } from './components/TrendingPage';
import { RecentPage } from './components/RecentPage';
import { PopularPage } from './components/PopularPage';
import { ContactPage } from './components/ContactPage';
import { ToolsPage } from './components/Tools/ToolsPage';
import { AutophagyCalculator } from './components/Tools/AutophagyCalculator';
import { FastingGenerator } from './components/Tools/FastingGenerator';

import { fetchAutophagyFeeds } from './services/rssService';
import type { BlogPost } from './types';
import './App.css';

const HomePage: React.FC<{
  posts: BlogPost[];
  isLoading: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeType: string;
  setActiveType: (type: string) => void;
  setSearchQuery: (q: string) => void;
}> = ({ posts, isLoading, activeCategory, setActiveCategory, activeType, setActiveType, setSearchQuery }) => {
  return (
    <>
      <Hero
        onSearch={setSearchQuery}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="main-content">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <DirectoryGrid
          posts={posts}
          isLoading={isLoading}
        />
      </main>
    </>
  );
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [encyclopediaOpen, setEncyclopediaOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAutophagyFeeds();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to fetch feeds:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = posts;

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Content Type
    if (activeType !== 'all') {
      result = result.filter(p => p.type === activeType);
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    setFilteredPosts(result);
  }, [activeCategory, activeType, searchQuery, posts]);

  return (
    <div className="app-container">
      <Navbar
        onOpenEncyclopedia={() => setEncyclopediaOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Routes>
        <Route path="/" element={
          <HomePage
            posts={filteredPosts}
            isLoading={isLoading}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeType={activeType}
            setActiveType={setActiveType}
            setSearchQuery={setSearchQuery}
          />
        } />
        <Route path="/:category/:slug" element={<BlogPostDetail />} />
        <Route path="/trending" element={<TrendingPage posts={posts} isLoading={isLoading} />} />
        <Route path="/recent" element={<RecentPage posts={posts} isLoading={isLoading} />} />
        <Route path="/popular" element={<PopularPage posts={posts} isLoading={isLoading} />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/autophagy-calculator" element={<AutophagyCalculator />} />
        <Route path="/tools/fasting-generator" element={<FastingGenerator />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <EncyclopediaDrawer
        isOpen={encyclopediaOpen}
        onClose={() => setEncyclopediaOpen(false)}
      />

      <footer className="footer">
        <div className="footer-glow"></div>
        <p>&copy; 2026 Autophagy Encyclopedia Directory. Aggregating science-backed renewal strategies.</p>
      </footer>
    </div>
  );
};

export default App;
