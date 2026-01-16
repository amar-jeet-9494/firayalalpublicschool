'use client';

import { useState } from 'react';

const busData = {
    1: { uid: "fpsb1", pwd: "bus0101", label: "JH 01CK 3809 (B1)" },
    2: { uid: "fpsb2", pwd: "bus0202", label: "JH 01CK 5494 (B2)" },
    3: { uid: "fpsb3", pwd: "bus0303", label: "JH 01BT 9788 (B3)" },
    4: { uid: "fpsb4", pwd: "bus0404", label: "JH 01BA 7860 (B4)" },
    5: { uid: "fpsb5", pwd: "bus0505", label: "JH 01BT 5422 (B5)" }
};

export default function BusTrackingAdmission() {
    const [selectedBus, setSelectedBus] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleBusChange = (e) => {
        const busId = e.target.value;
        setSelectedBus(busId);
        setShowCredentials(busId !== '');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1500);
    };

    return (
        <section className="bus-tracking-section">
            <div className="bus-tracking-container">
                {/* Left Card - Bus Tracking */}
                <div className="bus-card bus-card-left">
                    <h2 className="bus-card-heading">Bus Tracking</h2>
                    <div className="bus-qr-wrapper">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.tpgpstrack.trackezy.gpstracker"
                            target="_blank"
                            rel="nofollow noopener"
                        >
                            <img
                                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/image.avif"
                                alt="Bus Tracking QR Code"
                                className="bus-qr-image"
                            />
                        </a>
                    </div>
                    <p className="bus-caption">
                        Download our Bus Tracking App (TrackEzy) from Google Play Store
                    </p>
                </div>

                {/* Center - Credentials Selector */}
                <div className="fps-bus-container">
                    <h3 className="fps-heading">Parent App – Bus Credentials</h3>

                    <select
                        id="busSelect"
                        className="fps-select"
                        value={selectedBus}
                        onChange={handleBusChange}
                    >
                        <option value="">Select Bus No.</option>
                        {Object.entries(busData).map(([id, data]) => (
                            <option key={id} value={id}>{data.label}</option>
                        ))}
                    </select>

                    {showCredentials && selectedBus && (
                        <div className="fps-credentials-box">
                            <div className="fps-cred-row">
                                <div className="fps-label">User ID</div>
                                <div className="fps-value">{busData[selectedBus].uid}</div>
                                <button
                                    className="fps-copy-btn"
                                    onClick={() => copyToClipboard(busData[selectedBus].uid)}
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="fps-cred-row">
                                <div className="fps-label">Password</div>
                                <div className="fps-value">{busData[selectedBus].pwd}</div>
                                <button
                                    className="fps-copy-btn"
                                    onClick={() => copyToClipboard(busData[selectedBus].pwd)}
                                >
                                    Copy
                                </button>
                            </div>

                            <p className="fps-note">Use these credentials to login to the Parents App.</p>
                        </div>
                    )}
                </div>

                {/* Right Card - Admission */}
                <div className="bus-card bus-card-right">
                    <h2 className="bus-card-heading">Admission</h2>
                    <div className="bus-qr-wrapper">
                        <a
                            href="https://floralwhite-newt-933629.hostingersite.com/"
                            target="_blank"
                            rel="nofollow noopener"
                        >
                            <img
                                src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/image-1.avif"
                                alt="Admission QR Code"
                                className="bus-qr-image"
                            />
                        </a>
                    </div>
                    <p className="bus-caption">
                        Scan to Fill the Online Admission Form
                    </p>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`fps-toast ${showToast ? 'show' : ''}`}>Copied!</div>
        </section>
    );
}
