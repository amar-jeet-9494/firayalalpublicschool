'use client';

import { useState, useEffect, useRef } from 'react';

export default function EventsSection() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
    const [hoveredDate, setHoveredDate] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const announcementRef = useRef(null);

    // Sample events data (will be replaced with API data later)
    const eventsData = {
        '2026-01-01': { title: 'WINTER BREAK', type: 'holiday' },
        '2026-01-02': { title: 'WINTER BREAK', type: 'holiday' },
        '2026-01-03': { title: 'WINTER BREAK', type: 'holiday' },
        '2026-01-04': { title: 'WINTER BREAK', type: 'holiday' },
        '2026-01-05': { title: 'WINTER BREAK', type: 'holiday' },
        '2026-01-06': { title: 'WINTER BREAK', type: 'holiday' },
        '2026-01-10': { title: 'SKILLVANTAGE', type: 'event' },
        '2026-01-14': { title: 'MAKAR SANKRANTI', type: 'holiday' },
        '2026-01-16': { title: 'CBSE CLASS XII EXAM', type: 'exam' },
        '2026-01-17': { title: 'SKILLVANTAGE', type: 'event' },
        '2026-01-20': { title: 'PTM CLASS III TO VIII', type: 'meeting' },
        '2026-01-21': { title: 'PTM CLASS IX-XII, CBSE MTS', type: 'meeting' },
        '2026-01-22': { title: 'ASC COMP VI-VIII TERM II', type: 'exam' },
        '2026-01-23': { title: 'VASANT PANCHAMI', type: 'holiday' },
        '2026-01-26': { title: 'REPUBLIC DAY', type: 'holiday' },
        '2026-01-27': { title: 'CHD RAJ VII-VIII & IX-X RKO', type: 'event' },
        '2026-01-29': { title: 'E-DISCUSSION COMPETITION', type: 'event' },
        '2026-01-30': { title: 'CHD K VI-X, PTM', type: 'event' },
        '2026-01-31': { title: 'SKILLVANTAGE', type: 'event' },
    };

    // Sample announcements data (will be replaced with API data later)
    const announcements = [
        {
            id: 1,
            type: 'green',
            date: 'November 22, 2025',
            title: '',
            content: '',
        },
        {
            id: 2,
            type: 'red',
            date: 'November 20, 2025',
            title: 'Please click here for the Admission open for session 2026-27 for Grade IX',
            content: 'Please click here for the Admission open for session 2026-27 for Grade IX',
            link: '#',
        },
        {
            id: 3,
            type: 'blue',
            date: '',
            title: 'Reopening of School for Students & Revised School Timings in view of District Administration Order',
            content: '',
            viewLink: '#',
        },
        {
            id: 4,
            type: 'green',
            date: 'November 15, 2025',
            title: 'Please click here for the Admission open for session 2026-27 for Bal Vatika II',
            content: 'Please click here for the Admission open for session 2026-27 for Bal Vatika II',
            link: '#',
        },
        {
            id: 5,
            type: 'red',
            date: 'November 10, 2025',
            title: 'Annual Day Celebration Notice',
            content: 'All parents are cordially invited for the Annual Day celebration on December 15, 2025.',
            link: '#',
        },
    ];

    // Auto-scroll announcements
    useEffect(() => {
        const container = announcementRef.current;
        if (!container) return;

        let scrollPosition = 0;
        const scrollSpeed = 1;
        const scrollInterval = setInterval(() => {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= container.scrollHeight - container.clientHeight) {
                scrollPosition = 0;
            }
            container.scrollTop = scrollPosition;
        }, 50);

        // Pause on hover
        const handleMouseEnter = () => clearInterval(scrollInterval);
        const handleMouseLeave = () => {
            // Restart scrolling would require more complex logic
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(scrollInterval);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Calendar navigation
    const navigateMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

    // Get calendar data
    const getCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        // Empty slots for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push({ day: '', empty: true });
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = eventsData[dateKey];
            const isToday = day === 7 && month === 0 && year === 2026; // Highlighting 7th as current day for demo

            days.push({
                day,
                dateKey,
                event,
                isToday,
            });
        }

        return days;
    };

    const handleDateHover = (e, day) => {
        if (day.event) {
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.bottom + 10,
            });
            setHoveredDate(day);
        }
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const calendarDays = getCalendarDays();

    return (
        <section className="events-section">
            <div className="events-container">
                <h2 className="events-title">UPCOMING EVENTS & SCHOOL NOTICES</h2>

                <div className="events-layout">
                    {/* CALENDAR */}
                    <div className="calendar-card">
                        <div className="calendar-header">
                            <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                                ‹
                            </button>
                            <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                            <button className="nav-btn" onClick={() => navigateMonth(1)}>
                                ›
                            </button>
                        </div>

                        <div className="weekdays">
                            <span>Sun</span>
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                        </div>

                        <div className="calendar-grid">
                            {calendarDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={`date ${day.empty ? 'empty' : ''} ${day.event ? 'event' : ''} ${day.isToday ? 'active' : ''}`}
                                    onMouseEnter={(e) => handleDateHover(e, day)}
                                    onMouseLeave={() => setHoveredDate(null)}
                                >
                                    {day.day}
                                    {day.event && !day.isToday && (
                                        <>
                                            <span className="event-label">{day.event.title}</span>
                                            <span className="dot"></span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ANNOUNCEMENTS */}
                    <div className="announcement-panel">
                        <div className="announcement-header">
                            Important Announcements
                        </div>

                        <div className="announcement-list" ref={announcementRef}>
                            {announcements.map((item) => (
                                <div key={item.id} className={`announcement-card ${item.type}`}>
                                    {item.date && <span className="date-pill">{item.date}</span>}

                                    {item.title && <h4>{item.title}</h4>}

                                    {item.content && (
                                        <p>
                                            Please click here for the{' '}
                                            <a href={item.link || '#'} className="highlight-link">
                                                {item.content.includes('Admission') ? 'Admission open for session 2026-27 for Grade IX' : item.content}
                                            </a>
                                        </p>
                                    )}

                                    {item.viewLink && (
                                        <a href={item.viewLink} className="view-link">View Circular</a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tooltip for event details */}
                {hoveredDate && hoveredDate.event && (
                    <div
                        className="event-tooltip"
                        style={{
                            left: tooltipPosition.x,
                            top: tooltipPosition.y,
                        }}
                    >
                        <div className="tooltip-header">
                            Events on {hoveredDate.day} {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </div>
                        <div className="tooltip-content">
                            <span className="tooltip-title">{hoveredDate.event.title}</span>
                            <span className={`tooltip-tag ${hoveredDate.event.type}`}>
                                {hoveredDate.event.type.toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
