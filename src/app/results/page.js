'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import Lightbox from '@/components/Lightbox';
import { supabase } from '@/lib/supabase';
import './results.css';

// Data will be fetched from Supabase


export default function ResultsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [resultsData, setResultsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-170600.avif';

    useEffect(() => {
        const fetchResults = async () => {
            if (!supabase) return;
            try {
                const { data, error } = await supabase
                    .from('dynamic_tables')
                    .select('content')
                    .eq('name', 'results_data')
                    .single();

                if (error) {
                    console.error("Error fetching results:", error);
                } else if (data && data.content) {
                    setResultsData(data.content);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    if (loading) {
        return <div className="results-loading" style={{textAlign: 'center', padding: '50px'}}>Loading Results...</div>;
    }

    const currentYearImages = resultsData[activeTab]?.images || [];

    return (
        <div className="results-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="results-hero-section">
                <div
                    className="results-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="results-hero-overlay" />
                <div className="results-hero-content">
                    <h1 className="results-hero-title">Academic Results</h1>
                    <h2 className="results-hero-subtitle">Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !</h2>
                </div>
            </section>

            {/* Main Content */}
            <main className="results-main-content">
                <div className="results-intro">
                    <h2 className="results-intro-heading">Celebrating Our Student's Success</h2>
                    <p className="results-intro-text">
                        At <strong>Firayalal Public School</strong>, we take pride in the remarkable achievements of our students. Their dedication, talent, and hard work inspire us every day.
                    </p>
                </div>

                <div className='results-tabs-border'>

                {/* Tabs Navigation */}
                <div className="results-tabs-wrapper">
                    <div className="results-tabs-list">
                        {resultsData.map((data, index) => (
                            <button
                                key={index}
                                className={`results-tab-button ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {data.year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="results-tab-content">
                    {resultsData.map((data, index) => (
                        activeTab === index && (
                            <div key={index} className="results-tab-content-panel">
                                <h2 className="results-year-heading">{data.heading}</h2>
                                <div className="results-gallery-grid">
                                    {data.images.map((imgSrc, imgIndex) => (
                                        <div 
                                            key={imgIndex} 
                                            className="results-gallery-item"
                                            onClick={() => openLightbox(imgIndex)}
                                        >
                                            <img 
                                                src={imgSrc} 
                                                alt={`${data.heading} - ${imgIndex + 1}`} 
                                                className="results-image"
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
