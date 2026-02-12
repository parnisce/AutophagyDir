import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Timer, CheckCircle2, Download, Calendar, Flame, Zap, Sparkles } from 'lucide-react';


export const FastingGenerator: React.FC = () => {
    // Input States
    const [fastingType, setFastingType] = useState<string>('Daily Intermittent Fasting (e.g., 16:8, 18:6)');
    const [windowHours, setWindowHours] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('2026-02-15');
    const [endDate, setEndDate] = useState<string>('2026-02-21');
    const [startTime, setStartTime] = useState<string>('17:00');

    // Result States
    const [result, setResult] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSchedule = () => {
        if (!windowHours || !startDate || !endDate || !startTime) {
            alert('Please fill out all fields');
            return;
        }

        setIsGenerating(true);

        setTimeout(() => {
            const hours = parseInt(windowHours);
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            const totalHours = hours * days;
            const avgHours = hours;

            // Generate periods for display
            const periods: any[] = [];
            let current = new Date(`${startDate}T${startTime}`);

            for (let i = 0; i < days; i++) {
                // Fasting Period
                const fastEnd = new Date(current.getTime() + (hours * 60 * 60 * 1000));
                periods.push({
                    type: 'fast',
                    start: new Date(current),
                    end: new Date(fastEnd)
                });

                // Eating Period
                const eatingDuration = 24 - hours;
                const eatingEnd = new Date(fastEnd.getTime() + (eatingDuration * 60 * 60 * 1000));
                periods.push({
                    type: 'eat',
                    start: new Date(fastEnd),
                    end: new Date(eatingEnd)
                });

                current = new Date(eatingEnd);
            }

            setResult({
                totalHours,
                avgHours,
                periods
            });
            setIsGenerating(false);
        }, 600);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    return (
        <div className="tool-detail-page generator-redesign">
            <div className="tool-nav">
                <Link to="/tools" className="back-btn">
                    <ArrowLeft size={18} /> Back to Tools
                </Link>
            </div>

            <div className="tool-header">
                <h1 className="gradient-text">Fasting Schedule Generator</h1>
                <p>Create a personalized fasting schedule based on your goals and preferences.</p>
            </div>

            {result && (
                <div className="autophagy-tracker-section animate-fade-in">
                    <div className="autophagy-tracker-container glass-morphism">
                        <h3 className="tracker-title">Autophagy Timeline Tracker</h3>
                        <div className="tracker-progress-wrapper">
                            <div className="tracker-bar">
                                <div
                                    className="tracker-fill animated-fill"
                                    style={{ '--target-width': `${Math.min(100, (result.avgHours / 48) * 100)}%` } as React.CSSProperties}
                                ></div>
                                <div
                                    className="tracker-knob animated-knob"
                                    style={{ '--target-left': `${Math.min(100, (result.avgHours / 48) * 100)}%` } as React.CSSProperties}
                                ></div>
                            </div>
                            <div className="tracker-milestones">
                                <div className={`milestone ${result.avgHours >= 12 ? 'active' : ''}`}>
                                    <div className="milestone-icon"><Flame size={20} /></div>
                                    <span className="milestone-label">GLUCOSE BURN</span>
                                    <span className="milestone-time">0 - 12 h</span>
                                </div>
                                <div className={`milestone ${result.avgHours >= 16 ? 'active' : ''}`}>
                                    <div className="milestone-icon"><Timer size={20} /></div>
                                    <span className="milestone-label">KETOSIS START</span>
                                    <span className="milestone-time">12 - 16 h</span>
                                </div>
                                <div className={`milestone ${result.avgHours >= 24 ? 'active' : ''}`}>
                                    <div className="milestone-icon"><Zap size={20} /></div>
                                    <span className="milestone-label">AUTOPHAGY ACTIVE</span>
                                    <span className="milestone-time">18 - 24 h</span>
                                </div>
                                <div className={`milestone ${result.avgHours >= 48 ? 'active' : ''}`}>
                                    <div className="milestone-icon"><Sparkles size={20} /></div>
                                    <span className="milestone-label">DEEP AUTOPHAGY</span>
                                    <span className="milestone-time">36 - 48 h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="calculator-grid">
                {/* Left Panel */}
                <div className="calc-panel glass-morphism">
                    <h2 className="panel-title">Create Your Schedule</h2>

                    <div className="calc-form">
                        <div className="calc-input-group">
                            <label>Fasting Type</label>
                            <select value={fastingType} onChange={(e) => setFastingType(e.target.value)}>
                                <option>Daily Intermittent Fasting (e.g., 16:8, 18:6)</option>
                                <option>Alternate Day Fasting</option>
                                <option>One Meal A Day (OMAD)</option>
                            </select>
                        </div>

                        <div className="calc-input-group">
                            <label>Fasting Window (hours)</label>
                            <input
                                type="number"
                                placeholder="Enter fasting window hours"
                                value={windowHours}
                                onChange={(e) => setWindowHours(e.target.value)}
                            />
                            <span className="input-hint">Recommended: 16–20 hours</span>
                        </div>

                        <div className="calc-row">
                            <div className="calc-input-group">
                                <label>Start Date</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="calc-input-group">
                                <label>End Date</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="calc-input-group">
                            <label>Start Time</label>
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>

                        <button className="calculate-btn-main" onClick={generateSchedule}>
                            {isGenerating ? 'Generating...' : 'Generate Schedule'}
                        </button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="calc-panel glass-morphism results-panel">
                    <h2 className="panel-title">Your Fasting Schedule</h2>

                    {!result ? (
                        <div className="results-placeholder">
                            <div className="calendar-placeholder-icon">
                                <Calendar size={60} />
                                <div className="date-badge">17</div>
                            </div>
                            <h3>Your Schedule Will Appear Here</h3>
                            <p>Fill out the form and click "Generate Schedule" to create your personalized fasting plan.</p>
                        </div>
                    ) : (
                        <div className="results-content animate-fade-in">
                            <div className="results-grid">
                                <div className="result-card total-fast-card">
                                    <span className="card-label">Total Fasting Hours</span>
                                    <div className="card-value-display">
                                        <span className="value blue-text">{result.totalHours}</span>
                                    </div>
                                </div>
                                <div className="result-card avg-fast-card">
                                    <span className="card-label">Daily Average</span>
                                    <div className="card-value-display">
                                        <span className="value pink-text">{result.avgHours} hours</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="section-subtitle">Fasting Details</h3>
                            <div className="schedule-list glass-morphism">
                                {result.periods.map((period: any, idx: number) => (
                                    <div key={idx} className={`schedule-item ${period.type}-period`}>
                                        <div className="item-icon">
                                            {period.type === 'fast' ? <Timer size={18} /> : <CheckCircle2 size={18} />}
                                        </div>
                                        <div className="item-info">
                                            <span className="period-title">
                                                {period.type === 'fast' ? 'Fasting Period' : 'Eating Period'}
                                            </span>
                                            <span className="period-time">
                                                {formatDate(period.start)} to {formatDate(period.end)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="calculate-btn-main export-btn full-width">
                                <Download size={18} /> Export Schedule (.ics)
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};
