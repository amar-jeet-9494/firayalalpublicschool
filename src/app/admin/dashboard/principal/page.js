'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaPlus, FaTrash } from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader';

export default function PrincipalAdminPage() {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        message: '',
        image_url: '',
        carousel_slides: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/principal-message');
            const result = await res.json();
            if (result.data) {
                setFormData(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/principal-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert('Principal message updated successfully!');
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            alert('Error saving data');
        } finally {
            setSaving(false);
        }
    };

    // Carousel handlers
    const addSlide = () => {
        setFormData(prev => ({
            ...prev,
            carousel_slides: [...(prev.carousel_slides || []), { image: '', caption: '' }]
        }));
    };

    const removeSlide = (index) => {
        setFormData(prev => ({
            ...prev,
            carousel_slides: prev.carousel_slides.filter((_, i) => i !== index)
        }));
    };

    const updateSlide = (index, field, value) => {
        const newSlides = [...formData.carousel_slides];
        newSlides[index][field] = value;
        setFormData(prev => ({ ...prev, carousel_slides: newSlides }));
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Principal's Desk</h1>
                    <p className="text-sm text-gray-500">Manage principal's profile and message.</p>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
                >
                    {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : <><FaSave /> Save Changes</>}
                </button>
            </div>

            <div className="p-6 max-w-5xl mx-auto space-y-6">
                
                {/* Main Profile Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Principal's Profile</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Image Upload */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                            <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-2">
                                {formData.image_url ? (
                                    <img src={formData.image_url} alt="Principal" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                            </div>
                            <MediaUploader 
                                value={formData.image_url} 
                                onChange={(url) => setFormData({...formData, image_url: url})}
                            />
                        </div>

                        {/* Details */}
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea 
                                    rows="8"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Manager */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b">
                        <h3 className="text-lg font-bold text-gray-800">Carousel Slides</h3>
                        <button 
                            onClick={addSlide}
                            className="text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                        >
                            <FaPlus size={12} /> Add Slide
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(formData.carousel_slides || []).map((slide, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50 relative group">
                                <button 
                                    onClick={() => removeSlide(index)}
                                    className="absolute top-2 right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <FaTrash size={12} />
                                </button>
                                
                                <div className="mb-2 h-32 bg-gray-200 rounded overflow-hidden">
                                     {slide.image ? (
                                        <img src={slide.image} className="w-full h-full object-cover" />
                                     ) : (
                                        <div className="h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                                     )}
                                </div>
                                
                                <MediaUploader 
                                    value={slide.image} 
                                    onChange={(url) => updateSlide(index, 'image', url)}
                                    placeholder="Image URL"
                                />
                                <input 
                                    type="text"
                                    className="w-full mt-2 p-2 text-sm border border-gray-300 rounded outline-none"
                                    placeholder="Caption"
                                    value={slide.caption}
                                    onChange={(e) => updateSlide(index, 'caption', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
