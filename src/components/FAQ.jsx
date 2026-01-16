'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    const faqData = [
        {
            question: "What curriculum does Firayalal Public School follow?",
            answer: "We are affiliated with the <strong>Central Board of Secondary Education (CBSE), Delhi</strong>, and follow the CBSE curriculum designed to ensure academic excellence along with holistic development."
        },
        {
            question: "What grades/classes are offered at the school?",
            answer: "The school offers classes from <strong>Bal Vatika II (Earlier-Nursery) to Class XII</strong>, covering Science, Commerce and Humanities at the Senior Secondary level."
        },
        {
            question: "How can I apply for admission?",
            answer: "Parents can apply by filling out the <strong>admission form available at the school office</strong> or through the <strong><a href='/admission-process'>Admissions section</a> on our website</strong>. Further details about eligibility, documents required, and the admission process are provided in the website and school reception."
        },
        {
            question: "What facilities are available at the school?",
            answer: `<p>We provide a wide range of facilities including:</p>
                <ul>
                    <li>Spacious classrooms with smart boards.</li>
                    <li>Science and computer laboratories.</li>
                    <li>Library with a vast collection of books.</li>
                    <li>Sports grounds and indoor activity spaces.</li>
                    <li>Transport facilities</li>
                    <li>Medical support and first aid.</li>
                </ul>`
        },
        {
            question: "Does the school provide transportation?",
            answer: "Yes, the school offers a <strong>safe and reliable transport facility</strong> across Ranchi with well-maintained buses and trained staff."
        },
        {
            question: "What is the medium of instruction?",
            answer: "The medium of instruction is <strong>English</strong>, while Hindi and other languages are also taught to ensure linguistic and cultural growth."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="faq-section">
            {/* Top Navy Border */}
            {/* <div className="faq-top-border"></div> */}

            <div className="faq-wrapper">
                {/* Right Panel - Background Image (comes first in DOM for row-reverse) */}
                <div className="faq-image-panel"></div>

                {/* Left Panel - FAQ Accordion */}
                <div className="faq-content-panel">
                    <h2 className="faq-heading">Frequently Asked Questions</h2>

                    <div className="faq-accordion" aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className={`faq-accordion-item ${openIndex === index ? 'faq-accordion-item-open' : ''}`}
                            >
                                <button
                                    className="faq-accordion-title"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={openIndex === index}
                                    aria-controls={`faq-content-${index}`}
                                >
                                    <span className="faq-accordion-icon">
                                        {openIndex === index ? (
                                            <FaMinus />
                                        ) : (
                                            <FaPlus />
                                        )}
                                    </span>
                                    <span className="faq-accordion-text">{item.question}</span>
                                </button>

                                {openIndex === index && (
                                    <div
                                        id={`faq-content-${index}`}
                                        className="faq-accordion-content"
                                        role="region"
                                    >
                                        <div
                                            className="faq-answer-text"
                                            dangerouslySetInnerHTML={{ __html: item.answer }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Navy Border */}
            {/* <div className="faq-bottom-border"></div> */}
        </section>
    );
}
