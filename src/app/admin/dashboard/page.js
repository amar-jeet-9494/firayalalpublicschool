'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { FaFileCsv, FaEdit, FaCalendarAlt, FaBullhorn, FaChalkboardTeacher } from 'react-icons/fa';

export default function DashboardHome() {
    const router = useRouter();

    useEffect(() => {
        // Protect Route
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin');
        }
    }, [router]);

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

                {/* Faculty Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <FaChalkboardTeacher size={24} />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Faculty</h3>
                    <p className="text-slate-500 text-sm mb-6">Manage teacher profiles and staff details.</p>
                    <Link 
                        href="/admin/dashboard/faculty"
                        className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                    >
                        Manage Faculty &rarr;
                    </Link>
                </div>

                {/* Data Tables Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-slate-800 group-hover:text-white transition-colors">
                            <FaFileCsv size={24} />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Data Tables</h3>
                    <p className="text-slate-500 text-sm mb-6">Manage all dynamic data tables and CSV content.</p>
                    <Link 
                        href="/admin/dashboard/data-tables"
                        className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                    >
                        Manage Tables &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Need Link component locally if not imported (it is imported above)
import Link from 'next/link';
