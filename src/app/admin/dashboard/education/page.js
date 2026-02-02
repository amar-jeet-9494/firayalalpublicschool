'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader'; // Assuming this exists based on previous files

export default function EducationAdminPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        headings: ['', ''],
        description: '',
        statistics: [],
        image_slideshows: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/sections/education');
            const result = await res.json();
            if (result.data) {
                // Ensure defaults/structure
                setFormData({
                    headings: result.data.headings || ['', ''],
                    description: result.data.description || '',
                    statistics: result.data.statistics || [],
                    image_slideshows: result.data.image_slideshows || []
                });
            }
        } catch (error) {
            console.error(error);
            alert('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/sections/education', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Saved successfully!');
            } else {
                alert('Failed to save');
            }
        } catch (error) {
            alert('Error saving');
        } finally {
            setSaving(false);
        }
    };

    // Helper to update specific fields
    const updateHeading = (index, value) => {
        const newHeadings = [...formData.headings];
        newHeadings[index] = value;
        setFormData({ ...formData, headings: newHeadings });
    };

    const updateStat = (index, field, value) => {
        const newStats = [...formData.statistics];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, statistics: newStats });
    };

    const addStat = () => {
        setFormData({
            ...formData,
            statistics: [...formData.statistics, { title: '', value: '', suffix: '' }]
        });
    };

    const removeStat = (index) => {
        const newStats = formData.statistics.filter((_, i) => i !== index);
        setFormData({ ...formData, statistics: newStats });
    };

    const updateSlideImage = (slideshowIndex, imageIndex, url) => {
        const newSlideshows = [...formData.image_slideshows];
        // Ensure slideshow exists
        if (!newSlideshows[slideshowIndex]) newSlideshows[slideshowIndex] = { images: [] };
        
        const newImages = [...(newSlideshows[slideshowIndex].images || [])];
        newImages[imageIndex] = url;
        newSlideshows[slideshowIndex].images = newImages;
        
        setFormData({ ...formData, image_slideshows: newSlideshows });
    };

    // Helper to ensure we have structure for 3 slideshows
    const getSlideshow = (index) => formData.image_slideshows?.[index] || { images: [] };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Holistic Education</h1>
                    <p className="text-sm text-gray-500">Manage content for the Education section.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="p-6 max-w-5xl mx-auto space-y-8">
                
                {/* 1. Headings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Headings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 border border-gray-300 rounded-lg"
                                value={formData.headings[0] || ''}
                                onChange={(e) => updateHeading(0, e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Heading</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 border border-gray-300 rounded-lg"
                                value={formData.headings[1] || ''}
                                onChange={(e) => updateHeading(1, e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Description */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Description</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content</label>
                        <textarea 
                            rows={5}
                            className="w-full p-2.5 border border-gray-300 rounded-lg font-mono text-sm"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                        <p className="text-xs text-gray-500 mt-1">Supports HTML tags like &lt;strong&gt;, &lt;span&gt;, etc.</p>
                    </div>
                </div>

                {/* 3. Statistics */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="font-bold text-lg text-gray-800">Statistics</h3>
                        <button onClick={addStat} className="text-blue-600 text-sm font-medium hover:underline">+ Add Stat</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.statistics.map((stat, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                <button 
                                    onClick={() => removeStat(index)}
                                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <FaTrash />
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-gray-500">Value</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-1.5 bg-white border border-gray-300 rounded" 
                                            value={stat.value}
                                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                                            placeholder="6000"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-gray-500">Suffix</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-1.5 bg-white border border-gray-300 rounded" 
                                            value={stat.suffix}
                                            onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                                            placeholder="+"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-gray-500">Title</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-1.5 bg-white border border-gray-300 rounded" 
                                            value={stat.title}
                                            onChange={(e) => updateStat(index, 'title', e.target.value)}
                                            placeholder="Students Enrolled"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Slideshows */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Image Slideshows</h3>
                    
                    {/* Slot 1: Large Image (Left) */}
                    <div className="mb-8">
                        <h4 className="font-semibold text-md text-gray-700 mb-3 bg-blue-50 p-2 rounded">1. Large Main Slideshow (Left)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i}>
                                    <MediaUploader 
                                        value={getSlideshow(0).images?.[i] || ''}
                                        onChange={(url) => updateSlideImage(0, i, url)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slot 2: Small Top (Right) */}
                    <div className="mb-8">
                        <h4 className="font-semibold text-md text-gray-700 mb-3 bg-blue-50 p-2 rounded">2. Small Top Slideshow (Right)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[0, 1, 2].map(i => (
                                <div key={i}>
                                    <MediaUploader 
                                        value={getSlideshow(1).images?.[i] || ''}
                                        onChange={(url) => updateSlideImage(1, i, url)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slot 3: Small Bottom (Right) */}
                    <div>
                        <h4 className="font-semibold text-md text-gray-700 mb-3 bg-blue-50 p-2 rounded">3. Small Bottom Slideshow (Right)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[0, 1, 2].map(i => (
                                <div key={i}>
                                    <MediaUploader 
                                        value={getSlideshow(2).images?.[i] || ''}
                                        onChange={(url) => updateSlideImage(2, i, url)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
