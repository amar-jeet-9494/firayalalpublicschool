'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './fee-structure.css';

// ... (retain metadata export if Next.js allows, but this is a client component so metadata export might not work here. 
// However, the original file had it. If it was working, I will keep it, but usually 'use client' + metadata export is invalid in Next 13+.
// The user had it, so I will comment it out or move to layout if needed, but for now I will try to keep the structure 'safe'.)
// Actually, 'export const metadata' in a 'use client' file throws an error. The original file had 'import Header' so it was likely a Client Component (or default server).
// Wait, the original file did NOT have 'use client' at the top line! It was a Server Component by default?
// No, it imported Header/Footer/Sticky which are likely client components? 
// Let's check line 1 of original file... it did NOT have 'use client'.
// But I need 'use client' for useState/useEffect.
// So I will convert it to 'use client'. I MUST remove 'export const metadata'.
// I will move metadata to a separate layout or just omit it for now to avoid breakage (or keep it if I don't use 'use client' and fetch data on server? No, 'dynamic_tables' fetch is async).
// Decision: Use Client Component, remove metadata export (it won't work).

// Static Data (Fallback)
const initialRegistrationHelper = [
    { particulars: 'Registration Fee', amount: '1,500', remarks: 'Non-refundable, at the time of form' },
    { particulars: 'Security Deposit', amount: '10,000', remarks: 'Refundable at withdrawal' },
    { particulars: 'Annual Fees', amount: '10,000', remarks: 'Payable every year on or before the fees of May' },
    { particulars: 'Miscellaneous', amount: '1,000', remarks: 'Payable along with April 2026 fees' },
];

const initialAdmissionHelper = [
    { group: 'Foundational (Bal Vatika II - Grade II)', admissionFee: '35,000', tuitionFee: '3,000/month' },
    { group: 'Elementary (Grade III - Grade V)', admissionFee: '40,000', tuitionFee: '3,275/month' },
    { group: 'Middle (Grade VI - VII)', admissionFee: '45,000', tuitionFee: '3,725/month' },
    { group: 'Secondary (Grade VIII - X)', admissionFee: '50,000', tuitionFee: '3,725/month' },
];

const initialTransportHelper = [
    { distance: '0 – 5 km', fee: '1,000' },
    { distance: '5 – 10 km', fee: '1,200' },
    { distance: 'Above 10 km', fee: '1,500' },
];

const otherCharges = [
    { name: 'Examination Fee', amount: '₹500 per term' },
    { name: 'Laboratory Fee (for Classes IX–XII)', amount: '₹1,500 per year' },
    { name: 'Library & Digital Resource Fee', amount: '₹1,000 per year' },
    { name: 'Sports & Activities Fee', amount: 'Included in term fee' },
];

const paymentGuidelines = [
    'Fees are payable term-wise (Quarterly/Monthly option may be available on request).',
    'Late payment will attract a fine as per school rules.',
    'Payment can be made via online transfer, cheque, or cash at the school office.',
    'Transport fees are payable separately and in advance.',
];

