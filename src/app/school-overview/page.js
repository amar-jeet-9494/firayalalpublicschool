'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './school-overview.css';

export default function SchoolOverviewPage() {
    const [pageContent, setPageContent] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchContent = async () => {
             try {
                const res = await fetch('https://firayalalpublicschool.edu.in/wp-json/wp/v2/pages/2003');
                const data = await res.json();
                let content = data.content.rendered;

                // --- CONTENT PROCESSING FOR STYLING ---

                // 1. Wrap Mission & Vision
                // We assume the H2 and the UL follow each other.
                // Replaces the H2 start and the specific UL end closest to it (basic heuristic).
                // Note: The API content is a bit messy, so we target specific strings.
                content = content.replace(
                    /<h2>\s*Our VISION &amp; mission/i, 
                    '<div class="fps-mission-container"><h2>OUR VISION & MISSION'
                );
                // We need to close this div after the mission list. 
                // The mission list ends with </ul>. We'll close it after the first <ul> found after the header is replaced? 
                // Since raw string replacement is risky, we'll try to match the block.
                // Alternative: Just wrap the whole known segment if possible, or use CSS classes if available.
                // Let's assume the UL immediately follows. 
                // We will rely on the fact that the next "Comprehensive Education" starts a new section.
                // So we can close the div before "Comprehensive Education" if we want, OR close it after the first </ul>.
                content = content.replace('</ul>', '</ul></div>'); 


                // 2. Wrap Cards
                // We identify cards by their titles.
                
                // Card 1: Comprehensive Education
                // We'll look for the container wrapping this. Since determining the parent is hard via regex, 
                // we'll highlight the specific H3 and let CSS target the parent or we wrap the H3+P content.
                // Better approach: Wrap the H3 and the following P in a div, if they are siblings.
                const card1Title = 'Comprehensive Education';
                if (content.includes(card1Title)) {
                     content = content.replace(
                        /(<h3.*?>\s*Comprehensive Education\s*<\/h3>[\s\S]*?<\/p>)/i, 
                        '<div class="fps-info-card card-purple">$1</div>'
                     );
                }

                const card2Title = 'All Inclusive Participation';
                 if (content.includes(card2Title)) {
                     content = content.replace(
                        /(<h3.*?>\s*All Inclusive Participation\s*<\/h3>[\s\S]*?<\/p>)/i, 
                        '<div class="fps-info-card card-cyan">$1</div>'
                     );
                }

                const card3Title = 'Self-Discipline';
                 if (content.includes(card3Title)) {
                     content = content.replace(
                        /(<h3.*?>\s*Self-Discipline\s*<\/h3>[\s\S]*?<\/p>)/i, 
                        '<div class="fps-info-card card-green">$1</div>'
                     );
                }

                // Clean up specific Elementor artifacts if needed
                // (Optional: Hide duplicates handled by CSS mostly)

                setPageContent(content);
                setLoading(false);
             } catch (error) {
                console.error("Failed to fetch page content", error);
                setLoading(false);
             }
        };
        fetchContent();
    }, []);

    return (
        <div className="school-overview-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="overview-hero-section">
                <div className="overview-hero-overlay"></div>
                
                <div className="overview-hero-content">
                    <div className="elementor-widget-heading">
                        <h1 className="overview-hero-title">School Overview</h1>
                    </div>
                    <div className="elementor-widget-heading">
                        <h2 className="overview-hero-subtitle">
                            Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                        </h2>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="overview-main-content">
                {loading ? (
                    <div className="overview-loading">Loading content...</div>
                ) : (
                    <div className="overview-content-wrapper" dangerouslySetInnerHTML={{ __html: pageContent }} />
                )}
            </main>

            <Footer />
        </div>
    );
}
