'use client';
import { useState, useEffect } from 'react';

export default function Testimonials() {
    const [activeTab, setActiveTab] = useState('students');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formType, setFormType] = useState('Suggestion');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        relation: 'Student',
        suggestionCategory: 'Academic',
        suggestionMessage: '',
        grievanceSubject: '',
        grievanceMessage: '',
        rating: '',
        feedbackMessage: ''
    });

    // Testimonial data
    const testimonials = {
        students: [
            {
                text: "Our school provides an excellent environment for learning and personal growth. The teachers are dedicated, approachable, and always encourage students to perform to the best of their abilities. The classrooms are well-maintained, and the overall atmosphere is positive and motivating.",
                name: "Priyasha Roy",
                title: "Class – 9 A",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/image1.avif"
            },
            {
                text: "My name is Eenakshi Bag, and I'm in Class V/A at Firayalal Public School. I just love coming to school every day! My teachers are the best! They are always super kind and patient, even when we don't understand something the first time. They don't shout; they just explain things in a new way until the whole class gets it.",
                name: "Eenakshi Bag",
                title: "Class V/A",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/image2.avif"
            },
            {
                text: "Firayalal Public School has been my home for over 12 years, it was a place that shaped not just my academics, but my character. Serving as Head Boy taught me to lead with empathy and purpose, while years of competitions in various events across the city and state built my confidence and resilience. From scoring 95.6% in Grade 10 to 94% in Grade 12, every milestone here has been a reflection of the guidance and belief this school instilled in me.",
                name: "Aniket Kumar",
                title: "Head Boy (Session 2024-25)",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Aniket.avif"
            },
            {
                text: "I joined the school in 2016, and the journey since then has been nothing short of transformative. From shy beginnings to becoming confident and curious, every year here helped me grow both academically and personally. Those years with countless experiences shaped my character and outlook. I'm proud to have scored 96% in Class 10 and 94% in Class 12.",
                name: "Sahil Raj",
                title: "Former Student",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Sahil-Raj-.avif"
            }
        ],
        parents: [
            {
                text: "Firayalal Public School provides a warm and encouraging atmosphere where students can discover their strengths and learn with confidence. The teachers are experienced, understanding, and always willing to guide students whenever needed. The school takes pride in maintaining discipline and a positive learning environment that helps children focus on both academics and personal growth.",
                name: "Sayantika Roy",
                title: "Mother of Priyasha Roy, Class 9 'A'",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/image3.avif"
            },
            {
                text: "Selecting the ideal educational environment is a formidable responsibility, and in choosing Firayalal Public School (FPS), we are profoundly gratified to have found an institution that consistently exceeds our expectations. FPS is not merely a school; it is a holistic crucible for future leaders. The Management body is distinguished by its foresight, accessibility, and commitment to the school's foundational ethos.",
                name: "Dr. Biplab Bag",
                title: "Father of Ms. Eenakshi Bag, Class V/A",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/image4.avif"
            },
            {
                text: "एक अभिभावक के रूप में, मैं हमेशा चाहता था कि मेरे बच्चे ऐसे विद्यालय में पढ़ें जहाँ शिक्षा के साथ-साथ चरित्र निर्माण पर भी ध्यान दिया जाए। जब मेरे बड़े बेटे ने फ़िरायलाल पब्लिक स्कूल में प्रवेश लिया, तो मैंने उसमें अद्भुत परिवर्तन देखा।",
                name: "बंकिम चन्द्र सेठ",
                title: "Parent",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Bankim.avif"
            },
            {
                text: "मेरा नाम माधवी सिंहा है और मेरे पति का नाम रामरूप सिंह है, हमारे दो बच्चे, सत्यम (कक्षा 12) और सभ्यता (कक्षा 9), वे दोनों फिरायालाल पब्लिक स्कूल में पढ़ते है। जब हमने पहली बार सत्यम के लिए प्रवेश की कोशिश की, तो हमने कई विद्यालय में आवेदन किया था।",
                name: "माधवी सिंहा",
                title: "Parent",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Madhvi-.avif"
            }
        ],
        teachers: [
            {
                text: "Supriti Shekhar, an educator of English at Firayalal Public School, have been associated with this esteemed institution for the past 10 years. Recently, I have been entrusted with the responsibility of Coordinator for Balvatika to Class II. Over the years, I have witnessed the school's remarkable growth, guided by the National Education Policy (NEP).",
                name: "Supriti Shekhar",
                title: "English Teacher",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Supriti-Shekhar.avif"
            },
            {
                text: "I Sanjeev Kumar Shrivastava, have had the privilege of being a part of this esteemed school community since 2009, and it has been an immensely rewarding journey. As a Computer Teacher (PGT) and Head of the Department (Computer), I have witnessed tremendous growth—both professionally and personally.",
                name: "Sanjeev Kumar Shrivastava",
                title: "PGT Comp.Sc (HOD)",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/2.avif"
            },
            {
                text: "Hello everyone. I am Dhruva Saha, PGT English have been rendering my services to this reputed school since 2019 as an english educator. It was my cherished desire to be a dedicated teacher in a renowned school soon after my education. I am privileged to be a part of FPS that values academic excellence, creativity and holistic development.",
                name: "Dhruva Saha",
                title: "HOD English Department",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/7.avif"
            },
            {
                text: "I am Mrs. Sravani Sinha. I am a TGT (Social Science), and I have been associated with Firayalal Public School Ranchi for 19 years. Being part of this school since 2007 has been an extraordinary journey. Every day has brought the joy of guiding young minds, learning alongside passionate colleagues.",
                name: "Shravani Sinha",
                title: "Middle Section Coordinator",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/13.avif"
            },
            {
                text: "Myself Anchan Prasad Keshari, Head of the Social Science Department TGT (Sst) has been associated with Firayalal Public School since 2020. It has been a wonderful journey working within a happy positive environment contributing to the academic growth of the students.",
                name: "Mrs. Anchan Prasad Keshari",
                title: "TGT | Social Science",
                image: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/24.avif"
            }
        ]
    };

    const currentTestimonials = testimonials[activeTab] || [];

    // Auto-slide for testimonials
    useEffect(() => {
        if (activeTab !== 'reviewUs' && currentTestimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % currentTestimonials.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [activeTab, currentTestimonials.length]);

    // Reset slide when tab changes
    useEffect(() => {
        setCurrentSlide(0);
    }, [activeTab]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your submission!');
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            relation: 'Student',
            suggestionCategory: 'Academic',
            suggestionMessage: '',
            grievanceSubject: '',
            grievanceMessage: '',
            rating: '',
            feedbackMessage: ''
        });
    };

    const tabs = [
        { id: 'students', label: 'Students' },
        { id: 'parents', label: 'Parents' },
        { id: 'teachers', label: 'Teachers' },
        { id: 'reviewUs', label: 'Review Us' }
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                {/* Section Title */}
                <h2 className="testimonials-title">Testimonials</h2>

                {/* Main Content Grid */}
                <div className="testimonials-grid">
                    {/* Left Side - Tabs and Content */}
                    <div className="testimonials-left">
                        {/* Tab Navigation */}
                        <div className="testimonials-tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`testimonial-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="testimonials-content">
                            {activeTab !== 'reviewUs' ? (
                                /* Testimonial Carousel */
                                <div className="testimonial-carousel">
                                    {currentTestimonials.length > 0 && (
                                        <div className="testimonial-card">
                                            <div className="testimonial-text">
                                                {currentTestimonials[currentSlide].text}
                                            </div>
                                            <div className="testimonial-author">
                                                <img
                                                    src={currentTestimonials[currentSlide].image}
                                                    alt={currentTestimonials[currentSlide].name}
                                                    className="testimonial-avatar"
                                                />
                                                <div className="testimonial-info">
                                                    <h4 className="testimonial-name">
                                                        {currentTestimonials[currentSlide].name}
                                                    </h4>
                                                    <p className="testimonial-role">
                                                        {currentTestimonials[currentSlide].title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Carousel Dots */}
                                    <div className="carousel-dots">
                                        {currentTestimonials.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                                                onClick={() => setCurrentSlide(index)}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Review Form */
                                <div className="review-form-wrapper">
                                    <h3 className="form-title">Share Your Voice with Firayalal Public School</h3>
                                    <p className="form-subtitle">
                                        Your suggestions, grievances, and feedback help us improve and grow together.
                                    </p>

                                    <form onSubmit={handleSubmit} className="review-form">
                                        {/* Form Type Dropdown */}
                                        <div className="form-group">
                                            <label>I would like to share a</label>
                                            <select
                                                name="formType"
                                                value={formType}
                                                onChange={(e) => setFormType(e.target.value)}
                                            >
                                                <option value="Suggestion">Suggestion</option>
                                                <option value="Grievance">Grievance</option>
                                                <option value="Feedback">Feedback</option>
                                            </select>
                                        </div>

                                        {/* Full Name */}
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleFormChange}
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                placeholder="Enter your email address"
                                                required
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleFormChange}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        {/* Relation to School */}
                                        <div className="form-group">
                                            <label>Relation to School</label>
                                            <select
                                                name="relation"
                                                value={formData.relation}
                                                onChange={handleFormChange}
                                            >
                                                <option value="Student">Student</option>
                                                <option value="Parent">Parent</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Staff">Staff</option>
                                                <option value="Visitor">Visitor</option>
                                            </select>
                                        </div>

                                        {/* Conditional Fields - Suggestion */}
                                        {formType === 'Suggestion' && (
                                            <>
                                                <div className="form-group">
                                                    <label>Suggestion Category</label>
                                                    <select
                                                        name="suggestionCategory"
                                                        value={formData.suggestionCategory}
                                                        onChange={handleFormChange}
                                                    >
                                                        <option value="Academic">Academic</option>
                                                        <option value="Infrastructure">Infrastructure</option>
                                                        <option value="Activities">Activities</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Your Suggestion</label>
                                                    <textarea
                                                        name="suggestionMessage"
                                                        value={formData.suggestionMessage}
                                                        onChange={handleFormChange}
                                                        placeholder="Share your valuable suggestion..."
                                                        rows="5"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* Conditional Fields - Grievance */}
                                        {formType === 'Grievance' && (
                                            <>
                                                <div className="form-group">
                                                    <label>Subject of Grievance</label>
                                                    <input
                                                        type="text"
                                                        name="grievanceSubject"
                                                        value={formData.grievanceSubject}
                                                        onChange={handleFormChange}
                                                        placeholder="Mention subject of your grievance"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Describe Your Concern</label>
                                                    <textarea
                                                        name="grievanceMessage"
                                                        value={formData.grievanceMessage}
                                                        onChange={handleFormChange}
                                                        placeholder="Please describe your grievance in detail..."
                                                        rows="5"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* Conditional Fields - Feedback */}
                                        {formType === 'Feedback' && (
                                            <>
                                                <div className="form-group">
                                                    <label>Rate Your Experience</label>
                                                    <div className="rating-options">
                                                        {['⭐️ Excellent', '😊 Good', '😐 Average', '🙁 Poor'].map((option) => (
                                                            <label key={option} className="rating-label">
                                                                <input
                                                                    type="radio"
                                                                    name="rating"
                                                                    value={option}
                                                                    checked={formData.rating === option}
                                                                    onChange={handleFormChange}
                                                                />
                                                                <span>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Your Feedback</label>
                                                    <textarea
                                                        name="feedbackMessage"
                                                        value={formData.feedbackMessage}
                                                        onChange={handleFormChange}
                                                        placeholder="Share your feedback here..."
                                                        rows="5"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <button type="submit" className="submit-btn">
                                            Submit Response
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Quote and Vice Principal */}
                    <div className="testimonials-right">
                        <div className="quote-card">
                            <p className="quote-text">
                                "Education is the key to unlocking the potential within each student.
                                At F.P.S., we build character and inspire a lifelong love for learning."
                            </p>
                            <div className="quote-author">
                                <div className="quote-avatar-wrapper">
                                    <img
                                        src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-14.avif"
                                        alt="Mrs. Haneet Munjal"
                                        className="quote-avatar"
                                    />
                                </div>
                                <h4 className="quote-name">Mrs. Haneet Munjal</h4>
                                <p className="quote-role">Vice Principal | Firayalal Public School</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
