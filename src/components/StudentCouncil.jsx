'use client';

import React, { useEffect, useState } from 'react';
import './StudentCouncil.css';

export default function StudentCouncil() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://firayalalpublicschool.edu.in/wp-json/wp/v2/pages/2831');
                if (!response.ok) throw new Error('Failed to fetch data');
                const json = await response.json();
                const content = json.content.rendered;
                const parsedData = parseContent(content);
                setData(parsedData);
            } catch (err) {
                console.error("Error fetching council data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parseContent = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const rows = [];
        let currentHouse = "";
        let currentCategory = ""; // Senior/Junior if needed, but image puts them in list

        // Strategy: Traverse and identify sections.
        // If we see "School Student Leaders", it's the main block (House = empty or "School Appt").
        // If we see "Anand", "Gyan", etc., update currentHouse.
        // We will collect items and render them as table rows.

        const nodes = Array.from(doc.body.querySelectorAll('*'));

        let globalIndex = 1;

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const tag = node.tagName.toLowerCase();
            const text = node.innerText?.trim();

            if (!text) continue;

            if (tag === 'h2') {
                const lowerText = text.toLowerCase();
                if (lowerText.includes("school student leaders")) {
                    currentHouse = "";
                } else if (lowerText.includes("house leaders")) {
                    // Just a separator, ignore
                } else if (["anand", "gyan", "maitri", "shanti"].some(h => lowerText.includes(h))) {
                    currentHouse = text.toUpperCase(); // "ANAND", etc.
                }
                // Ignore "Class VI to XII" etc for the "House" column, 
                // or we could append it to role if strict matching is needed.
                // The image shows just "GYAN" for the house column.
            } else if (tag === 'h3') {
                // Name found (e.g. "SHIVAM KUMAR (XII COM)")
                // The API format seems to be: Figure -> H3 (Name) -> P (Role)

                // Ensure we haven't already processed this node as part of a parent
                // (querySelectorAll('*') gets all, so we might hit children. 
                // But H3 usually contains text directly).

                const name = text;
                let role = "";

                // Try to find the role in the next sibling P
                let next = node.nextElementSibling;
                while (next && next.tagName.toLowerCase() !== 'p' && next.tagName.toLowerCase() !== 'h2' && next.tagName.toLowerCase() !== 'h3') {
                    next = next.nextElementSibling;
                }

                if (next && next.tagName.toLowerCase() === 'p') {
                    role = next.innerText.trim();
                }

                // If found name, add row
                // Avoid duplicates if parsing is loose
                rows.push({
                    sNo: globalIndex++,
                    house: currentHouse,
                    responsibility: role,
                    name: name
                });
            }
        }
        return rows;
    };

    if (loading) return <div className="council-loading">Loading Student Council...</div>;
    if (error) return <div className="council-error">Unable to load data.</div>;

    return (
        <section className="student-council-section">
            <div className="council-header-container">
                <h2 className="council-main-title">SCHOOL STUDENTS&apos; LEADERS -------- 2024-25</h2>
            </div>

            <div className="table-responsive">
                <table className="council-table">
                    <thead>
                        <tr>
                            <th className="th-sno">S.NO</th>
                            <th className="th-house">HOUSE</th>
                            <th className="th-resp">RESPONSIBILITY</th>
                            <th className="th-name">NAMES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => {
                            // Logic to show House name only on the first row of a new house group?
                            // The reference image shows "GYAN" on the first row of the block.
                            // We can check if previous row had same house.
                            const showHouse = index === 0 || data[index - 1].house !== row.house;

                            // If it's the general "School Student Leaders" section (empty house),
                            // we might leave it empty as per image top section.

                            return (
                                <tr key={index}>
                                    <td className="td-center">{row.sNo}</td>
                                    <td className="td-house">
                                        {showHouse && row.house ? <strong>{row.house}</strong> : ""}
                                    </td>
                                    <td className="td-resp">{row.responsibility}</td>
                                    <td className="td-name">{row.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
