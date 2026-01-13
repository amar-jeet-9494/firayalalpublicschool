'use client';

import { useState, useRef, useEffect } from 'react';

export default function HeroBanner() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Load video
        video.load();

        // After 3 seconds, fade out thumbnail and play video
        const timer = setTimeout(async () => {
            setShowThumbnail(false);

            try {
                video.muted = false;
                await video.play();
                setIsPlaying(true);
            } catch (e) {
                // If unmuted playback fails, try muted
                video.muted = true;
                try {
                    await video.play();
                    setIsPlaying(true);
                } catch {
                    setIsPlaying(false);
                }
            }
        }, 3000);

        // Handle video end - loop
        const handleEnded = () => {
            video.currentTime = 0;
            video.play().catch(() => { });
        };

        video.addEventListener('ended', handleEnded);
        video.addEventListener('loadeddata', () => setIsLoaded(true));

        return () => {
            clearTimeout(timer);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            try {
                video.muted = false;
                await video.play();
                setIsPlaying(true);
            } catch {
                video.muted = true;
                await video.play().catch(() => { });
                setIsPlaying(true);
            }
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section
            id="home-video-section"
            className="relative w-full h-screen overflow-hidden"
        >
            {/* Placeholder/Thumbnail Image */}
            <img
                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Firayalal-Public-School-Ranchi.avif"
                alt="Firayalal Public School"
                className={`absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 z-[2] transition-opacity duration-500 ${showThumbnail ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Video */}
            <video
                ref={videoRef}
                playsInline
                preload="auto"
                loop
                className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 z-[1] transition-opacity duration-500 ${showThumbnail ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <source
                    src="https://firayalalpublicschool.edu.in/wp-content/uploads/2026/01/Firayalal-Public-School-Ranchi.mp4" type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/30 z-[10]"></div>

            {/* Text Block */}
            <div
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-center text-white z-[30] w-[90%] animate-fade-in-up"
            >
                <h2 className="text-2xl md:text-2xl font-semibold m-0">
                    Welcome to
                </h2>
                <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold my-2 md:my-4">
                    Firayalal Public School
                </h1>
                <h3 className="text-xl md:text-2xl font-medium my-1 md:my-2 tracking-widest">
                    ATTAIN AND EXCEL
                </h3>
                <p className="text-base md:text-lg font-normal mt-2 md:mt-4">
                    Affiliated to CBSE, New Delhi | Senior Secondary (10+2)
                </p>
            </div>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlayPause}
                className="absolute bottom-[18px] right-[18px] w-12 h-12 border-none rounded-full bg-[#F7B500] z-[40] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
                {isPlaying ? (
                    // Pause Icon
                    <svg width="26" height="26" viewBox="0 0 24 24">
                        <rect x="6" y="5" width="4" height="14" rx="1.2" fill="white" />
                        <rect x="14" y="5" width="4" height="14" rx="1.2" fill="white" />
                    </svg>
                ) : (
                    // Play Icon
                    <svg width="26" height="26" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" fill="white" />
                    </svg>
                )}
            </button>

            {/* Responsive styles */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 20%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 1.5s ease forwards;
                }

                @media (max-width: 768px) {
                    #home-video-section > div:nth-child(4) {
                        bottom: 15% !important;
                    }
                }
            `}</style>
        </section>
    );
}