export default function FeeStructurePage() {
    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/TDS-OPT-21-FIRAYALAL-SCHOOL.avif';
    
    // State
    const [registrationData, setRegistrationData] = useState(initialRegistrationHelper);
    const [admissionData, setAdmissionData] = useState(initialAdmissionHelper);
    const [transportData, setTransportData] = useState(initialTransportHelper);

    useEffect(() => {

        const fetchFees = async () => {
            try {
                // 1. Registration Charges (Table 11)
                const res1 = await fetch('/api/dynamic-tables?name=11-registration-charges-2026-01-28');
                const data1 = await res1.json();
                
                if (data1?.content) {
                    const normalized = data1.content.map(row => ({
                        particulars: row['Particulars'] || row['particulars'] || Object.values(row)[0],
                        amount: row['Amount'] || row['Amount (₹)'] || row['amount'] || Object.values(row)[1],
                        remarks: row['Remarks'] || row['remarks'] || Object.values(row)[2] || ''
                    }));
                    if (normalized.length > 0) setRegistrationData(normalized);
                }

                // 2. Admission/Annual Fees (Table 12)
                const res2 = await fetch('/api/dynamic-tables?name=12-annual-fees-2026-01-28');
                const data2 = await res2.json();

                if (data2?.content) {
                    const normalized = data2.content.map(row => ({
                        group: row['Group'] || row['group'] || Object.values(row)[0],
                        admissionFee: row['Admission Fees'] || row['Admission Fee'] || Object.values(row)[1],
                        tuitionFee: row['Tuition Fees'] || row['Tuition Fee'] || Object.values(row)[2]
                    }));
                    if (normalized.length > 0) setAdmissionData(normalized);
                }

                // 3. Transport Fees (Table 13)
                const res3 = await fetch('/api/dynamic-tables?name=13-transport-fees-2026-01-28');
                const data3 = await res3.json();

                if (data3?.content) {
                    const normalized = data3.content.map(row => ({
                        distance: row['Distance Range'] || row['Distance'] || Object.values(row)[0],
                        fee: row['Fee'] || row['Fee (Per Month)'] || Object.values(row)[1]
                    }));
                    if (normalized.length > 0) setTransportData(normalized);
                }
            } catch (err) {
                console.error("Error fetching fees:", err);
            }
        };

        fetchFees();
    }, []);

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="fee-hero-section">
                <div
                    className="fee-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="fee-hero-overlay" />
                <div className="fee-hero-content">
                    <h1 className="fee-hero-title">Fee Structure</h1>
                    <h2 className="fee-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                    </h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fee-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* Fee Structure Content Section */}
            <section className="fee-content-section">
                <div className="fee-content-container">
                    {/* Main Heading */}
                    <h2 className="fee-main-heading">Fee Structure (Session 2026–2027)</h2>
                    <p className="fee-intro-text">
                        At <strong>Firayalal Public School</strong>, we ensure complete transparency in our fee structure. 
                        The fees are designed to provide the best facilities, high-quality academics, and holistic 
                        development opportunities for every student.
                    </p>

                    {/* Registration Charges Table */}
                    <div className="fee-table-section">
                        <h3 className="fee-table-heading">Registration Charges</h3>
                        <div className="fee-table-wrapper">
                            <table className="fee-table">
                                <thead>
                                    <tr>
                                        <th>Particulars</th>
                                        <th>Amount (₹)</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrationData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.particulars}</td>
                                            <td className="amount-cell">{item.amount}</td>
                                            <td>{item.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="fee-divider"></div>

                    {/* Admission Charges / Term Fees Table */}
                    <div className="fee-table-section">
                        <h3 className="fee-table-heading">Admission Charges / Term Fees</h3>
                        <div className="fee-table-wrapper">
                            <table className="fee-table">
                                <thead>
                                    <tr>
                                        <th>Group</th>
                                        <th>Admission Fees (₹)</th>
                                        <th>Tuition Fees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admissionData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.group}</td>
                                            <td className="amount-cell">{item.admissionFee}</td>
                                            <td className="amount-cell">{item.tuitionFee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="fee-divider"></div>

                    {/* Transport Fees Table */}
                    <div className="fee-table-section">
                        <h3 className="fee-table-heading">Transport Fees</h3>
                        <div className="fee-table-wrapper">
                            <table className="fee-table fee-table-compact">
                                <thead>
                                    <tr>
                                        <th>Distance Range</th>
                                        <th>Fee (Per Month) (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transportData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.distance}</td>
                                            <td className="amount-cell">{item.fee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="fee-divider"></div>

                    {/* Other Charges Section */}
                    <div className="fee-info-section">
                        <h3 className="fee-table-heading">Other Charges (If Applicable)</h3>
                        <ul className="fee-list">
                            {otherCharges.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.name}:</strong> {item.amount}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="fee-divider"></div>

                    {/* Payment Guidelines Section */}
                    <div className="fee-info-section">
                        <h3 className="fee-table-heading">Payment Guidelines</h3>
                        <ul className="fee-list">
                            {paymentGuidelines.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
