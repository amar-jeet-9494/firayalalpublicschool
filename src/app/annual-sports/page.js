'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import { supabase } from '@/lib/supabase';
import './annual-sports.css';

// Initial Static Data (Fallback until DB is connected)
const initialSportsEvents = [
    { id: 1, sNo: 1, className: "Nursery", events: "Picking up the Balls (Boys) / Collecting the Toys / Chips Race (Girls)", category: "Boys / Girls", students: "All" },
    { id: 2, sNo: 2, className: "Nursery", events: "No Names, Packing Bags (Boys) / Balancing Balls (Girls)", category: "Boys / Girls", students: "All" },
    { id: 3, sNo: 3, className: "Prep", events: "Frog Race / Jalebi Race (Boys) / No Names and Finishing the Biscuits (Girls)", category: "Boys / Girls", students: "All" },
    { id: 4, sNo: 4, className: "I A", events: "Hopping Race (Boys) / Balancing the Balls (Girls)", category: "Boys / Girls", students: "All" },
    { id: 5, sNo: 5, className: "I B", events: "Hopping Race (Boys) / Balancing the Balls (Girls)", category: "Boys / Girls", students: "All" },
    { id: 6, sNo: 6, className: "II", events: "Dress Race (Boys) / Book Balancing (Girls)", category: "Boys / Girls", students: "All" },
    { id: 7, sNo: 7, className: "III A, B", events: "Solving Puzzle Race (Boys) / Book Balancing Race / Drinking Water (Girls)", category: "Boys / Girls", students: "All" },
    { id: 8, sNo: 8, className: "IV A, B", events: "100 m Frog Race (Boys) / 100 m Spoon Marble Race (Girls)", category: "Boys / Girls", students: "All" },
    { id: 9, sNo: 9, className: "V A, B", events: "Sack Race (Boys) / Needle & Thread Race / Making Chain with Safety Pin (Girls)", category: "Boys / Girls", students: "All" },
    // { id: 10, sNo: 10, className: "VI A, B", events: "Ball Picking Race with One Leg (Boys) / Needle & Thread Race (Girls)", category: "Boys / Girls", students: "All" },
    // { id: 11, sNo: 11, className: "VII", events: "Ball Collecting Race (Boys) / Spoon Marble Race (Girls)", category: "Boys / Girls", students: "All" },
    // { id: 12, sNo: 12, className: "VIII A, B, C", events: "200 m Ball Balancing Race (Boys) / 100 m Skipping Race (Girls)", category: "Boys / Girls", students: "All" },
    // { id: 13, sNo: 13, className: "IX A, B, C", events: "300 m Ball Picking Race (Boys) / 200 m Ball Picking Race with Basket (Girls)", category: "Boys / Girls", students: "All" },
    // { id: 14, sNo: 14, className: "X", events: "200 m Race (Girls & Boys)", category: "Boys / Girls", students: "All" },
    // { id: 15, sNo: 15, className: "XI Sc + Com.", events: "400 m Race (Girls & Boys)", category: "Boys / Girls", students: "All" },
    // { id: 16, sNo: 16, className: "XII Sc + Com.", events: "400 m Race (Girls & Boys)", category: "Boys / Girls", students: "All" },
];

export default function AnnualSportsPage() {
    const [sportsEvents, setSportsEvents] = useState(initialSportsEvents);

    useEffect(() => {
        // Only fetch if Supabase is connected (i.e., keys exist)
        if (supabase) {
            const fetchEvents = async () => {
                const { data, error } = await supabase
                    .from('sports_events')
                    .select('*')
                    .order('s_no', { ascending: true });
                
                if (error) console.error('Error loading sports events:', error);
                else if (data && data.length > 0) {
                    // Normalize data structure if DB columns differ slightly
                    const formattedData = data.map(item => ({
                        id: item.id,
                        sNo: item.s_no,
                        className: item.class_name,
                        events: item.events,
                        category: item.category,
                        students: item.students
                    }));
                    setSportsEvents(formattedData);
                }
            };
            fetchEvents();
        }
    }, []);
    return (
        <div className="annual-sports-container">
            <Header />
            <StickyElements />

            {/* Hero Section based on Elementor reference */}
            <div className="elementor-element elementor-element-648b427 e-con-full breadcrumb-animated e-flex e-con e-parent e-lazyloaded">
                <div className="elementor-element elementor-element-de6d867 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-5d62e7c elementor-widget elementor-widget-heading">
                        <h1 className="elementor-heading-title elementor-size-default">Annual Sports</h1>
                    </div>
                    <div className="elementor-element elementor-element-e47368c elementor-widget elementor-widget-heading">
                        <h2 className="elementor-heading-title elementor-size-default">
                            At Firayalal Public School, we believe in nurturing not only academic excellence but also physical fitness, teamwork, and sportsmanship. Our Annual Sports Day is a celebration of energy, enthusiasm, and the spirit of healthy competition.
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Content: Sports Events Table */}
            <main className="annual-sports-content">
                <section className="sports-table-section">
                    <div className="table-responsive">
                        <table className="sports-table">
                            <thead>
                                <tr>
                                    <th className="th-sno">S.No</th>
                                    <th className="th-class">Class</th>
                                    <th className="th-event">Event(s)</th>
                                    <th className="th-category">Category</th>
                                    <th className="th-students">No. of Students</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sportsEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td className="td-center">{event.sNo}</td>
                                        <td className="td-class">{event.className}</td>
                                        <td className="td-event">{event.events}</td>
                                        <td className="td-center">{event.category}</td>
                                        <td className="td-center">{event.students}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
