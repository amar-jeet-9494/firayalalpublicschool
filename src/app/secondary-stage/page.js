import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import SecondaryStageSection from '@/components/SecondaryStageSection';
import { getCompletePageById, PAGE_IDS, extractElementorImages, filterWordPressContentFromHeading } from '@/lib/wordpress';
import './secondary-stage.css';

// This is a Server Component - data is fetched at build/request time
export const revalidate = 60; // Revalidate every 60 seconds (ISR)

// Generate metadata dynamically from WordPress
export async function generateMetadata() {
    try {
        const page = await getCompletePageById(PAGE_IDS.SECONDARY_STAGE);
        return {
            title: page.title ? `${page.title.replace(/<[^>]*>/g, '')} | Firayalal Public School` : 'Secondary Stage | Firayalal Public School',
            description: page.excerpt ? page.excerpt.replace(/<[^>]*>/g, '').substring(0, 160) : 'Secondary Stage - Building Bright Futures, One Step at a Time at Firayalal Public School',
        };
    } catch (error) {
        return {
            title: 'Secondary Stage | Firayalal Public School',
            description: 'Secondary Stage - Building Bright Futures, One Step at a Time',
        };
    }
}

export default async function SecondaryStagePage() {
    let pageData = null;
    let error = null;
    let slideshowImages = [];

    try {
        pageData = await getCompletePageById(PAGE_IDS.SECONDARY_STAGE);
        // Extract slideshow images from Elementor data-settings
        if (pageData?.content) {
            slideshowImages = extractElementorImages(pageData.content);
        }
    } catch (err) {
        console.error('Failed to fetch Secondary Stage page:', err);
        error = 'Failed to load page content. Please try again later.';
    }

    // Use first slideshow image or fallback
    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-190641.avif';

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section with dynamic background from WordPress */}
            <section className="secondary-hero-section">
                <div
                    className="secondary-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="secondary-hero-overlay" />
                <div className="secondary-hero-content">
                    <h1 className="secondary-hero-title">Secondary Stage</h1>
                    <h2 className="secondary-hero-subtitle">Building Bright Futures, One Step at a Time</h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* About Secondary Stage Section with Image Slideshow */}
            <SecondaryStageSection />

            {/* Dynamic WordPress Content - Filtered to show only from "Minimum Age Required" onwards */}
            <section className="secondary-content-section">
                {error ? (
                    <div className="secondary-error">
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
                    <div className="secondary-loading">
                        <p>Loading content...</p>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}
