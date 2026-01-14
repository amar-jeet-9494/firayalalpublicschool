'use client';

import { useRef, useEffect } from 'react';

export default function FacultyCarousel() {
    const trackRef = useRef(null);
    const animationRef = useRef(null);
    const positionRef = useRef(0);

    // Faculty data - will be replaced with API data
    // Backend structure: { image_url: "", name: "", designation: "" }
    const facultyData = [
        {
            id: 1,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Directorm.avif',
            name: 'Mrs. Sushma Munjal',
            designation: 'Academic Director',
        },
        {
            id: 2,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-14.avif',
            name: 'Shri. Niraj Kumar Sinha',
            designation: 'Principal',
        },
        {
            id: 3,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-14.avif',
            name: 'Mrs. Haneet Munjal',
            designation: 'Vice Principal',
        },
        {
            id: 4,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/22.avif',
            name: 'Mr. Sunil Prasad',
            designation: 'Examination Incharge',
        },
        {
            id: 5,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Dhruva.avif',
            name: 'Mr. Dhruva Narayan Saha',
            designation: 'HOD | English',
        },
        {
            id: 6,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/27.avif',
            name: 'Mrs. Archana',
            designation: 'HOD | Hindi',
        },
        {
            id: 7,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-8.avif',
            name: 'Mr. Vinay Kumar Balabhadra',
            designation: 'HOD | Mathematics',
        },
        {
            id: 8,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Baban.avif',
            name: 'Mr. Baban Kumar Tiwari',
            designation: 'HOD | Science',
        },
        {
            id: 9,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/24.avif',
            name: 'Mrs. Anchan Prasad Keshari',
            designation: 'HOD | Social Science',
        },
        {
            id: 10,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-12.avif',
            name: 'Mr. Sanjeev Kumar Shrivastava',
            designation: 'HOD | Computer Science',
        },
        {
            id: 11,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Bijay.avif',
            name: 'Mr. Kumar Bijayraj Verma',
            designation: 'Administrative Incharge',
        },
        {
            id: 12,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Gunnet.avif',
            name: 'Mrs. Guneet',
            designation: 'Public Relations Officer',
        },
        {
            id: 13,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Niraj.avif',
            name: 'Mr. Niraj',
            designation: 'Accountant',
        },
        {
            id: 14,
            image_url: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Supriti.avif',
            name: 'Mrs. Supriti Shekhar',
            designation: 'Foundational Coordinator',
        },
    ];

    // Create duplicated array for seamless infinite loop
    const duplicatedData = [...facultyData, ...facultyData, ...facultyData];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const cardWidth = 264; // 254px card + 10px gap
        const totalOriginalWidth = facultyData.length * cardWidth;
        const speed = 1; // pixels per frame

        const animate = () => {
            positionRef.current -= speed;

            // Reset position when we've scrolled past one full set
            if (Math.abs(positionRef.current) >= totalOriginalWidth) {
                positionRef.current = 0;
            }

            track.style.transform = `translateX(${positionRef.current}px)`;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [facultyData.length]);

    // Pause on hover
    const handleMouseEnter = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleMouseLeave = () => {
        const track = trackRef.current;
        if (!track) return;

        const cardWidth = 264;
        const totalOriginalWidth = facultyData.length * cardWidth;
        const speed = 1;

        const animate = () => {
            positionRef.current -= speed;

            if (Math.abs(positionRef.current) >= totalOriginalWidth) {
                positionRef.current = 0;
            }

            track.style.transform = `translateX(${positionRef.current}px)`;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
    };

    return (
        <section className="faculty-section">
            {/* Honeycomb Background Pattern */}
            <div className="faculty-bg-pattern"></div>

            <div className="faculty-container">
                {/* Header Row */}
                <div className="faculty-header">
                    <h2 className="faculty-title">FACULTY</h2>

                    <a href="#" className="organogram-btn">
                        Our Organogram
                    </a>

                    <a href="/faculty" className="view-all-link">
                        View All Teachers
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Faculty Carousel */}
                <div
                    className="faculty-carousel-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="faculty-carousel-track" ref={trackRef}>
                        {duplicatedData.map((faculty, index) => (
                            <div key={`${faculty.id}-${index}`} className="faculty-card">
                                <div className="faculty-card-image">
                                    <img
                                        src={faculty.image_url}
                                        alt={faculty.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="faculty-card-info">
                                    <h3 className="faculty-name">{faculty.name}</h3>
                                    <p className="faculty-designation">{faculty.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
