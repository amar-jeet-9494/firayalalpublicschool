'use client';

import { useState } from 'react';

export default function Footer() {
    const [showPopup, setShowPopup] = useState(false);

    const handleExistingParent = () => {
        window.location.href = "https://epfuture.in";
    };

    const handleNewUser = () => {
        setShowPopup(false);
        window.location.href = "https://firayalalpublicschool.edu.in/";
    };

    return (
        <footer className="footer-section">
            {/* Top Bar - Logo, Address, Contact */}
            <div className="footer-top">
                <div className="footer-top-container">
                    {/* Left - Logo & School Info */}
                    <div className="footer-logo-section">
                        <a href="https://firayalalpublicschool.edu.in/" className="footer-logo-link">
                            <img
                                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/3-3-1024x341.avif"
                                alt="Firayalal Public School"
                                className="footer-logo-img"
                            />
                        </a>
                    </div>

                    {/* Center - Address & Social */}
                    <div className="footer-address-section">
                        <div className="footer-address">
                            <a href="https://maps.app.goo.gl/nnboBBPmSLaoCADQ7" target="_blank" rel="noopener noreferrer" className="footer-address-link">
                                <span className="footer-icon-box">📍</span>
                                <span className="footer-address-text">5, Main Road, Near Railway Overbridge Ranchi- 834001 (Jharkhand)</span>
                            </a>
                        </div>
                        <div className="footer-social-icons">
                            <a href="https://www.facebook.com/firayalalpublicschool/" target="_blank" rel="noopener noreferrer" className="footer-social-icon facebook">
                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/firayalalpublicschool/" target="_blank" rel="noopener noreferrer" className="footer-social-icon instagram">
                                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/108764003/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-icon linkedin">
                                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@FirayalalPublicSchoolRanchi" target="_blank" rel="noopener noreferrer" className="footer-social-icon youtube">
                                <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
                            </a>
                            <a href="https://x.com/FirayalalPS" target="_blank" rel="noopener noreferrer" className="footer-social-icon twitter">
                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Right - Contact Info */}
                    <div className="footer-contact-section">
                        <a href="tel:080-65912099" className="footer-contact-item">
                            <span className="footer-contact-icon">📞</span>
                            <span>080-65912099</span>
                        </a>
                        <a href="tel:18008900209" className="footer-contact-item">
                            <span className="footer-contact-icon">📞</span>
                            <span>1800-8900-209</span>
                        </a>
                        <a href="https://wa.me/9264431217" className="footer-contact-item whatsapp">
                            <span className="footer-contact-icon">💬</span>
                            <span>+91-9264431217</span>
                        </a>
                        <a href="mailto:info@firayalalpublicschool.edu.in" className="footer-contact-item">
                            <span className="footer-contact-icon">✉️</span>
                            <span>info@firayalalpublicschool.edu.in</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="footer-main">
                <div className="footer-main-container">
                    {/* About F.P.S. Column */}
                    <div className="footer-column">
                        <h2 className="footer-column-title">About F.P.S.</h2>
                        <ul className="footer-nav-list">
                            <li><a href="https://firayalalpublicschool.edu.in/school-overview/">School Overview</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/achievements/">Achievements</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/feedback-and-suggestions/">Feedback and Suggestions</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/get-in-touch/">Get In Touch</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/photo-gallery/">Photo Gallery</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-leaders/">School Leaders</a></li>
                        </ul>
                        <button className="footer-epfuture-btn" onClick={() => setShowPopup(true)}>
                            🎓 Access EpFuture
                        </button>
                    </div>

                    {/* Admission Column */}
                    <div className="footer-column">
                        <h2 className="footer-column-title">Admission</h2>
                        <ul className="footer-nav-list">
                            <li><a href="/admission-process">Admission Process</a></li>
                            <li><a href="/foundational-stage">Foundational Stage | Balvatika II (Earlier referred as Nursery) to Grade II</a></li>
                            <li><a href="/elementary-stage/">Elementary Stage | Grade III to V</a></li>
                            <li><a href="/middle-stage/">Middle Stage | Grade VI to VIII</a></li>
                            <li><a href="/secondary-stage/">Secondary Stage | Grade IX and XI</a></li>
                            <li><a href="/fee-structure/">Fee Structure</a></li>
                            <li><a href="/withdrawal/">Withdrawal Norms</a></li>
                        </ul>
                    </div>

                    {/* Academics Column */}
                    <div className="footer-column">
                        <h2 className="footer-column-title">Academics</h2>
                        <ul className="footer-nav-list">
                            <li><a href="https://firayalalpublicschool.edu.in/curriculum/">Curriculum</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/faculty/">Faculty</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/results/">Academic Results</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/achievements/">Achievements</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/class-wise-enrollment/">Class wise Enrollment</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/book-list/">Book List</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/academic-calendar/">Academic Calendar</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/fps-assesment-plan/">FPS ASSESSMENT PLAN</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/annual-sports/">Annual Sports</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/house-systems/">House Systems</a></li>
                        </ul>
                    </div>

                    {/* Infrastructure Column */}
                    <div className="footer-column">
                        <h2 className="footer-column-title">Infrastructure</h2>
                        <ul className="footer-nav-list">
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/">Smart Class Rooms</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/">Laboratories</a></li>
                            <li><a href="#">Library</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/">Music, Arts & Craft</a></li>
                            <li><a href="#">Conference Room</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/#reception">Reception</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/#sports">Sports Facilities</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/#medical">Medical & First Aid Room</a></li>
                            <li><a href="https://firayalalpublicschool.edu.in/school-infrastructure/#safety">Safety & Security</a></li>
                            <li><a href="#">Green Campus</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="footer-copyright">© Firayalal Public School 2025. All Right Reserved</p>
                    <p className="footer-powered">
                        Powered By <a href="http://www.globalwebify.com/" target="_blank" rel="noopener noreferrer">Global Webify</a>
                    </p>
                </div>
            </div>

            {/* EpFuture Popup */}
            {showPopup && (
                <div className="fps-popup-overlay fps-open" onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}>
                    <div className="fps-popup">
                        <div className="fps-popup-ribbon">
                            <span className="fps-school-badge">Firayalal Public School</span>
                            <span className="fps-ribbon-pill">Session 2025–26 Admissions & Parent Login</span>
                        </div>
                        <button className="fps-popup-close" onClick={() => setShowPopup(false)}>✕</button>
                        <div className="fps-popup-body">
                            <div className="fps-popup-header">
                                <div className="fps-popup-icon">📚</div>
                                <div>
                                    <h2>How would you like to continue?</h2>
                                    <p>Choose the option that best describes you to proceed to the correct portal.</p>
                                </div>
                            </div>
                            <div className="fps-popup-options">
                                <button className="fps-option-card fps-existing" onClick={handleExistingParent}>
                                    <div className="fps-option-badge">Existing</div>
                                    <h3>Existing Student / Parent</h3>
                                    <p>Already part of Firayalal Public School? Continue to your Parent Login.</p>
                                    <div className="fps-option-footer">
                                        <span>Go to Parent Login</span>
                                        <span className="fps-arrow">→</span>
                                    </div>
                                </button>
                                <button className="fps-option-card fps-new" onClick={handleNewUser}>
                                    <div className="fps-option-badge fps-option-badge-new">New</div>
                                    <h3>New Admission / Enquiry</h3>
                                    <p>Looking to join Firayalal Public School? Start from our main website.</p>
                                    <div className="fps-option-footer">
                                        <span>Visit School Website</span>
                                        <span className="fps-arrow">→</span>
                                    </div>
                                </button>
                            </div>
                            <p className="fps-popup-note">
                                Not sure where to go? Start with <strong>New Admission / Enquiry</strong> and explore more.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
