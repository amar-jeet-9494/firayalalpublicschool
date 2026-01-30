'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaCheck, FaClock, FaTimesCircle, FaSearch, FaFilter } from 'react-icons/fa';

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All'); // All, Pending, Contacted, Fulfilled

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admissions');
            const result = await res.json();
            if (result.data) {
                setEnquiries(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic update
        const originalEnquiries = [...enquiries];
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));

        try {
            const res = await fetch('/api/admissions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) throw new Error('Failed to update');
        } catch (error) {
            alert('Failed to update status');
            setEnquiries(originalEnquiries);
        }
    };

    const filteredEnquiries = enquiries.filter(e => filter === 'All' || e.status === filter);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Contacted': return 'bg-blue-100 text-blue-700';
            case 'Fulfilled': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Admission Enquiries</h1>
                    <p className="text-sm text-gray-500">Manage new admission requests ({enquiries.length} total)</p>
                </div>
                <button onClick={fetchEnquiries} className="text-blue-600 text-sm hover:underline">Refresh</button>
            </div>
            
            <div className="p-6 max-w-7xl mx-auto">
                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['All', 'Pending', 'Contacted', 'Fulfilled', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                                ${filter === status ? 'bg-slate-800 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? <div className="text-center py-20 text-gray-500">Loading enquiries...</div> : 
                 filteredEnquiries.length === 0 ? <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-dashed">No enquiries found.</div> :
                 (
                    <div className="grid gap-4">
                        {filteredEnquiries.map(enquiry => (
                            <div key={enquiry.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(enquiry.status)}`}>
                                                {enquiry.status || 'Pending'}
                                            </span>
                                            <span className="text-gray-400 text-xs">{new Date(enquiry.created_at).toLocaleString()}</span>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                            {enquiry.student_name}
                                            <span className="text-sm font-normal text-gray-500">({enquiry.admission_class})</span>
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600 mt-3">
                                            <div className="flex items-center gap-2"><FaUser className="text-gray-400" /> <span>Parent: {enquiry.parent_name} ({enquiry.relationship})</span></div>
                                            <div className="flex items-center gap-2"><FaPhone className="text-gray-400" /> <a href={`tel:${enquiry.phone}`} className="hover:text-blue-600">{enquiry.phone}</a></div>
                                            <div className="flex items-center gap-2"><FaEnvelope className="text-gray-400" /> <a href={`mailto:${enquiry.email}`} className="hover:text-blue-600">{enquiry.email}</a></div>
                                            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> <span>{enquiry.address}</span></div>
                                            <div className="flex items-center gap-2"><FaCalendarAlt className="text-gray-400" /> <span>Visit: {enquiry.visit_date} ({enquiry.visit_time})</span></div>
                                        </div>
                                        
                                        {enquiry.message && (
                                            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 italic border border-gray-100">
                                                "{enquiry.message}"
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap lg:flex-col gap-2 min-w-[140px]">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Change Status</label>
                                        <select 
                                            value={enquiry.status || 'Pending'}
                                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                                            className="px-3 py-2 border rounded-lg text-sm bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Fulfilled">Fulfilled</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
