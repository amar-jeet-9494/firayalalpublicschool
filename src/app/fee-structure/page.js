import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './fee-structure.css';

// Generate metadata for SEO
export const metadata = {
    title: 'Fee Structure | Firayalal Public School',
    description: 'Fee Structure - Firayalal Public School is an award winning school where the best teachers shape your child\'s learning for a lifetime!',
};

// Fee data
const registrationCharges = [
    { particulars: 'Registration Fee', amount: '1,500', remarks: 'Non-refundable, at the time of form' },
    { particulars: 'Security Deposit', amount: '10,000', remarks: 'Refundable at withdrawal' },
    { particulars: 'Annual Fees', amount: '10,000', remarks: 'Payable every year on or before the fees of May' },
    { particulars: 'Miscellaneous', amount: '1,000', remarks: 'Payable along with April 2026 fees' },
];

const admissionFees = [
    { group: 'Foundational (Bal Vatika II - Grade II)', admissionFee: '35,000', tuitionFee: '3,000/month' },
    { group: 'Elementary (Grade III - Grade V)', admissionFee: '40,000', tuitionFee: '3,275/month' },
    { group: 'Middle (Grade VI - VII)', admissionFee: '45,000', tuitionFee: '3,725/month' },
    { group: 'Secondary (Grade VIII - X)', admissionFee: '50,000', tuitionFee: '3,725/month' },
];

const transportFees = [
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
    // Hero background image from user's HTML
    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/TDS-OPT-21-FIRAYALAL-SCHOOL.avif';

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
                                    {registrationCharges.map((item, index) => (
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
                                    {admissionFees.map((item, index) => (
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
                                    {transportFees.map((item, index) => (
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
