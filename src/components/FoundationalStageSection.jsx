'use client';

import { useState, useEffect } from 'react';

export default function FoundationalStageSection() {
    // Slideshow states for each image grid box
    const [slideIndex1, setSlideIndex1] = useState(0);
    const [slideIndex2, setSlideIndex2] = useState(0);
    const [slideIndex3, setSlideIndex3] = useState(0);

    // Image arrays for each slideshow
    const images1 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-08-012740.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-09.37.25_844c2744.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-09.36.29_9ef0d5b9.avif'
    ];

    const images2 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-08-012659.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-04-at-11.39.18_cfdf197c-1.avif'
    ];

    const images3 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-184546.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-192439.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-09.37.23_7587fbc5.avif'
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
        <section className="foundational-stage-section">
            <div className="foundational-container">
                {/* Left Side - Content */}
                <div className="foundational-content">
                    <h2 className="foundational-heading">About the Foundational Stage</h2>
                    <div className="foundational-text">
                        <p>
                            The Foundational Stage (Bal Vatika II to Grade II) is where young learners begin their exciting journey of discovery. In alignment with the National Education Policy (NEP) 2020, this stage focuses on joyful learning, foundational literacy and numeracy, and developing essential life skills.
                        </p>
                        <p>
                            At our school, learning is play-based, flexible, and designed to nurture curiosity, creativity, and confidence. We ensure every child learns at their own pace in a warm and caring environment.
                        </p>
                    </div>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="foundational-btn"
                    >
                        Apply for Admission
                    </a>
                </div>

                {/* Right Side - Image Slideshow Grid */}
                <div className="foundational-image-grid">
                    {/* Larger horizontal slideshow */}
                    <div className="foundational-slide-box foundational-slide-horizontal">
                        {images1.map((img, idx) => (
                            <div
                                key={idx}
                                className={`foundational-slide-image ${idx === slideIndex1 ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>

                    {/* Column with 2 vertical slideshows */}
                    <div className="foundational-slide-column">
                        <div className="foundational-slide-box foundational-slide-vertical">
                            {images2.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`foundational-slide-image slide-down ${idx === slideIndex2 ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>
                        <div className="foundational-slide-box foundational-slide-vertical">
                            {images3.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`foundational-slide-image slide-up ${idx === slideIndex3 ? 'active' : ''}`}
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
