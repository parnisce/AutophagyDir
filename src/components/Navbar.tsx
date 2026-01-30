import React from 'react';
import { BookOpen, TrendingUp, Clock, Star, Moon, Sun } from 'lucide-react';

interface NavbarProps {
    onOpenEncyclopedia: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEncyclopedia, theme, onToggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <span className="logo-text">AUTOPHAGY <span className="accent">DIR</span></span>
                </div>

                <div className="nav-links">
                    <a href="#trending" className="nav-link"><TrendingUp size={18} /> Trending</a>
                    <a href="#recent" className="nav-link"><Clock size={18} /> Recent</a>
                    <a href="#popular" className="nav-link"><Star size={18} /> Popular</a>

                    <button
                        className="theme-toggle"
                        onClick={onToggleTheme}
                        title={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

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
