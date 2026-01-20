import React from 'react';
import { LayoutGrid, FlaskConical, Utensils, Zap, Clock, Info } from 'lucide-react';

interface SidebarProps {
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
}

const CATEGORIES = [
    { id: 'all', name: 'All Resources', icon: LayoutGrid },
    { id: 'research', name: 'Science & Research', icon: FlaskConical },
    { id: 'nutrition', name: 'Best Foods', icon: Utensils },
    { id: 'tools', name: 'Best Tools', icon: Zap },
    { id: 'fasting', name: 'Top Strategies', icon: Clock },
    { id: 'health', name: 'Longevity Tips', icon: Info },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange }) => {
    return (
        <aside className="sidebar glass-morphism">
            <div className="sidebar-group">
                <h3 className="group-title">Directories</h3>
                <div className="category-list">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => onCategoryChange(cat.id)}
                        >
                            <cat.icon size={18} />
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="sidebar-promo glass-morphism">
                <h4>Stay Updated</h4>
                <p>Get the latest press releases and research directly in your inbox.</p>
                <button className="promo-btn">Join Newsletter</button>
            </div>
        </aside>
    );
};
