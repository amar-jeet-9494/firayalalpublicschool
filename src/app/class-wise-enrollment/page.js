'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './enrollment.css';

export default function ClassWiseEnrollmentPage() {
    const [enrollmentData, setEnrollmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://firayalalpublicschool.edu.in/wp-json/wp/v2/pages/2527');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                
                // Parse the content to extract table data
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.content.rendered, 'text/html');
                const rows = doc.querySelectorAll('tr');
                
                const tableData = [];
                // Skip header row if it exists (usually the first one)
                // We'll assume the first row with TH or bold text might be header, but let's check index
                rows.forEach((row, index) => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 3) {
                         // Clean up text content
                        const cleanText = (text) => text.trim().replace(/&nbsp;/g, '');
                        
                        tableData.push({
                            className: cleanText(cells[0].textContent),
                            sections: cleanText(cells[1].textContent),
                            students: cleanText(cells[2].textContent)
                        });
                    }
                });

                setEnrollmentData(tableData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching enrollment data:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                        <h2 className="enrollment-hero-subtitle">Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !</h2>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="enrollment-main-content">
                <div className="enrollment-intro">
                    <h2>CLASSWISE ENROLLMENT OF STUDENTS (Session 2025–2026)</h2>
                    {/* <div className="enrollment-footer-note"> */}
                     <p className="enrollment-subtitle"><strong>At Firayalal Public School</strong>, we are proud to share the classwise enrollment of students for the academic session 2025–2026. Our diverse student body reflects our commitment to quality education and holistic development.</p>
                {/* </div> */}
                </div>

                {loading && <div className="enrollment-loading">Loading enrollment data...</div>}
                
                {error && <div className="enrollment-error">Failed to load data. Please try again later.</div>}

                {!loading && !error && enrollmentData.length > 0 && (
                    <div className="enrollment-table-wrapper">
                        <table className="enrollment-table">
                            <thead>
                                <tr>
                                    <th>CLASS</th>
                                    <th>NO. OF SECTIONS</th>
                                    <th>NO. OF STUDENTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollmentData.map((row, index) => (
                                    <tr key={index}>
                                        <td data-label="CLASS">{row.className}</td>
                                        <td data-label="NO. OF SECTIONS">{row.sections}</td>
                                        <td data-label="NO. OF STUDENTS">{row.students}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                 
                 {!loading && !error && enrollmentData.length === 0 && (
                    <p>No enrollment data found.</p>
                 )}
            </main>

            <Footer />
        </div>
    );
}
