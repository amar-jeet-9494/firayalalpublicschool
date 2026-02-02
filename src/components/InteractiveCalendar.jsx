'use client';

import { useState, useEffect } from 'react';

export default function InteractiveCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [eventsData, setEventsData] = useState({});
    const [loading, setLoading] = useState(true);

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
            } catch (err) {
                console.error('Error fetching calendar data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div className="calendar-card" style={{ width: '100%', flex: 'none' }}>
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
                    {loading ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>Loading...</div>
                    ) : (
                        calendarDays.map((day, index) => (
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
                        ))
                    )}
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
    );
}
