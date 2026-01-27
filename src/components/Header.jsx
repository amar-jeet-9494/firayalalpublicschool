'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ isTransparent = false }) {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    // Mega Menu Data - Exact content from reference image
    const megaMenuItems = {
        'ABOUT FPS': [
            { name: 'School Overview', href: '/school-overview' },
            { name: 'Achievements', href: '/achievements' },
            { name: 'Feedback and Suggestions', href: '/feedback-and-suggestions' },
            { name: 'Get In Touch', href: '/get-in-touch' },
            { name: 'Photo Gallery', href: '/gallery' },
            { name: 'School Leaders', href: '/school-leaders' },
        ],
        'ADMISSION': [
            { name: 'Admission Process', href: '/admission-process' },
            { name: 'Foundational Stage | Balvatika II (Earlier referred as Nursery) to Grade II', href: '/foundational-stage' },
            { name: 'Elementary Stage | Grade III to V', href: '/elementary-stage' },
            { name: 'Middle Stage | Grade VI to VIII', href: '/middle-stage' },
            { name: 'Secondary Stage | Grade IX and XI', href: '/secondary-stage' },
            { name: 'Fee Structure', href: '/fee-structure' },
            { name: 'Withdrawal Norms', href: '/withdrawal' },
        ],
        'ACADEMICS': [
            { name: 'Curriculum', href: '/curriculum' },
            { name: 'Faculty', href: '/faculty' },
            { name: 'Academic Results', href: '/results' },
            { name: 'Achievements', href: '/academic-achievements' },
            { name: 'Class wise Enrollment', href: '/class-wise-enrollment' },
            { name: 'Book List', href: '/book-list' },
            { name: 'Academic Calendar', href: '/academic-calendar' },
            { name: 'FPS ASSESSMENT PLAN', href: '/academics/assessment' },
            { name: 'Annual Sports', href: '/academics/sports' },
            { name: 'House Systems', href: '/academics/house-systems' },
        ],
        'SCHOOL INFRASTRUCTURE': [
            { name: 'Smart Class Rooms', href: '/infrastructure/smart-class' },
            { name: 'Laboratories', href: '/infrastructure/labs' },
            { name: 'Library', href: '/infrastructure/library' },
            { name: 'Music, Arts & Craft', href: '/infrastructure/arts' },
            { name: 'Conference Room', href: '/infrastructure/conference' },
            { name: 'Reception', href: '/infrastructure/reception' },
            { name: 'Sports Facilities', href: '/infrastructure/sports' },
            { name: 'Medical & First Aid Room', href: '/infrastructure/medical' },
            { name: 'Safety & Security', href: '/infrastructure/safety' },
            { name: 'Green Campus', href: '/infrastructure/green-campus' },
        ],
    };

    // Header background style based on isTransparent prop
    const headerBgClass = isTransparent
        ? 'bg-transparent'
        : 'bg-[#fff]';

    const headerPositionClass = isTransparent
        ? 'absolute top-0 left-0 right-0 z-50'
        : 'relative';


    const headerLogoClass = isTransparent
        ? '/1-3 (1).avif'
        : '/2-5.avif';
    // Divider and text color based on background
    const dividerColor = isTransparent ? 'bg-black' : 'bg-white/30';
    const hamburgerColor = isTransparent ? 'bg-black' : 'bg-white';

    return (
        <>
            <header className={`${headerPositionClass} ${headerBgClass}`}>
                <div className="w-full">
                    <div className="max-w-7xl mx-auto flex items-center justify-between h-[110px] px-4">

                        {/* LEFT - LOGO ONLY */}
                        <div className="flex items-center gap-4 flex-none">
                            <Link href="/" className="flex items-center">
                                <div className="relative block shrink-0 w-[285px] h-[95px] -mt-6">
                                    <Image
                                        src={headerLogoClass}
                                        alt="Firayalal Public School Logo"
                                        className="object-contain drop-shadow-md"
                                        fill
                                        priority
                                    />
                                </div>
                            </Link>

                            {/* DIVIDER AFTER LOGO */}
                            <div className={`hidden lg:block w-px h-25 ${dividerColor}`}></div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="flex items-center justify-end gap-4">

                            {/* DESKTOP NAV */}
                            <nav className="hidden lg:flex items-center gap-4">

                                {/* MENU BUTTON */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                                        className="flex items-center gap-2 bg-[#FFC107] text-gray-900 px-7 py-3 rounded-xl font-semibold text-sm shadow-md hover:bg-[#e6aa00] transition-all"
                                    >
                                        MENU
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* ACCESS EPFUTURE */}
                                <button className="bg-[#FFC107] text-gray-900 px-8 py-3 rounded-xl font-semibold text-sm shadow-md hover:bg-[#e6aa00] transition-all">
                                    ACCESS EPFUTURE
                                </button>
                            </nav>

                            {/* DIVIDER */}
                            <div className={`hidden lg:block w-px h-10 ${dividerColor}`}></div>

                            {/* SOCIAL ICONS */}
                            <div className="hidden lg:flex items-center gap-2">
                                {/* Facebook */}
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>

                                {/* YouTube */}
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                                    aria-label="YouTube"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>

                                {/* X (Twitter) */}
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#14171A] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                                    aria-label="X (Twitter)"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>

                            {/* MOBILE MENU */}
                            <button className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-black/10 transition">
                                <span className={`w-7 h-[3px] ${hamburgerColor} rounded`}></span>
                                <span className={`w-7 h-[3px] ${hamburgerColor} rounded`}></span>
                                <span className={`w-7 h-[3px] ${hamburgerColor} rounded`}></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* HR at bottom of header */}
                <hr className={`border-1 h-[0px] ${isTransparent ? 'bg-black' : 'bg-white/20'}`} />

                {/* Professional Mega Menu Dropdown - Inside header for scroll-with-page */}
                {isMegaMenuOpen && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-screen max-w-[1200px] mega-menu-container shadow-xl border-t-4 border-[#0B2C54] z-40"
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                        {/* Mega Menu Grid */}
                        <div className="mega-menu">
                            {Object.entries(megaMenuItems).map(([category, items]) => (
                                <div key={category} className="menu-column">
                                    {/* Category Header */}
                                    <h3>{category}</h3>

                                    {/* List with Shadow Box */}
                                    <ul>
                                        {items.map((item) => (
                                            <li key={item.name}>
                                                <Link href={item.href}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
