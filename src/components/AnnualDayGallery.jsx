'use client';

import { useState } from 'react';

export default function AnnualDayGallery() {
    // Gallery data - will be replaced with API data
    // Backend structure: { image_url: "", title: "" }
    const galleryImages = [
        {
            id: 1,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0609-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0609-300x200.avif',
            title: 'DSC_0609',
        },
        {
            id: 2,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0541-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0541-300x200.avif',
            title: 'DSC_0541',
        },
        {
            id: 3,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0599-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0599-300x200.avif',
            title: 'DSC_0599',
        },
        {
            id: 4,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0510-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0510-300x200.avif',
            title: 'DSC_0510',
        },
        {
            id: 5,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0458-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0458-300x200.avif',
            title: 'DSC_0458',
        },
        {
            id: 6,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0439-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0439-300x200.avif',
            title: 'DSC_0439',
        },
        {
            id: 7,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0403-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0403-300x200.avif',
            title: 'DSC_0403',
        },
        {
            id: 8,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0421-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0421-300x200.avif',
            title: 'DSC_0421',
        },
        {
            id: 9,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0390-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0390-300x200.avif',
            title: 'DSC_0390',
        },
        {
            id: 10,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0396-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0396-300x200.avif',
            title: 'DSC_0396',
        },
        {
            id: 11,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0316-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0316-300x200.avif',
            title: 'DSC_0316',
        },
        {
            id: 12,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0307-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0307-300x200.avif',
            title: 'DSC_0307',
        },
        {
            id: 13,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0293-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0293-300x200.avif',
            title: 'DSC_0293',
        },
        {
            id: 14,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0134-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0134-300x200.avif',
            title: 'DSC_0134',
        },
        {
            id: 15,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0037-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0037-300x200.avif',
            title: 'DSC_0037',
        },
        {
            id: 16,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0036-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0036-300x200.avif',
            title: 'DSC_0036',
        },
        {
            id: 17,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0026-scaled.avif',
            thumbnail: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_0026-300x200.avif',
            title: 'DSC_0026',
        },
    ];

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
