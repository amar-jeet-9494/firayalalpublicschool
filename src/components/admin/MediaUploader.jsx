'use client';

import { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaLink, FaImage, FaTrash } from 'react-icons/fa';

export default function MediaUploader({ value, onChange, placeholder = "Image URL..." }) {
    const [mode, setMode] = useState('upload'); // 'upload' | 'link'
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            onChange(data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const clearImage = () => {
        onChange('');
    };

    return (
        <div className="space-y-3">
            {/* Mode Switcher */}
            <div className="flex gap-4 border-b border-gray-100 pb-2">
                <button
                    type="button"
                    onClick={() => setMode('upload')}
                    className={`text-sm font-medium flex items-center gap-2 pb-1 transition-colors relative
                        ${mode === 'upload' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FaCloudUploadAlt /> Upload File
                    {mode === 'upload' && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
                </button>
                <button
                    type="button"
                    onClick={() => setMode('link')}
                    className={`text-sm font-medium flex items-center gap-2 pb-1 transition-colors relative
                        ${mode === 'link' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FaLink /> External URL
                    {mode === 'link' && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
                </button>
            </div>

            {/* Input Area */}
            <div className="flex gap-4 items-start">
                <div className="flex-1">
                    {mode === 'upload' ? (
                        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative" onClick={() => fileInputRef.current?.click()}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {uploading ? (
                                <div className="text-gray-500 flex flex-col items-center">
                                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                                    <span>Uploading...</span>
                                </div>
                            ) : (
                                <div className="text-gray-500 flex flex-col items-center">
                                    <FaCloudUploadAlt className="text-3xl mb-2 text-blue-400" />
                                    <span className="text-sm font-medium">Click to upload image</span>
                                    <span className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative">
                            <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="url"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={placeholder}
                            />
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="w-24 h-24 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                    {value ? (
                        <>
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={clearImage}
                                className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                title="Remove Image"
                            >
                                <FaTrash />
                            </button>
                        </>
                    ) : (
                        <div className="text-gray-300 flex flex-col items-center">
                            <FaImage size={20} />
                            <span className="text-[10px] mt-1">No Image</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
