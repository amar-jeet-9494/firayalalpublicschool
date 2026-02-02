'use client';

import Image from 'next/image';

const DEFAULT_SERVICES = [
    { icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135745.png', label: 'Admissions' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png', label: 'Library' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/4105/4105448.png', label: 'Emergency Contact' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png', label: 'Publications' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828918.png', label: 'Notices' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/2859/2859740.png', label: 'Photo Albums' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/891/891462.png', label: 'Online fee' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/2258/2258540.png', label: 'Results' },
];

const DEFAULT_PARAGRAPHS = [
    "Firayalal Public School (F.P.S.) is a co-educational CBSE School in Ranchi providing quality education from Bal Vatika II (Earlier-Nursery) to Grade XII.",
    "Our approach ensures that each student receives <span class=\"highlight\">individual attention,</span> which is possible only in a school environment that gives importance to <span class=\"highlight\">quality over quantity.</span>",
    "We take pride in providing <strong>research-based, counselling driven education</strong> that culminates in the development of the <strong>Emerging Student Profile (ESP).</strong>",
    "It is affiliated to the CBSE Board of Education, New Delhi. F.P.S. is recognized as one among the top CBSE Schools in Ranchi. It provides a harmonious learning environment, stresses on co-operative relationships and emotional equilibrium. It has been a cornerstone of education for more than 2.5 decades.",
    "Firayalal Public School is committed to a <strong>secular and inclusive education</strong> to develop the students to be informed, responsible and global citizens who are prepared to succeed academically and beyond."
];

export default function FPSSection({
    heading = "Firayalal Public School",
    subHeading = "Nurturing Future Leaders",
    paragraphs = DEFAULT_PARAGRAPHS,
    services = DEFAULT_SERVICES
}) {
    // If services come from DB, they might not have icon if not set, 
    // but we assume full object structure from JSONB

    return (
        <section className="fps-section">
            {/* LEFT CONTENT */}
            <div className="fps-left">
                <h2>{heading}</h2>
                <h3>{subHeading}</h3>

                {paragraphs.map((para, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: para }}></p>
                ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="fps-right">
                <h2>OUR RESOURCES & SERVICES</h2>

                <div className="fps-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-box">
                            <img
                                src={service.icon}
                                alt={service.label}
                            />
                            <span dangerouslySetInnerHTML={{ __html: service.label.replace(' ', '<br/>') }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
