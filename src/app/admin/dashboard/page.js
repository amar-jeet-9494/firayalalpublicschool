'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { FaFileCsv, FaEdit, FaCalendarAlt } from 'react-icons/fa';

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
            if (!supabase) return; // Handle mock mode if keys missing
            
            const { data, error } = await supabase
                .from('dynamic_tables')
                .select('id, name, created_at')
                .order('name', { ascending: true });

            if (error) console.error(error);
            else setTables(data || []);
            setLoading(false);
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
            <div className="page-header">
                <h1 className="page-title">Data Tables</h1>
                <p className="text-gray-500 mt-2">Manage the 22 dynamic tables for the website.</p>
            </div>

            <div className="card-grid">
                {/* Academic Calendar Card */}
                <div className="admin-card border-l-4 border-l-blue-600">
                    <div className="card-body">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                                <FaCalendarAlt size={24} />
                            </div>
                            <h3 className="card-title mb-0">Academic Calendar</h3>
                        </div>
                        <p className="card-desc">Manage holidays and school events.</p>
                    </div>
                    <div className="card-footer">
                        <Link 
                            href="/admin/dashboard/calendar"
                            className="btn-primary flex items-center gap-2"
                        >
                            <FaEdit /> Manage Calendar
                        </Link>
                    </div>
                </div>

                {tables.map(table => (
                    <div key={table.id} className="admin-card">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-700">
                                    <FaFileCsv size={24} />
                                </div>
                                <h3 className="card-title mb-0">{formatName(table.name)}</h3>
                            </div>
                            <p className="card-desc">ID: {table.name}</p>
                        </div>
                        <div className="card-footer">
                            <Link 
                                href={`/admin/dashboard/editor?table=${table.name}`}
                                className="btn-primary flex items-center gap-2"
                            >
                                <FaEdit /> Edit Table
                            </Link>
                        </div>
                    </div>
                ))}
                
                {tables.length === 0 && (
                    <div className="col-span-full p-10 text-center bg-white rounded-lg border">
                        <p>No tables found in database. Please run the import script.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Need Link component locally if not imported (it is imported above)
import Link from 'next/link';
