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

    const [testimonialsData, setTestimonialsData] = useState({
        students: [],
        parents: [],
        teachers: []
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch testimonials
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('/api/testimonials');
                const result = await res.json();
                if (result.data) {
                    const grouped = {
                        students: result.data.filter(t => t.category === 'Student'),
                        parents: result.data.filter(t => t.category === 'Parent'),
                        teachers: result.data.filter(t => t.category === 'Teacher')
                    };
                    setTestimonialsData(grouped);
                }
            } catch (error) {
                console.error('Failed to fetch testimonials', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const currentTestimonials = testimonialsData[activeTab] || [];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                role: formData.relation === 'Student' ? 'Student' : formData.relation, // Store relation as role for now
                category: formData.relation, // Use relation as category
                message: formType === 'Suggestion' ? formData.suggestionMessage :
                    formType === 'Grievance' ? formData.grievanceMessage :
                        formData.feedbackMessage,
                rating: formData.rating,
                submission_type: formType
            };

            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('Thank you! Your response has been submitted for review.');
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
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
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
                                                "{currentTestimonials[currentSlide].message}"
                                            </div>
                                            <div className="testimonial-author">
                                                <img
                                                    src={currentTestimonials[currentSlide].image_url || "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/image1.avif"}
                                                    alt={currentTestimonials[currentSlide].name}
                                                    className="testimonial-avatar object-cover"
                                                />
                                                <div className="testimonial-info">
                                                    <h4 className="testimonial-name">
                                                        {currentTestimonials[currentSlide].name}
                                                    </h4>
                                                    <p className="testimonial-role">
                                                        {currentTestimonials[currentSlide].role || currentTestimonials[currentSlide].category}
                                                    </p>
                                                    {currentTestimonials[currentSlide].rating && (
                                                        <p className="text-yellow-500 text-xs mt-1">{currentTestimonials[currentSlide].rating}</p>
                                                    )}
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

                                        <button type="submit" className="submit-btn" disabled={submitting}>
                                            {submitting ? 'Submitting...' : 'Submit Response'}
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
