'use client';

import { useState, useEffect } from 'react';
import { FaFont, FaSave, FaUndo } from 'react-icons/fa';

const FONT_OPTIONS = [
    "Inter", "Roboto", "Open Sans", "Lato", "Poppins", 
    "Montserrat", "Oswald", "Raleway", "Playfair Display", 
    "Merriweather", "Times New Roman", "Arial", "Georgia"
];

const WEIGHT_OPTIONS = [
    { label: "Normal (400)", value: "400" },
    { label: "Medium (500)", value: "500" },
    { label: "Semi Bold (600)", value: "600" },
    { label: "Bold (700)", value: "700" },
    { label: "Extra Bold (800)", value: "800" },
];

export default function AppearanceSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // Initial State
    const [settings, setSettings] = useState({
        heading: 'Inter',
        body: 'Times New Roman',
        baseSize: '16px',
        headingWeight: '600'
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error("Failed to load settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Appearance settings updated successfully!' });
                // Force reload/refresh for admin to see changes if they persist in admin, 
                // but mainly for the public site.
                // We might want to construct the preview link dynamically here too.
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <FaFont className="text-blue-600" /> 
                    Appearance & Theme
                </h1>
                <p className="text-slate-500 mt-2">Customize the look and feel of your website fonts.</p>
            </div>

            {message.text && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Headings Configuration */}
                    <div className="pb-6 border-b border-slate-100">
                        <h2 className="text-xl font-semibold text-slate-800 mb-6">Headings Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Heading Font Family</label>
                                <div className="relative">
                                    <select 
                                        name="heading" 
                                        value={settings.heading} 
                                        onChange={handleChange}
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    >
                                        <option value="">Select a font...</option>
                                        {FONT_OPTIONS.map(font => (
                                            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Used for H1, H2, H3, etc.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Heading Font Weight</label>
                                <select 
                                    name="headingWeight" 
                                    value={settings.headingWeight} 
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    {WEIGHT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Body Text Configuration */}
                    <div className="pb-6 border-b border-slate-100">
                        <h2 className="text-xl font-semibold text-slate-800 mb-6">Body Text Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Body Font Family</label>
                                <select 
                                    name="body" 
                                    value={settings.body} 
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    <option value="">Select a font...</option>
                                    {FONT_OPTIONS.map(font => (
                                        <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-slate-500 mt-2">Used for paragraphs and general text.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Base Font Size</label>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="range" 
                                        name="baseSize"
                                        min="14" 
                                        max="20" 
                                        step="1"
                                        value={parseInt(settings.baseSize)} 
                                        onChange={(e) => handleChange({ target: { name: 'baseSize', value: `${e.target.value}px` }})}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-slate-700 font-mono w-16 text-center bg-slate-100 py-1 rounded">
                                        {settings.baseSize}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Live Preview</h3>
                        <div className="space-y-4" style={{ 
                            fontFamily: `"${settings.body}", sans-serif`,
                            fontSize: settings.baseSize 
                        }}>
                            <h2 style={{ 
                                fontFamily: `"${settings.heading}", sans-serif`,
                                fontWeight: settings.headingWeight,
                                fontSize: '2em',
                                lineHeight: 1.2
                            }}>
                                This is a Heading Preview
                            </h2>
                            <p>
                                This is how your body text will look. Dynamic font customization allows you to maintain brand consistency across your website. 
                                The prompt brown fox jumps over the lazy dog.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={fetchSettings} // Reset to saved
                            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                            <FaUndo size={14} /> Reset
                        </button>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center gap-2"
                        >
                            {saving ? 'Saving...' : <><FaSave /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
