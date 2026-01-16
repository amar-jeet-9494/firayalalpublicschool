'use client';

import { useState } from 'react';

export default function LifeAtFPS() {
    const [activeTab, setActiveTab] = useState(0);

    const tabsData = [
        {
            name: "Our Achievements",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-09-at-20.45.01_9bbca195.avif", title: "Achievement 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-09-at-20.45.01_55d71ea6.avif", title: "Achievement 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-19-082435.avif", title: "With Mrs. Mahua Maji" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-09-at-20.44.59_d2b24ec5.avif", title: "Achievement 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-09-at-20.45.02_56797b31.avif", title: "Achievement 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-11-165540.avif", title: "Kabaddi Championship" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-11-174133.avif", title: "ULLAS 2025" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-19-084322.avif", title: "Core Sahodaya Team" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-19-084027.avif", title: "CBP By CBSE" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-19-084250.avif", title: "Science Exhibition" },
            ]
        },
        {
            name: "Annual Sports Day",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6804-scaled.avif", title: "Sports Day 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6875-scaled.avif", title: "Sports Day 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6709-scaled.avif", title: "Sports Day 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6555-scaled.avif", title: "Sports Day 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6863-scaled.avif", title: "Sports Day 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6823-scaled.avif", title: "Sports Day 6" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6720-scaled.avif", title: "Volleyball Coach" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6877-scaled.avif", title: "Sports Day 8" },
            ]
        },
        {
            name: "Ceremonies",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/IMG_3632-scaled.avif", title: "Ceremony 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182715.avif", title: "Ceremony 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-2.avif", title: "Ceremony 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/20250723_095522-scaled.avif", title: "Ceremony 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/IMG_3758-scaled.avif", title: "Ceremony 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-183013.avif", title: "Ceremony 6" },
            ]
        },
        {
            name: "Workshop",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_8167-scaled.avif", title: "Workshop 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171528.avif", title: "Workshop 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171624.avif", title: "Workshop 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/8.avif", title: "Workshop 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-171439.avif", title: "Workshop 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0995-scaled.avif", title: "Workshop 6" },
            ]
        },
        {
            name: "Achievers",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif", title: "Achiever 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16d.avif", title: "Achiever 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19a.avif", title: "Achiever 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/18b-1.avif", title: "Achiever 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/2-3.avif", title: "Achiever 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014c.avif", title: "Achiever 6" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/3-2.avif", title: "Achiever 7" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif", title: "Achiever 8" },
            ]
        },
        {
            name: "Science Exhibition",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_5033-scaled.avif", title: "Science 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4951-scaled.avif", title: "Science 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_5006-scaled.avif", title: "Science 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4966-scaled.avif", title: "Science 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4898-scaled.avif", title: "Science 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4905-scaled.avif", title: "Science 6" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4907-scaled.avif", title: "Science 7" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/DSC_4976-scaled.avif", title: "Science 8" },
            ]
        },
        {
            name: "Cultural Programme",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3035-scaled.avif", title: "Cultural 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3032-scaled.avif", title: "Cultural 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3082-scaled.avif", title: "Cultural 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0538-scaled.avif", title: "Cultural 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3027-scaled.avif", title: "Cultural 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0545-scaled.avif", title: "Cultural 6" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG-20220811-WA0030.avif", title: "Cultural 7" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3074-scaled.avif", title: "Cultural 8" },
            ]
        },
        {
            name: "Kids Activity",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_085120-scaled.avif", title: "Kids 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_090659-scaled.avif", title: "Kids 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_091722-scaled.avif", title: "Kids 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WALL.avif", title: "Kids 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183806.avif", title: "Kids 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183918.avif", title: "Kids 6" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-184608.avif", title: "Kids 7" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-170050.avif", title: "Kids 8" },
            ]
        },
        {
            name: "Sports",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-11-165540.avif", title: "Sports 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6720-scaled.avif", title: "Sports 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6736-scaled.avif", title: "Sports 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6731-scaled.avif", title: "Sports 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6724-scaled.avif", title: "Sports 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/DSC_6718-scaled.avif", title: "Sports 6" },
            ]
        },
        {
            name: "Indoor Activity",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_085120-scaled.avif", title: "Indoor 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183806.avif", title: "Indoor 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-183918.avif", title: "Indoor 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-05-184608.avif", title: "Indoor 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_090659-scaled.avif", title: "Indoor 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20221129_091722-scaled.avif", title: "Indoor 6" },
            ]
        },
        {
            name: "Summer Camp",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3035-scaled.avif", title: "Summer 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3032-scaled.avif", title: "Summer 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3027-scaled.avif", title: "Summer 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/IMG_3632-scaled.avif", title: "Summer 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/IMG_3758-scaled.avif", title: "Summer 5" },
            ]
        },
        {
            name: "Teacher's Day Celebration",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3082-scaled.avif", title: "Teachers Day 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0538-scaled.avif", title: "Teachers Day 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_0545-scaled.avif", title: "Teachers Day 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3075-scaled.avif", title: "Teachers Day 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3074-scaled.avif", title: "Teachers Day 5" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3066-scaled.avif", title: "Teachers Day 6" },
            ]
        },
        {
            name: "Scout and Guide Training",
            images: [
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3036-scaled.avif", title: "Scout 1" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3069-scaled.avif", title: "Scout 2" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3059-scaled.avif", title: "Scout 3" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/sjf26251-scaled.avif", title: "Scout 4" },
                { url: "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/IMG_3031-scaled.avif", title: "Scout 5" },
            ]
        }
    ];

    return (
        <section className="life-at-fps-section">
            {/* Waves Pattern Divider */}
            <div className="life-at-fps-waves" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1047.1 3.7" preserveAspectRatio="xMidYMin slice">
                    <path className="waves-path" d="M1047.1,0C557,0,8.9,0,0,0v1.6c0,0,0.6-1.5,2.7-0.3C3.9,2,6.1,4.1,8.3,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C13.8,2,16,4.1,18.2,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C23.6,2,25.9,4.1,28,3.5c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C63,2,65.3,4.1,67.4,3.5C68.3,3.3,69,1.6,69,1.6s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3C82.7,2,85,4.1,87.1,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C92.6,2,94.8,4.1,97,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2"></path>
                </svg>
            </div>

            {/* Section Heading */}
            <h2 className="life-at-fps-heading">Life at F.P.S.</h2>

            {/* Tabs Navigation */}
            <div className="life-at-fps-tabs-wrapper">
                <div className="life-at-fps-tabs" role="tablist">
                    {tabsData.map((tab, index) => (
                        <button
                            key={index}
                            className={`life-at-fps-tab ${activeTab === index ? 'active' : ''}`}
                            onClick={() => setActiveTab(index)}
                            role="tab"
                            aria-selected={activeTab === index}
                            aria-controls={`tab-panel-${index}`}
                        >
                            <span className="tab-text">{tab.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content - Gallery */}
            <div className="life-at-fps-content">
                {tabsData.map((tab, tabIndex) => (
                    <div
                        key={tabIndex}
                        id={`tab-panel-${tabIndex}`}
                        className={`life-at-fps-gallery ${activeTab === tabIndex ? 'active' : ''}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${tabIndex}`}
                    >
                        <div className="gallery-grid">
                            {tab.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="gallery-item">
                                    <div
                                        className="gallery-image"
                                        style={{ backgroundImage: `url(${image.url})` }}
                                        role="img"
                                        aria-label={image.title}
                                    />
                                    <div className="gallery-overlay">
                                        <span className="gallery-title">{image.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
