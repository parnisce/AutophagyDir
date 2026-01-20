import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { fetchAutophagyFeeds } from '../services/rssService';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Sparkles } from 'lucide-react';

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
                <Link to="/" className="back-btn glass-morphism">
                    <ArrowLeft size={20} /> Back to Directory
                </Link>
            </div>

            <article className="post-detail-container glass-morphism">
                <header className="detail-header">
                    <h1 className="gradient-text">{post.title}</h1>
                    <div className="detail-meta">
                        <span className="source-name">
                            <MapPin size={16} /> {post.source}
                        </span>
                        <span className="publish-date">
                            <Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
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
                        <img src={post.imageUrl} alt={post.title} className="detail-image shadow-glow" />
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
                        Read the full content at {post.source} <ExternalLink size={18} />
                    </a>
                </footer>
            </article>
        </div>
    );
};
