import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { fetchAutophagyFeeds } from '../services/rssService';
import { slugify } from '../utils/slugify';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Sparkles, Clock, Eye, Share2, Copy, Check } from 'lucide-react';

export const BlogPostDetail: React.FC = () => {
    const { category, slug } = useParams<{ category: string; slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            const posts = await fetchAutophagyFeeds();
            // Find post by slugifying title and comparing, and checking category
            const found = posts.find(p => slugify(p.title) === slug && p.category.toLowerCase() === category?.toLowerCase());
            setPost(found || null);
            setLoading(false);
            window.scrollTo(0, 0);
        };
        loadPost();
    }, [category, slug]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post?.title || '');
        let shareUrl = '';

        if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    if (loading) {
        return (
            <div className="detail-loading">
                <div className="spinner"></div>
                <p>Analyzing cellular data...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="detail-error">
                <h2>Resource not found</h2>
                <Link to="/" className="back-link">Return to Directory</Link>
            </div>
        );
    }

    return (
        <div className="post-detail-page">
            <div className="detail-header-nav">
                <Link to="/" className="back-btn">
                    <ArrowLeft size={20} /> Back to Directory
                </Link>
            </div>

            <div className="post-detail-grid">
                <div className="detail-main-content">
                    <article className="post-detail-container">
                        <header className="detail-header">
                            <h1 className="gradient-text">{post.title}</h1>
                            <div className="detail-meta">
                                <span><MapPin size={18} /> {post.source}</span>
                                <span><Calendar size={18} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                <span><Eye size={18} /> {post.views.toLocaleString()} views</span>
                            </div>
                        </header>

                        <section className="detail-section ai-summary-section">
                            <div className="section-badge">
                                <Sparkles size={16} /> AI Summary
                            </div>
                            <p className="ai-summary-content">{post.aiSummary}</p>
                        </section>

                        {post.imageUrl && (
                            <section className="detail-media">
                                <img src={post.imageUrl} alt={post.title} className="detail-image" />
                            </section>
                        )}

                        <section className="detail-section content-section">
                            {post.fullDescription.map((para, index) => (
                                <p key={index} className="description-paragraph">{para}</p>
                            ))}
                        </section>

                        <footer className="detail-footer">
                            <div className="detail-actions">
                                <a
                                    href={post.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="full-content-btn"
                                >
                                    Read Full Article <ExternalLink size={20} />
                                </a>

                                <button onClick={handleCopyLink} className="share-btn copy-btn glass-morphism">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>
                        </footer>
                    </article>
                </div>

                <aside className="detail-sidebar">
                    <div className="sidebar-box info-box glass-morphism" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                        <h3 className="group-title" style={{ marginBottom: '1.5rem' }}>Resource Info</h3>
                        <div className="category-list">
                            <div className="category-item">
                                <Clock size={18} />
                                <span>{post.readTime || 5} min read</span>
                            </div>
                            <div className="category-item">
                                <Sparkles size={18} />
                                <span>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-box share-box glass-morphism" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                        <h3 className="group-title" style={{ marginBottom: '1.5rem' }}>Share Resource</h3>
                        <div className="share-grid">
                            <button onClick={() => handleShare('twitter')} className="share-icon-btn tw">
                                <Share2 size={18} /> Twitter
                            </button>
                            <button onClick={() => handleShare('facebook')} className="share-icon-btn fb">
                                <Share2 size={18} /> Facebook
                            </button>
                            <button onClick={() => handleShare('linkedin')} className="share-icon-btn li">
                                <Share2 size={18} /> LinkedIn
                            </button>
                        </div>
                    </div>

                    <div className="sidebar-box tags-box glass-morphism" style={{ padding: '2rem', borderRadius: '24px' }}>
                        <h3 className="group-title" style={{ marginBottom: '1.5rem' }}>Tags</h3>
                        <div className="card-tags">
                            {post.tags.map(tag => (
                                <span key={tag} className="tag">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
