import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Clock, Star, Moon, Sun, Mail, Wrench, Menu, X } from 'lucide-react';

interface NavbarProps {
    onOpenEncyclopedia: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEncyclopedia, theme, onToggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={closeMenu} style={{ textDecoration: 'none' }}>
                    <span className="logo-text">AUTOPHAGY <span className="accent">DIR</span></span>
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
                    <NavLink to="/trending" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <TrendingUp size={18} /> Trending
                    </NavLink>
                    <NavLink to="/recent" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Clock size={18} /> Recent
                    </NavLink>
                    <NavLink to="/popular" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Star size={18} /> Popular
                    </NavLink>
                    <NavLink to="/tools" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Wrench size={18} /> Tools
                    </NavLink>
                    <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Mail size={18} /> Contact
                    </NavLink>

                    <div className="nav-actions">
                        <button
                            className="theme-toggle"
                            onClick={() => { onToggleTheme(); if (isMenuOpen) closeMenu(); }}
                            title={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <button
                            className="encyclopedia-btn"
                            onClick={() => { onOpenEncyclopedia(); closeMenu(); }}
                        >
                            <BookOpen size={18} /> Encyclopedia
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
