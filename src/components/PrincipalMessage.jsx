'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PrincipalMessage(props) {
    // If props are passed from DynamicPageBuilder (which spreads content), use them.
    // Otherwise fallback to initial state and generic fetching.

    // Check if we have dynamic props
    const hasDynamicProps = props && (props.name || props.message || props.title);

    const [data, setData] = useState({
        name: props.name || 'Shri. Niraj Kumar Sinha',
        designation: props.designation || 'Principal, Firayalal Public School',
        message: props.message || 'Firayalal Public School was established through the commitment and vision of Shri Harish Munjal, who sought to offer holistic education that shapes character and develops responsible citizens. Aligned with the National Education Policy (NEP) 2020, the school ensures academic excellence, creativity, and value-based learning, empowering students to realise their potential and serve society with integrity.',
        image_url: props.image_url || 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-13.avif',
        carousel_slides: props.carousel_slides || [
            { image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop', caption: 'CBSE Workshop DAV Patna' },
            { image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop', caption: 'With Mrs. Mahua Maji (Member of Rajya Sabha)' }
        ],
        title: props.title || "Message from Principal's Desk"
    });

    const [loading, setLoading] = useState(!hasDynamicProps);

    useEffect(() => {
        // Only fetch if NO dynamic props were passed
        if (hasDynamicProps) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch('/api/principal-message');
                const result = await res.json();
                if (result.data) {
                    setData(prev => ({ ...prev, ...result.data }));
                }
            } catch (error) {
                console.error('Failed to fetch Principal Message', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [hasDynamicProps]);

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const slides = data.carousel_slides || [];
        if (slides.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [data.carousel_slides]);

    const slides = data.carousel_slides || [];

    return (
        <section className="principal-message-section">
            {/* Left Content - 60% */}
            <div className="principal-left">
                {/* Principal Image */}
                <div className="principal-image-wrapper">
                    <div className="principal-image-container">
                        <img
                            src={data.image_url || "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-13.avif"}
                            alt={`Principal - ${data.name}`}
                            className="principal-photo object-cover"
                        />
                    </div>
                </div>

                {/* Message Content */}
                <div className="principal-content">
                    <h2 className="principal-title">{data.title}</h2>
                    <div className="principal-message prose text-justify max-w-none text-gray-700 whitespace-pre-wrap">
                        {data.message}
                    </div>
                    <h3 className="principal-name mt-4">{data.name}</h3>
                    <p className="principal-designation"><em>{data.designation}</em></p>
                </div>
            </div>

            {/* Right Content - 40% Carousel */}
            <div className="principal-right">
                {slides.length > 0 && (
                    <div className="principal-carousel">
                        <div className="carousel-slide">
                            <img
                                src={slides[currentSlide]?.image || ''}
                                alt={slides[currentSlide]?.caption || 'Slide'}
                                className="carousel-image object-cover"
                            />
                        </div>
                        <div className="carousel-caption">
                            <p>{slides[currentSlide]?.caption}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
