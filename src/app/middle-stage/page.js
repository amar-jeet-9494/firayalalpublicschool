import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import MiddleStageSection from '@/components/MiddleStageSection';
import { getCompletePageById, PAGE_IDS, extractElementorImages, filterWordPressContentFromHeading } from '@/lib/wordpress';
import './middle-stage.css';

// This is a Server Component - data is fetched at build/request time
export const revalidate = 60; // Revalidate every 60 seconds (ISR)

// Generate metadata dynamically from WordPress
export async function generateMetadata() {
    try {
        const page = await getCompletePageById(PAGE_IDS.MIDDLE_STAGE);
        return {
            title: page.title ? `${page.title.replace(/<[^>]*>/g, '')} | Firayalal Public School` : 'Middle Stage | Firayalal Public School',
            description: page.excerpt ? page.excerpt.replace(/<[^>]*>/g, '').substring(0, 160) : 'Middle Stage - Building Bright Futures, One Step at a Time at Firayalal Public School',
        };
    } catch (error) {
        return {
            title: 'Middle Stage | Firayalal Public School',
            description: 'Middle Stage - Building Bright Futures, One Step at a Time',
        };
    }
}

export default async function MiddleStagePage() {
    let pageData = null;
    let error = null;
    let slideshowImages = [];

    try {
        pageData = await getCompletePageById(PAGE_IDS.MIDDLE_STAGE);
        // Extract slideshow images from Elementor data-settings
        if (pageData?.content) {
            slideshowImages = extractElementorImages(pageData.content);
        }
    } catch (err) {
        console.error('Failed to fetch Middle Stage page:', err);
        error = 'Failed to load page content. Please try again later.';
    }

    // Use first slideshow image or fallback
    const heroImage = slideshowImages.find(img => img.type === 'slideshow')?.url 
        || 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-26-135312.avif';

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section with dynamic background from WordPress */}
            <section className="middle-hero-section">
                <div
                    className="middle-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="middle-hero-overlay" />
                <div className="middle-hero-content">
                    <h1 className="middle-hero-title">Middle Stage</h1>
                    <h2 className="middle-hero-subtitle">Building Bright Futures, One Step at a Time</h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="middle-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* About Middle Stage Section with Image Slideshow */}
            <MiddleStageSection />

            {/* Dynamic WordPress Content - Filtered to show only from "Minimum Age Required" onwards */}
            <section className="middle-content-section">
                {error ? (
                    <div className="middle-error">
                        <p>{error}</p>
                    </div>
                ) : pageData ? (
                    <div
                        className="wordpress-content"
                        dangerouslySetInnerHTML={{ 
                            __html: filterWordPressContentFromHeading(pageData.content, 'Minimum Age Required') 
                        }}
                    />
                ) : (
                    <div className="middle-loading">
                        <p>Loading content...</p>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}
