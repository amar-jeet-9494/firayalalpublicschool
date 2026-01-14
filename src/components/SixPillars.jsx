'use client';
import { useState } from 'react';

export default function SixPillars() {
    const [activeVideo, setActiveVideo] = useState(null);

    const pillarsData = {
        left: [
            {
                id: 'values',
                title: 'VALUES',
                description: 'We instill integrity, empathy, and respect, shaping students into confident and responsible individuals with strong moral foundations.',
                color: '#F7B500',
                videoUrl: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/temple-.mp4'
            },
            {
                id: 'technology',
                title: 'TECHNOLOGY',
                description: 'Digital tools and smart learning spaces empower students to think, create, and excel in an evolving technological world.',
                color: '#E74C3C',
                videoUrl: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Video-Project-2-online-video-cutter.com_.mp4'
            },
            {
                id: 'infrastructure',
                title: 'INFRASTRUCTURE',
                description: 'Modern, safe, and student-centric facilities create an inspiring space for exploration, comfort, and meaningful learning.',
                color: '#9B59B6',
                videoUrl: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Firayalal-Public-School-Ranchi.mp4'
            }
        ],
        right: [
            {
                id: 'leadership',
                title: 'LEADERSHIP',
                description: 'We cultivate confidence, responsibility, and decision-making skills, preparing students to lead with purpose and integrity.',
                color: '#E74C3C',
                videoUrl: 'https://www.youtube.com/embed/VhBl3dHT5SY',
                isYoutube: true
            },
            {
                id: 'community',
                title: 'COMMUNITY',
                description: 'A strong parent–teacher–student partnership fosters a supportive learning environment built on collaboration and shared growth.',
                color: '#1ABC9C',
                videoUrl: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Video-Project.mp4'
            },
            {
                id: 'curriculum',
                title: 'CURRICULUM',
                description: 'Our NEP-aligned curriculum blends academics with experiential learning, nurturing creativity, clarity of concepts, and holistic development.',
                color: '#9B59B6',
                videoUrl: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Video-2025-11-21-at-11.30.20_75da4aff.mp4'
            }
        ]
    };

    const openVideoModal = (video) => {
        setActiveVideo(video);
    };

    const closeVideoModal = () => {
        setActiveVideo(null);
    };

    return (
        <section className="six-pillars-section">
            <div className="six-pillars-container">
                {/* Section Title */}
                <h2 className="six-pillars-title">
                    Our Approach to become the <a href="/admission-process">Best CBSE School in Ranchi</a>
                </h2>

                {/* Main Content Grid */}
                <div className="pillars-content">
                    {/* Left Info Boxes */}
                    <div className="pillars-info-column left-column">
                        {pillarsData.left.map((pillar, index) => (
                            <div
                                key={pillar.id}
                                className={`pillar-info-box pillar-${pillar.id}`}
                                style={{ '--pillar-color': pillar.color }}
                            >
                                <h3 className="pillar-title">{pillar.title}</h3>
                                <div className="pillar-content">
                                    <p className="pillar-description">{pillar.description}</p>
                                    <button
                                        className="play-button"
                                        onClick={() => openVideoModal(pillar)}
                                        aria-label={`Play ${pillar.title} video`}
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center Wheel with Rotating Pillar */}
                    <div className="pillars-center">
                        <div className="pillar-wheel">
                            {/* Colored Segments
                            <svg className="wheel-svg" viewBox="0 0 400 400">
                              
                                <path
                                    d="M200,200 L200,40 A160,160 0 0,1 338.56,92.68 Z"
                                    fill="#3498DB"
                                />
                                <text x="265" y="95" fill="white" fontSize="12" fontWeight="bold" transform="rotate(30, 265, 95)">TECHNOLOGY</text>

                                
                                <path
                                    d="M200,200 L338.56,92.68 A160,160 0 0,1 360,200 Z"
                                    fill="#E67E22"
                                />
                                <text x="310" y="155" fill="white" fontSize="10" fontWeight="bold" transform="rotate(60, 310, 155)">INFRASTRUCTURE</text>

                               
                                <path
                                    d="M200,200 L360,200 A160,160 0 0,1 280,338.56 Z"
                                    fill="#1ABC9C"
                                />
                                <text x="305" y="260" fill="white" fontSize="11" fontWeight="bold" transform="rotate(75, 305, 260)">LEADERSHIP</text>

                                
                                <path
                                    d="M200,200 L280,338.56 A160,160 0 0,1 120,338.56 Z"
                                    fill="#9B59B6"
                                />
                                <text x="165" y="330" fill="white" fontSize="11" fontWeight="bold">COMMUNITY</text>

                                
                                <path
                                    d="M200,200 L120,338.56 A160,160 0 0,1 40,200 Z"
                                    fill="#C0392B"
                                />
                                <text x="70" y="275" fill="white" fontSize="10" fontWeight="bold" transform="rotate(-60, 70, 275)">CURRICULUM</text>

                                
                                <path
                                    d="M200,200 L40,200 A160,160 0 0,1 200,40 Z"
                                    fill="#F1C40F"
                                />
                                <text x="105" y="130" fill="white" fontSize="12" fontWeight="bold" transform="rotate(-45, 105, 130)">VALUES</text>
                            </svg> */}

                            {/* Center Rotating Image */}
                            <div className="pillar-center-circle">
                                <img
                                    src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Pillar.avif"
                                    alt="Firayalal Public School - 6 Pillars"
                                    className="rotating-pillar"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Info Boxes */}
                    <div className="pillars-info-column right-column">
                        {pillarsData.right.map((pillar, index) => (
                            <div
                                key={pillar.id}
                                className={`pillar-info-box pillar-${pillar.id}`}
                                style={{ '--pillar-color': pillar.color }}
                            >
                                <h3 className="pillar-title">{pillar.title}</h3>
                                <div className="pillar-content">
                                    <p className="pillar-description">{pillar.description}</p>
                                    <button
                                        className="play-button"
                                        onClick={() => openVideoModal(pillar)}
                                        aria-label={`Play ${pillar.title} video`}
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="video-modal-overlay" onClick={closeVideoModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={closeVideoModal}>
                            &times;
                        </button>
                        {activeVideo.isYoutube ? (
                            <iframe
                                src={`${activeVideo.videoUrl}?autoplay=1&mute=1`}
                                title={activeVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video controls autoPlay muted>
                                <source src={activeVideo.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
