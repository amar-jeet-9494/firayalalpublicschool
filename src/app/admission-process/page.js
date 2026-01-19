'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import Image from 'next/image';
import BusTrackingAdmission from '@/components/BusTrackingAdmission';
import AdmissionJourneySection from '@/components/AdmissionJourneySection';
import SchoolTransportSection from '@/components/SchoolTransportSection';
import TransportInchargeSection from '@/components/TransportInchargeSection';
import FoundationalStageSection from '@/components/FoundationalStageSection';

export default function AdmissionProcessPage() {
    // Form state
    const [formData, setFormData] = useState({
        studentName: '',
        admissionClass: '',
        parentName: '',
        relationship: '',
        email: '',
        phone: '',
        address: '',
        visitDate: '',
        visitTime: '',
        sourceOfEnquiry: '',
        parentType: '',
        childName: '',
        parentOld: '',
        message: ''
    });

    // Counter animation states
    const [counters, setCounters] = useState({
        students: 0,
        teachers: 0,
        years: 0,
        excellence: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef(null);

    // Class options
    const classOptions = [
        'Bal Vatika II (Earlier Nursery)',
        'Bal Vatika III (Prep)',
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 11'
    ];

    const relationshipOptions = ['Father', 'Mother', 'Guardian', 'Other'];
    const timeSlotOptions = ['08:00 AM – 10:00 AM', '10:00 AM – 12:00 PM'];
    const sourceOptions = [
        'Facebook', 'Instagram', 'Social Media (Other)', 'Word of Mouth',
        'Print Media', 'Advertisement', 'Nearby Location', 'Parent Referral',
        'Alumini Referral', 'Walk-in', 'Others'
    ];
    const parentTypeOptions = ['Existing Parent', 'Old Parent'];

    // Counter animation effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounters = () => {
        const duration = 2000;
        const targets = { students: 6000, teachers: 60, years: 27, excellence: 100 };
        const start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounters({
                students: Math.floor(targets.students * easeOut),
                teachers: Math.floor(targets.teachers * easeOut),
                years: Math.floor(targets.years * easeOut),
                excellence: Math.floor(targets.excellence * easeOut)
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your enquiry! We will contact you soon.');
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            {/* Header with solid background for inner pages */}
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section - Matching Reference Exactly */}
            <section className="admission-hero breadcrumb-animated">
                <div className="admission-hero-inner">
                    <h1 className="admission-title">Admission Process</h1>
                    <h2 className="admission-tagline">
                        Firayalal Public School is a reputed institution where a team of well-trained educators shape your child's learning aligned with NEP 2020, for a lifetime !
                    </h2>
                </div>
            </section>

            {/* Stats & Form Section - Overlapping Hero */}
            <section className="admission-stats-form-section">
                <div className="admission-stats-form-container">
                    {/* Left Column - Stats */}
                    <div className="admission-stats-column">
                        {/* Silver Jubilee Banner */}
                        <div className="silver-jubilee-banner">
                            <Image
                                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Silver.avif"
                                alt="25 Years of Excellence - Silver Jubilee"
                                width={800}
                                height={300}
                                className="jubilee-image"
                            />
                        </div>

                        {/* Counter Stats Grid */}
                        <div className="stats-grid" ref={statsRef}>
                            <div className="stat-card">
                                <div className="stat-number blue">{counters.students.toLocaleString()}+</div>
                                <div className="stat-title">Students Enrolled</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number blue">{counters.teachers}+</div>
                                <div className="stat-title">Qualified Teachers</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number blue">{counters.years}+</div>
                                <div className="stat-title">Years of Excellence</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number yellow">{counters.excellence}%</div>
                                <div className="stat-title">Academic Excellence</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Enquiry Form */}
                    <div className="admission-form-column">
                        <div className="enquiry-form-card">
                            <h3 className="form-title">Admission Enquiry Form</h3>

                            <form onSubmit={handleSubmit} className="enquiry-form">
                                {/* Row 1: Student Name & Class */}
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>Student Name *</label>
                                        <input
                                            type="text"
                                            name="studentName"
                                            placeholder="Enter Student's Full Name"
                                            value={formData.studentName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Class for Admission *</label>
                                        <select
                                            name="admissionClass"
                                            value={formData.admissionClass}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">—Please choose an option—</option>
                                            {classOptions.map(cls => (
                                                <option key={cls} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Row 2: Parent Name & Relationship */}
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>Parent's Name *</label>
                                        <input
                                            type="text"
                                            name="parentName"
                                            placeholder="Enter Parent's Full Name"
                                            value={formData.parentName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Relationship *</label>
                                        <select
                                            name="relationship"
                                            value={formData.relationship}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">—Please choose an option—</option>
                                            {relationshipOptions.map(rel => (
                                                <option key={rel} value={rel}>{rel}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Row 3: Email & Phone */}
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>Email ID *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Mobile Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter Mobile Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Full Width: Address */}
                                <div className="form-field full-width">
                                    <label>Residential Address</label>
                                    <textarea
                                        name="address"
                                        placeholder="Enter Address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Row 4: Visit Date & Time */}
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>Visit Date *</label>
                                        <input
                                            type="date"
                                            name="visitDate"
                                            min={today}
                                            value={formData.visitDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Time Slot *</label>
                                        <select
                                            name="visitTime"
                                            value={formData.visitTime}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">—Please choose an option—</option>
                                            {timeSlotOptions.map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Full Width: Source of Enquiry */}
                                <div className="form-field full-width">
                                    <label>Source of Enquiry *</label>
                                    <select
                                        name="sourceOfEnquiry"
                                        value={formData.sourceOfEnquiry}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">—Please choose an option—</option>
                                        {sourceOptions.map(src => (
                                            <option key={src} value={src}>{src}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Conditional: Parent Referral Options */}
                                {formData.sourceOfEnquiry === 'Parent Referral' && (
                                    <div className="form-field full-width">
                                        <label>Select Parent Type *</label>
                                        <select
                                            name="parentType"
                                            value={formData.parentType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">—Please choose an option—</option>
                                            {parentTypeOptions.map(pt => (
                                                <option key={pt} value={pt}>{pt}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Conditional: Existing Parent - Child Name */}
                                {formData.parentType === 'Existing Parent' && (
                                    <div className="form-field full-width">
                                        <label>Name of Child *</label>
                                        <input
                                            type="text"
                                            name="childName"
                                            placeholder="Enter Child Name"
                                            value={formData.childName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Conditional: Old Parent - Parent Name */}
                                {formData.parentType === 'Old Parent' && (
                                    <div className="form-field full-width">
                                        <label>Name of Parent *</label>
                                        <input
                                            type="text"
                                            name="parentOld"
                                            placeholder="Enter Parent's Name"
                                            value={formData.parentOld}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Full Width: Additional Message */}
                                <div className="form-field full-width">
                                    <label>Additional Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Any additional details"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="form-submit">
                                    <button type="submit" className="submit-btn">
                                        Submit Enquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Start Your Admission Journey Section */}
            <AdmissionJourneySection />

            {/* School Transport Section */}
            <SchoolTransportSection />

            {/* Transport Incharge Section */}
            <TransportInchargeSection />
            
            {/* Bus Tracking & Admission Section */}
            <BusTrackingAdmission />
        
            {/* Footer */}
            <Footer />
        </>
    );
}
