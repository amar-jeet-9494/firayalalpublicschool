'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './curriculum.css';

// Curriculum stages data with videos and images
const curriculumStages = [
    {
        id: 'foundational',
        title: 'The Foundational Stage',
        sectionTitle: 'PRE-PRIMARY CURRICULUM OVERVIEW',
        subtitle: 'BalVatika II (Nursery) & BalVatika III (Prep)',
        lsrwRatio: '3:3:3:1',
        description: `The Foundational Stage at F.P.S. comprises BalVatika II (Nursery) and BalVatika III (Prep). Early childhood education serves as the foundation for all future learning. These are the formative years which play a vital role in a child's life. The pre-primary curriculum is delivered through the approach based on the following premise:`,
        highlights: [
            'Every child is unique',
            'Every child has infinite potential',
            'Every child is born with an innate desire to learn',
            'Every child learns best through observation',
            'Every child learns and constructs knowledge in multiple ways'
        ],
        additionalInfo: `The curriculum focuses on cognitive, linguistic, creative, social and physical development. To promote Foundational Literacy and Numeracy (FLN), we have "Joyful Noise" - a fun-activity zone that supports play-based learning.`,
        assessmentNote: 'ASSIGNMENTS NOT ASSESSMENTS IN FOUNDATIONAL STAGE',
        assessmentDescription: `At Firayalal, the focus is on assignments that nurture learning, not formal assessments. Aligned with NEP 2020, our approach emphasises listening skills, activity-based learning, and exploration rather than tests or comparison. We primarily focus on developing Orative and Listening Skills in the formative years of a child.`,
        video: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Video-2025-11-21-at-10.32.31_09845c89.mp4',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Curriculum.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-21-at-10.21.53_b01ca2e5.avif'
        ]
    },
    {
        id: 'elementary',
        title: 'The ELEMENTARY STAGE',
        subtitle: 'Grade III - V',
        lsrwRatio: '1:1:1:1',
        description: `At FPS, the curriculum at this phase encompasses a systematic, activity-based, experiential, and inquiry-driven approach. As children progress through Grades III to V, their cognitive abilities expand, and the teaching–learning process evolves accordingly. Learning becomes more structured, engaging, and purposeful in conformity with LSRW Programme. Here we engage the students with listening, speaking, reading and writing in equal ratio.`,
        video: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Video-2025-11-21-at-11.30.20_75da4aff.mp4',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/elementor/thumbs/Screenshot-2025-11-07-185659-rfqs38dar3ploa4bk69gkbdakie2m51qvqvb181j54.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/elementor/thumbs/IMG_20230515_072416-scaled-rfqs93uzgtr48jl497oinc0087fnq1dcotnk0hby94.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-11-21-at-11.33.29_aa6428b1-rfqs171vy0x8ip2tgakk5tvc8gffxqyolnzfln28mg.avif'
        ]
    },
    {
        id: 'middle',
        title: 'The Middle Stage',
        subtitle: 'Grade VI – VIII',
        lsrwRatio: '1:1:3:3',
        description: `The Middle Stage marks the shift from foundational learning to subject-oriented exploration. It focuses on deepening conceptual understanding, logical reasoning, and independent learning.`,
        additionalInfo: `Aligned with the National Education Policy (NEP) 2020, this stage emphasizes experiential and inquiry-based learning which includes field-trips and excursions. Industrial trips, vocational courses like carpentry, plumbing, basic knowledge about electrical gadgets, web designing (coding), knitting, sewing, gardening, culinary skills, etc. to promote sustainable development programmes along with various clubs like Eco club, Quill club etc.`,
        video: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Video-Project.mp4',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-11-21-at-11.17.15_8a41e44d-rfqs18xkbozt5x035bdtate9f866d5659xaek6zga0.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-11-21-at-11.17.15_99041c73-rfqs17zq4uyiub1gasz6qbmstuat5g2exsmx2x0ug8.avif'
        ]
    },
    {
        id: 'secondary',
        title: 'The Secondary Stage',
        subtitle: 'Grade IX & X',
        lsrwRatio: '1:1:3:3',
        description: `According to NEP 2020, the Secondary Stage focuses on deeper, multidisciplinary learning that builds critical thinking, problem-solving skills, and future readiness. Students explore subjects in greater depth while enjoying increased flexibility to choose areas aligned with their interests. Learning becomes more inquiry-based, analytical, and application-oriented through projects, research tasks, and real-world problem solving. The curriculum integrates academics with vocational education, life skills, values, arts, and technology. Assessment shifts from rote learning to competency-based evaluation, emphasising understanding and application.`,
        video: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/library-2-1-1.mp4',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-21-at-11.15.37_8dacde28.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-21-at-11.15.37_a3fcc291.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-11-165540.avif'
        ]
    }
];

