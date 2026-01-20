import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import ElementaryStageSection from '@/components/ElementaryStageSection';
import { getCompletePageById, PAGE_IDS, extractElementorImages, filterWordPressContentFromHeading } from '@/lib/wordpress';
import './elementary-stage.css';

// This is a Server Component - data is fetched at build/request time
export const revalidate = 60; // Revalidate every 60 seconds (ISR)

// Generate metadata dynamically from WordPress
export async function generateMetadata() {
    try {
        const page = await getCompletePageById(PAGE_IDS.ELEMENTARY_STAGE);
        return {
            title: page.title ? `${page.title.replace(/<[^>]*>/g, '')} | Firayalal Public School` : 'Elementary Stage | Firayalal Public School',
            description: page.excerpt ? page.excerpt.replace(/<[^>]*>/g, '').substring(0, 160) : 'Elementary Stage - Building a Strong Academic and Creative Foundation at Firayalal Public School',
        };
    } catch (error) {
        return {
            title: 'Elementary Stage | Firayalal Public School',
            description: 'Elementary Stage - Building a Strong Academic and Creative Foundation',
        };
    }
}

export default async function ElementaryStagePage() {
    let pageData = null;
    let error = null;
    let slideshowImages = [];

    try {
        pageData = await getCompletePageById(PAGE_IDS.ELEMENTARY_STAGE);
        // Extract slideshow images from Elementor data-settings
        if (pageData?.content) {
            slideshowImages = extractElementorImages(pageData.content);
        }
    } catch (err) {
        console.error('Failed to fetch Elementary Stage page:', err);
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
            <section className="elementary-hero-section">
                <div
                    className="elementary-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="elementary-hero-overlay" />
                <div className="elementary-hero-content">
                    <h1 className="elementary-hero-title">Elementary Stage</h1>
                    <h2 className="elementary-hero-subtitle">Building a Strong Academic and Creative Foundation</h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="elementary-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* About Elementary Stage Section with Image Slideshow */}
            <ElementaryStageSection />

            {/* Dynamic WordPress Content - Filtered to show only from "Minimum Age Required" onwards */}
            <section className="elementary-content-section">
                {error ? (
                    <div className="elementary-error">
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
                    <div className="elementary-loading">
                        <p>Loading content...</p>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}

