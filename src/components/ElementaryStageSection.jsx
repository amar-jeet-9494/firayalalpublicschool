'use client';

import { useState, useEffect } from 'react';

export default function ElementaryStageSection() {
    // Slideshow states for each image grid box
    const [slideIndex1, setSlideIndex1] = useState(0);
    const [slideIndex2, setSlideIndex2] = useState(0);
    const [slideIndex3, setSlideIndex3] = useState(0);

    // Image arrays for each slideshow (extracted from WordPress Elementary Stage page)
    const images1 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-9.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-9.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-9.avif'
    ];

    const images2 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-7.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/5-6.avif'
    ];

    const images3 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/6-4.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/8.avif'
    ];

    // Auto-slide effects
    useEffect(() => {
        const interval1 = setInterval(() => {
            setSlideIndex1((prev) => (prev + 1) % images1.length);
        }, 5000);
        return () => clearInterval(interval1);
    }, [images1.length]);

    useEffect(() => {
        const interval2 = setInterval(() => {
            setSlideIndex2((prev) => (prev + 1) % images2.length);
        }, 5000);
        return () => clearInterval(interval2);
    }, [images2.length]);

    useEffect(() => {
        const interval3 = setInterval(() => {
            setSlideIndex3((prev) => (prev + 1) % images3.length);
        }, 5000);
        return () => clearInterval(interval3);
    }, [images3.length]);

    return (
        <section className="elementary-about-section">
            <div className="elementary-about-container">
                {/* Left Side - Content */}
                <div className="elementary-about-content">
                    <h2 className="elementary-about-heading">About the Elementary Stage</h2>
                    <div className="elementary-about-text">
                        <p>
                            The Elementary Stage marks a smooth transition from play-based learning to structured education. It focuses on developing conceptual clarity, problem-solving ability, and strong communication skills.
                        </p>
                        <p>
                            At FPS, the curriculum at this phase encompasses a <strong>systematic, activity-based, experiential, and inquiry-driven approach</strong>.
                        </p>
                        <p>
                            As children progress through Grades III to V, their cognitive abilities expand, and the teaching-learning process evolves accordingly. Learning becomes more structured, engaging, and purposeful in conformity with <strong>LSRW Programme</strong>. Here we engage the students with listening, speaking, reading and writing in equal ratio.
                        </p>
                    </div>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="elementary-about-btn"
                    >
                        Apply for Admission
                    </a>
                </div>

                {/* Right Side - Image Slideshow Grid */}
                <div className="elementary-image-grid">
                    {/* Larger horizontal slideshow */}
                    <div className="elementary-slide-box elementary-slide-horizontal">
                        {images1.map((img, idx) => (
                            <div
                                key={idx}
                                className={`elementary-slide-image ${idx === slideIndex1 ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>

                    {/* Column with 2 vertical slideshows */}
                    <div className="elementary-slide-column">
                        <div className="elementary-slide-box elementary-slide-vertical">
                            {images2.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`elementary-slide-image slide-down ${idx === slideIndex2 ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>
                        <div className="elementary-slide-box elementary-slide-vertical">
                            {images3.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`elementary-slide-image slide-up ${idx === slideIndex3 ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
