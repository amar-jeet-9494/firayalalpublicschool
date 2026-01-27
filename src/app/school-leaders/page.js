'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import StudentCouncil from '@/components/StudentCouncil';
import './leaders.css';

export default function SchoolLeadersPage() {
    return (
        <div className="school-leaders-container">
            <Header />
            <StickyElements />

            {/* Hero Section */}
            <section className="leaders-hero-section">
                <div className="leaders-hero-overlay"></div>
                <div className="leaders-hero-content animate-curtain-reveal">
                    <h1 className="leaders-hero-title">School Leaders</h1>
                    <h2 className="leaders-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                    </h2>
                </div>
            </section>

            {/* Leader Profiles Section */}
            <main className="leaders-main-content">
                {/* Student Council Table (Dynamic) */}
                <StudentCouncil />

            </main>

            <Footer />
        </div>
    );
}
