'use client';

import Image from 'next/image';

export default function TransportInchargeSection() {
    const features = [
        'GPS tracking installed in all the buses.',
        'CCTV installed in all the buses.',
        'Speed Governor installed in all buses. (as per Government norms)'
    ];

    return (
        <section className="transport-incharge-section" id="incharge">
            <div className="incharge-container">
                {/* Left Side - Content */}
                <div className="incharge-content">
                    <h2 className="incharge-heading">Transport Incharge</h2>

                    {/* Person Card */}
                    <div className="incharge-person">
                        <div className="person-image-wrapper">
                            <Image
                                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Bijay.avif"
                                alt="Mr. Kumar Bijayraj Verma"
                                width={100}
                                height={100}
                                className="person-image"
                            />
                        </div>
                        <div className="person-info">
                            <h3 className="person-name">
                                <a href="mailto:bijay.verma@firayalalpublicschool.edu.in">
                                    Mr. Kumar Bijayraj Verma
                                </a>
                            </h3>
                            <p className="person-contact">
                                <span className="phone-icon">📞</span> 080-65912099
                            </p>
                            <p className="person-contact">
                                <span className="email-icon">📧</span> bijay.verma@firayalalpublicschool.edu.in
                            </p>
                        </div>
                    </div>

                    {/* Features List */}
                    <ul className="incharge-features">
                        {features.map((feature, index) => (
                            <li key={index} className="feature-item">
                                <span className="feature-bullet">•</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="incharge-buttons">
                        <a
                            href="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/Parents-User-login-Details-GPS.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="incharge-btn"
                        >
                            Parent's Login Details
                        </a>
                        <a
                            href="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/transport-route-chart-2025-26-final.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="incharge-btn"
                        >
                            Transport Route Chart
                        </a>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="incharge-image-container">
                    <Image
                        src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-202258-1024x571.avif"
                        alt="School Transport"
                        width={800}
                        height={446}
                        className="incharge-main-image"
                    />
                </div>
            </div>
        </section>
    );
}
