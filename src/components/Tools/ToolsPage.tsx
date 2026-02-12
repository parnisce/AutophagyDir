import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Calendar, CheckCircle2, Wrench } from 'lucide-react';


export const ToolsPage: React.FC = () => {
    return (
        <div className="tools-page">
            <div className="tools-hero">
                <div className="listing-hero-icon tools-icon">
                    <Wrench size={36} />
                </div>
                <h1 className="gradient-text">Interactive Tools</h1>
                <p>Explore our collection of interactive tools designed to help you optimize your fasting and autophagy journey.</p>
            </div>

            <div className="tools-grid">
                {/* Autophagy Calculator Card */}
                <div className="tool-card glass-morphism">
                    <div className="tool-icon-wrapper calc-icon">
                        <Calculator size={32} />
                    </div>
                    <h2>Autophagy Calculator</h2>
                    <p>Estimate when autophagy begins during your fast based on your personal metrics and fasting duration.</p>
                    <Link to="/tools/autophagy-calculator" className="tool-btn calc-btn">
                        Use Calculator
                    </Link>
                </div>

                {/* Fasting Schedule Generator Card */}
                <div className="tool-card glass-morphism">
                    <div className="tool-icon-wrapper schedule-icon">
                        <Calendar size={32} />
                    </div>
                    <h2>Fasting Schedule Generator</h2>
                    <p>Create a personalized fasting schedule based on your goals and preferences.</p>
                    <Link to="/tools/fasting-generator" className="tool-btn schedule-btn">
                        Use Generator
                    </Link>
                </div>
            </div>

            <div className="tools-benefits-box glass-morphism">
                <h3>How Our Tools Help You</h3>

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="benefit-text">
                        <h4>Personalized Insights</h4>
                        <p>Our tools take into account your unique physical characteristics, activity level, and fasting experience to provide personalized recommendations.</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="benefit-text">
                        <h4>Science-Based Calculations</h4>
                        <p>All our tools are built on the latest scientific research on autophagy and fasting, ensuring you get accurate and reliable information.</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="benefit-text">
                        <h4>Practical Guidance</h4>
                        <p>Beyond just numbers, our tools provide practical tips and guidance to help you implement fasting effectively and safely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
