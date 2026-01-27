'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './house-systems.css';

export default function HouseSystemsPage() {
    return (
        <div className="house-systems-container">
            <Header />
            <StickyElements />

            {/* Hero Section based on Elementor reference */}
            <div className="elementor-element elementor-element-2f5b439 e-con-full breadcrumb-animated e-flex e-con e-parent e-lazyloaded">
                <div className="elementor-element elementor-element-3a4acce e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-5bb7089 elementor-widget elementor-widget-heading">
                        <h1 className="elementor-heading-title elementor-size-default">House Systems</h1>
                    </div>
                    <div className="elementor-element elementor-element-571a5e6 elementor-widget elementor-widget-heading">
                        <h2 className="elementor-heading-title elementor-size-default">
                            Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Content: House System Overview */}
            <main className="house-systems-content">
                
                {/* Intro Section */}
                <section className="house-intro-section">
                    <h2 className="section-title">House System</h2>
                    <div className="section-description">
                        <p>
                            At <strong>Firayalal Public School</strong>, the <strong>House System</strong> forms the backbone of student life. 
                            It promotes a sense of belonging, healthy competition, and leadership among students. 
                            Each student is assigned to a house, where they work together to achieve academic, cultural, and sports excellence.
                        </p>
                    </div>
                </section>

                {/* House Cards Section */}
                <section className="house-cards-section">
                    <h3 className="cards-title">Our Houses</h3>
                    
                    <div className="house-grid">
                        {/* Anand House */}
                        <div className="house-card card-anand">
                            <div className="card-header">
                                <h2>Anand</h2>
                            </div>
                            <div className="card-body">
                                <p>Symbol of happiness and enthusiasm, Anand House inspires others with its cheerful spirit.</p>
                            </div>
                        </div>

                        {/* Gyan House */}
                        <div className="house-card card-gyan">
                            <div className="card-header">
                                <h2>Gyan</h2>
                            </div>
                            <div className="card-body">
                                <p>Dedicated to learning and excellence, Gyan House leads with intelligence and curiosity.</p>
                            </div>
                        </div>

                        {/* Maitri House */}
                        <div className="house-card card-maitri">
                            <div className="card-header">
                                <h2>Maitri</h2>
                            </div>
                            <div className="card-body">
                                <p>Maitri House values teamwork and inclusiveness, fostering strong bonds of friendship.</p>
                            </div>
                        </div>

                        {/* Shanti House */}
                        <div className="house-card card-shanti">
                            <div className="card-header">
                                <h2>Shanti</h2>
                            </div>
                            <div className="card-body">
                                <p>Shanti House stands for calmness, discipline, and balance, inspiring respect and harmony.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Session Details Section */}
                <section className="session-details-section">
                    <h4 className="session-title">Session 2025-2026</h4>
                    <div className="session-content">
                        <ul className="session-list">
                            <li>Each house is headed by one Boy and one Girl known as known House captains. Teachers act as the House wardens. Points are awarded to the students throughout the year for activities, Games, Sports, Dramatics, Debates, Quiz, Art, Music etc.</li>
                            <li>At the end of the year, the house gaining the highest number of points is awarded trophies. Every outstanding student is given a certificate.</li>
                            <li>House board has to be displayed as per topic on 1st Wednesday every month.</li>
                        </ul>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
