'use client';

import { useState, useEffect } from 'react';

export default function SecondaryStageSection() {
    // Slideshow states for each image grid box
    const [slideIndex1, setSlideIndex1] = useState(0);
    const [slideIndex2, setSlideIndex2] = useState(0);
    const [slideIndex3, setSlideIndex3] = useState(0);

    // Image arrays for each slideshow (Secondary Stage images - extracted from WordPress)
    const images1 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-06-114843.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-06-120231.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/11-1.avif'
    ];

    const images2 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/11-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-7.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/event-5.avif'
    ];

    const images3 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/14-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-7.avif'
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
        <section className="secondary-about-section">
            <div className="secondary-about-container">
                {/* Left Side - Content */}
                <div className="secondary-about-content">
                    <h2 className="secondary-about-heading">About the Secondary Stage</h2>
                    <div className="secondary-about-text">
                        <p>
                            The Secondary Stage represents a period of academic consolidation and career-oriented preparation. It focuses on developing higher-order thinking, decision-making skills, and a deeper understanding of specialized subjects.
                        </p>
                        <p>
                            According to NEP 2020, the Secondary Stage focuses on <strong>deeper, multidisciplinary learning</strong> that builds critical thinking, problem-solving skills, and future readiness. Students explore subjects in greater depth while enjoying increased flexibility to choose areas aligned with their interests.
                        </p>
                        <p>
                            Learning becomes more inquiry-based, analytical, and application-oriented through projects, research tasks, and real-world problem solving. The curriculum integrates academics with vocational education, life skills, values, arts, and technology. This stage prepares learners for higher education, careers, and responsible citizenship.
                        </p>
                    </div>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-about-btn"
                    >
                        Apply for Admission
                    </a>
                </div>

                {/* Right Side - Image Slideshow Grid */}
                <div className="secondary-image-grid">
                    {/* Larger horizontal slideshow */}
                    <div className="secondary-slide-box secondary-slide-horizontal">
                        {images1.map((img, idx) => (
                            <div
                                key={idx}
                                className={`secondary-slide-image ${idx === slideIndex1 ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>

                    {/* Column with 2 vertical slideshows */}
                    <div className="secondary-slide-column">
                        <div className="secondary-slide-box secondary-slide-vertical">
                            {images2.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`secondary-slide-image slide-down ${idx === slideIndex2 ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>
                        <div className="secondary-slide-box secondary-slide-vertical">
                            {images3.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`secondary-slide-image slide-up ${idx === slideIndex3 ? 'active' : ''}`}
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
