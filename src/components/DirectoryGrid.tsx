import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { slugify } from '../utils/slugify';
import { ExternalLink, Eye, Clock as TimeIcon } from 'lucide-react';

interface DirectoryGridProps {
    posts: BlogPost[];
    isLoading: boolean;
}

export const DirectoryGrid: React.FC<DirectoryGridProps> = ({ posts, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid-loading">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="skeleton-card glass-morphism"></div>
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="empty-results glass-morphism">
                <h3>No matching resources found</h3>
                <p>Try broadening your search or choosing a different category.</p>
            </div>
        );
    }

    return (
        <div className="directory-grid">
            {posts.map((post) => (
                <Link to={`/${post.category.toLowerCase()}/${slugify(post.title)}`} key={post.id} className="resource-link">
                    <article className="resource-card glass-morphism">
                        <div className={`card-header type-${post.type}`}>
                            <span className="source-badge">{post.source}</span>
                            <span className="type-icon">{post.icon}</span>
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
    );
};
