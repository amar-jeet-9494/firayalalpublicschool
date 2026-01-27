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
                
                {/* Chairman / Founder Section (Placeholder for now as per search results) */}
                <section className="leader-profile-section reverse">
                    <div className="leader-image-wrapper">
                        <div className="leader-image-placeholder">
                            <span>Image Unavailable</span>
                        </div>
                    </div>
                    <div className="leader-info-wrapper">
                        <h3 className="leader-role">Founder & Chairman</h3>
                        <h2 className="leader-name">Shri Harish Munjal</h2>
                        <p className="leader-bio">
                            Firayalal Public School was established through the commitment and vision of Shri Harish Munjal, 
                            who sought to offer holistic education that shapes character and develops responsible citizens. 
                            His vision continues to guide the institution towards excellence.
                        </p>
                    </div>
                </section>

                {/* Principal Section */}
                <section className="leader-profile-section">
                    <div className="leader-image-wrapper">
                        <img 
                            src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-13.avif" 
                            alt="Shri. Niraj Kumar Sinha" 
                            className="leader-image"
                        />
                    </div>
                    <div className="leader-info-wrapper">
                        <h3 className="leader-role">Principal</h3>
                        <h2 className="leader-name">Shri. Niraj Kumar Sinha</h2>
                        <blockquote className="leader-quote">
                            "Aligned with the National Education Policy (NEP) 2020, the school ensures academic excellence, creativity, and value-based learning, empowering students to realise their potential and serve society with integrity."
                        </blockquote>
                        <p className="leader-bio">
                            As the Principal of Firayalal Public School, Shri. Niraj Kumar Sinha has been instrumental in 
                            driving the school's academic and co-curricular achievements. Under his leadership, the school 
                            focuses on fostering a nurturing environment where every child can thrive.
                        </p>
                    </div>
                </section>

                {/* Student Council Table (Dynamic) */}
                <StudentCouncil />

            </main>

            <Footer />
        </div>
    );
}
