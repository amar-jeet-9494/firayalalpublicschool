'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import { supabase } from '@/lib/supabase';
import './enrollment.css';

export default function ClassWiseEnrollmentPage() {
    const [enrollmentData, setEnrollmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!supabase) {
                setLoading(false);
                return;
            }

            try {
                // Fetch from Supabase Table 3 (School Class Strength)
                const { data: rawData, error: sbError } = await supabase
                    .from('dynamic_tables')
                    .select('content')
                    .eq('name', '3-school-class-strength-2026-01-28')
                    .single();

                if (sbError) throw sbError;

                if (rawData?.content && Array.isArray(rawData.content)) {
                    // Map CSV columns to our UI format
                    // Expected CSV Headers: "Class", "No. of Sections", "Total Students" (or similar)
                    const tableData = rawData.content.map(row => ({
                        className: row['Class'] || row['class'] || Object.values(row)[0],
                        sections: row['No. of Sections'] || row['Sections'] || Object.values(row)[1],
                        students: row['Total Students'] || row['Students'] || Object.values(row)[2]
                    }));
                    setEnrollmentData(tableData);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching enrollment data:", err);
                setError("Failed to load data from database.");
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
                    <p className="enrollment-subtitle"><strong>At Firayalal Public School</strong>, we are proud to share the classwise enrollment of students for the academic session 2025–2026. Our diverse student body reflects our commitment to quality education and holistic development.</p>
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
                    <p className="text-center p-10">No enrollment data found.</p>
                 )}
            </main>

            <Footer />
        </div>
    );
}
