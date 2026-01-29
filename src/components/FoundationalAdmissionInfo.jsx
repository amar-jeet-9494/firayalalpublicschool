'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function FoundationalAdmissionInfo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Age requirements data
    const [ageData, setAgeData] = useState([]);

    useEffect(() => {
        const fetchAgeData = async () => {
            if (supabase) {
                const { data, error } = await supabase
                    .from('dynamic_tables')
                    .select('content')
                    .eq('name', '21-foundational-stage-2026-01-28')
                    .single();

                if (data && data.content) {
                    // Map uppercase keys to lowercase
                    const mappedData = data.content.map(item => ({
                        class: item['CLASS'] || item['Class'] || '',
                        age: item['AGE AS ON 1ST APRIL'] || item['Age as on 1st April'] || ''
                    }));
                    setAgeData(mappedData);
                }
            }
        };
        fetchAgeData();
    }, []);

    // Filter data based on search
    const filteredData = ageData.filter(item =>
        item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.age.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="foundational-admission-info">
            {/* Minimum Age Required Section */}
            <div className="admission-info-card">
                <h2 className="admission-info-heading">Minimum Age Required</h2>

                {/* Table Controls */}
                <div className="table-controls">
                    <div className="entries-control">
                        <span>Show</span>
                        <select
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                            className="entries-select"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span>Entries</span>
                    </div>
                    <div className="search-control">
                        <input
                            type="text"
                            placeholder="Type Here To Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <svg className="search-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* Age Table */}
                <div className="age-table-container">
                    <table className="age-table">
                        <thead>
                            <tr>
                                <th>
                                    <span>CLASS</span>
                                    <span className="sort-icon">⇅</span>
                                </th>
                                <th>
                                    <span>AGE AS IN 1ST APRIL</span>
                                    <span className="sort-icon">⇅</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.class}</td>
                                    <td>{item.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="table-footer">
                    <div className="showing-info">
                        Showing 1 to {filteredData.length} of {filteredData.length} entries
                    </div>
                    <div className="pagination">
                        <button className="pagination-btn prev" disabled>← Prev</button>
                        <button className="pagination-btn active">1</button>
                        <button className="pagination-btn next" disabled>Next →</button>
                    </div>
                </div>
            </div>

            {/* Procedure Section */}
            <div className="procedure-section">
                <h2 className="admission-info-heading">Procedure</h2>
                <p className="procedure-text">
                    Parents seeking admission for their wards can fill out the{' '}
                    <a
                        href="https://floralwhite-newt-933629.hostingersite.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="procedure-link"
                    >
                        online admission form
                    </a>{' '}
                    or{' '}
                    <a
                        href="https://www.firayalalpublicschool.edu.in/images/admission%20form%20firayalal%20public%20school.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="procedure-link"
                    >
                        download admission form
                    </a>{' '}
                    to submit at the school's reception desk or call at the Toll Free Numbers.
                </p>
                <p className="procedure-text">
                    The Prospectus and Registration Form for admission are available at a cost of{' '}
                    <strong>Rs. 1500/- (Rupees One Thousand Five Hundred only)</strong>{' '}
                    from the school's reception desk during working hours.
                </p>
                <p className="procedure-text">
                    It should be duly filled and submitted with the required documents and certificates as mentioned below, by the stipulated date.
                </p>
                <p className="procedure-note">
                    **Registration fee is non-refundable and registration is no guarantee for admission.
                </p>
            </div>

            {/* Documents Required and Admission Notice - Two Column Layout */}
            <div className="info-two-columns">
                {/* Documents Required */}
                <div className="info-card">
                    <h2 className="info-card-heading">Documents Required</h2>
                    <ol className="documents-list">
                        <li>Municipal birth certificate (Photocopy)</li>
                        <li>Two passport size coloured photographs</li>
                        <li>Progress report (Photocopy) & Transfer Certificate (original) (for Class 1 onwards). Photocopy of Aadhar Card of the Child. Original Aadhar shall be produced at the time of submission of Registration form for verification, it shall be returned back immediately.</li>
                        <li>PEN (Permanent Education Number)</li>
                    </ol>
                </div>

                {/* Admission Notice */}
                <div className="info-card admission-notice-card">
                    <h2 className="info-card-heading admission-notice-heading">Admission Notice</h2>
                    <ol className="admission-notice-list">
                        <li>The tentative months to start our admission process are from December to March every year.</li>
                        <li>Admission for the BPL Students will be intimated in accordance with the Government Notice.</li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
