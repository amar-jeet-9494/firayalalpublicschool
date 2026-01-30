'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaSave, FaGlobe, FaSpinner } from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader';

const COMMON_PATHS = [
    '/',
    '/about-us',
    '/admission-process',
    '/academics',
    '/infrastructure',
    '/faculty',
    '/contact-us',
    '/results',
    '/achievements',
    '/gallery'
];

export default function SEOManagerPage() {
    const [selectedPath, setSelectedPath] = useState('/');
    const [customPath, setCustomPath] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: '',
        og_image: ''
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Fetch data when path changes
    useEffect(() => {
        const fetchSEO = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/seo?path=${encodeURIComponent(selectedPath)}`);
                const result = await res.json();
                if (result.data) {
                    setFormData({
                        title: result.data.title || '',
                        description: result.data.description || '',
                        keywords: result.data.keywords || '',
                        og_image: result.data.og_image || ''
                    });
                } else {
                    // Reset if no data found
                    setFormData({ title: '', description: '', keywords: '', og_image: '' });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedPath) fetchSEO();
    }, [selectedPath]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/seo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page_path: selectedPath === 'custom' ? customPath : selectedPath,
                    ...formData
                }),
            });
            
            if (res.ok) {
                alert('SEO settings saved successfully!');
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            alert('Error saving SEO settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
             <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">SEO Manager</h1>
                <p className="text-sm text-gray-500">Manage Titles, Meta Descriptions, and Social Images for your pages.</p>
            </div>

            <div className="p-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    
                    {/* Page Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Page to Edit</label>
                        <select 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={selectedPath}
                            onChange={(e) => setSelectedPath(e.target.value)}
                        >
                            {COMMON_PATHS.map(path => (
                                <option key={path} value={path}>{path === '/' ? 'Home Page (/)' : path}</option>
                            ))}
                            <option value="custom">Custom Path...</option>
                        </select>
                        
                        {selectedPath === 'custom' && (
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    placeholder="/your-custom-path"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                                    value={customPath}
                                    onChange={(e) => setCustomPath(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <hr className="my-6 border-gray-100" />

                    {loading ? (
                        <div className="text-center py-10 text-gray-400">Loading SEO settings...</div>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-6">
                            {/* Browser Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Browser Title <span className="text-red-500">*</span>
                                </label>
                                <div className="text-xs text-gray-400 mb-2">Recommended: 50-60 characters.</div>
                                <input 
                                    type="text" 
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. Best CBSE School in Ranchi | Firayalal Public School"
                                    required
                                />
                            </div>

                            {/* Meta Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Meta Description
                                </label>
                                <div className="text-xs text-gray-400 mb-2">Recommended: 150-160 characters. This appears in Google search results.</div>
                                <textarea 
                                    rows="3"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Write a brief summary of the page content..."
                                />
                            </div>

                            {/* Keywords */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Keywords (Comma separated)
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.keywords}
                                    onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                                    placeholder="school, ranchi, education, cbse"
                                />
                            </div>

                            {/* Social Share Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Social Share Image (Open Graph)
                                </label>
                                <div className="text-xs text-gray-400 mb-2">Image shown when sharing the link on WhatsApp, Facebook, LinkedIn.</div>
                                <MediaUploader 
                                    value={formData.og_image} 
                                    onChange={(url) => setFormData({...formData, og_image: url})} 
                                    placeholder="Image URL..."
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
                                >
                                    {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : <><FaSave /> Save SEO Settings</>}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
