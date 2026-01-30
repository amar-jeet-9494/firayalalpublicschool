'use client';

import { useState, useEffect } from 'react';

export default function AnnualDayGallery() {
    // Gallery data - will be replaced with API data
    // Backend structure: { image_url: "", title: "" }
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch images on mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/photo-gallery');
                const data = await res.json();
                if (data.data) {
                    // Filter for annual day images
                    const annualDayImages = data.data.filter(img => img.is_annual_day);
                    setGalleryImages(annualDayImages.map(img => ({
                        id: img.id,
                        image_url: img.image_url,
                        thumbnail: img.image_url, // Use same URL for now, optimization can be added later
                        title: img.category
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch annual day images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const openLightbox = (index) => {
        setCurrentImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const goToNext = () => {
        setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    };

    return (
        <section className="annual-day-section">
            <div className="annual-day-container">
                {/* Title */}
                <h2 className="annual-day-title">
                    27th Annual Day 2025 – Honouring Tradition, Talent, and Triumph
                </h2>

                {/* Description */}
                <p className="annual-day-description">
                    For twenty-seven years, Firayalal Public School has upheld a tradition of academic excellence,
                    cultural enrichment, and holistic development. The Annual Day stands as a testament to this
                    legacy—an evening dedicated to honouring achievements, showcasing talent, and celebrating
                    the values that define our institution. This year's event brought together our students,
                    faculty, and parents in a remarkable display of discipline, creativity, and community spirit.
                </p>

                {/* Gallery Grid */}
                <div className="annual-day-gallery">
                    {galleryImages.map((image, index) => (
                        <a
                            key={image.id}
                            className="gallery-item"
                            onClick={() => openLightbox(index)}
                        >
                            <div
                                className="gallery-image"
                                style={{ backgroundImage: `url(${image.thumbnail})` }}
                            ></div>
                            <div className="gallery-overlay"></div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className="lightbox-modal" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <button className="lightbox-nav prev" onClick={goToPrevious}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <img
                            src={galleryImages[currentImage].image_url}
                            alt={galleryImages[currentImage].title}
                            className="lightbox-image"
                        />

                        <button className="lightbox-nav next" onClick={goToNext}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="lightbox-counter">
                            {currentImage + 1} / {galleryImages.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
