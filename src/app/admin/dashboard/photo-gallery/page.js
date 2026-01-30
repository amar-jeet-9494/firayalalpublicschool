'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaTimes, FaFilter, FaImages, FaStar } from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader';

const CATEGORIES = [
    'Ceremonies', 'Workshop', 'Achievers', 'Science Exhibition', 
    'Cultural Programme', 'Kids Activity', 'Sports', 'Indoor Activity', 'Summer Camp'
];

export default function PhotoGalleryAdminPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showUploadModal, setShowUploadModal] = useState(false);
    
    // Upload state
    const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0]);
    const [uploadUrl, setUploadUrl] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/photo-gallery');
            const result = await res.json();
            if (result.data) {
                setImages(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadUrl) return alert('Please select an image');

        try {
            const res = await fetch('/api/photo-gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_url: uploadUrl, category: uploadCategory }),
            });

            if (res.ok) {
                fetchImages();
                setUploadUrl('');
                setShowUploadModal(false);
            } else {
                alert('Failed to upload');
            }
        } catch (error) {
            alert('Error uploading');
        }
    };

    const handleToggleAnnualDay = async (img) => {
        try {
            const res = await fetch('/api/photo-gallery', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: img.id, is_annual_day: !img.is_annual_day }),
            });

            if (res.ok) {
                const updated = await res.json();
                setImages(images.map(i => i.id === img.id ? { ...i, is_annual_day: !i.is_annual_day } : i));
            }
        } catch (error) {
            console.error('Error updating annual day status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this image?')) return;
        try {
            const res = await fetch(`/api/photo-gallery?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setImages(images.filter(img => img.id !== id));
            }
        } catch (error) {
            alert('Error deleting');
        }
    };

    const filteredImages = selectedCategory === 'All' 
        ? images 
        : images.filter(img => img.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaImages className="text-purple-600" /> Photo Gallery
                    </h1>
                    <p className="text-sm text-gray-500">Manage school gallery images.</p>
                </div>
                
                <div className="flex gap-3 items-center w-full md:w-auto">
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white font-medium text-gray-700"
                        >
                            <option value="All">All Categories</option>
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <button 
                        onClick={() => setShowUploadModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        <FaPlus size={12} /> Add Photo
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 max-w-7xl mx-auto">
                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="font-bold text-lg text-gray-800">Add New Photo</h3>
                                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleUpload} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select 
                                        value={uploadCategory} 
                                        onChange={(e) => setUploadCategory(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                    <div className="h-48 w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-2 relative flex items-center justify-center">
                                        {uploadUrl ? (
                                            <img src={uploadUrl} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No image selected</span>
                                        )}
                                    </div>
                                    <MediaUploader 
                                        value={uploadUrl} 
                                        onChange={setUploadUrl}
                                    />
                                </div>
                                <div className="pt-2">
                                    <button type="submit" className="w-full py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors">
                                        Upload Photo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Gallery Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading images...</div>
                ) : filteredImages.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <FaImages className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="text-gray-500">No photos found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredImages.map(img => (
                            <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <img 
                                    src={img.image_url} 
                                    alt={img.category} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <span className="text-white text-xs font-medium bg-purple-600 px-2 py-0.5 rounded-full w-fit mb-2 shadow-sm">
                                        {img.category}
                                    </span>
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button 
                                            onClick={() => handleToggleAnnualDay(img)}
                                            className={`p-1.5 rounded-full hover:scale-110 transition-all shadow-sm ${img.is_annual_day ? 'bg-yellow-400 text-white' : 'bg-white/90 text-gray-400 hover:text-yellow-500'}`}
                                            title={img.is_annual_day ? "Remove from Annual Day" : "Add to Annual Day"}
                                        >
                                            <FaStar size={12} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(img.id)}
                                            className="bg-white/90 text-red-600 p-1.5 rounded-full hover:bg-white hover:scale-110 transition-all shadow-sm"
                                            title="Delete"
                                        >
                                            <FaTrash size={12} />
                                        </button>
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
