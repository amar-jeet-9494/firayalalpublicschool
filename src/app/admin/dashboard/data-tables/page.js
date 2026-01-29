'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaFileCsv, FaEdit, FaArrowLeft } from 'react-icons/fa';

export default function DataTablesPage() {
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

    // Helper to format table names
    const formatName = (name) => {
        return name
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace('.csv', '')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    if (loading) return <div className="p-10">Loading Data Tables...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Data Tables</h1>
                    <p className="text-slate-500 mt-2">Manage all dynamic data tables from one place.</p>
                </div>
                <Link 
                    href="/admin/dashboard" 
                    className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                    <FaArrowLeft className="mr-2" /> Back to Dashboard
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <p className="text-slate-400">No dynamic tables found in database.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
