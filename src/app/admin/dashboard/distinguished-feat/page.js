'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader';

export default function DistinguishedFeatAdminPage() {
    const [feats, setFeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', image_url: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchFeats();
    }, []);

    const fetchFeats = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/distinguished-feat');
            const result = await res.json();
            if (result.data) {
                setFeats(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const method = editingId ? 'PUT' : 'POST';
            const body = editingId ? { ...formData, id: editingId } : formData;

            const res = await fetch('/api/distinguished-feat', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchFeats();
                resetForm();
            } else {
                alert('Failed to save');
            }
        } catch (error) {
            alert('Error saving data');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/distinguished-feat?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setFeats(feats.filter(f => f.id !== id));
            }
        } catch (error) {
            alert('Error deleting');
        }
    };

    const startEdit = (feat) => {
        setEditingId(feat.id);
        setFormData({ title: feat.title, image_url: feat.image_url });
        setIsAdding(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ title: '', image_url: '' });
        setIsAdding(false);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Distinguished Feat</h1>
                    <p className="text-sm text-gray-500">Manage achievements carousel.</p>
                </div>
                {!isAdding && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <FaPlus size={12} /> Add New
                    </button>
                )}
            </div>

            <div className="p-6 max-w-6xl mx-auto space-y-6">
                
                {/* Form */}
                {isAdding && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <div className="h-40 w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-2 relative">
                                    {formData.image_url ? (
                                        <img src={formData.image_url} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Image Selected</div>
                                    )}
                                </div>
                                <MediaUploader 
                                    value={formData.image_url} 
                                    onChange={(url) => setFormData({...formData, image_url: url})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Caption</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                    <FaSave /> {editingId ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? <div className="col-span-full text-center py-10 text-gray-400">Loading...</div> : feats.map(feat => (
                        <div key={feat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="h-48 relative bg-gray-100">
                                <img src={feat.image_url} alt={feat.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-lg shadow-sm">
                                    <button onClick={() => startEdit(feat)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><FaEdit /></button>
                                    <button onClick={() => handleDelete(feat.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><FaTrash /></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium text-gray-800 line-clamp-2" title={feat.title}>{feat.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
