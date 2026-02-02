'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './assessment.css';
import { useState, useEffect } from 'react';
import '../book-list/book-list.css';

export default function AssessmentPlanPage() {
    const [pdfUrl, setPdfUrl] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [pageContent, setPageContent] = useState(null);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://firayalalpublicschool.edu.in/wp-json/wp/v2/pages/2338');
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    
                    // Keep the raw content just in case
                    setPageContent(data.content.rendered);
    
                    // Extract PDF URL using DOM Parser
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data.content.rendered, 'text/html');
                    
                    // Strategy 1: Look for <embed> tag
                    const embedTag = doc.querySelector('embed');
                    // Strategy 2: Look for <iframe> tag
                    const iframeTag = doc.querySelector('iframe');
                    // Strategy 3: Look for links ending in .pdf
                    const pdfLink = doc.querySelector('a[href$=".pdf"]');
    
                    let extractedUrl = null;
    
                    if (embedTag && embedTag.src) {
                        extractedUrl = embedTag.src;
                    } else if (iframeTag && iframeTag.src) {
                        extractedUrl = iframeTag.src;
                    } else if (pdfLink && pdfLink.href) {
                        extractedUrl = pdfLink.href;
                    }
    
                    if (extractedUrl) {
                        setPdfUrl(extractedUrl);
                    } else {
                        // If no PDF found, we might just have to render standard content
                        // But for this specific task, user expects a PDF from the API
                       console.warn("No explicit PDF embed found, looking for fallbacks or using static content if needed.");
                        // In a real scenario, we might default to a known URL if the API data is missing the embed structure specifically
                    }
    
                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching book list:", err);
                    setError(err.message);
                    setLoading(false);
                }
            };
    
            fetchData();
        }, []);
    
    return (
        <div className="assessment-page-container">
            <Header />
            <StickyElements />

            {/* Hero Section */}
            <div className="elementor-element elementor-element-9ef55e9 e-con-full breadcrumb-animated e-flex e-con e-parent e-lazyloaded">
                <div className="elementor-element elementor-element-ca4a9ff e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-0895d4b elementor-widget elementor-widget-heading">
                        <h1 className="elementor-heading-title elementor-size-default">FPS ASSESSMENT PLAN</h1>
                    </div>
                    <div className="elementor-element elementor-element-3ac3edf elementor-widget elementor-widget-heading">
                        <h2 className="elementor-heading-title elementor-size-default">
                            Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Content Placeholder */}
            <main className="booklist-main">
                <div className="booklist-header">
                    <h2>Book List for Session 2025-26</h2>
                    <p>Building Bright Futures, One Step at a Time.</p>
                </div>

                {loading && <div className="booklist-loading">Loading book list...</div>}
                
                {error && <div className="booklist-loading" style={{color: 'red'}}>Failed to load book list. Please refresh the page.</div>}

                {!loading && !error && (
                    <div className="booklist-content-wrapper">
                        {pdfUrl ? (
                            <div className="booklist-pdf-container">
                                <div className="booklist-pdf-wrapper">
                                    <embed 
                                        src={pdfUrl} 
                                        type="application/pdf" 
                                        className="booklist-pdf-embed"
                                        title="FPS Book List"
                                    />
                                </div>
                                <div className="booklist-actions">
                                    <a href={pdfUrl} download target="_blank" rel="noopener noreferrer" className="booklist-download-btn">
                                        <span>Download Book List (PDF)</span>
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ) : (
                             // Fallback if extraction failed but we have content
                            <div dangerouslySetInnerHTML={{ /*__html: pageContent */ }} />
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
