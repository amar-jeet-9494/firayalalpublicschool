'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './faculty.css';

// Faculty data will be fetched from Supabase
const initialFacultyData = {
    leadership: [],
    examination: [],
    administration: [],
    foundational: [],
    elementary: [],
    middle: [],
    senior: [],
    coScholastic: [],
    ge4Staff: []
};

// Department configuration
const departments = [
    { key: 'leadership', title: 'Our Organogram', isLeadership: true },
    { key: 'examination', title: 'Examination Department' },
    { key: 'administration', title: 'Administration Department' },
    { key: 'foundational', title: 'Foundational Section' },
    { key: 'elementary', title: 'Elementary Section' },
    { key: 'middle', title: 'Middle Section' },
    { key: 'senior', title: 'Senior Section' },
    { key: 'coScholastic', title: 'Co- Scholastic Faculty' },
    { key: 'ge4Staff', title: 'GE4 Staff' }
];

// Get initials from name
function getInitials(name) {
    const parts = name.replace(/^(Mrs?\.?|Ms\.?|Dr\.?|Shri\.?)\s*/i, '').split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
}

// Faculty Card Component
function FacultyCard({ name, designation, image, isLeadership, isCoordinator }) {
    const initials = getInitials(name);
    const cardClass = `faculty-card ${isLeadership ? 'leadership' : ''} ${isCoordinator ? 'coordinator' : ''}`;

    return (
        <div className={cardClass}>
            <div className="faculty-card-image-wrapper">
                {image ? (
                    <img 
                        src={image} 
                        alt={name} 
                        className="faculty-card-image"
                        loading="lazy"
                    />
                ) : (
                    <div className="faculty-card-avatar-placeholder">
                        {initials}
                    </div>
                )}
            </div>
            <div className="faculty-card-content">
                <h3 className="faculty-card-name">{name}</h3>
                <p className="faculty-card-designation">{designation}</p>
            </div>
        </div>
    );
}

// Department Section Component
function DepartmentSection({ title, members, isLeadership }) {
    return (
        <div className="faculty-department-section">
            <div className="faculty-department-header">
                <h2 className="faculty-department-title">{title}</h2>
                <div className="faculty-department-line" />
            </div>
            <div className={`faculty-cards-grid ${isLeadership ? 'leadership-grid' : ''}`}>
                {members.map((member, index) => (
                    <FacultyCard
                        key={index}
                        name={member.name}
                        designation={member.designation}
                        image={member.image}
                        isLeadership={isLeadership}
                        isCoordinator={member.isCoordinator}
                    />
                ))}
            </div>
        </div>
    );
}

export default function FacultyPage() {
    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/TDS-OPT-21-FIRAYALAL-SCHOOL.avif';
    
    // State for fetching data
    const [facultyData, setFacultyData] = useState(initialFacultyData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch('/api/dynamic-tables?name=faculty_master_list');
                const data = await response.json();

                if (data && data.content) {
                    // Organize flat data back into categories
                    const organizedData = { ...initialFacultyData };
                    
                    data.content.forEach(member => {
                        const category = member.category;
                        if (organizedData[category]) {
                            organizedData[category].push(member);
                        }
                    });
                    setFacultyData(organizedData);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);
    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="faculty-hero-section">
                <div
                    className="faculty-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="faculty-hero-overlay" />
                <div className="faculty-hero-content">
                    <h1 className="faculty-hero-title">School Faculty</h1>
                    <h2 className="faculty-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime!
                    </h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faculty-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* Faculty Content Section */}
            <section className="faculty-content-section">
                <div className="faculty-content-container">
                    <h2 className="faculty-main-heading">School Faculty</h2>
                    <p className="faculty-session-text">SESSION 2025-2026</p>
                    
                     {loading ? (
                        <div className="faculty-loading">Loading faculty data...</div>
                    ) : (
                        departments.map((dept) => (
                            <DepartmentSection
                                key={dept.key}
                                title={dept.title}
                                members={facultyData[dept.key] || []}
                                isLeadership={dept.isLeadership}
                            />
                        ))
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