// Video Player Component
function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="video-block">
            <video
                ref={videoRef}
                className="scroll-video"
                playsInline
                preload="auto"
                muted={isMuted}
            >
                <source src={src} type="video/mp4" />
            </video>
            <button className="video-play-btn" onClick={togglePlay}>
                {isPlaying ? (
                    <svg className="pause-icon" width="28" height="28" viewBox="0 0 24 24">
                        <rect x="6" y="5" width="4" height="14" rx="1.2" fill="white"/>
                        <rect x="14" y="5" width="4" height="14" rx="1.2" fill="white"/>
                    </svg>
                ) : (
                    <svg className="play-icon" width="28" height="28" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" fill="white"/>
                    </svg>
                )}
            </button>
            <button className="video-mute-btn" onClick={toggleMute}>
                <svg className="mute-icon" width="22" height="22" viewBox="0 0 24 24">
                    {isMuted ? (
                        <path d="M5 9v6h4l5 5V4l-5 5H5zM16.5 12c0-1.77-1-3.29-2.5-4v8c1.5-.71 2.5-2.23 2.5-4zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="#000"/>
                    ) : (
                        <path d="M5 9v6h4l5 5V4l-5 5H5z" fill="#000"/>
                    )}
                </svg>
            </button>
        </div>
    );
}

// Image Carousel Component
function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="image-carousel-wrapper">
            <div className="image-carousel">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`carousel-slide ${idx === currentIndex ? 'active' : ''}`}
                    >
                        <img src={img} alt={`Slide ${idx + 1}`} />
                    </div>
                ))}
            </div>
            <div className="carousel-dots">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>
    );
}

// LSRW stages info
const lsrwInfo = [
    { stage: 'Foundational', ratio: 'L:S:R:W = 3:3:3:1', focus: 'Listening, Speaking, Reading (primary) + Writing (secondary)' },
    { stage: 'Elementary', ratio: 'L:S:R:W = 1:1:1:1', focus: 'Balanced approach to all four skills' },
    { stage: 'Middle & Secondary', ratio: 'L:S:R:W = 1:1:3:3', focus: 'Reading and Writing (primary) + Listening and Speaking (supporting)' }
];

