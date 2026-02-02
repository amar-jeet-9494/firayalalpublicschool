'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './notices.css';
import { FaFileDownload, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await fetch('/api/announcements');
                const data = await res.json();
                if (res.ok) {
                    setNotices(data || []);
                }
            } catch (error) {
                console.error('Failed to load notices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const heroImages = [
        "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-08-at-19.45.59_621f12d8.avif",
        "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-08-at-19.42.03_c3d6e529.avif",
        "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-08-at-19.42.06_0faced87.avif",
    ];  

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 3000); // 3 seconds transition

        return () => clearInterval(interval);
    }, []);

    // ... fetchNotices useEffect ...

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="notices-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="notices-hero-section">
                {/* Background Slideshow */}
                {heroImages.map((img, index) => (
                    <div 
                        key={index}
                        className={`hero-bg-slide ${index === currentImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url('${img}')` }}
                    ></div>
                ))}

                {/* Overlay */}
                <div className="notices-hero-overlay"></div>
                
                {/* Content */}
                <div className="notices-hero-content">
                    <h1 className="notices-hero-title">Notices Board</h1>
                    <p className="notices-hero-subtitle">
                        Stay updated with the latest circulars, announcements, and news from Firayalal Public School.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="notices-main-content">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : notices.length > 0 ? (
                    <div className="notices-list-container">
                        {notices.map((notice) => (
                            <div 
                                key={notice.id} 
                                className={`notice-item ${notice.type || 'blue'}`}
                            >
                                <div className="notice-header">
                                    <h3>{notice.title}</h3>
                                </div>
                                <div className="notice-body">
                                    {notice.content === 'View Circular' ? (
                                        <div className="notice-link-wrapper">
                                            <a href={notice.link || '#'} target="_blank" rel="noopener noreferrer" className="notice-action-link">
                                                View Circular
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="notice-text-content">
                                            <p>
                                                {notice.content} 
                                                {notice.link && (
                                                    <a href={notice.link} target="_blank" rel="noopener noreferrer" className="read-more-link"> Read More</a>
                                                )}
                                            </p> 
                                            {/* Fallback if content implies a link but isn't structured */}
                                            {(!notice.content && notice.link) && (
                                                 <a href={notice.link} target="_blank" rel="noopener noreferrer" className="notice-action-link">
                                                 Click here to view
                                             </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="notice-footer">
                                    {notice.date && (
                                        <span className="notice-date-badge">
                                            {formatDate(notice.date)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <FaInfoCircle size={40} className="mx-auto mb-4 opacity-50" />
                        <h3>No Notices Found</h3>
                        <p>There are currently no active announcements to display.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
