'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './results.css';

// Data extraction from the provided content
const resultsData = [
    {
        year: '2024 - 2025',
        heading: 'FPS Result - 2024',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/2-3.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/COMMERCE.avif'
        ]
    },
    {
        year: '2023 - 2024',
        heading: 'FPS Result - 2023',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-20-at-12.40.02_bf02af2e.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-20-at-12.40.02_284a0aee.avif'
        ]
    },
    {
        year: '2022 - 2023',
        heading: 'FPS Result - 2022',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif'
        ]
    },
    {
        year: '2021 - 2022',
        heading: 'FPS Result - 2022', /* Note: 2022 in source for this year as well, kept as is */
        images: [
             'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif',
             'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif'
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
        year: '2019 - 2020',
        heading: 'FPS Result - 2020',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/20a.avif'
        ]
    },
    {
        year: '2018 - 2019',
        heading: 'FPS Result - 2019',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19c.avif'
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
        year: '2016 - 2017',
        heading: 'FPS Result - 2017',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17a-1.avif'
        ]
    },
    {
        year: '2015 - 2016',
        heading: 'FPS Result - 2016',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16d.avif'
        ]
    },
    {
        year: '2014 - 2015',
        heading: 'FPS Result - 2015',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15e.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15f.avif'
        ]
    },
    {
        year: '2013 - 2014',
        heading: 'FPS Result - 2014',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014g.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014f.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014e.avif'

        ]
    },
    {
        year: '2012 - 2013',
        heading: 'FPS Result - 2013',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2013a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2013b.avif'
        ]
    }
];


export default function ResultsPage() {
    const [activeTab, setActiveTab] = useState(0);

    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-170600.avif';


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
                                        <div key={imgIndex} className="results-gallery-item">
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

            <Footer />
        </div>
    );
}
