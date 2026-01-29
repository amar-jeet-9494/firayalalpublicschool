'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import Lightbox from '@/components/Lightbox';
import './gallery.css';

export default function PhotoGalleryPage() {
    return (
        <div className="gallery-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="gallery-hero-section">
                <div className="gallery-hero-overlay"></div>
                <div className="gallery-hero-content">
                    <h1 className="gallery-hero-title">Photo Gallery</h1>
                    <h2 className="gallery-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                    </h2>
                </div>
            </section>

            {/* Main Content Section */}
            <main className="gallery-main-content">
                
                {/* Intro Section */}
                <div className="gallery-intro-section">
                    <div className="intro-text-wrapper">
                        <p>From classrooms to playgrounds, cultural events to sports competitions, and special assemblies to festive celebrations, this gallery is a window into the joyful journey of our students.</p>
                    </div>
                    <div className="intro-text-wrapper">
                        <p>Our Photo Gallery captures the spirit of school life—moments of learning, creativity, achievements, and celebrations. Each picture tells a story of curiosity, teamwork, and growth, reflecting the vibrant environment we provide for our students.</p>
                    </div>
                    <div className="intro-heading-wrapper">
                        <h2>Photo Gallery</h2>
                    </div>
                </div>

                {/* Life at Firayalal Section */}
                <div className="life-at-firayalal-section">
                    <div className="section-header">
                        <h2 className="section-title">Life at Firayalal</h2>
                    </div>

                    <GalleryTabs />
                </div>
            </main>

            <Footer />
        </div>
    );
}

function GalleryTabs() {
    const [activeTab, setActiveTab] = React.useState('Ceremonies');

    const tabs = [
        'Ceremonies', 'Workshop', 'Achievers', 'Science Exhibition', 
        'Cultural Programme', 'Kids Activity', 'Sports', 'Indoor Activity', 'Summer Camp'
    ];

    const [galleryData, setGalleryData] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('/api/dynamic-tables?name=gallery_data');
                const data = await response.json();
                
                if (data && data.content) {
                    const organized = {};
                    // Initialize keys with empty arrays to prevent crashes if categories missing
                    tabs.forEach(tab => organized[tab] = []);
                    
                    data.content.forEach(item => {
                       if (!organized[item.category]) organized[item.category] = [];
                       organized[item.category].push(item.url);
                    });
                    setGalleryData(organized);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
    const [lightboxIndex, setLightboxIndex] = React.useState(0);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <div className="tabs-container">
            {/* Tab Header */}
            <div className="tabs-header-scroll-wrapper">
                <div className="tabs-header">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content Grid */}
            <div className="tabs-content">
                <div className="gallery-masonry-grid">
                    {loading ? (
                        <div className="gallery-loading">Loading...</div>
                    ) : (
                        galleryData[activeTab]?.map((url, index) => (
                        <div key={index} className="gallery-items" onClick={() => openLightbox(index)}>
                            <div 
                                className="gallery-img-bg" 
                                style={{ backgroundImage: `url("${url}")` }}
                                role="img"
                                aria-label={`${activeTab} image ${index + 1}`}
                            ></div>
                            <div className="gallery-overlay">
                                <span className="gallery-view-icon">👁️</span>
                            </div>
                        </div>
                    )))}
                </div>
            </div>

            {/* Lightbox Component */}
            <Lightbox 
                isOpen={isLightboxOpen}
                images={galleryData[activeTab]}
                initialIndex={lightboxIndex}
                onClose={() => setIsLightboxOpen(false)}
            />
        </div>
    );
}
