import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { Clock, ExternalLink, Eye, Clock as TimeIcon, CalendarDays } from 'lucide-react';

interface RecentPageProps {
    posts: BlogPost[];
    isLoading: boolean;
}

export const RecentPage: React.FC<RecentPageProps> = ({ posts, isLoading }) => {
    const recentPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="listing-page">
            <div className="listing-hero">
                <div className="listing-hero-icon recent-icon">
                    <Clock size={36} />
                </div>
                <h1 className="gradient-text">Recently Added</h1>
                <p>The latest autophagy resources — freshly curated articles, studies, videos, and more.</p>
            </div>

            <div className="listing-grid-container">
                {isLoading ? (
                    <div className="directory-grid">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="skeleton-card glass-morphism"></div>
                        ))}
                    </div>
                ) : recentPosts.length === 0 ? (
                    <div className="empty-results glass-morphism">
                        <h3>No recent posts</h3>
                        <p>Check back soon for new content.</p>
                    </div>
                ) : (
                    <div className="directory-grid">
                        {recentPosts.map((post) => (
                            <Link to={`/post/${post.id}`} key={post.id} className="resource-link">
                                <article className="resource-card glass-morphism">
                                    <div className={`card-header type-${post.type}`}>
                                        <span className="source-badge">{post.source}</span>
                                        <div className="date-badge">
                                            <CalendarDays size={13} />
                                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
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