export default function CurriculumPage() {
    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/TDS-OPT-21-FIRAYALAL-SCHOOL.avif';

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="curriculum-hero-section">
                <div
                    className="curriculum-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="curriculum-hero-overlay" />
                <div className="curriculum-hero-content">
                    <h1 className="curriculum-hero-title">Curriculum</h1>
                    <h2 className="curriculum-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                    </h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="curriculum-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* Curriculum Content Section */}
            <section className="curriculum-content-section">
                <div className="curriculum-content-container">
                    {/* Main Heading */}
                    <h2 className="curriculum-main-heading">CURRICULUM</h2>
                    <p className="curriculum-intro-text">
                        Firayalal Public School follows <strong>NEP 2020</strong> guidelines in implementing 
                        <strong> LSRW</strong> acronym for <strong>Listening, Speaking, Reading, and Writing skills</strong> across stages.
                    </p>
                    
                    <p className="curriculum-stages-title"><strong>STAGES :</strong></p>
                    <ul className="curriculum-stages-list">
                        <li>The <strong>Foundational stage</strong> focuses primarily on the first <strong>3 parts of LSRW</strong> i.e <strong>Listening, Speaking and Reading</strong> and 1 part of <strong>Writing skills</strong>.</li>
                        <li>The <strong>Elementary stage</strong> maintains a balanced approach of <strong>LSRW</strong> focusing equally on <strong>Listening, Speaking, Reading and Writing</strong>.</li>
                        <li>In the <strong>Middle and Secondary stages</strong>, a ratio of 1:1:3:3 of <strong>LSRW</strong> is followed i.e. 1 part of <strong>Listening, Speaking</strong> and 3 parts of <strong>Reading and Writing</strong>.</li>
                    </ul>

                    {/* Foundational Stage Section */}
                    <div className="curriculum-stage-section">
                        <h3 className="curriculum-section-title">PRE-PRIMARY CURRICULUM OVERVIEW</h3>
                        <p className="curriculum-stage-description">
                            The Foundational Stage at F.P.S. comprises of BalVatika II (Nursery), and BalVatika III (Prep).<br/>
                            Early childhood education serves as the foundation for all future learning. These are the formative years of learning which play vital role in the life of a child. The pre-primary curriculum is delivered through the approach based on the following premise:
                        </p>
                        <ul className="curriculum-premise-list">
                            <li>Every child is unique</li>
                            <li>Every child has infinite potential</li>
                            <li>Every child is born with an innate desire to learn</li>
                            <li>Every child learns best through observation</li>
                            <li>Every child learns and constructs her own knowledge in multiple ways</li>
                        </ul>
                        <p className="curriculum-stage-description">
                            The curriculum focuses on the domains such as cognitive, linguistic, creative, social and physical development. Curriculum provides numerous exposures to nurture sensory and gross motor skills for physical development of children. To cater the educational needs of children, the school has multiple teaching aids like interesting audio – visual aids, digitalized interactive panels, various toys and games for cognitive development and a series of teaching material for introducing concept that builds strong foundation. To promote <strong>foundational literacy and numeracy (FLN)</strong>, we have <strong>joyful noise</strong>, a fun-activity zone that supports the concept of play-based learning in an engrossing manner.
                        </p>
                        
                        {/* Media Grid */}
                        <div className="curriculum-media-grid">
                            <VideoPlayer src={curriculumStages[0].video} />
                            <ImageCarousel images={curriculumStages[0].images} />
                        </div>
                    </div>

                    {/* Assignments Note Section */}
                    <div className="curriculum-stage-section curriculum-note-section">
                        <h3 className="curriculum-section-title">ASSIGNMENTS NOT ASSESSMENTS IN FOUNDATIONAL STAGE</h3>
                        <p className="curriculum-stage-description">
                            At Firayalal, the focus is on <strong>assignments that nurture learning</strong>, not formal assessments. Aligned with NEP 2020, our approach emphasises <strong>listening skills, activity-based learning, and exploration</strong> rather than tests or comparison. We primarily focus on developing <strong>Orative and Listening Skills</strong> in the formative years of a child. Children engage in storytelling, hands-on activities, sensory play, and guided conversations that help them understand concepts naturally and joyfully. These assignments are designed to encourage curiosity, creativity, and self-expression while allowing teachers to observe each child's progress holistically. This ensures that learning remains <strong>stress-free, meaningful, and developmentally appropriate</strong>, supporting every child's unique pace of growth.
                        </p>
                    </div>

                    {/* Elementary Stage Section */}
                    <div className="curriculum-stage-section">
                        <h3 className="curriculum-section-title">The ELEMENTARY STAGE</h3>
                        <h4 className="curriculum-grade-subtitle">Grade III - V</h4>
                        <p className="curriculum-stage-description">
                            At FPS, the curriculum at this phase encompasses a <strong>systematic, activity-based, experiential, and inquiry-driven approach</strong>.
                        </p>
                        <p className="curriculum-stage-description">
                            As children progress through Grades III to V, their cognitive abilities expand, and the teaching–learning process evolves accordingly. Learning becomes more structured, engaging, and purposeful in conformity with <strong>LSRW Programme.</strong> Here we engage the students with listening, speaking, reading and writing in equal ratio.
                        </p>
                        
                        {/* Media Grid */}
                        <div className="curriculum-media-grid">
                            <VideoPlayer src={curriculumStages[1].video} />
                            <ImageCarousel images={curriculumStages[1].images} />
                        </div>
                    </div>

                    {/* Middle Stage Section */}
                    <div className="curriculum-stage-section">
                        <h3 className="curriculum-section-title">The Middle Stage</h3>
                        <h4 className="curriculum-grade-subtitle">Grade VI – VIII</h4>
                        <p className="curriculum-stage-description">
                            The Middle Stage marks the shift from foundational learning to subject-oriented exploration. It focuses on deepening conceptual understanding, logical reasoning, and independent learning.
                        </p>
                        <p className="curriculum-stage-description">
                            Aligned with the <strong>National Education Policy (NEP) 2020</strong>, this stage emphasizes experiential and inquiry-based learning which includes field-trips and excursions which helps them to understand our rich culture and heritage. This helps our students to analyze, question and connect academic concepts to real-life situations. <strong>Industrial trips</strong>, <strong>vocational courses</strong> like carpentry, plumbing, basic knowledge about electrical gadgets, web designing (coding), knitting, sewing, gardening, culinary skills, etc. to promote sustainable development programmes along with various <strong>clubs</strong> like Eco club, Quill club etc. Teachers nurture critical thinking, collaboration and creativity, helping learners grow intellectually, emotionally, and socially.
                        </p>
                        
                        {/* Media Grid */}
                        <div className="curriculum-media-grid">
                            <VideoPlayer src={curriculumStages[2].video} />
                            <ImageCarousel images={curriculumStages[2].images} />
                        </div>
                    </div>

                    {/* Secondary Stage Section */}
                    <div className="curriculum-stage-section">
                        <h3 className="curriculum-section-title">The Secondary Stage</h3>
                        <p className="curriculum-stage-description">
                            According to NEP 2020, the Secondary Stage focuses on <strong>deeper, multidisciplinary learning</strong> that builds critical thinking, problem-solving skills, and future readiness. Students explore subjects in greater depth while enjoying increased flexibility to choose areas aligned with their interests. Learning becomes more inquiry-based, analytical, and application-oriented through projects, research tasks, and real-world problem solving. The curriculum integrates academics with vocational education, life skills, values, arts, and technology. Assessment shifts from rote learning to <strong>competency-based evaluation</strong>, emphasising understanding and application. This stage prepares learners for higher education, careers, and responsible citizenship with confidence and clarity of purpose.
                        </p>
                        
                        {/* Media Grid */}
                        <div className="curriculum-media-grid">
                            <VideoPlayer src={curriculumStages[3].video} />
                            <ImageCarousel images={curriculumStages[3].images} />
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}
