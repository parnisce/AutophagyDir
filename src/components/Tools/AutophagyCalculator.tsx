import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


type WeightUnit = 'kg' | 'lbs';
type HeightUnit = 'cm' | 'ft/in';

export const AutophagyCalculator: React.FC = () => {
    // Input States
    const [hours, setHours] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
    const [height, setHeight] = useState<string>('');
    const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('Male');
    const [activity, setActivity] = useState<string>('Moderate (exercise 3-5 days/week)');
    const [experience, setExperience] = useState<boolean>(false);

    // Result State
    const [result, setResult] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculateAutophagy = () => {
        if (!hours || !weight || !height || !age) {
            alert('Please fill in all details');
            return;
        }

        setIsCalculating(true);

        // Simulate a brief calculation delay for UX
        setTimeout(() => {
            const h = parseFloat(hours);
            const w = parseFloat(weight);
            const a = parseFloat(age);

            // Mock logic for demonstration based on inputs
            let startHour = 16;
            if (h > 24) startHour = 14;
            if (experience) startHour -= 1;

            let peakHour = startHour + 5;

            // Simple calorie estimation (Very rough BMR estimation)
            let bmr = gender === 'Male'
                ? (10 * w + 6.25 * 170 - 5 * a + 5)
                : (10 * w + 6.25 * 160 - 5 * a - 161);

            // Adjust calories by activity level
            const calories = Math.round(bmr * 1.5);
            const water = (w * 0.033).toFixed(1);

            setResult({
                start: startHour,
                peak: peakHour,
                calories: calories,
                water: water,
                difficulty: Math.min(100, (h / 48) * 100)
            });
            setIsCalculating(false);
        }, 600);
    };

    return (
        <div className="tool-detail-page calculator-redesign">
            <div className="tool-nav">
                <Link to="/tools" className="back-btn">
                    <ArrowLeft size={18} /> Back to Tools
                </Link>
            </div>

            <div className="tool-header">
                <h1 className="gradient-text">Autophagy Calculator</h1>
                <p>Estimate when autophagy begins during your fast based on your personal metrics.</p>
            </div>

            <div className="calculator-grid">
                {/* Left Panel: Details */}
                <div className="calc-panel glass-morphism">
                    <h2 className="panel-title">Enter Your Details</h2>

                    <div className="calc-form">
                        <div className="calc-input-group">
                            <label>Fasting Duration (hours)</label>
                            <input
                                type="number"
                                placeholder="Enter fasting duration"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                            />
                        </div>

                        <div className="calc-row">
                            <div className="calc-input-group weight-group">
                                <div className="label-with-toggle">
                                    <label>Weight</label>
                                    <div className="unit-toggle">
                                        <button
                                            className={weightUnit === 'kg' ? 'active' : ''}
                                            onClick={() => setWeightUnit('kg')}
                                        >kg</button>
                                        <button
                                            className={weightUnit === 'lbs' ? 'active' : ''}
                                            onClick={() => setWeightUnit('lbs')}
                                        >lbs</button>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    placeholder={weightUnit === 'kg' ? "Weight in kg" : "Weight in lbs"}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>

                            <div className="calc-input-group height-group">
                                <div className="label-with-toggle">
                                    <label>Height</label>
                                    <div className="unit-toggle">
                                        <button
                                            className={heightUnit === 'cm' ? 'active' : ''}
                                            onClick={() => setHeightUnit('cm')}
                                        >cm</button>
                                        <button
                                            className={heightUnit === 'ft/in' ? 'active' : ''}
                                            onClick={() => setHeightUnit('ft/in')}
                                        >ft/in</button>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    placeholder={heightUnit === 'cm' ? "Height in cm" : "Height in ft/in"}
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="calc-row">
                            <div className="calc-input-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    placeholder="Enter your age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="calc-input-group">
                                <label>Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="calc-input-group">
                            <label>Activity Level</label>
                            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                                <option>Sedentary (little or no exercise)</option>
                                <option>Light (exercise 1-3 days/week)</option>
                                <option>Moderate (exercise 3-5 days/week)</option>
                                <option>Heavy (exercise 6-7 days/week)</option>
                            </select>
                        </div>

                        <div className="calc-checkbox-group">
                            <input
                                type="checkbox"
                                id="experience"
                                checked={experience}
                                onChange={(e) => setExperience(e.target.checked)}
                            />
                            <label htmlFor="experience">I have previous fasting experience</label>
                        </div>

                        <button className="calculate-btn-main" onClick={calculateAutophagy}>
                            {isCalculating ? 'Calculating...' : 'Calculate Autophagy'}
                        </button>

                        <p className="disclaimer">
                            This tool provides educational estimates only and is not medical advice.
                        </p>
                    </div>
                </div>

                {/* Right Panel: Results */}
                <div className="calc-panel glass-morphism results-panel">
                    <h2 className="panel-title">Your Autophagy Results</h2>

                    {!result ? (
                        <div className="results-placeholder">
                            <div className="abacus-icon">🧮</div>
                            <h3>Your Results Will Appear Here</h3>
                            <p>Fill out the form and click "Calculate Autophagy" to see your personalized results.</p>
                        </div>
                    ) : (
                        <div className="results-content animate-fade-in">
                            <div className="results-grid">
                                <div className="result-card start-card">
                                    <span className="card-label">Autophagy Start</span>
                                    <div className="card-value-box">
                                        <span className="value">{result.start} hours</span>
                                        <span className="sub">into your fast</span>
                                    </div>
                                </div>
                                <div className="result-card peak-card">
                                    <span className="card-label">Peak Autophagy</span>
                                    <div className="card-value-box">
                                        <span className="value">{result.peak} hours</span>
                                        <span className="sub">into your fast</span>
                                    </div>
                                </div>
                                <div className="result-card secondary-card">
                                    <span className="card-label">Calories Burned</span>
                                    <div className="card-value">{result.calories} kcal</div>
                                </div>
                                <div className="result-card secondary-card">
                                    <span className="card-label">Water Intake</span>
                                    <div className="card-value">{result.water} liters</div>
                                </div>
                            </div>

                            <div className="difficulty-section">
                                <div className="difficulty-header">
                                    <span>Difficulty Level</span>
                                </div>
                                <div className="difficulty-bar">
                                    <div className="difficulty-fill" style={{ width: `${result.difficulty}%` }}></div>
                                </div>
                                <div className="difficulty-labels">
                                    <span>Extreme</span>
                                </div>
                            </div>

                            <div className="tips-section">
                                <h3>Tips for Your Fast</h3>
                                <ul>
                                    <li>Start with shorter fasting windows and gradually increase duration.</li>
                                    <li>Stay hydrated throughout your fast.</li>
                                    {experience && <li>Consider light exercise to accelerate glycogen depletion.</li>}
                                    {parseFloat(hours) > 24 && <li>Focus on mineral replenishment (electrolytes) for longer fasts.</li>}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
