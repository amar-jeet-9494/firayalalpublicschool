'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './assessment.css';

export default function AssessmentPlanPage() {
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
            <main className="assessment-main-content">
                <div className="content-container">
                    {/* Content will go here later */}
                </div>
            </main>

            <Footer />
        </div>
    );
}
