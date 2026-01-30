'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function DistinguishedFeat() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeats = async () => {
            try {
                const res = await fetch('/api/distinguished-feat');
                const result = await res.json();
                if (result.data) {
                    setAchievements(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch Distinguished Feats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeats();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const containerRef = useRef(null);

    // Number of slides to show at once
    const slidesToShow = 2;
    const gap = 30; // Gap between slides in pixels
    const totalSlides = achievements.length;
    const maxIndex = Math.max(0, totalSlides - slidesToShow);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Calculate the translation
    // Each slide = (100% - gap) / 2 = 50% - (gap/2)
    // For each slide we translate: slideWidth + gap
    // Using calc: translateX = currentIndex * (50% + gap/2)
    // But simpler: use calc(currentIndex * (50% + 15px)) for 30px gap with 2 slides

    const getTranslateX = () => {
        // Each slide takes exactly 50% of container width
        // Plus we need to account for the gap (30px total, split between slides)
        // Translation per slide = 50% + (gap / slidesToShow)px = 50% + 15px
        return `translateX(calc(-${currentIndex} * (50% + ${gap / slidesToShow}px)))`;
    };


    return (
        <section className="distinguished-feat">
            <div className="feat-container">
                <h2 className="feat-title">DISTINGUISHED FEAT</h2>
                <p className="feat-subtitle">
                    Showcasing the remarkable achievements of our students—moments of pride
                    that reflect their talent, effort, and growing potential
                </p>

                <div
                    className="slider-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Left Arrow */}
                    <button
                        className="slider-arrow left"
                        onClick={handlePrev}
                        aria-label="Previous slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Slider Track */}
                    <div className="slider-container" ref={containerRef}>
                        <div
                            className="slider-track"
                            style={{
                                transform: getTranslateX(),
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        >
                            {achievements.map((item) => (
                                <div key={item.id} className="slide">
                                    <div className="slide-image-wrapper">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                        {item.is_featured && (
                                            <span className="featured-badge">Featured</span>
                                        )}
                                    </div>
                                    {/* <div className="slide-caption">
                                        <p className="caption-title">{item.title}</p>
                                        {item.date && (
                                            <span className="caption-date">{item.date}</span>
                                        )}
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        className="slider-arrow right"
                        onClick={handleNext}
                        aria-label="Next slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Navigation */}
                {/* <div className="slider-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div> */}
            </div>
        </section>
    );
}

