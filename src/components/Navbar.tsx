import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Clock, Star, Moon, Sun, Mail, Wrench } from 'lucide-react';

interface NavbarProps {
    onOpenEncyclopedia: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEncyclopedia, theme, onToggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                    <span className="logo-text">AUTOPHAGY <span className="accent">DIR</span></span>
                </Link>

                <div className="nav-links">
                    <NavLink to="/trending" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <TrendingUp size={18} /> Trending
                    </NavLink>
                    <NavLink to="/recent" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Clock size={18} /> Recent
                    </NavLink>
                    <NavLink to="/popular" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Star size={18} /> Popular
                    </NavLink>
                    <NavLink to="/tools" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Wrench size={18} /> Tools
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Mail size={18} /> Contact
                    </NavLink>

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
