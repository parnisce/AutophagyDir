import React, { useState } from 'react';
import { Video, FileText, Share2, Microscope, Mail, Image as ImageIcon, LayoutGrid, FlaskConical, Utensils, Zap, Clock, Info } from 'lucide-react';

interface HeroProps {
    onSearch: (query: string) => void;
    activeType: string;
    onTypeChange: (type: string) => void;
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
}

const CONTENT_TYPES: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <Share2 size={16} /> },
    { id: 'article', label: 'Articles', icon: <FileText size={16} /> },
    { id: 'social', label: 'Social Media', icon: <Share2 size={16} /> },
    { id: 'press-release', label: 'Press Release', icon: <Microscope size={16} /> },
    { id: 'newsletter', label: 'Newsletter', icon: <Mail size={16} /> },
    { id: 'picture', label: 'Picture', icon: <ImageIcon size={16} /> },
    { id: 'video', label: 'Video', icon: <Video size={16} /> },
];

const CATEGORIES = [
    { id: 'all', name: 'All', icon: LayoutGrid },
    { id: 'research', name: 'Science', icon: FlaskConical },
    { id: 'nutrition', name: 'Foods', icon: Utensils },
    { id: 'tools', name: 'Tools', icon: Zap },
    { id: 'fasting', name: 'Strategies', icon: Clock },
    { id: 'health', name: 'Longevity', icon: Info },
];

export const Hero: React.FC<HeroProps> = ({ onSearch, activeType, onTypeChange, activeCategory, onCategoryChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="gradient-text">Cellular Renewal Directory</h1>
                <p>The web's most comprehensive catalog of research, toolsets, and nutritional strategies for biological optimization through autophagy.</p>

                <form className="hero-search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search research, tools, or strategies..."
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            onSearch(e.target.value);
                        }}
                    />
                    <button type="submit">Discovery</button>
                </form>

                <div className="content-type-filters">
                    {CONTENT_TYPES.map((type) => (
                        <button
                            key={type.id}
                            className={`type-pill ${activeType === type.id ? 'active' : ''}`}
                            onClick={() => onTypeChange(type.id)}
                        >
                            {type.icon}
                            <span>{type.label}</span>
                        </button>
                    ))}
                </div>

                <div className="mobile-category-filters">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => onCategoryChange(cat.id)}
                        >
                            <cat.icon size={14} />
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                <div className="hero-stats">
                    <div className="stat"><span>250+</span> Resources</div>
                    <div className="stat"><span>12</span> Platforms</div>
                    <div className="stat"><span>Real-time</span> Feeds</div>
                </div>
            </div>
        </section>
    );
};
