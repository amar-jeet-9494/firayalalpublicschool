'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './Lightbox.css';

const Lightbox = ({ isOpen, images, onClose, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Update index if initialIndex changes when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [initialIndex, isOpen]);

    // Handle Keyboard Navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowLeft') {
            navigate('prev');
        } else if (e.key === 'ArrowRight') {
            navigate('next');
        }
    }, [isOpen, onClose, currentIndex]); // currentIndex dependency added implicitly by navigate logic but kept clean here

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // Lock body scroll
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);


    const navigate = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
    };

    if (!isOpen || !images || images.length === 0) return null;

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            {/* Close Button */}
            <button className="lightbox-close" onClick={onClose} aria-label="Close">
                <IoClose />
            </button>

            {/* Counter */}
            <div className="lightbox-counter">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Main Content Area - Stop propagation to prevent closing when clicking controls */}
            <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>

                {/* Prev Button */}
                {images.length > 1 && (
                    <button
                        className="lightbox-prev"
                        onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                        aria-label="Previous image"
                    >
                        <IoChevronBack />
                    </button>
                )}

                {/* Image */}
                <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="lightbox-image"
                />

                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        className="lightbox-next"
                        onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                        aria-label="Next image"
                    >
                        <IoChevronForward />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Lightbox;
