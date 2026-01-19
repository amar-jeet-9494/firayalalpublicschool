'use client';

import { useState } from 'react';

export default function SchoolTransportSection() {
    const [openAccordion, setOpenAccordion] = useState(0); // First item open by default

    const accordionItems = [
        {
            title: 'Bus Stops and Routes',
            content: [
                'Students will be picked up and dropped off <strong>only at the designated stops</strong> approved by the school for safety and operational efficiency.',
                'While the school strives to offer maximum coverage, <strong>requests for changes in routes or stops based on individual convenience cannot be accommodated</strong>.',
                'A complete list of <a href="#incharge">bus routes</a>, designated stops, and indicative timings is made available on the <strong>School Office Notice Board</strong> and may be updated as needed.',
                'Parents wishing to avail the <strong>School Transport Facility</strong> are requested to review the available routes and choose the most suitable stop while filling out the transport requisition form at the <strong>School Office</strong>.'
            ]
        },
        {
            title: 'Transport Rules and Fee Policy',
            content: [
                'The <strong>school transport facility is available only for both ways</strong> (home to school and school to home). <em>One-way transport requests cannot be accommodated.</em>',
                'The <strong>transport fee</strong> must be paid regularly <strong>along with the school fee</strong>, between the <strong>1st and 15th of every month</strong> on all working days.',
                'In case the <strong>transport fee remains unpaid for two consecutive months</strong>, the student\'s transport facility will be <strong>temporarily suspended</strong>, and the seat may be <strong>allocated to another student</strong> on the waiting list.',
                'Transport fees are applicable for <strong>11 months of the academic year</strong>, irrespective of usage breaks or vacations.'
            ]
        },
        {
            title: 'Temporary Suspension of Service',
            content: [
                'In the event of <strong>public disturbances, adverse weather, or other unforeseen circumstances</strong>, parents may be required to make their <strong>own arrangements</strong> to drop and collect their wards safely from school.',
                'The school seeks the <strong>understanding and cooperation of parents</strong> in situations where <strong>transport services are delayed or disrupted</strong> due to <strong>vehicle breakdowns, traffic issues, or factors beyond the school\'s control</strong>.',
                'During such instances, parents are requested to <strong>arrange alternate transportation</strong> for their children to ensure their safety and timely attendance.'
            ]
        },
        {
            title: 'Conduct and Discipline',
            content: [
                '<strong>Eating, drinking, or littering</strong> inside or outside the bus is <strong>strictly prohibited</strong> to maintain cleanliness and hygiene.',
                '<strong>Indisciplined behaviour</strong>, including <strong>shouting, fighting, or causing disturbance</strong>, will not be tolerated under any circumstances.',
                'Students are expected to <strong>maintain polite and courteous conduct</strong> throughout the journey.',
                '<strong>Drivers must not be distracted</strong> while driving; students should remain seated and quiet to ensure safety.',
                'The <strong>Bus In-Charge (Teachers on bus duty)</strong> is responsible for maintaining discipline during transit. Any instance of <strong>serious misconduct or repeated indiscipline</strong> will be reported to the <strong>Principal through the Transport In-Charge</strong> for necessary action.'
            ]
        },
        {
            title: "Student's Conduct and Safety Rules",
            content: [
                'Students must reach their <strong>designated bus stop at least 5 minutes before</strong> the scheduled arrival time.',
                'The bus will <strong>wait for not more than 1 minute</strong> at each stop to maintain punctuality.',
                'Students should <strong>not approach the bus</strong> until it has <strong>come to a complete halt</strong>.',
                'Upon boarding, students are expected to <strong>occupy the available seats immediately</strong> and remain seated throughout the journey.',
                '<strong>Standing on the footboard</strong> or wandering inside the <strong>bus while in motion</strong> is <strong>strictly prohibited</strong>.',
                'For safety reasons, <strong>buses will stop only at pre-approved stops</strong> designated by the school.',
                'Students must <strong>refrain from extending hands, arms, or head</strong> outside the bus windows at all times.',
                'Any <strong>damage to school transport property</strong> caused by negligence or misconduct will be <strong>recovered from the parent/guardian</strong> of the concerned student.'
            ]
        },
        {
            title: 'Use and Discontinuation',
            content: [
                '<strong>Discontinuation of transport service</strong> during the academic session is <strong>not permitted</strong>, except under exceptional circumstances approved by the school management.',
                'Each student must travel <strong>only in the bus allotted</strong> to them by the <strong>Transport In-Charge</strong>. Changes of bus or route are not allowed without prior authorization.',
                'For safety and accountability, <strong>parents are not permitted to pick up their wards directly</strong> from the bus or school premises <strong>while buses are in operation</strong>, unless <strong>prior written information</strong> has been provided to the school authorities.'
            ]
        }
    ];

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    return (
        <section className="school-transport-section">
            <div className="transport-container">
                {/* Left Side - Video Background */}
                <div className="transport-video-container">
                    <video
                        className="transport-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source
                            src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/C2722-online-video-cutter.com_.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                {/* Right Side - Content with Accordion */}
                <div className="transport-content">
                    <h2 className="transport-heading">School Transport</h2>

                    <p className="transport-intro">
                        Students may avail themselves of the <strong>school transport facility</strong>, subject to the availability of seats on designated routes. The bus routes are thoughtfully planned to ensure safety and convenience for all students. Parents are advised to contact the <a href="#incharge" className="transport-link">School Transport In-Charge</a> for route details, stop locations, and related information.
                    </p>

                    {/* Accordion */}
                    <div className="transport-accordion">
                        {accordionItems.map((item, index) => (
                            <div
                                key={index}
                                className={`accordion-item ${openAccordion === index ? 'open' : ''}`}
                            >
                                <button
                                    className="accordion-header"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={openAccordion === index}
                                >
                                    <span className="accordion-icon">
                                        {openAccordion === index ? (
                                            <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
                                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
                                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="accordion-title">{item.title}</span>
                                </button>

                                <div className="accordion-content">
                                    <ul className="accordion-list">
                                        {item.content.map((point, i) => (
                                            <li
                                                key={i}
                                                dangerouslySetInnerHTML={{ __html: point }}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
