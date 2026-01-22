'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './faculty.css';

// Faculty data extracted from provided HTML
const facultyData = {
    leadership: [
        { 
            name: 'Mrs. Sushma Munjal', 
            designation: 'Academic Director',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Directorm.avif'
        },
        { 
            name: 'Shri. Niraj Kumar Sinha', 
            designation: 'Principal',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-14.avif'
        },
        { 
            name: 'Mrs. Haneet Munjal', 
            designation: 'Vice Principal',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-14.avif'
        }
    ],
    examination: [
        { 
            name: 'Mr. Sunil Prasad', 
            designation: 'Examination Incharge',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/22.avif'
        },
        { 
            name: 'Mr. Dhruva Narayan Saha', 
            designation: 'HOD | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Dhruva-1.avif'
        },
        { 
            name: 'Mrs. Archana', 
            designation: 'HOD | Hindi',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/27.avif'
        },
        { 
            name: 'Mr. Vinay Kumar Balabhadra', 
            designation: 'HOD | Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-8.avif'
        },
        { 
            name: 'Mr. Baban Kumar Tiwari', 
            designation: 'HOD | Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Baban-1.avif'
        },
        { 
            name: 'Mrs. Anchan Prasad Keshari', 
            designation: 'HOD | Social Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/24.avif'
        },
        { 
            name: 'Mr. Sanjeev Kumar Shrivastava', 
            designation: 'HOD | Computer Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-12.avif'
        }
    ],
    administration: [
        { 
            name: 'Mr. Kumar Bijayraj Verma', 
            designation: 'Administrative Incharge',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Bijay.avif'
        },
        { 
            name: 'Mrs. Guneet', 
            designation: 'Public Relations Officer',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Gunnet.avif'
        },
        { 
            name: 'Mr. Niraj', 
            designation: 'Accountant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Niraj.avif'
        }
    ],
    foundational: [
        { 
            name: 'Mrs. Supriti Shekhar', 
            designation: 'Foundational Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Supriti.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Naghma Mallick', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/14.avif'
        },
        { 
            name: 'Mrs. Sushma Thapa', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/17.avif'
        },
        { 
            name: 'Ms. Ichha Nagpal', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Iccha.avif'
        },
        { 
            name: 'Ms. Ria Raj', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Ria.avif'
        },
        { 
            name: 'Mrs. Shalu Aggarwal', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-7.avif'
        }
    ],
    elementary: [
        { 
            name: 'Mrs. Padmaja Pattayat', 
            designation: 'Elementary Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/31.avif',
            isCoordinator: true 
        },
        { 
            name: 'Ms. Ishrani Viola Barla', 
            designation: 'TGT Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/19.avif'
        },
        { 
            name: 'Mrs. Shefali Chakraborty', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/23.avif'
        },
        { 
            name: 'Mrs. Shashikala Singh', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/28.avif'
        },
        { 
            name: 'Mr. Manish', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-10.avif'
        },
        { 
            name: 'Ms. Moushmi Mahto', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Moushmi.avif'
        },
        { 
            name: 'Ms. Ankita Rani', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Ankita.avif'
        },
        { 
            name: 'Mrs. Sneha Kumari', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/32.avif'
        }
    ],
    middle: [
        { 
            name: 'Mrs. Sravani Sinha', 
            designation: 'Middle Section Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/13.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Doel Roy', 
            designation: 'TGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Doel.avif'
        },
        { 
            name: 'Mrs. Anchan Prasad Keshari', 
            designation: 'TGT | Social Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/24.avif'
        },
        { 
            name: 'Mrs. Silki Roba', 
            designation: 'TGT | Social Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Silki.avif'
        },
        { 
            name: 'Mrs. Usha Pandey', 
            designation: 'TGT | Hindi & Sanskrit',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Usha.avif'
        },
        { 
            name: 'Ms. Ayushi Prasad', 
            designation: 'PGT | Chemistry',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/12.avif'
        },
        { 
            name: 'Mrs. Puja Kumari', 
            designation: 'PGT | Chemistry',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20.avif'
        },
        { 
            name: 'Mr. Abhiraj Mitra', 
            designation: 'PGT I Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/10.avif'
        },
        { 
            name: 'Mr. Sanjeev Sinha', 
            designation: 'TGT I I.T.',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-3.avif'
        }
    ],
    senior: [
        { 
            name: 'Mrs. Shiny Singh', 
            designation: 'Senior Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Shiny.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Archana', 
            designation: 'PGT Hindi',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/27.avif'
        },
        { 
            name: 'Mr. Kumar Bijayraj Verma', 
            designation: 'PGT | PHE',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Bijay.avif'
        },
        { 
            name: 'Mr. Sunil Prasad', 
            designation: 'TGT | Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/22.avif'
        },
        { 
            name: 'Mr. Sanjeev Kumar Shrivastava', 
            designation: 'PGT | I.P.',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-12.avif'
        },
        { 
            name: 'Dr. Monika Bhatia', 
            designation: 'PGT | Economics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/16.avif'
        },
        { 
            name: 'Mr. Baban Kumar Tiwari', 
            designation: 'TGT | Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Baban.avif'
        },
        { 
            name: 'Mr. Shyama Nand Sah', 
            designation: 'PGT | Physics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Shyama.avif'
        },
        { 
            name: 'Mr. Dhruva Narayan Saha', 
            designation: 'PGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Dhruva.avif'
        },
        { 
            name: 'Mr. Vinay Kumar Balabhadra', 
            designation: 'PGT | Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-8.avif'
        },
        { 
            name: 'Mrs. Manorama Kumari', 
            designation: 'PGT | Biology',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Manorama.avif'
        },
        { 
            name: 'Mrs. Shilpa Roy', 
            designation: 'PGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Shilpa.avif'
        },
        { 
            name: 'Mrs. Sonal Kumari Singh', 
            designation: 'PGT | B.St. & Accounts',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Sonal.PNG'
        },
        { 
            name: 'Mrs. Richa Ghosh', 
            designation: 'PGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/13-1.avif'
        }
    ],
    coScholastic: [
        { 
            name: 'Mrs. Krishna Samson', 
            designation: 'Skill Vantage Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/14-3.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Mukta Rani', 
            designation: 'Art & Craft Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/29.avif'
        },
        { 
            name: 'Mr. Amit Kumar Modak', 
            designation: 'PTE',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Amit.avif'
        },
        { 
            name: 'Mr. Amar Pathak', 
            designation: 'Music Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-3.avif'
        },
        { 
            name: 'Mr. Uttam Prasad', 
            designation: 'Dance Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/8-4.avif'
        },
        { 
            name: 'Ms. Suman Beauty', 
            designation: 'Librarian',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/9-4.avif'
        },
        { 
            name: 'Mr. Manish Kumar', 
            designation: 'Table Tennis Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-12.avif'
        },
        { 
            name: 'Mr. Gyani Kumar', 
            designation: 'Taekwondo Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/14-2.avif'
        },
        { 
            name: 'Mr. Sumit Singh', 
            designation: 'Kabaddi Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-7.avif'
        },
        { 
            name: 'Mr. Avinash Thapa', 
            designation: 'Basketball Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-11.avif'
        }
    ],
    ge4Staff: [
        { 
            name: 'Agatha Topno', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/18.avif'
        },
        { 
            name: 'Suman Kachhap', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/19.avif'
        },
        { 
            name: 'Laxmi Rani', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/22.avif'
        },
        { 
            name: 'Magdali Xalxo', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/25.avif'
        },
        { 
            name: 'Amar Lata Toppo', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/26.avif'
        },
        { 
            name: 'Sandhya Devi', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Sandhya.avif'
        },
        { 
            name: 'Sarita Choudhary', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Savita.avif'
        },
        { 
            name: 'Renu Devi', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Renu.avif'
        },
        { 
            name: 'Purnima Devi', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Purnima.avif'
        },
        { 
            name: 'James Topno', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/30.avif'
        },
        { 
            name: 'Bharat Kumar Mahto', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/24.avif'
        },
        { 
            name: 'Narayan Mahto', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-7.avif'
        },
        { 
            name: 'Md. Zamadar Hussain', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Md.-Zamadar-Hussain-_-Driver.avif'
        },
        { 
            name: 'Raj Kishor Choudhary', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Raj-Kishor-Choudhary-_-Driver.avif'
        },
        { 
            name: 'Birju Chik Baraik', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Birju-Chik-Baraik-_-Driver.avif'
        },
        { 
            name: 'Tirth Mahto', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Tirth-Mahto-_-Driver.avif'
        },
        { 
            name: 'Sanjeev Mahili', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-2.avif'
        },
        { 
            name: 'Sanju Nayak', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Sanju-Nayak-_-Driver.avif'
        },
        { 
            name: 'Pawan Munda', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Pawan-Munda-_-Helper.avif'
        },
        { 
            name: 'Md. Sarfaraz Hussain', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-6.avif'
        },
        { 
            name: 'Jageshwar Munda', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Jageshwar-Munda-_-Helper.avif'
        },
        { 
            name: 'Charku Mahli', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Charku-Mahli-_-Helper.avif'
        }
    ]
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

                    {/* Render all departments */}
                    {departments.map((dept) => (
                        <DepartmentSection
                            key={dept.key}
                            title={dept.title}
                            members={facultyData[dept.key]}
                            isLeadership={dept.isLeadership}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
