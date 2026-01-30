import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { fetchAutophagyFeeds } from '../services/rssService';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Sparkles, Clock, Eye } from 'lucide-react';

export const BlogPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            const posts = await fetchAutophagyFeeds();
            const found = posts.find(p => p.id === id);
            setPost(found || null);
            setLoading(false);
            window.scrollTo(0, 0);
        };
        loadPost();
    }, [id]);

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
                <h2>Feed not found</h2>
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
                            <a
                                href={post.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="full-content-btn"
                            >
                                Read Full Article at {post.source} <ExternalLink size={20} />
                            </a>
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
