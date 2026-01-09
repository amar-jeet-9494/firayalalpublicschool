'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function EducationSection() {
    // Image sets that will rotate
    const imageSets = [
        {
            large: '/images/education/sports-1.jpg',
            small1: '/images/education/cultural-1.jpg',
            small2: '/images/education/classroom-1.jpg',
        },
        {
            large: '/images/education/sports-2.jpg',
            small1: '/images/education/cultural-2.jpg',
            small2: '/images/education/classroom-2.jpg',
        },
        {
            large: '/images/education/sports-3.jpg',
            small1: '/images/education/cultural-3.jpg',
            small2: '/images/education/classroom-3.jpg',
        },
    ];

    // Placeholder images for demo (using school-related placeholders)
    const placeholderImages = [
        {
            large: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=800&fit=crop',
            small1: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=400&fit=crop',
            small2: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop',
        },
        {
            large: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=800&fit=crop',
            small1: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
            small2: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=400&fit=crop',
        },
        {
            large: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop',
            small1: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=400&fit=crop',
            small2: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % placeholderImages.length);
                setIsTransitioning(false);
            }, 300);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentImages = placeholderImages[currentIndex];

    const stats = [
        { value: '6,000+', label: 'Students Enrolled' },
        { value: '60+', label: 'Qualified Teachers' },
        { value: '27+', label: 'Years of Excellence' },
        { value: '100%', label: 'Academic Excellence' },
    ];

    return (
        <section className="education-section">
            <div className="education-container">
                <h2 className="education-title">Holistic Education at F.P.S.</h2>

                <div className="education-wrapper">
                    {/* LEFT CONTENT */}
                    <div className="education-left">
                        <p className="education-description">
                            At Firayalal Public School, life for students exist beyond the syllabi.
                            As one of the leading CBSE schools in Ranchi, we devote ourselves
                            towards comprehensive education, which encompasses{' '}
                            <strong>character formation, self-discipline and values.</strong>{' '}
                            We aim to develop students to be{' '}
                            <strong>responsible citizens and future nation builders</strong>,
                            making F.P.S. among one of the{' '}
                            <strong>best CBSE schools in Ranchi.</strong>
                        </p>

                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <h3>{stat.value}</h3>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGES - Auto Rotating */}
                    <div className="education-right">
                        <div className={`image-large ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                            <img
                                src={currentImages.large}
                                alt="Student Activities"
                            />
                        </div>

                        <div className="image-small-group">
                            <div className={`image-small ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                                <img
                                    src={currentImages.small1}
                                    alt="Cultural Activity"
                                />
                            </div>
                            <div className={`image-small ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                                <img
                                    src={currentImages.small2}
                                    alt="Classroom Learning"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Indicators */}
                <div className="image-indicators">
                    {placeholderImages.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentIndex(index);
                                    setIsTransitioning(false);
                                }, 300);
                            }}
                            aria-label={`View image set ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
