'use client';

import { FaMoneyBillWave, FaClipboardList, FaUsers, FaClipboardCheck, FaThumbsUp, FaAddressBook } from 'react-icons/fa';

export default function ForParents() {
    const parentCards = [
        {
            id: 1,
            icon: FaMoneyBillWave,
            label: 'Fee Structure',
            href: '/fee-structure',
        },
        {
            id: 2,
            icon: FaClipboardList,
            label: 'Admission',
            href: '/admission-process',
        },
        {
            id: 3,
            icon: FaUsers,
            label: 'Class Wise Enrollment',
            href: '/class-wise-enrollment',
        },
        {
            id: 4,
            icon: FaClipboardCheck,
            label: 'School Notices',
            href: '/notices',
        },
        {
            id: 5,
            icon: FaThumbsUp,
            label: 'Feedback & Suggestions',
            href: '/feedback-and-suggestions',
        },
        {
            id: 6,
            icon: FaAddressBook,
            label: 'Emergency Point of Contact',
            href: '/contact',
        },
    ];

    return (
        <section className="for-parents-section">
            {/* Top navy border 
            <div className="for-parents-top-border"></div>*/}

            <div className="for-parents-wrapper">
                {/* Left Panel - Cream/White Background */}
                <div className="for-parents-left">
                    <h2 className="for-parents-heading">For Parents</h2>
                    <p className="for-parents-description">
                        Making the admission experience hassle-free and accessible
                    </p>
                </div>

                {/* Right Panel - Navy Blue Background */}
                <div className="for-parents-right">
                    {/* Cards Container - Positioned to overlap both panels */}
                    <div className="for-parents-cards-container">
                        {parentCards.map((card) => (
                            <a
                                key={card.id}
                                href={card.href}
                                className="for-parents-card"
                            >
                                <div className="for-parents-card-icon">
                                    <card.icon />
                                </div>
                                <p className="for-parents-card-label">{card.label}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom navy border
            <div className="for-parents-bottom-border"></div> */}
        </section>
    );
}
