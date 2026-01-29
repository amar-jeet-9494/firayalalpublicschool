'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { FaFileCsv, FaEdit, FaCalendarAlt, FaBullhorn } from 'react-icons/fa';

export default function DashboardHome() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Protect Route
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin');
            return;
        }

        const fetchTables = async () => {
            try {
                const response = await fetch('/api/dynamic-tables');
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.error || 'Failed to fetch tables');
                
                setTables(data || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchTables();
    }, [router]);

    if (loading) return <div className="p-10">Loading Dashboard...</div>;

    // Helper to format table names (e.g., "school_timetable" -> "School Timetable")
    const formatName = (name) => {
        return name
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace('.csv', '')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Manage your website content, events, and announcements from one place.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Academic Calendar Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FaCalendarAlt size={24} />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Academic Calendar</h3>
                    <p className="text-slate-500 text-sm mb-6">Manage school holidays, events, and exam schedules.</p>
                    <Link 
                        href="/admin/dashboard/calendar"
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Manage Calendar &rarr;
                    </Link>
                </div>

                {/* Announcements Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <FaBullhorn size={24} />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Announcements</h3>
                    <p className="text-slate-500 text-sm mb-6">Update homepage notices, news, and circulars.</p>
                    <Link 
                        href="/admin/dashboard/announcements"
                        className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-800 transition-colors"
                    >
                        Manage Notices &rarr;
                    </Link>
                </div>

                {tables.map(table => (
                    <div key={table.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                <FaFileCsv size={24} />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{formatName(table.name)}</h3>
                        <p className="text-slate-500 text-sm mb-6 truncate">Table ID: {table.name}</p>
                        <Link 
                            href={`/admin/dashboard/editor?table=${table.name}`}
                            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <FaEdit className="mr-2" /> Edit Table
                        </Link>
                    </div>
                ))}
                
                {tables.length === 0 && (
                    <div className="col-span-full p-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
                        <p className="text-slate-400">No dynamic tables found in database. Importing data...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Need Link component locally if not imported (it is imported above)
import Link from 'next/link';
