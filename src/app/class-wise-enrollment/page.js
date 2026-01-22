'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './enrollment.css';

export default function ClassWiseEnrollmentPage() {
    return (
        <div className="enrollment-page-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="enrollment-hero-section">
                <div className="enrollment-hero-overlay"></div>
                
                <div className="enrollment-hero-content-container">
                    <div className="elementor-widget-heading">
                        <h1 className="enrollment-hero-title">Class wise Enrollment</h1>
                    </div>
                    <div className="elementor-widget-heading">
                        <h2 className="enrollment-hero-subtitle">
                            Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                        </h2>
                    </div>
                </div>
            </section>

            {/* Main Content Placeholder */}
            <main style={{ padding: '40px', maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
                <p>Content coming soon...</p>
            </main>

            <Footer />
        </div>
    );
}
