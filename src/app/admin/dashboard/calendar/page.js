'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminCalendarPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Form State
    const [isEditing, setIsEditing] = useState(null); // ID of event being edited
    const [formData, setFormData] = useState({ date: '', event: '' });
    const [editData, setEditData] = useState({ date: '', event: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/academic-calendar');
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.error || 'Failed to fetch');
            
            setEvents(data || []);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!formData.date || !formData.event) return;

        try {
            const response = await fetch('/api/academic-calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to create');
            
            setFormData({ date: '', event: '' });
            fetchEvents();
        } catch (err) {
            console.error('Error adding event:', err);
            alert('Failed to add event.');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const response = await fetch(`/api/academic-calendar?id=${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to delete');
            
            fetchEvents();
        } catch (err) {
            console.error('Error deleting event:', err);
            alert('Failed to delete event.');
        }
    };


    const startEdit = (item) => {
        setIsEditing(item.id);
        setEditData({ date: item.date, event: item.event });
    };

    const cancelEdit = () => {
        setIsEditing(null);
        setEditData({ date: '', event: '' });
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch('/api/academic-calendar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...editData }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to update');
            
            setIsEditing(null);
            fetchEvents();
        } catch (err) {
            console.error('Error updating event:', err);
            alert('Failed to update event.');
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" /> 
                        Academic Calendar Manager
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage school events and holidays.</p>
                </div>
                <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    &larr; Back to Dashboard
                </Link>
            </div>

            {/* Add New Event Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                    <FaPlus className="text-green-500" /> Add New Event
                </h2>
                <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                        <input 
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex-[2] w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Event Description</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.event}
                            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                            placeholder="e.g. Annual Sports Day"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full md:w-auto"
                    >
                        Add Event
                    </button>
                </form>
            </div>

            {/* Events List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Scheduled Events ({events.length})</h3>
                </div>
                
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading events...</div>
                ) : events.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No events found. Add one above.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                    <th className="p-4 border-b">Date</th>
                                    <th className="p-4 border-b">Event</th>
                                    <th className="p-4 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {events.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {isEditing === item.id ? (
                                                <input 
                                                    type="date"
                                                    className="p-1 border rounded w-full"
                                                    value={editData.date}
                                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                                />
                                            ) : (
                                                new Date(item.date).toLocaleDateString('en-GB', { 
                                                    day: 'numeric', month: 'short', year: 'numeric' 
                                                })
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-700 w-full">
                                            {isEditing === item.id ? (
                                                <input 
                                                    type="text"
                                                    className="p-1 border rounded w-full"
                                                    value={editData.event}
                                                    onChange={(e) => setEditData({ ...editData, event: e.target.value })}
                                                />
                                            ) : (
                                                item.event
                                            )}
                                        </td>
                                        <td className="p-4 text-right whitespace-nowrap">
                                            {isEditing === item.id ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleUpdate(item.id)}
                                                        className="text-green-600 hover:text-green-800"
                                                        title="Save"
                                                    >
                                                        <FaSave size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={cancelEdit}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-end gap-3">
                                                    <button 
                                                        onClick={() => startEdit(item)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
