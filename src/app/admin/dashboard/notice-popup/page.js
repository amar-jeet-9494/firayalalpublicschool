'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FaTrash, FaPlus, FaImage, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader';

export default function NoticePopupManager() {
    const [popups, setPopups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        title: 'Notice',
        image_url: '',
        is_active: true
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/notice-popup');
            const data = await res.json();
            if (res.ok) {
                setPopups(data || []);
            }
        } catch (error) {
            console.error('Error fetching popups:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/notice-popup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to create popup');
            }

            fetchPopups();
            setShowForm(false);
            setFormData({ title: 'Notice', image_url: '', is_active: true });
            alert('Notice created successfully!');
        } catch (error) {
            console.error('Submit error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this popup?')) return;
        
        try {
            const res = await fetch(`/api/notice-popup?id=${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete');
            fetchPopups();
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleStatus = async (popup) => {
        try {
            const res = await fetch('/api/notice-popup', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...popup, is_active: !popup.is_active })
            });
            if (!res.ok) throw new Error('Failed to update status');
            fetchPopups();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="p-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Notice Popups Manager</h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FaPlus /> {showForm ? 'Cancel' : 'Add New Notice'}
                </button>
            </header>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-slate-200">
                    <h2 className="text-lg font-semibold mb-4 text-slate-700">Create New Popup</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
                            <input 
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Popup Image</label>
                            
                            <MediaUploader 
                                value={formData.image_url}
                                onChange={(url) => setFormData({...formData, image_url: url})}
                                placeholder="Upload image or enter URL..."
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <label className="text-sm font-medium text-slate-600">Active Immediately?</label>
                            <input 
                                type="checkbox" 
                                checked={formData.is_active} 
                                onChange={e => setFormData({...formData, is_active: e.target.checked})}
                                className="w-4 h-4 text-blue-600"
                            />
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={!formData.image_url}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create Popup
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popups.map(popup => (
                    <div key={popup.id} className={`bg-white rounded-xl shadow border transition-all ${popup.is_active ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'}`}>
                        <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden group">
                            <img 
                                src={popup.image_url} 
                                alt={popup.title} 
                                className="w-full h-full object-cover"
                            />
                            {popup.is_active && (
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                                    ACTIVE
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-slate-800 mb-1">{popup.title}</h3>
                            <p className="text-xs text-gray-500 mb-4">ID: {popup.id}</p>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <button 
                                    onClick={() => toggleStatus(popup)}
                                    className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition ${popup.is_active ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-500 bg-gray-50 hover:bg-gray-100'}`}
                                >
                                    {popup.is_active ? <FaToggleOn className="text-xl" /> : <FaToggleOff className="text-xl" />}
                                    {popup.is_active ? 'Enabled' : 'Disabled'}
                                </button>
                                
                                <button 
                                    onClick={() => handleDelete(popup.id)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {popups.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                        <FaImage className="text-4xl mx-auto mb-3 opacity-20" />
                        <p>No popups created yet.</p>
                    </div>
                )}
            </div>
            
            {loading && <div className="text-center py-10">Loading...</div>}
        </div>
    );
}
