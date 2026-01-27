'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './school-overview.css';

export default function SchoolOverviewPage() {
    return (
        <div className="school-overview-container">
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="overview-hero-section">
                <div className="overview-hero-overlay"></div>
                
                <div className="overview-hero-content">
                    <div className="elementor-widget-heading">
                        <h1 className="overview-hero-title">School Overview</h1>
                    </div>
                    <div className="elementor-widget-heading">
                        <h2 className="overview-hero-subtitle">
                            Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                        </h2>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="overview-main-content">
                <div className="overview-content-wrapper">
                    
                    {/* About Section */}
                    <div className="elementor-element-d31f2d5">
                        <div className="elementor-element-2210aa9">
                            <h2>About Firayalal Public School</h2>
                            <p>
                                <strong>Firayalal Public School (F.P.S.)</strong> is a co-educational <strong>CBSE-affiliated institution</strong> in Ranchi, offering quality education from <strong>Bal Vatika II (Earlier-Nursery) to Class XII</strong>. Founded in the year 1998 by <strong>Shri Harish Munjal</strong> and established under the aegis of <strong>Ajay Munjal Memorial Trust</strong>, the school upholds a legacy of developing character, confidence, and leadership among learners.
                            </p>
                            <p>
                                Over the past <strong>25 years</strong>, F.P.S. has evolved from a humble beginning into one among the <strong>Top CBSE Schools in Ranchi</strong>, known for its academic excellence, discipline, and holistic development. The school provides a <strong>peaceful and inclusive learning environment</strong> in the heart of the city, fostering curiosity, collaboration, and creativity in alignment with the <strong>National Education Policy (NEP) 2020</strong>.
                            </p>
                        </div>
                        <div className="elementor-element-5843f44"></div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="fps-mission-container">
                        <h2>OUR VISION & MISSION</h2>
                        <ul>
                            <li>To ensure that each student receives individual attention, which is possible only in a school environment that gives importance to quality over quantity.</li>
                            <li>To create a vibrant and inspiring educational institution.</li>
                            <li>To ensure inclusivity, fostering a sense of belonging and motivation, ensuring holistic development.</li>
                            <li>To foster an environment where students interact freely and learn collaboratively.</li>
                            <li>To help students develop their individuality, promoting curiosity to learn, build confidence and develop empathy.</li>
                            <li>To shape students to be academically proficient, socially responsible, culturally aware, and ready to contribute positively to society at large.</li>
                            <li>To instill creativity, critical thinking, and social responsibility in students.</li>
                            <li>To provide students with skills for life, ethical values and a sense of self-esteem to pursue their goals.</li>
                        </ul>
                    </div>

                    {/* Feature Cards Row */}
                    <div className="fps-cards-row">
                        <div className="fps-info-card card-purple">
                            <h3>Comprehensive Education</h3>
                            <p>A focus on achieving equal weightage on academics in school and co-curricular activities so that the overall development of the student happens.</p>
                        </div>
                        <div className="fps-info-card card-cyan">
                            <h3>All Inclusive Participation</h3>
                            <p>All children must participate in group activities and interact with their peers while still being themselves.</p>
                        </div>
                        <div className="fps-info-card card-green">
                            <h3>Self-Discipline</h3>
                            <p>Children must practice self-discipline to grow into responsible, ethically minded individuals with a sense of confidence in themselves.</p>
                        </div>
                    </div>

                    {/* What Makes Us Different Section */}
                    <div className="fps-differentiation-section">
                        {/* Left Content Box */}
                        <div className="fps-diff-content">
                            <h2>WHAT MAKES FIRAYALAL PUBLIC SCHOOL DIFFERENT FROM OTHER SCHOOLS?</h2>
                            <ol>
                                <li>We foster an inclusive environment based on research, counseling and promote personalized attention.</li>
                                <li>We blend academic excellence with vocational training and SkillVantage classes, preparing students for both higher education and real-world careers.</li>
                                <li>With reasonable strength of students in each class, teachers focus better on every learner, ensuring personal attention and meaningful progress.</li>
                                <li>Regular field trips and experiential learning activities expand classroom learning into real-life understanding and discovery.</li>
                                <li>Our inclusive education system supports learners of all abilities, with digital classrooms and counselling services that address the emotional and intellectual needs of students in this age of information and notifications.</li>
                                <li>The Joyful Noise room, a specialized activity zone for the foundational stage, nurtures early learning in line with the goals of Foundational Literacy and Numeracy (FLN).</li>
                                <li>Through individual exposure and mentorship, leadership skills develop naturally, strengthened by close parental involvement and an active alumni network that keeps the Firayalal community connected.</li>
                            </ol>
                        </div>

                        {/* Right Image Collage */}
                        <div className="fps-diff-images">
                            <div className="diff-img-large">
                                <img src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-06-150237.avif" alt="Playground Activity" />
                            </div>
                            <div className="diff-img-column">
                                <div className="diff-img-small">
                                    <img src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/14.avif" alt="Student Reading" />
                                </div>
                                <div className="diff-img-small">
                                    <img src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/6-1.avif" alt="Classroom Learning" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* School Profile Grid Section */}
                    <div className="fps-profile-grid-section">
                        {/* Card 1: School Profile (Light) */}
                        <div className="fps-profile-card card-light">
                            <h2>SCHOOL PROFILE</h2>
                            <p><strong>Age of Students:</strong> 4 – 18 years</p>
                            <p><strong>Total Number of Students:</strong> 1,250</p>
                            <p><strong>Typical Class Size:</strong> 35 – 40 students</p>
                            <p><strong>Student–Teacher Ratio:</strong> 25:1</p>
                        </div>

                        {/* Card 2: Academics & Faculty (Dark) */}
                        <div className="fps-profile-card card-dark">
                            <h2>ACADEMICS & FACULTY</h2>
                            <ul>
                                <li><strong>Curriculum aligned with NEP 2020.</strong></li>
                                <li><strong>Trained Academic and Co-Curricular Faculties with over 15 years of experience.</strong></li>
                            </ul>
                        </div>

                        {/* Card 3: General Information (Dark) */}
                        <div className="fps-profile-card card-dark">
                            <h2>GENERAL INFORMATION</h2>
                            <p><strong>Gender Ratio:</strong> 60% Boys | 40% Girls</p>
                            <p><strong>Number of Sports Offered:</strong> 8</p>
                            <p><strong>Number of Activity-Based Academics:</strong> 20</p>
                        </div>

                        {/* Card 4: Infrastructure & Facilities (Dark) */}
                        <div className="fps-profile-card card-dark">
                            <h2>INFRASTRUCTURE & FACILITIES</h2>
                            <p><strong>Number of School Buses:</strong> 7</p>
                            <p><strong>Number of Workshops conducted on regular basis:</strong> 5</p>
                            <p><strong>Total Solar Electrification:</strong> 33 KW</p>
                        </div>
                    </div>

                    {/* School Timing Section */}
                    <div className="school-timing-section">
                        <h2>SCHOOL TIMING</h2>
                        <div className="timing-subtitle">Academic Year – April to March</div>
                        
                        <ul className="timing-list">
                            <li>
                                <strong>School Timings:</strong> For students, school hours are from <strong>7:30 AM to 1:20 PM</strong> during both summer and winter sessions.
                            </li>
                            <li>
                                <strong>SkillVantage Days:</strong> Presence of departmental and co-scholastic teachers, along with visiting faculty, is mandatory.
                            </li>
                            <li>
                                Co-scholastic teachers will not be granted leave on SkillVantage Days. In case of an emergency, duty teachers may mutually exchange their duties with another teacher after emailing their respective HODs and obtaining approval from both HODs, followed by approval from section in-charges and the Principal.
                            </li>
                            <li>
                                Departmental meetings to be conducted by HODs for <strong>45 minutes</strong> — from <strong>10:45 AM to 11:30 AM (Summer)</strong> and <strong>11:45 AM to 12:30 PM (Winter)</strong>.
                            </li>
                            <li>
                                All teachers, except co-scholastic teachers, are required to remain in school for corrections, meetings, etc. on <strong>Mondays, Wednesdays, and Fridays</strong> from <strong>1:15 PM to 2:15 PM (Summer)</strong> and <strong>2:15 PM to 3:15 PM (Winter)</strong>.
                            </li>
                            <li>
                                Each teacher must complete <strong>3 training days before 30th September 2025</strong> and the remaining <strong>2 training days between October 2025 and January 2026</strong>. Teachers are responsible for registering for COE-CBSE approved training programs.
                            </li>
                            <li>
                                Before scheduling any training, teachers must ensure that they do not miss any <strong>SkillVantage Duty Days</strong>, <strong>Educator Meet Days</strong>, or <strong>Compulsory Saturday Working Days</strong>.
                            </li>
                        </ul>

                        <div className="timing-note-box">
                            <div className="note-icon">🔔</div>
                            <div className="note-content">
                                <p><strong>Note :</strong> All students who arrive late between 7:30 am to 7:45 am will be marked late in the register at the School Gate by attendance duty teachers.</p>
                                <p><strong>Note 2:</strong> All children will be sent back home who arrive after 7:35 am.</p>
                            </div>
                        </div>

                        <div className="timing-table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Summer Timing</th>
                                        <th>Winter Timing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Announcement for dispersal</td>
                                        <td>1:15 PM</td>
                                        <td>1:15 PM</td>
                                    </tr>
                                    <tr>
                                        <td>Buses leave by</td>
                                        <td>1:20 PM</td>
                                        <td>1:20 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
