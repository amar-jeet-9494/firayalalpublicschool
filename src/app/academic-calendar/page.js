
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import InteractiveCalendar from '@/components/InteractiveCalendar';
import { supabase } from '@/lib/supabase';
import './academic-calendar.css';

export const revalidate = 60;

export const metadata = {
    title: 'Academic Calendar | Firayalal Public School',
    description: 'Academic Calendar, Holidays, and Event Timings at Firayalal Public School.',
};

export default async function AcademicCalendarPage() {
    let calendarEvents = [];
    let error = null;

    try {
        if (supabase) {
            // Fetch Academic Calendar Data from the new table
            const { data, error: dbError } = await supabase
                .from('academic_calendar')
                .select('*')
                .order('date', { ascending: true });
            
            if (dbError) {
                console.warn('Calendar fetch error:', dbError);
                error = 'Failed to load calendar data.';
            } else {
                calendarEvents = data || [];
            }
        }
    } catch (err) {
        console.error('Error in AcademicCalendarPage:', err);
        error = 'Failed to load calendar data.';
    }

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return { full: '', day: '' };
        const date = new Date(dateString);
        return {
            full: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            day: date.toLocaleDateString('en-GB', { weekday: 'long' })
        };
    };

    return (
        <>
            <Header isTransparent={false} />
            <StickyElements />

            <section className="calendar-hero-section">
                <div 
                    className="calendar-hero-bg"
                    style={{ backgroundImage: 'url(https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/calender.avif)' }} 
                />
                <div className="calendar-hero-overlay" />
                <div className="calendar-hero-content">
                    <h1 className="calendar-hero-title">Academic Calendar</h1>
                    <p style={{ fontSize: '18px', opacity: 0.9 }}>Building Bright Futures, One Step at a Time</p>
                </div>
            </section>

            <div className="calendar-main-content">
                {error && <div className="loading-container">{error}</div>}

                <section className="calendar-section">
                    <h2 className="calendar-section-title">Academic Calendar & Events</h2>
                    
                    <div style={{ marginBottom: '60px' }}>
                        <InteractiveCalendar />
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

