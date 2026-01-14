'use client';

export default function SilverJubilee() {
    // Images for the vertical marquee columns
    const columnOneImages = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/5-5.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-7.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/6-4.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-4.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182848.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-5.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182824.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-8.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-5.avif',
    ];

    const columnTwoImages = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-4.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/5-5.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182824.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182848.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-2.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-8.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182811.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-7.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/8-3.avif',
    ];

    const columnThreeImages = [
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-5.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-5.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-07-182848.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-7.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-8.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-1.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-2.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/8-3.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-4.avif',
        'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/6-4.avif',
    ];

    return (
        <section className="silver-jubilee-section">
            <div className="silver-jubilee-container">
                {/* Left Content Side */}
                <div className="silver-jubilee-content">
                    {/* Silver Jubilee Banner */}
                    <div className="silver-jubilee-banner">
                        <img
                            src="https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Silver.avif"
                            alt="25 Years of Excellence - Silver Jubilee"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="silver-jubilee-title">
                        Celebrating 2.5 Decades of Excellence in Education
                    </h2>

                    {/* Paragraphs */}
                    <p className="silver-jubilee-text">
                        For 2.5 Decades, <strong>Firayalal Public School</strong> has stood as a beacon of
                        learning, values, and progress in Ranchi. What began as a humble vision
                        has evolved into a thriving community of learners, educators, and
                        achievers who embody excellence every single day.
                    </p>

                    <p className="silver-jubilee-text">
                        The <strong>Silver Jubilee</strong> marks more than a milestone — it celebrates the
                        spirit of education that inspires curiosity, compassion, and creativity.
                        Guided by the principles of the National Education Policy (NEP) 2020,
                        we continue to evolve with a focus on holistic development, experiential
                        learning, and future-ready skills.
                    </p>

                    <p className="silver-jubilee-text">
                        As we honour our past and look ahead to the future, we extend heartfelt
                        gratitude to our students, parents, teachers, and alumni — the pillars
                        who have shaped this journey. Together, we celebrate <strong>2.5 decades of
                            Firayalal Public School</strong> — where every child's potential finds its purpose.
                    </p>
                </div>

                {/* Right Photo Marquee Side */}
                <div className="photo-marquee-container">
                    {/* Column 1 - Scrolls Down (reverse) */}
                    <div className="photo-column reverse">
                        <div className="photo-column-track">
                            {[...columnOneImages, ...columnOneImages].map((img, index) => (
                                <img
                                    key={`col1-${index}`}
                                    src={img}
                                    alt={`Silver Jubilee Photo ${index + 1}`}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Scrolls Up (normal) */}
                    <div className="photo-column">
                        <div className="photo-column-track">
                            {[...columnTwoImages, ...columnTwoImages].map((img, index) => (
                                <img
                                    key={`col2-${index}`}
                                    src={img}
                                    alt={`Silver Jubilee Photo ${index + 1}`}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Column 3 - Scrolls Down (reverse) */}
                    <div className="photo-column reverse">
                        <div className="photo-column-track">
                            {[...columnThreeImages, ...columnThreeImages].map((img, index) => (
                                <img
                                    key={`col3-${index}`}
                                    src={img}
                                    alt={`Silver Jubilee Photo ${index + 1}`}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
