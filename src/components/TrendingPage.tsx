import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { slugify } from '../utils/slugify';
import { TrendingUp, ExternalLink, Eye, Clock as TimeIcon, Flame } from 'lucide-react';


interface TrendingPageProps {
    posts: BlogPost[];
    isLoading: boolean;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({ posts, isLoading }) => {
    const trendingPosts = [...posts].sort((a, b) => b.views - a.views);

    return (
        <div className="listing-page">
            <div className="listing-hero">
                <div className="listing-hero-icon trending-icon">
                    <TrendingUp size={36} />
                </div>
                <h1 className="gradient-text">Trending Now</h1>
                <p>The most-viewed autophagy resources, ranked by community engagement and popularity.</p>
            </div>

            <div className="listing-grid-container">
                {isLoading ? (
                    <div className="directory-grid">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="skeleton-card glass-morphism"></div>
                        ))}
                    </div>
                ) : trendingPosts.length === 0 ? (
                    <div className="empty-results glass-morphism">
                        <h3>No trending posts yet</h3>
                        <p>Check back soon for popular content.</p>
                    </div>
                ) : (
                    <div className="directory-grid">
                        {trendingPosts.map((post, index) => (
                            <Link to={`/${post.category.toLowerCase()}/${slugify(post.title)}`} key={post.id} className="resource-link">
                                <article className="resource-card glass-morphism">
                                    <div className={`card-header type-${post.type}`}>
                                        <span className="source-badge">{post.source}</span>
                                        <div className="trending-rank">
                                            <Flame size={14} />
                                            <span>#{index + 1}</span>
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
