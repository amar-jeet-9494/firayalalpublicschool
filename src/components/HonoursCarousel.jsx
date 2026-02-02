'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function HonoursCarousel(props) {
    const [honoursData, setHonoursData] = useState(props.items || []);
    const [loading, setLoading] = useState(!props.items);
    const title = props.title || "HONOURS, ACCOLADES & MILESTONES OF PRIDE";
    const subtitle = props.subtitle || "Moments of Honour — a showcase of the distinguished guests, eminent educationists, and respected dignitaries who have graced our events and acknowledged Firayalal Public School for its academic excellence, holistic development initiatives, and contributions to the community.";

    useEffect(() => {
        if (props.items) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch('/api/honours-milestones');
                const result = await res.json();
                if (result.data) {
                    setHonoursData(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch Honours Milestones', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [props.items]);

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

    // Calculate position and transform for each slide
    const getSlideStyle = (index) => {
        if (!totalSlides) return {};

        const diff = index - activeIndex;
        // Handle negative modulo correctly in JS
        const normalizedDiff = ((diff % totalSlides) + totalSlides) % totalSlides;

        // Determine distance from center (0) in circular buffer
        // If totalSlides is 8: 0->0, 1->1, 7->-1
        let actualDiff = normalizedDiff;
        if (actualDiff > totalSlides / 2) {
            actualDiff -= totalSlides;
        }

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
            // Improved hidden logic to prevent piling up
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
                <h2 className="honours-title">{title}</h2>
                <p className="honours-subtitle">
                    {subtitle}
                </p>

                <div
                    className="coverflow-wrapper"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {honoursData.length === 0 && !loading && (
                        <div className="w-full text-center py-20 text-gray-500">
                            <p>No milestones found. Please add them from the Admin Dashboard.</p>
                        </div>
                    )}

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
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                                            }}
                                        />

                                        {/* Hover Overlay */}
                                        <div className="slide-overlay">
                                            <div className="overlay-content">
                                                <h3 className="overlay-title">
                                                    {item.title} {item.designation ? `| ${item.designation}` : ''}
                                                </h3>
                                                <a href={item.link || '/photo-gallery'} className="overlay-link">
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
