import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { Star, ExternalLink, Eye, Clock as TimeIcon, Award } from 'lucide-react';

interface PopularPageProps {
    posts: BlogPost[];
    isLoading: boolean;
}

export const PopularPage: React.FC<PopularPageProps> = ({ posts, isLoading }) => {
    const popularPosts = [...posts]
        .sort((a, b) => b.views - a.views)
        .filter(p => p.views >= 5000);

    return (
        <div className="listing-page">
            <div className="listing-hero">
                <div className="listing-hero-icon popular-icon">
                    <Star size={36} />
                </div>
                <h1 className="gradient-text">Most Popular</h1>
                <p>All-time fan favorites — the top-performing resources loved by the autophagy community.</p>
            </div>

            <div className="listing-grid-container">
                {isLoading ? (
                    <div className="directory-grid">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="skeleton-card glass-morphism"></div>
                        ))}
                    </div>
                ) : popularPosts.length === 0 ? (
                    <div className="empty-results glass-morphism">
                        <h3>No popular posts yet</h3>
                        <p>Content gains popularity through community engagement.</p>
                    </div>
                ) : (
                    <div className="directory-grid">
                        {popularPosts.map((post, index) => (
                            <Link to={`/post/${post.id}`} key={post.id} className="resource-link">
                                <article className="resource-card glass-morphism">
                                    <div className={`card-header type-${post.type}`}>
                                        <span className="source-badge">{post.source}</span>
                                        <div className="popular-badge">
                                            <Award size={14} />
                                            <span>Top {index + 1}</span>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <span className="card-category">{post.category.toUpperCase()}</span>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>

                                        <div className="card-tags">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="tag">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <div className="meta">
                                            <span className="meta-item"><Eye size={14} /> {post.views.toLocaleString()}</span>
                                            {post.readTime && <span className="meta-item"><TimeIcon size={14} /> {post.readTime}m</span>}
                                        </div>
                                        <span className="action-btn">
                                            Details <ExternalLink size={14} />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
