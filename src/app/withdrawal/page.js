import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import './withdrawal.css';

// Generate metadata for SEO
export const metadata = {
    title: 'Withdrawal Norms | Firayalal Public School',
    description: 'Withdrawal Norms - Firayalal Public School is an award winning school where the best teachers shape your child\'s learning for a lifetime!',
};

// Withdrawal procedure guidelines
const withdrawalProcedure = [
    {
        title: 'Notice Period',
        description: 'Parents or guardians wishing to withdraw their ward from the school must submit a written notice to the Principal at least one month in advance, or pay one month\'s school fee and transport fee (if availing the school bus facility) in lieu of such notice.'
    },
    {
        title: 'Transfer Certificate Application',
        description: 'The application for Transfer Certificate (T.C.) must be submitted in writing and signed by the parent or guardian. The T.C. will be issued one week after the clearance of all dues payable to the school.'
    },
    {
        title: 'Prolonged Absence',
        description: 'In case a student remains absent for two consecutive months without prior written intimation to the Principal, the admission shall stand cancelled and the seat will be reassigned to another eligible student.'
    },
    {
        title: 'Clearance of Dues',
        description: 'To complete the withdrawal process, the student must clear all outstanding dues accrued from the first day of absence till the present day.'
    }
];

// Grounds for removal
const groundsForRemoval = [
    'Unsatisfactory academic progress',
    'Irregular attendance',
    'Acts of indiscipline or misconduct',
    'Detention or repeated failure in the same class',
    'Habitual idleness or lack of effort',
    'Disobedience or defiance of school authority',
    'Use of inappropriate or offensive language',
    'Smoking or consumption of alcohol, tobacco, or any prohibited substances',
    'Conduct detrimental to the reputation or progress of the school',
    'Repeated misbehavior contrary to the ethos and values of the school',
    'Any other matter where the management feels appropriate and necessary to take such decision'
];

export default function WithdrawalPage() {
    // Hero background image - same as fee structure
    const heroImage = 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/TDS-OPT-21-FIRAYALAL-SCHOOL.avif';

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            {/* Hero Section */}
            <section className="withdrawal-hero-section">
                <div
                    className="withdrawal-hero-bg"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="withdrawal-hero-overlay" />
                <div className="withdrawal-hero-content">
                    <h1 className="withdrawal-hero-title">Withdrawal Norms</h1>
                    <h2 className="withdrawal-hero-subtitle">
                        Firayalal Public School is an award winning school where the best teachers shape your child's learning for a lifetime !
                    </h2>
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="withdrawal-hero-btn"
                    >
                        Apply for Admission
                    </a>
                </div>
            </section>

            {/* Withdrawal Content Section */}
            <section className="withdrawal-content-section">
                <div className="withdrawal-content-container">
                    {/* Main Heading */}
                    <h2 className="withdrawal-main-heading">Withdrawal Guidelines</h2>
                    <p className="withdrawal-intro-text">
                        At <strong>Firayalal Public School</strong>, we have established clear and transparent 
                        guidelines for the withdrawal process. Please read the following norms carefully before 
                        initiating any withdrawal request.
                    </p>

                    {/* Withdrawal Procedure Section */}
                    <div className="withdrawal-info-section">
                        <h3 className="withdrawal-section-heading">Withdrawal Procedure</h3>
                        <div className="withdrawal-cards">
                            {withdrawalProcedure.map((item, index) => (
                                <div className="withdrawal-card" key={index}>
                                    <div className="withdrawal-card-number">{index + 1}</div>
                                    <div className="withdrawal-card-content">
                                        <h4 className="withdrawal-card-title">{item.title}</h4>
                                        <p className="withdrawal-card-description">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="withdrawal-divider"></div>

                    {/* Grounds for Removal Section */}
                    <div className="withdrawal-info-section">
                        <h3 className="withdrawal-section-heading">
                            A student may be required to leave the school at any time during the academic year under the following circumstances:
                        </h3>
                        <ul className="withdrawal-list">
                            {groundsForRemoval.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="withdrawal-divider"></div>

                    {/* Important Note */}
                    <div className="withdrawal-note">
                        <div className="withdrawal-note-icon">ℹ️</div>
                        <div className="withdrawal-note-content">
                            <strong>Important:</strong> The school management reserves the right to take appropriate 
                            action in the best interest of the institution and its students. All decisions made by 
                            the management are final and binding.
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
