'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function SuccessStories() {
    // Carousel images - using actual school achievement images
    const carouselImages = [
        {
            id: 1,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/2-3.avif',
            alt: 'Student Achievement Results',
            title: 'Class X Results 2025',
        },
        {
            id: 2,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/COMMERCE.avif',
            alt: 'Commerce Students Results',
            title: 'Commerce Stream Results',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const trackRef = useRef(null);
    const totalSlides = carouselImages.length;

    // Autoplay: pause for 2 seconds, then slide for 1 second
    useEffect(() => {
        const autoplayInterval = setInterval(() => {
            handleNext();
        }, 2000); // 2000ms pause between slides

        return () => clearInterval(autoplayInterval);
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => {
            const nextIndex = prev + 1;
            // If we've gone past the last slide, we'll reset after transition
            return nextIndex;
        });
    }, []);

    // Handle infinite loop - reset position after transition completes
    useEffect(() => {
        if (currentIndex >= totalSlides) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 1000); // Wait for 1s transition to complete
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, totalSlides]);

    // Create slides array with duplicates for infinite effect
    const slides = [...carouselImages, carouselImages[0]];

    return (
        <section className="success-stories-section">
            <div className="success-stories-container">
                {/* Title */}
                <h2 className="success-stories-title">
                    Celebrating Success Stories from Firayalal Public School
                </h2>

                {/* Bullet Points */}
                <ul className="success-stories-list">
                    <li>
                        Every student in classes 10 and 12 has constantly achieved success and reached the benchmark of 1st division, with a majority of students recognized for{' '}
                        <strong><span className="success-highlight">distinction</span></strong>, thanks to our{' '}
                        <strong>unique <span className="success-highlight">research-based, counseling-driven</span> teaching approach</strong>.
                    </li>
                    <li>
                        These results have been possible through our school's purposefully designed,{' '}
                        <strong><span className="success-highlight">low-density</span> learning environment and{' '}
                            <span className="success-highlight">individual attention.</span></strong>
                    </li>
                    <li>
                        Parents and students prioritize our institution for proven outcomes in board examinations and beyond.
                    </li>
                </ul>

                {/* Swiper-style Image Carousel */}
                <div className="success-swiper-wrapper" role="region" aria-roledescription="carousel" aria-label="Image Carousel">
                    <div className="success-swiper-container">
                        <div
                            ref={trackRef}
                            className="success-swiper-track"
                            aria-live="off"
                            style={{
                                transform: `translate3d(-${currentIndex * 100}%, 0px, 0px)`,
                                transitionDuration: isTransitioning ? '1000ms' : '0ms',
                            }}
                        >
                            {slides.map((item, index) => (
                                <div
                                    key={`slide-${index}`}
                                    className={`success-swiper-slide ${index === currentIndex ? 'active' : ''}`}
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${(index % totalSlides) + 1} / ${totalSlides}`}
                                >
                                    <figure className="success-swiper-slide-inner">
                                        <img
                                            decoding="async"
                                            className="success-swiper-slide-image"
                                            src={item.image_url}
                                            alt={item.alt}
                                            title={item.title}
                                        />
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
