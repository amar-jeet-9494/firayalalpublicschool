'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function DistinguishedFeat() {
    // Sample achievements data - will be replaced with API data
    // Backend structure: { image_url: "", title: "", date: "", is_featured: true }
    const achievements = [
        {
            id: 1,
            image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
            title: 'Participation in ULLAS – 2025 at Sourendra Mohini Public School',
            date: 'January 2026',
            is_featured: true,
        },
        {
            id: 2,
            image_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop',
            title: 'Awarded with 1st Prize by University of Engineering & Management, Jaipur | Kolkata',
            date: 'December 2025',
            is_featured: true,
        },
        {
            id: 3,
            image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop',
            title: 'Inter-School Cultural Excellence Award – Annual Festival 2025',
            date: 'November 2025',
            is_featured: true,
        },
        {
            id: 4,
            image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
            title: 'National Level Academic Achievement Recognition – Science Olympiad',
            date: 'October 2025',
            is_featured: true,
        },
        {
            id: 5,
            image_url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop',
            title: 'State Level Sports Championship – Athletics Winners',
            date: 'September 2025',
            is_featured: false,
        },
        {
            id: 6,
            image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop',
            title: 'Best School Award – District Education Excellence 2025',
            date: 'August 2025',
            is_featured: true,
        },
    ];

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
                                    <div className="slide-caption">
                                        <p className="caption-title">{item.title}</p>
                                        {item.date && (
                                            <span className="caption-date">{item.date}</span>
                                        )}
                                    </div>
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
                <div className="slider-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

