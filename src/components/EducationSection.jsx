'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const DEFAULT_JSON = {
    "section": "Holistic Education",
    "headings": [
        "Holistic Education at F.P.S.",
        "One Among the Top CBSE Schools in Ranchi"
    ],
    "description": "At Firayalal Public School, life for students exist beyond the syllabi. As one of the leading CBSE schools in Ranchi, we devote ourselves towards comprehensive education, which encompasses <strong>character formation, self-discipline and values.</strong> We aim to develop the students to be responsible citizens and future nation builders, making F.P.S. among one of the <strong>best CBSE schools in Ranchi.</strong>",
    "statistics": [
        { "title": "Students Enrolled", "value": "6,000", "suffix": "+" },
        { "title": "Qualified Teachers", "value": "60", "suffix": "+" },
        { "title": "Years of Excellence", "value": "27", "suffix": "+" },
        { "title": "Academic Excellence", "value": "100", "suffix": "%" }
    ],
    // Fallbacks just in case
    "image_slideshows": [
        { "images": ['/images/education/sports-1.jpg', '/images/education/sports-2.jpg'] },
        { "images": ['/images/education/cultural-1.jpg', '/images/education/cultural-2.jpg'] },
        { "images": ['/images/education/classroom-1.jpg', '/images/education/classroom-2.jpg'] }
    ]
};

// Helper component for a single slideshow
function Slideshow({ images, interval = 3000, className }) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const timer = setInterval(() => {
            setFade(true); // Trigger fade out
            setTimeout(() => {
                setIndex(prev => (prev + 1) % images.length);
                setFade(false); // Trigger fade in
            }, 300); // 300ms transition time
        }, interval);
        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div className={`${className} ${fade ? 'opacity-80' : 'opacity-100'} transition-opacity duration-300`}>
            <img src={images[index]} alt="Slideshow" className="w-full h-full object-cover" />
        </div>
    );
}

export default function EducationSection(props) {
    // If props are provided (from DB), use them. Otherwise use DEFAULT_JSON.
    // We check if 'headings' exists to determine if we have valid data.
    const data = (props && props.headings) ? props : DEFAULT_JSON;

    const { headings, description, statistics, image_slideshows } = data;

    // Map the 3 slideshows to the UI slots
    // 0 -> Large Image (Left/Main)
    // 1 -> Small Image 1 (Top Right)
    // 2 -> Small Image 2 (Bottom Right)
    const largeSlideshow = image_slideshows?.[0] || {};
    const smallSlideshow1 = image_slideshows?.[1] || {};
    const smallSlideshow2 = image_slideshows?.[2] || {};

    return (
        <section className="education-section">
            <div className="education-container">
                {headings && headings.length > 0 && (
                    <h2 className="education-title">{headings[0]}</h2>
                )}
                {/* Optional Subheading if array has 2 items */}
                {headings && headings.length > 1 && (
                    <h3 className="education-subtitle text-center text-xl text-primary font-medium mb-6">
                        {headings[1]}
                    </h3>
                )}

                <div className="education-wrapper">
                    {/* LEFT CONTENT */}
                    <div className="education-left">
                        <p className="education-description" dangerouslySetInnerHTML={{ __html: description }} />

                        <div className="stats-grid">
                            {statistics && statistics.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <h3>{stat.value}{stat.suffix}</h3>
                                    <span>{stat.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGES - using generic Slideshow helper */}
                    <div className="education-right">
                        <div className="image-large overflow-hidden relative">
                            <Slideshow
                                images={largeSlideshow.images}
                                interval={largeSlideshow.duration_ms || 3000}
                                className="w-full h-full"
                            />
                        </div>

                        <div className="image-small-group">
                            <div className="image-small overflow-hidden relative">
                                <Slideshow
                                    images={smallSlideshow1.images}
                                    interval={smallSlideshow1.duration_ms || 3500} // Offset slightly
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="image-small overflow-hidden relative">
                                <Slideshow
                                    images={smallSlideshow2.images}
                                    interval={smallSlideshow2.duration_ms || 4000} // Offset slightly
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* No indicators for this dynamic layout as requested by implicit simplicity */}
            </div>
        </section>
    );
}
