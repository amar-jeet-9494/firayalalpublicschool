'use client';

import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaTrash, FaUser, FaQuoteLeft } from 'react-icons/fa';

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Pending'); // Pending, Approved, Rejected, All

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/testimonials?mode=admin');
            const result = await res.json();
            if (result.data) {
                setTestimonials(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic update
        const originalList = [...testimonials];
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: newStatus } : t));

        try {
            const res = await fetch('/api/testimonials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) throw new Error('Failed to update');
        } catch (error) {
            alert('Failed to update status');
            setTestimonials(originalList);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const res = await fetch(`/api/testimonials?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setTestimonials(testimonials.filter(t => t.id !== id));
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            alert('Failed to delete testimonial');
        }
    };

    const filteredTestimonials = testimonials.filter(t => filter === 'All' || t.status === filter);

    const getStatusBadge = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700',
            'Approved': 'bg-green-100 text-green-700',
            'Rejected': 'bg-red-100 text-red-700'
        };
        return <span className={`px-2 py-1 rounded text-xs font-bold ${colors[status] || 'bg-gray-100'}`}>{status}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Testimonials & Reviews</h1>
                    <p className="text-sm text-gray-500">Manage suggestions, grievances, and feedback.</p>
                </div>
                <button onClick={fetchTestimonials} className="text-blue-600 text-sm hover:underline">Refresh</button>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {['Pending', 'Approved', 'Rejected', 'All'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${filter === status ? 'bg-slate-800 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? <div className="text-center py-20 text-gray-400">Loading...</div> : 
                 filteredTestimonials.length === 0 ? <div className="text-center py-20 bg-white border border-dashed rounded-lg text-gray-500">No {filter.toLowerCase()} testimonials found.</div> :
                 (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {filteredTestimonials.map(t => (
                            <div key={t.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-lg">
                                                {t.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{t.name}</h3>
                                                <p className="text-xs text-gray-500">{t.role} • {t.category} • {t.submission_type}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(t.status)}
                                    </div>
                                    
                                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 italic border border-gray-100 mb-4 relative">
                                        <FaQuoteLeft className="absolute top-2 left-2 text-gray-200 text-xl -z-10" />
                                        "{t.message}"
                                    </div>

                                    <div className="text-xs text-gray-400 mb-4 grid grid-cols-2 gap-2">
                                        {t.email && <span>Email: {t.email}</span>}
                                        {t.phone && <span>Phone: {t.phone}</span>}
                                        {t.rating && <span>Rating: {t.rating}</span>}
                                        <span>Date: {new Date(t.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t border-gray-50 justify-end">
                                    {t.status !== 'Approved' && (
                                        <button 
                                            onClick={() => handleStatusChange(t.id, 'Approved')}
                                            className="px-3 py-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 text-sm font-medium flex items-center gap-1"
                                        >
                                            <FaCheck size={12} /> Approve
                                        </button>
                                    )}
                                    {t.status !== 'Rejected' && (
                                        <button 
                                            onClick={() => handleStatusChange(t.id, 'Rejected')}
                                            className="px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 text-sm font-medium flex items-center gap-1"
                                        >
                                            <FaTimes size={12} /> Reject
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(t.id)}
                                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium flex items-center gap-1"
                                    >
                                        <FaTrash size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
