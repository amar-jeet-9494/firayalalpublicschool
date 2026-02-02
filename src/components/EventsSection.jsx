'use client';

import { useState, useEffect, useRef } from 'react';

export default function EventsSection({ title = "UPCOMING EVENTS & SCHOOL NOTICES" }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const announcementRef = useRef(null);

    // State for events and announcements
    const [eventsData, setEventsData] = useState({});
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Calendar Events
                const calendarRes = await fetch('/api/academic-calendar');
                const calendarData = await calendarRes.json();

                if (!calendarRes.ok) throw new Error(calendarData.error);

                const formattedEvents = {};
                (calendarData || []).forEach(item => {
                    const upperEvent = item.event.toUpperCase();
                    let type = 'event';
                    if (upperEvent.includes('BREAK') || upperEvent.includes('HOLIDAY') || upperEvent.includes('SUNDAY')) {
                        type = 'holiday';
                    } else if (upperEvent.includes('EXAM') || upperEvent.includes('TEST')) {
                        type = 'exam';
                    } else if (upperEvent.includes('MEET') || upperEvent.includes('PTM')) {
                        type = 'meeting';
                    }

                    formattedEvents[item.date] = {
                        title: item.event,
                        type: type
                    };
                });
                setEventsData(formattedEvents);

                // Fetch Announcements
                const announcementsRes = await fetch('/api/announcements');
                const announcementsData = await announcementsRes.json();

                if (!announcementsRes.ok) throw new Error(announcementsData.error);

                setAnnouncements(announcementsData || []);

            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    // Helper to format announcement date
    const formatAnnouncementDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

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
            const today = new Date();
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

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
                <h2 className="events-title">{title}</h2>

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
                                <div key={item.id} className={`announcement-card ${item.type || 'blue'}`}>
                                    {item.date && (
                                        <span className="date-pill">
                                            {formatAnnouncementDate(item.date)}
                                        </span>
                                    )}

                                    {item.title && <h4>{item.title}</h4>}

                                    {item.content === 'View Circular' ? (
                                        /* Special case for Circulars */
                                        <a href={item.link || '#'} className="view-link" target="_blank" rel="noopener noreferrer">
                                            View Circular
                                        </a>
                                    ) : (
                                        /* Standard Announcement */
                                        item.content && (
                                            <p>
                                                Please click here for the{' '}
                                                <a href={item.link || '#'} className="highlight-link">
                                                    {item.content}
                                                </a>
                                            </p>
                                        )
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
