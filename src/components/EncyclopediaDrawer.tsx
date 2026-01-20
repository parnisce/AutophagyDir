import React from 'react';
import { X, Book, Target, Zap, ShieldCheck } from 'lucide-react';

interface EncyclopediaDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const SECTIONS = [
    {
        id: 'basics',
        title: 'The Fundamentals',
        icon: Book,
        content: 'Autophagy ("self-eating") is the natural, conserved degradation of the cell that disassembles unnecessary or dysfunctional components. It allows the orderly degradation and recycling of cellular components.'
    },
    {
        id: 'strategies',
        title: 'Top Strategies',
        icon: Target,
        content: '1. Intermittent Fasting (16:8): The most accessible entry point.\n2. OMAD (One Meal A Day): Intensifies physiological stress for deeper renewal.\n3. Extended Fasting (24-72h): Peer-reviewed sweet spot for maximum mitophagy.'
    },
    {
        id: 'foods',
        title: 'Best Foods (Autophagy Mimickers)',
        icon: Zap,
        content: 'Spermidine (wheat germ, aged cheese), Resveratrol (grapes, berries), and EGCG (green tea) are powerful compounds that can activate autophagy pathways even in the presence of nutrients.'
    },
    {
        id: 'tools',
        title: 'Optimization Tools',
        icon: ShieldCheck,
        content: 'Track your progress using GKI (Glucose Ketone Index) meters, Oura/Whoop for sleep recovery metrics, and continuous glucose monitors (CGM) to identify insulin spikes that inhibit autophagy.'
    }
];

export const EncyclopediaDrawer: React.FC<EncyclopediaDrawerProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="encyclopedia-drawer glass-morphism" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2><Book className="header-icon" /> Autophagy Encyclopedia</h2>
                    <button className="close-btn" onClick={onClose}><X /></button>
                </div>

                <div className="drawer-content">
                    <p className="intro">Your definitive guide to cellular rejuvenation and longevity science.</p>

                    <div className="sections-container">
                        {SECTIONS.map((section) => (
                            <div key={section.id} className="enc-section">
                                <div className="section-title">
                                    <section.icon size={20} className="section-icon" />
                                    <h3>{section.title}</h3>
                                </div>
                                <div className="section-body">
                                    {section.content.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="drawer-footer">
                    <p>Verified by Clinical Research 2026</p>
                </div>
            </div>
        </div>
    );
};
