'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import Lightbox from '@/components/Lightbox';
import './achievements.css';

// Data extraction from the provided content
const achievementsData = [
    {
        year: '2012 - 2013',
        heading: 'FPS Result - 2013',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2013a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2013b.avif'
        ]
    },
    {
        year: '2013 - 2014',
        heading: 'FPS Result - 2014',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014e.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014f.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014g.avif'
        ]
    },
    {
        year: '2014 - 2015',
        heading: 'FPS Result - 2015',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15f.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15e.avif'
        ]
    },
    {
        year: '2015 - 2016',
        heading: 'FPS Result - 2016',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16c.avif'
        ]
    },
    {
        year: '2016 - 2017',
        heading: 'FPS Result - 2017',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17a-1.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17a.avif'
        ]
    },
    {
        year: '2017 - 2018',
        heading: 'FPS Result - 2018',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/18b-1.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/18a-1.avif'
        ]
    },
    {
        year: '2018 - 2019',
        heading: 'FPS Result - 2019',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19b.avif'
        ]
    },
    {
        year: '2019 - 2020',
        heading: 'FPS Result - 2020',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/20a.avif'
        ]
    },
    {
        year: '2020 - 2021',
        heading: 'FPS Result - 2021',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/21b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/21a.avif'
        ]
    },
    {
        year: '2021 - 2022',
        heading: 'FPS Result - 2022',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif'
        ]
    }
];


export default function AchievementsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-170600.avif';

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const currentYearImages = achievementsData[activeTab].images;

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
