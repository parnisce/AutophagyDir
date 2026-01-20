import React from 'react';
import { BookOpen, TrendingUp, Clock, Star } from 'lucide-react';

interface NavbarProps {
    onOpenEncyclopedia: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEncyclopedia }) => {
    return (
        <nav className="navbar glass-morphism">
            <div className="nav-container">
                <div className="nav-logo">
                    <span className="logo-icon">🧬</span>
                    <span className="logo-text">AUTOPHAGY <span className="accent">DIR</span></span>
                </div>

                <div className="nav-links">
                    <a href="#trending" className="nav-link"><TrendingUp size={18} /> Trending</a>
                    <a href="#recent" className="nav-link"><Clock size={18} /> Recent</a>
                    <a href="#popular" className="nav-link"><Star size={18} /> Popular</a>
                    <button
                        className="encyclopedia-btn"
                        onClick={onOpenEncyclopedia}
                    >
                        <BookOpen size={18} /> Encyclopedia
                    </button>
                </div>
            </div>
        </nav>
    );
};
