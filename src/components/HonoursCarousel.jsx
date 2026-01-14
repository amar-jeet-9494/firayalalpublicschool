'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function HonoursCarousel() {
    // Sample data - will be replaced with API data
    // Backend structure: { image_url: "", title: "", designation: "", date: "" }
    const honoursData = [
        {
            id: 1,
            image_url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=600&fit=crop',
            title: 'Mr. Ajit',
            designation: 'Trustee Member',
            galleryLink: '/photo-gallery',
        },
        {
            id: 2,
            image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
            title: 'Mr. Subhash Kumar Patni',
            designation: 'Principal - South Point Public School, Bundu',
            galleryLink: '/photo-gallery',
        },
        {
            id: 3,
            image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop',
            title: 'Mr. S.K. Mishra',
            designation: 'Principal - D.A.V. Public School, Bariatu',
            galleryLink: '/photo-gallery',
        },
        {
            id: 4,
            image_url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop',
            title: 'Dr. (Capt.) Sumit Kaur',
            designation: 'Principal - Guru Nanak Higher Secondary School',
            galleryLink: '/photo-gallery',
        },
        {
            id: 5,
            image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
            title: 'Mrs. Monika Shrivastav',
            designation: 'Academic Director - Sachidanand Gyan Bharti Model School, Ranchi',
            galleryLink: '/photo-gallery',
        },
        {
            id: 6,
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
            title: 'Professor (Dr.) Raman Kumar Jha',
            designation: 'Vice Chancellor - ICFAI University, Jharkhand',
            galleryLink: '/photo-gallery',
        },
        {
            id: 7,
            image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
            title: 'Mr. Shuchitangshu Chatterjee',
            designation: 'Vice Chancellor - RKDF University',
            galleryLink: '/photo-gallery',
        },
        {
            id: 8,
            image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop',
            title: 'Mr. Bijay Kumar',
            designation: 'Sr. DGM J/C FFP, HEC',
            galleryLink: '/photo-gallery',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const totalSlides = honoursData.length;

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const handleSlideClick = (index) => {
        setActiveIndex(index);
    };

    // Calculate position and transform for each slide - Only 3 visible (center + 2 tilted sides)
    const getSlideStyle = (index) => {
        const diff = index - activeIndex;
        const normalizedDiff = ((diff + totalSlides) % totalSlides);
        const actualDiff = normalizedDiff > totalSlides / 2 ? normalizedDiff - totalSlides : normalizedDiff;

        let translateX = 0;
        let translateZ = 0;
        let rotateY = 0;
        let scale = 1;
        let opacity = 1;
        let zIndex = 0;

        if (actualDiff === 0) {
            // Center slide - Large and prominent
            translateX = 0;
            translateZ = 50;
            rotateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 10;
        } else if (actualDiff === 1) {
            // Right side slide - tilted away
            translateX = 520;
            translateZ = -150;
            rotateY = -35;
            scale = 0.75;
            opacity = 1;
            zIndex = 5;
        } else if (actualDiff === -1) {
            // Left side slide - tilted away
            translateX = -520;
            translateZ = -150;
            rotateY = 35;
            scale = 0.75;
            opacity = 1;
            zIndex = 5;
        } else {
            // Hidden slides - completely off screen
            translateX = actualDiff > 0 ? 1200 : -1200;
            translateZ = -300;
            rotateY = actualDiff > 0 ? -45 : 45;
            scale = 0.5;
            opacity = 0;
            zIndex = 0;
        }

        return {
            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex,
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        };
    };

    return (
        <section className="honours-section">
            <div className="honours-container">
                <h2 className="honours-title">HONOURS, ACCOLADES & MILESTONES OF PRIDE</h2>
                <p className="honours-subtitle">
                    Moments of Honour — a showcase of the distinguished guests, eminent educationists,
                    and respected dignitaries who have graced our events and acknowledged
                    Firayalal Public School for its academic excellence, holistic development initiatives,
                    and contributions to the community.
                </p>

                <div
                    className="coverflow-wrapper"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Left Arrow */}
                    {/* <button
                        className="coverflow-arrow left"
                        onClick={handlePrev}
                        aria-label="Previous slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button> */}

                    {/* 3D Carousel */}
                    <div className="coverflow-stage">
                        <div className="coverflow-track">
                            {honoursData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`coverflow-slide ${index === activeIndex ? 'active' : ''}`}
                                    style={getSlideStyle(index)}
                                    onClick={() => handleSlideClick(index)}
                                >
                                    <div className="slide-image">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            loading="lazy"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="slide-overlay">
                                            <div className="overlay-content">
                                                <h3 className="overlay-title">
                                                    {item.title} | {item.designation}
                                                </h3>
                                                <a href={item.galleryLink} className="overlay-link">
                                                    View Gallery
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shadow effect for 3D look */}
                                    <div className="slide-shadow"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    {/* <button
                        className="coverflow-arrow right"
                        onClick={handleNext}
                        aria-label="Next slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button> */}
                </div>

                {/* Dots Navigation */}
                {/* <div className="coverflow-dots">
                    {honoursData.map((_, index) => (
                        <button
                            key={index}
                            className={`coverflow-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div> */}
            </div>
        </section>
    );
}
