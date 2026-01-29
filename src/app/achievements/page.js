'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import Lightbox from '@/components/Lightbox';
import './achievements.css';

// Data extraction from the provided content
// Data will be fetched from Supabase


export default function AchievementsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [achievementsData, setAchievementsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-170600.avif';

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch('/api/dynamic-tables?name=achievements_data');
                const data = await response.json();

                if (data && data.content) {
                    setAchievementsData(data.content);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    if (loading) {
        return <div className="achievements-loading" style={{textAlign: 'center', padding: '50px'}}>Loading Achievements...</div>;
    }

    const currentYearImages = achievementsData[activeTab]?.images || [];

    return (
        <div className="achievements-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="achievements-hero-section">
                <div
                    className="achievements-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="achievements-hero-overlay" />
                <div className="achievements-hero-content">
                    <h1 className="achievements-hero-title">Achievements</h1>
                    <h2 className="achievements-hero-subtitle">Celebrating Our Success</h2>
                </div>
            </section>

            {/* Main Content */}
            <main className="achievements-main-content">
                <div className="achievements-intro">
                    <h2 className="achievements-intro-heading">Our Historical Achievements</h2>
                    <p className="achievements-intro-text">
                        At <strong>Firayalal Public School</strong>, we take pride in the remarkable achievements of our students throughout the years.
                    </p>
                </div>

                <div className='achievements-tabs-border'>

                {/* Tabs Navigation */}
                <div className="achievements-tabs-wrapper">
                    <div className="achievements-tabs-list">
                        {achievementsData.map((data, index) => (
                            <button
                                key={index}
                                className={`achievements-tab-button ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {data.year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="achievements-tab-content">
                    {achievementsData.map((data, index) => (
                        activeTab === index && (
                            <div key={index} className="achievements-tab-content-panel">
                                <h2 className="achievements-year-heading">{data.heading}</h2>
                                <div className="achievements-gallery-grid">
                                    {data.images.map((imgSrc, imgIndex) => (
                                        <div 
                                            key={imgIndex} 
                                            className="achievements-gallery-item"
                                            onClick={() => openLightbox(imgIndex)}
                                        >
                                            <img
                                                src={imgSrc} 
                                                alt={`${data.heading} - ${imgIndex + 1}`} 
                                                className="achievements-image"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
                </div>
            </main>

            <Lightbox 
                isOpen={lightboxOpen} 
                onClose={closeLightbox} 
                images={currentYearImages} 
                initialIndex={lightboxIndex} 
            />

            <Footer />
        </div>
    );
}
