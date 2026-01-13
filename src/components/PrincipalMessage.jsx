'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PrincipalMessage() {
    // Carousel slides data with dummy images and titles
    const carouselSlides = [
        {
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
            caption: 'CBSE Workshop DAV Patna'
        },
        {
            image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop',
            caption: 'With Mrs. Mahua Maji (Member of Rajya Sabha) at Radiance Of Jharkhand'
        },
        {
            image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
            caption: 'CBP By CBSE | On the topic "Classroom Management"'
        },
        {
            image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop',
            caption: 'Best Motivational Principal | Capital Hill Ranchi'
        },
        {
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
            caption: 'Felicitated as a leading leader by Sahodaya, Ranchi at Courtyard Marriot'
        },
        {
            image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
            caption: 'Science Exhibition at St. Francis Ranchi'
        },
        {
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
            caption: 'Core Sahodaya Team Members'
        },
        {
            image: 'https://images.unsplash.com/photo-1559223607-180d0c79a8f0?w=400&h=300&fit=crop',
            caption: 'Being felicitated by Academic Director Ma\'am for leading F.P.S.'
        },
        {
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
            caption: 'British Council | International School Award 2016-19 at Hotel Le Lac'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [carouselSlides.length]);

    return (
        <section className="principal-message-section">
            {/* Left Content - 60% */}
            <div className="principal-left">
                {/* Principal Image */}
                <div className="principal-image-wrapper">
                    <div className="principal-image-container">
                        <img
                            src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-13.avif"
                            alt="Principal - Shri. Niraj Kumar Sinha"
                            className="principal-photo"
                        />
                    </div>
                    {/* Bell notification icon */}
                    {/* <div className="fps-notify-bell principal-bell">
                        🔔
                    </div> */}
                </div>

                {/* Message Content */}
                <div className="principal-content">
                    <h2 className="principal-title">Message from Principal's Desk</h2>
                    <p className="principal-message">
                        Firayalal Public School was established through the commitment and vision of
                        Shri Harish Munjal, who sought to offer holistic education that shapes character
                        and develops responsible citizens. Aligned with the National Education Policy (NEP) 2020,
                        the school ensures academic excellence, creativity, and value-based learning,
                        empowering students to realise their potential and serve society with integrity.
                    </p>
                    <h3 className="principal-name">Shri. Niraj Kumar Sinha</h3>
                    <p className="principal-designation"><em>Principal, Firayalal Public School</em></p>
                </div>
            </div>

            {/* Right Content - 40% Carousel */}
            <div className="principal-right">
                <div className="principal-carousel">
                    <div className="carousel-slide">
                        <img
                            src={carouselSlides[currentSlide].image}
                            alt={carouselSlides[currentSlide].caption}
                            className="carousel-image"
                        />
                    </div>
                    <div className="carousel-caption">
                        <p>{carouselSlides[currentSlide].caption}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
