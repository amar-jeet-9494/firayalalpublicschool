'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FaBullhorn, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Form State
    const [isEditing, setIsEditing] = useState(null); // ID of item being edited
    const [formData, setFormData] = useState({ 
        title: '', 
        content: '', 
        link: '', 
        date: '', 
        type: 'blue' 
    });
    const [editData, setEditData] = useState({ 
        title: '', 
        content: '', 
        link: '', 
        date: '', 
        type: 'blue' 
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('announcements')
                .select('*')
                .order('date', { ascending: false });
            
            if (error) throw error;
            setAnnouncements(data || []);
        } catch (err) {
            console.error('Error fetching announcements:', err);
            setError('Failed to load announcements.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.date) return;

        try {
            const { error } = await supabase
                .from('announcements')
                .insert([formData]);

            if (error) throw error;
            
            setFormData({ title: '', content: '', link: '', date: '', type: 'blue' });
            fetchAnnouncements();
        } catch (err) {
            console.error('Error adding announcement:', err);
            alert('Failed to add announcement.');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            const { error } = await supabase
                .from('announcements')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchAnnouncements();
        } catch (err) {
            console.error('Error deleting announcement:', err);
            alert('Failed to delete announcement.');
        }
    };

    const startEdit = (item) => {
        setIsEditing(item.id);
        setEditData({ 
            title: item.title, 
            content: item.content, 
            link: item.link, 
            date: item.date, 
            type: item.type 
        });
    };

    const cancelEdit = () => {
        setIsEditing(null);
        setEditData({ title: '', content: '', link: '', date: '', type: 'blue' });
    };

    const handleUpdate = async (id) => {
        try {
            const { error } = await supabase
                .from('announcements')
                .update(editData)
                .eq('id', id);

            if (error) throw error;
            
            setIsEditing(null);
            fetchAnnouncements();
        } catch (err) {
            console.error('Error updating announcement:', err);
            alert('Failed to update announcement.');
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBullhorn className="text-orange-600" /> 
                        Announcements Manager
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage notices and news displayed on the homepage.</p>
                </div>
                <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    &larr; Back to Dashboard
                </Link>
            </div>

            {/* Add New Announcement Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                    <FaPlus className="text-green-500" /> Add New Announcement
                </h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                        <input 
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Announcement Title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Content (or Button Text)</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="e.g. View Circular"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Link URL</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Type (Color)</label>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="blue">Blue (Standard/Circular)</option>
                            <option value="red">Red (Urgent/Admission)</option>
                            <option value="green">Green (Success/Info)</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full"
                        >
                            Add Announcement
                        </button>
                    </div>
                </form>
            </div>

            {/* Announcements List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Existing Announcements ({announcements.length})</h3>
                </div>
                
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading announcements...</div>
                ) : announcements.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No announcements found. Add one above.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                    <th className="p-4 border-b w-32">Date</th>
                                    <th className="p-4 border-b">Details</th>
                                    <th className="p-4 border-b w-32">Type</th>
                                    <th className="p-4 border-b text-right w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {announcements.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-gray-900 align-top">
                                            {isEditing === item.id ? (
                                                <input 
                                                    type="date"
                                                    className="p-1 border rounded w-full"
                                                    value={editData.date}
                                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                                />
                                            ) : (
                                                new Date(item.date).toLocaleDateString('en-GB')
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-700 align-top">
                                            {isEditing === item.id ? (
                                                <div className="space-y-2">
                                                    <input 
                                                        type="text"
                                                        className="p-1 border rounded w-full"
                                                        placeholder="Title"
                                                        value={editData.title}
                                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                                    />
                                                    <textarea 
                                                        className="p-1 border rounded w-full text-xs"
                                                        placeholder="Content"
                                                        rows="2"
                                                        value={editData.content}
                                                        onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                                                    />
                                                    <input 
                                                        type="text"
                                                        className="p-1 border rounded w-full text-xs"
                                                        placeholder="Link URL"
                                                        value={editData.link}
                                                        onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="font-semibold">{item.title}</div>
                                                    <div className="text-gray-500 text-xs mt-1">{item.content}</div>
                                                    {item.link && (
                                                        <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline block mt-1 truncate max-w-xs">
                                                            {item.link}
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm align-top">
                                            {isEditing === item.id ? (
                                                <select 
                                                    className="p-1 border rounded w-full"
                                                    value={editData.type}
                                                    onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                                                >
                                                    <option value="blue">Blue</option>
                                                    <option value="red">Red</option>
                                                    <option value="green">Green</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 py-1 rounded text-xs font-medium bg-${item.type}-100 text-${item.type}-800 capitalize`}>
                                                    {item.type}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right align-top">
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
