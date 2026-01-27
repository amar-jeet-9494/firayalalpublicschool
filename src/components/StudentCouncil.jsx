'use client';

import React, { useEffect, useState } from 'react';
import './StudentCouncil.css';

export default function StudentCouncil() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPdfData = async () => {
            try {
                const response = await fetch('https://firayalalpublicschool.edu.in/wp-json/wp/v2/pages/2831');
                if (!response.ok) throw new Error('Failed to fetch data');

                const json = await response.json();
                const content = json.content.rendered;

                // Regex to find the PDF URL in the content (e.g. from <embed src="..."> or just a link)
                // Looking for .../uploads/....pdf
                const pdfMatch = content.match(/https:\/\/firayalalpublicschool\.edu\.in\/wp-content\/uploads\/[^"']+\.pdf/);

                if (pdfMatch && pdfMatch[0]) {
                    setPdfUrl(pdfMatch[0]);
                } else {
                    // Fallback if no PDF found in content, try the specific known URL or default
                    // The user mentioned this specific URL in the request, so we can check if it exists or just use it as fallback?
                    // But the request says "fetch this page... because this pdf viewer is not looking good". 
                    // It implies the PDF IS there. 
                    // If regex fails, we might want to log it.
                    console.warn("No PDF URL found in API content. Checking specific fallback.");
                    setPdfUrl("https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/School-Student-Leaders-List-2022-23.pdf");
                }
            } catch (err) {
                console.error("Error fetching council data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPdfData();
    }, []);

    if (loading) return <div className="council-loading">Loading Student Council Document...</div>;
    if (error) return <div className="council-error">Unable to load document.</div>;

    return (
        <section className="student-council-pdf-section">
            <div className="pdf-viewer-container" style={{ width: '100%', height: '800px' }}>
                {pdfUrl ? (
                    <embed
                        src={pdfUrl}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        className="pdf-embed"
                        title="Student Council Leaders"
                    />
                ) : (
                    <div className="council-error">PDF Document not found.</div>
                )}
            </div>
            {pdfUrl && (
                <div className="pdf-fallback-link">
                    <p>
                        Unable to view the PDF file? <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download it here</a>.
                    </p>
                </div>
            )}
        </section>
    );
}
