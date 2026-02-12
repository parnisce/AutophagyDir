import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, MoreVertical, CornerUpRight, ListFilter, X, Facebook, Mail, Twitter } from 'lucide-react';


interface Comment {
    id: string;
    user: string;
    avatar: string;
    time: string;
    text: string;
    likes: number;
    replies: Comment[];
    isLiked?: boolean;
    isDisliked?: boolean;
}

export const CommentsSystem: React.FC = () => {
    // Post interactions (Likes/Dislikes)
    const [postLikes, setPostLikes] = useState(124);
    const [postDislikes, setPostDislikes] = useState(2);
    const [hasLikedPost, setHasLikedPost] = useState(false);
    const [hasDislikedPost, setHasDislikedPost] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    // Comments State
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            user: '@DrFast24',
            avatar: 'https://i.pravatar.cc/150?u=drfast',
            time: '2 hours ago',
            text: 'This is an excellent breakdown of the metabolic pathways. Autophagy is truly the body\'s natural cleanup crew!',
            likes: 15,
            replies: [
                {
                    id: '1-1',
                    user: '@BioHacker99',
                    avatar: 'https://i.pravatar.cc/150?u=bio99',
                    time: '1 hour ago',
                    text: 'Agreed! The charts make it so much easier to understand than the original research paper.',
                    likes: 3,
                    replies: []
                }
            ]
        },
        {
            id: '2',
            user: '@CellularGrace',
            avatar: 'https://i.pravatar.cc/150?u=grace',
            time: '5 hours ago',
            text: 'I started 16:8 fasting last month and I can definitely feel the mental clarity mentioned in the article.',
            likes: 8,
            replies: []
        }
    ]);

    const [newComment, setNewComment] = useState('');

    const handlePostLike = () => {
        if (hasLikedPost) {
            setPostLikes((prev: number) => prev - 1);
            setHasLikedPost(false);
        } else {
            setPostLikes((prev: number) => prev + 1);
            setHasLikedPost(true);
            if (hasDislikedPost) {
                setPostDislikes((prev: number) => prev - 1);
                setHasDislikedPost(false);
            }
        }
    };

    const handlePostDislike = () => {
        if (hasDislikedPost) {
            setPostDislikes((prev: number) => prev - 1);
            setHasDislikedPost(false);
        } else {
            setPostDislikes((prev: number) => prev + 1);
            setHasDislikedPost(true);
            if (hasLikedPost) {
                setPostLikes((prev: number) => prev - 1);
                setHasLikedPost(false);
            }
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            user: '@User_Guest',
            avatar: 'https://i.pravatar.cc/150?u=guest',
            time: 'Just now',
            text: newComment,
            likes: 0,
            replies: []
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    return (
        <div className="comments-system-container">
            {/* YouTube-style Post Interaction Bar */}
            <div className="post-interaction-bar">
                <div className="interaction-group">
                    <button
                        className={`interaction-btn like-btn ${hasLikedPost ? 'active' : ''}`}
                        onClick={handlePostLike}
                    >
                        <ThumbsUp size={20} fill={hasLikedPost ? "currentColor" : "none"} />
                        <span>{postLikes}</span>
                    </button>
                    <div className="btn-divider"></div>
                    <button
                        className={`interaction-btn dislike-btn ${hasDislikedPost ? 'active' : ''}`}
                        onClick={handlePostDislike}
                    >
                        <ThumbsDown size={20} fill={hasDislikedPost ? "currentColor" : "none"} />
                        <span className="dislike-count">{postDislikes}</span>
                    </button>
                </div>

                <div className="interaction-group">
                    <button className="interaction-btn secondary" onClick={() => setIsShareModalOpen(true)}>
                        <Share2 size={20} />
                        <span>Share</span>
                    </button>
                    <button className="interaction-btn secondary more-btn">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Share Modal */}
            {isShareModalOpen && (
                <div className="modal-overlay" onClick={() => setIsShareModalOpen(false)}>
                    <div className="share-modal glass-morphism" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Share</h3>
                            <button className="close-btn" onClick={() => setIsShareModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="social-grid">
                            <div className="social-item">
                                <div className="social-icon fb"><Facebook size={24} /></div>
                                <span>Facebook</span>
                            </div>
                            <div className="social-item">
                                <div className="social-icon wa"><WhatsAppIcon /></div>
                                <span>WhatsApp</span>
                            </div>
                            <div className="social-item">
                                <div className="social-icon tw"><Twitter size={24} /></div>
                                <span>X</span>
                            </div>
                            <div className="social-item">
                                <div className="social-icon ml"><Mail size={24} /></div>
                                <span>Email</span>
                            </div>
                        </div>
                        <div className="copy-link-area">
                            <div className="link-input">
                                <span>{window.location.href}</span>
                            </div>
                            <button className={`copy-btn-main ${isCopied ? 'copied' : ''}`} onClick={handleCopyLink}>
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Header */}
            <div className="comments-header">
                <div className="comment-count">
                    {comments.length} Comments
                </div>
                <div className="comment-sort">
                    <button className="sort-btn">
                        <ListFilter size={20} />
                        <span>Sort by</span>
                    </button>
                </div>
            </div>

            {/* Add Comment Section */}
            <div className="add-comment-wrapper">
                <img src="https://i.pravatar.cc/150?u=guest" alt="User Avatar" className="user-avatar" />
                <div className="comment-input-area">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <div className="input-actions">
                        {newComment && (
                            <>
                                <button className="cancel-btn" onClick={() => setNewComment('')}>Cancel</button>
                                <button className="comment-btn-submit" onClick={handleAddComment}>Comment</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="comments-list">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);

    return (
        <div className="comment-thread">
            <div className="comment-item">
                <img src={comment.avatar} alt={comment.user} className="user-avatar" />
                <div className="comment-body">
                    <div className="comment-meta">
                        <span className="user-handle">{comment.user}</span>
                        <span className="time-ago">{comment.time}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                        <div className="action-likes">
                            <button className="action-btn-small">
                                <ThumbsUp size={16} />
                            </button>
                            <span className="count-text">{comment.likes > 0 ? comment.likes : ''}</span>
                            <button className="action-btn-small">
                                <ThumbsDown size={16} />
                            </button>
                        </div>
                        <button className="action-btn-text">Reply</button>
                    </div>

                    {comment.replies.length > 0 && (
                        <div className="replies-toggle">
                            <button
                                className="toggle-replies-btn"
                                onClick={() => setShowReplies(!showReplies)}
                            >
                                <CornerUpRight size={16} className={showReplies ? 'rotated' : ''} />
                                <span>{showReplies ? 'Hide' : `View ${comment.replies.length}`} replies</span>
                            </button>
                        </div>
                    )}

                    {showReplies && comment.replies.length > 0 && (
                        <div className="replies-list">
                            {comment.replies.map(reply => (
                                <CommentItem key={reply.id} comment={reply} />
                            ))}
                        </div>
                    )}
                </div>
                <button className="more-options-btn">
                    <MoreVertical size={16} />
                </button>
            </div>
        </div>
    );
};

const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);
