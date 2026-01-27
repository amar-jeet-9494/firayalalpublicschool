'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './contact.css';

export default function GetInTouchPage() {
    return (
        <div className="contact-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="contact-hero-section">
                <div className="contact-hero-overlay"></div>
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">Get In Touch</h1>
                    <h2 className="contact-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                    </h2>
                </div>
            </section>

            {/* Main Content Section (Placeholder for future content) */}
            <main className="contact-main-content">
                <div className="contact-layout-wrapper">
                    
                    {/* Left Column: Contact Information */}
                    <div className="contact-info-col">
                        <div className="info-header">
                            <h2 className="info-main-title">Get In Touch</h2>
                            <h3 className="school-name">Firayalal Public School</h3>
                            <p className="school-address">
                                5, Mahatma Gandhi Main Rd, near Over Bridge, New Garden, Kanka, Ranchi, Jharkhand 834001
                            </p>
                        </div>

                        {/* General Queries */}
                        <div className="contact-group">
                            <h3 className="group-title">For Any Queries:</h3>
                            <div className="group-divider"></div>
                            <ul className="info-list">
                                <li>
                                    <span className="icon">📞</span>
                                    <a href="tel:08065912099">080-65912099</a>
                                </li>
                                <li>
                                    <span className="icon">📞</span>
                                    <a href="tel:18008900209">1800-8900-209</a>
                                </li>
                                <li>
                                    <span className="icon">💬</span>
                                    <a href="https://wa.me/9264431217" target="_blank" rel="noopener noreferrer">+91-9264431217</a>
                                </li>
                                <li>
                                    <span className="icon">✉️</span>
                                    <a href="mailto:info@firayalalpublicschool.edu.in">info@firayalalpublicschool.edu.in</a>
                                </li>
                            </ul>
                        </div>

                        {/* Principal */}
                        <div className="contact-group">
                            <h3 className="group-title">For All Information & Query</h3>
                            <div className="group-divider"></div>
                            <ul className="info-list">
                                <li className="person-name">Mr. Niraj Kumar Sinha (Principal)</li>
                                <li>
                                    <span className="icon">✉️</span>
                                    <a href="mailto:principal@firayalalpublicschool.edu.in">principal@firayalalpublicschool.edu.in</a>
                                </li>
                            </ul>
                        </div>

                        {/* Vice Principal */}
                        <div className="contact-group">
                            <h3 className="group-title">For Academics Related Information & Query (Grade : VI - XII)</h3>
                            <div className="group-divider"></div>
                            <ul className="info-list">
                                <li className="person-name">Mrs. Haneet (Vice Principal)</li>
                                <li>
                                    <span className="icon">✉️</span>
                                    <a href="mailto:viceprincipal@firayalalpublicschool.edu.in">viceprincipal@firayalalpublicschool.edu.in</a>
                                </li>
                            </ul>
                        </div>

                        {/* Examination Dept */}
                        <div className="contact-group">
                            <h3 className="group-title">Examination Department</h3>
                            <div className="group-divider"></div>
                            <ul className="info-list">
                                <li className="person-name">Mr. Sunil Prasad (Examination Controller)</li>
                                <li>
                                    <span className="icon">✉️</span>
                                    <a href="mailto:examination@firayalalpublicschool.edu.in">examination@firayalalpublicschool.edu.in</a>
                                </li>
                            </ul>
                        </div>

                        {/* Admin Dept */}
                        <div className="contact-group">
                            <h3 className="group-title">Administration Department / School Transport Incharge</h3>
                            <div className="group-divider"></div>
                            <ul className="info-list">
                                <li className="person-name">Mr. Kumar Bijay Raj Verma (Admin Incharge)</li>
                                <li>
                                    <span className="icon">✉️</span>
                                    <a href="mailto:bijay.verma@firayalalpublicschool.edu.in">bijay.verma@firayalalpublicschool.edu.in</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Form & Map */}
                    <div className="contact-form-col">
                        <div className="form-section">
                            <h2 className="form-main-title">Connect with us</h2>
                            <form className="cf7-style-form">
                                <div className="form-field">
                                    <label>Your name</label>
                                    <input type="text" name="your-name" required />
                                </div>
                                <div className="form-field">
                                    <label>Your email</label>
                                    <input type="email" name="your-email" required />
                                </div>
                                <div className="form-field">
                                    <label>Subject</label>
                                    <input type="text" name="your-subject" required />
                                </div>
                                <div className="form-field">
                                    <label>Your message (optional)</label>
                                    <textarea name="your-message" rows="5"></textarea>
                                </div>
                                <button type="submit" className="wp-submit-btn">Submit</button>
                            </form>
                        </div>
                        
                        <div className="map-section">
                            <iframe 
                                loading="lazy" 
                                src="https://maps.google.com/maps?q=Firayalal%20Public%20School%2C%20Mahatma%20Gandhi%20Main%20Rd%2C%20near%20Over%20Bridge%2C%20New%20Garden%2C%20Kanka%2C%20Ranchi%2C%20Jharkhand%20834001%2C%20India&t=m&z=13&output=embed&iwloc=near" 
                                title="Firayalal Public School Location"
                                aria-label="Firayalal Public School Location"
                                className="google-map-iframe"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
