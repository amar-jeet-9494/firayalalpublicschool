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

    const galleryData = {
        'Ceremonies': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/20250723_095522-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182639.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-183013.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-8.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182715.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-2.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/IMG_3632-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/IMG_3758-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/20250723_094512-scaled.avif"
        ],
        'Workshop': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_8167-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171728.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171528.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_1004-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/8.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0995-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171624.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171423.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/7-1.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171556.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_8160-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171805.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171439.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171544.avif"
        ],
        'Achievers': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014c.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/18b-1.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16d.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/3-2.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/2-3.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19a.avif"
        ],
        'Science Exhibition': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4907-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_5012-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4898-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4905-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_5033-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_3849-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4976-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4902-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4906-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4966-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4903-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4990-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4921-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4920-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_5006-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4977-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-101822.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4951-scaled.avif"
        ],
        'Cultural Programme': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3048-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG-20220811-WA0030.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3074-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3066-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0545-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3036-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3075-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3082-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/sjf26251-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3069-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3031-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3035-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0538-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3027-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3059-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3032-scaled.avif"
        ],
        'Kids Activity': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_085120-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_090659-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_091722-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WALL.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183806.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183918.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-184608.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-170050.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_092955-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_20230515_072416-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3069-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4903-scaled.avif"
        ],
        'Sports': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-03-145403.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-03-145152.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-03-140134.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_20240708_130248-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_20240810_095158-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_20241212_121037-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-02-24-at-12.17.35-PM-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183806.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-101954.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/18.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183600.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183918.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-06-150237.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-111945.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/sport-8-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-190705.avif"
        ],
        'Indoor Activity': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-2.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-192439.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/6-2.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Music.avif"
        ],
        'Summer Camp': [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_092714-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_081731-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_093507-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_092955-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_072542-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_101239-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_093605-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_082553-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_20230515_072416-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_084107-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_081613-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_094608-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_075837-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_083814-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_20230515_091302-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_073146-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_072752-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_101335-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_080007-scaled.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20230515_081954-scaled.avif"
        ]
    };

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
                    {galleryData[activeTab].map((url, index) => (
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
                    ))}
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
