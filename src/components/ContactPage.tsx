import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, MessageSquare, User, AtSign, FileText } from 'lucide-react';

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="listing-hero-icon contact-icon">
                    <MessageSquare size={36} />
                </div>
                <h1 className="gradient-text">Contact Us</h1>
                <p>Have a question, suggestion, or want to contribute? We'd love to hear from you.</p>
            </div>

            <div className="contact-grid">
                {/* Info Cards */}
                <div className="contact-info-col">
                    <div className="contact-card glass-morphism">
                        <div className="contact-card-icon">
                            <Mail size={22} />
                        </div>
                        <div className="contact-card-details">
                            <h4>Email Us</h4>
                            <p>hello@autophagydir.com</p>
                            <span className="contact-card-hint">We reply within 24 hours</span>
                        </div>
                    </div>

                    <div className="contact-card glass-morphism">
                        <div className="contact-card-icon">
                            <MapPin size={22} />
                        </div>
                        <div className="contact-card-details">
                            <h4>Location</h4>
                            <p>Worldwide — Fully Remote</p>
                            <span className="contact-card-hint">Serving the global community</span>
                        </div>
                    </div>

                    <div className="contact-card glass-morphism">
                        <div className="contact-card-icon">
                            <Clock size={22} />
                        </div>
                        <div className="contact-card-details">
                            <h4>Working Hours</h4>
                            <p>Mon – Fri, 9 AM – 6 PM UTC</p>
                            <span className="contact-card-hint">Weekend inquiries answered Monday</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="contact-form-col">
                    <form className="contact-form glass-morphism" onSubmit={handleSubmit}>
                        <h3>Send a Message</h3>

                        <div className="form-group">
                            <label htmlFor="contact-name">
                                <User size={15} /> Full Name
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">
                                <AtSign size={15} /> Email Address
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-subject">
                                <FileText size={15} /> Subject
                            </label>
                            <select
                                id="contact-subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a topic...</option>
                                <option value="general">General Inquiry</option>
                                <option value="suggestion">Resource Suggestion</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="bug">Report an Issue</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">
                                <MessageSquare size={15} /> Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Tell us what's on your mind..."
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit-btn" disabled={submitted}>
                            {submitted ? (
                                <>✓ Message Sent!</>
                            ) : (
                                <><Send size={18} /> Send Message</>
                            )}
                        </button>

                        {submitted && (
                            <p className="success-msg">Thank you! We'll get back to you shortly.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
