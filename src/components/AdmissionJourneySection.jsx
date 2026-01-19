'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdmissionJourneySection() {
    // Slideshow images for each box
    const slideshow1 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-182627.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-9.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-8.avif'
    ];

    const slideshow2 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-182828.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-11.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-10.avif'
    ];

    const slideshow3 = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183600.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183806.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183918.avif'
    ];

    // Active slide indices for each slideshow
    const [activeSlides, setActiveSlides] = useState([0, 0, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlides(prev => [
                (prev[0] + 1) % slideshow1.length,
                (prev[1] + 1) % slideshow2.length,
                (prev[2] + 1) % slideshow3.length
            ]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="admission-journey-section">
            <div className="admission-journey-container">
                {/* Left Side - Image Slideshow Grid */}
                <div className="journey-images-grid">
                    {/* Large left image with horizontal slide */}
                    <div className="journey-slide-box slide-box-large">
                        {slideshow1.map((img, idx) => (
                            <div
                                key={idx}
                                className={`slide-image slide-horizontal ${idx === activeSlides[0] ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>

                    {/* Right column with 2 stacked images */}
                    <div className="journey-slide-column">
                        {/* Top right image with vertical slide down */}
                        <div className="journey-slide-box slide-box-small">
                            {slideshow2.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`slide-image slide-vertical-down ${idx === activeSlides[1] ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>

                        {/* Bottom right image with vertical slide up */}
                        <div className="journey-slide-box slide-box-small">
                            {slideshow3.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`slide-image slide-vertical-up ${idx === activeSlides[2] ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="journey-content">
                    <h2 className="journey-heading">Start Your Admission Journey</h2>

                    <p className="journey-text">
                        At <strong>Firayalal Public School (F.P.S.)</strong>, we believe that education is the foundation of a child's lifelong journey of learning and growth. Guided by the principles of the <strong>National Education Policy (NEP) 2020</strong>, our admission philosophy emphasizes <strong>equal opportunity, inclusivity, and holistic development</strong>.
                    </p>

                    <p className="journey-text">
                        We are committed to nurturing every learner into a <strong>responsible, confident, and compassionate individual</strong>, equipped with the knowledge, skills, and values needed to thrive in an ever-evolving world. Admissions are open to all children who meet the eligibility criteria and share our passion for excellence.
                    </p>

                    <p className="journey-text">
                        Our school provides a <strong>stimulating and supportive environment</strong> that encourages curiosity, creativity, and collaboration. Each child is encouraged to explore, question, and express — fostering not just academic growth but also emotional intelligence and social awareness.
                    </p>

                    <p className="journey-text">
                        F.P.S. is administered by the <strong>Ajay Munjal Memorial Trust</strong>, established in memory of <strong>Late Shri Ajay Munjal</strong>, under the visionary leadership of <strong>Shri Harish Munjal</strong>. The Trust upholds the school's legacy of academic excellence, integrity, and service to society — ensuring that every child's journey at F.P.S. is meaningful, purposeful, and future-ready.
                    </p>

                    <Link
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proceed-admission-btn"
                    >
                        Proceed to Admission
                    </Link>
                </div>
            </div>
        </section>
    );
}
