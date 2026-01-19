'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import FoundationalStageSection from '@/components/FoundationalStageSection';
import FoundationalAdmissionInfo from '@/components/FoundationalAdmissionInfo';

export default function FoundationalStagePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Background slideshow images
    const heroImages = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-185126.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-04-at-11.39.18_cfdf197c-2.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-09.37.25_ad5baf03.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-09.36.29_a4a478db.avif'
    ];

    // Auto-slide effect every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section with Background Slideshow */}
            <section className="foundational-hero-section">
                {/* Background Slideshow */}
                <div className="foundational-hero-slideshow">
                    {heroImages.map((img, idx) => (
                        <div
                            key={idx}
                            className={`foundational-hero-slide ${idx === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                </div>

                {/* Dark Overlay */}
                <div className="foundational-hero-overlay" />

                {/* Hero Content */}
                <div className="foundational-hero-content">
                    <h1 className="foundational-hero-title">Foundational Stage</h1>
                    <h2 className="foundational-hero-subtitle">Building Bright Futures, One Step at a Time</h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="foundational-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* Foundational Stage Section */}
            <FoundationalStageSection />

            {/* Admission Info Section */}
            <FoundationalAdmissionInfo />

            {/* Footer */}
            <Footer />
        </>
    );
}
