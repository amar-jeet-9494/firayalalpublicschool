'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function EventsSection() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const announcementRef = useRef(null);

    // State for events
    const [eventsData, setEventsData] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            if (!supabase) return;

            try {
                const { data, error } = await supabase
                    .from('academic_calendar')
                    .select('*');

                if (error) throw error;

                // Transform array to object: { 'YYYY-MM-DD': { title: 'Event Name', type: 'event/holiday' } }
                const formattedEvents = {};
                (data || []).forEach(item => {
                    // Simple heuristic for type
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
            } catch (err) {
                console.error('Error fetching calendar events:', err);
            }
        };

        fetchEvents();
    }, []);

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
