'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './feedback.css';

export default function FeedbackPage() {
    const [formType, setFormType] = useState('Suggestion');

    return (
        <div className="feedback-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="feedback-hero-section">
                <div className="feedback-hero-overlay"></div>
                <div className="feedback-hero-content">
                    <h1 className="feedback-hero-title">Feedback and Suggestions</h1>
                </div>
            </section>

            {/* Main Content Section */}
            <main className="feedback-main-content">
                <div className="feedback-layout-wrapper">
                    
                    {/* Left Info Column */}
                    <div className="feedback-info-col">
                        <div className="info-logo-wrapper">
                            <img 
                                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/Firayalal-Public-School.avif" 
                                alt="Firayalal Public School Ranchi | Logo" 
                                className="info-logo"
                            />
                        </div>
                        <h2 className="info-title">We Value Your Voice</h2>
                        <div className="info-divider"></div>
                        <div className="info-text">
                            <p>At Firayalal Public School, we believe communication builds trust. Whether you want to share a suggestion, express a concern, or provide feedback — this page is your space. Every response is reviewed carefully by our administrative team to ensure continuous improvement in our learning environment.</p>
                        </div>
                        <div className="info-divider"></div>
                    </div>

                    {/* Right Form Column */}
                    <div className="feedback-form-col">
                        <div className="fps-form-wrapper">
                            <h2 className="form-title">Share Your Voice with Firayalal Public School</h2>
                            <p className="form-subtitle">Your suggestions, grievances, and feedback help us improve and grow together.</p>
                            
                            <form className="fps-feedback-form">
                                {/* Common Fields */}
                                <div className="form-group">
                                    <label htmlFor="form-type">I would like to share a</label>
                                    <select 
                                        id="form-type" 
                                        name="form-type" 
                                        value={formType}
                                        onChange={(e) => setFormType(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="Suggestion">Suggestion</option>
                                        <option value="Grievance">Grievance</option>
                                        <option value="Feedback">Feedback</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="full-name" placeholder="Enter your full name" className="form-input" required />
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" placeholder="Enter your email address" className="form-input" required />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" placeholder="Enter your phone number" className="form-input" />
                                </div>

                                <div className="form-group">
                                    <label>Relation to School</label>
                                    <select name="relation" className="form-select">
                                        <option value="Student">Student</option>
                                        <option value="Parent">Parent</option>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Visitor">Visitor</option>
                                    </select>
                                </div>

                                {/* Conditional Fields: Suggestion */}
                                {formType === 'Suggestion' && (
                                    <div className="conditional-fields fade-in">
                                        <div className="form-group">
                                            <label>Suggestion Category</label>
                                            <select name="suggestion-category" className="form-select">
                                                <option value="Academic">Academic</option>
                                                <option value="Infrastructure">Infrastructure</option>
                                                <option value="Activities">Activities</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Your Suggestion</label>
                                            <textarea name="suggestion-message" rows="5" placeholder="Share your valuable suggestion..." className="form-textarea"></textarea>
                                        </div>
                                    </div>
                                )}

                                {/* Conditional Fields: Grievance */}
                                {formType === 'Grievance' && (
                                    <div className="conditional-fields fade-in">
                                        <div className="form-group">
                                            <label>Subject of Grievance</label>
                                            <input type="text" name="grievance-subject" placeholder="Mention subject of your grievance" className="form-input" />
                                        </div>
                                        <div className="form-group">
                                            <label>Describe Your Concern</label>
                                            <textarea name="grievance-message" rows="5" placeholder="Please describe your grievance in detail..." className="form-textarea"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Attach File (optional)</label>
                                            <input type="file" name="grievance-file" className="form-file-input" />
                                        </div>
                                    </div>
                                )}

                                {/* Conditional Fields: Feedback */}
                                {formType === 'Feedback' && (
                                    <div className="conditional-fields fade-in">
                                        <div className="form-group radio-group-wrapper">
                                            <label>Rate Your Experience</label>
                                            <div className="radio-options">
                                                <label className="radio-label">
                                                    <input type="radio" name="rating" value="Excellent" /> ⭐️ Excellent
                                                </label>
                                                <label className="radio-label">
                                                    <input type="radio" name="rating" value="Good" /> 😊 Good
                                                </label>
                                                <label className="radio-label">
                                                    <input type="radio" name="rating" value="Average" /> 😐 Average
                                                </label>
                                                <label className="radio-label">
                                                    <input type="radio" name="rating" value="Poor" /> 🙁 Poor
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Your Feedback</label>
                                            <textarea name="feedback-message" rows="5" placeholder="Share your feedback here..." className="form-textarea"></textarea>
                                        </div>
                                    </div>
                                )}

                                <div className="form-action">
                                    <button type="submit" className="submit-btn">Submit Response</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Closing Section */}
                <div className="feedback-closing-section">
                    <div className="closing-content-wrapper">
                        <h2 className="closing-title">Together, We Build a Better School</h2>
                        <div className="closing-divider"></div>
                        <div className="closing-text">
                            <p>Every suggestion, grievance, or feedback you share is a step toward making Firayalal Public School more transparent, responsive, and student-focused</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
