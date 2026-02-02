'use client';

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function NoticePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [popupData, setPopupData] = useState(null);

    useEffect(() => {
        const fetchPopup = async () => {
            try {
                // Fetch active popups
                const res = await fetch('/api/notice-popup?active=true');
                const data = await res.json();

                if (data && data.length > 0) {
                    // Use the most recent active popup
                    // Assuming the API returns logic or we pick the first one
                    const activePopup = data[0];

                    // Logic to check if already seen in this session?
                    // User said "when home page loads", implying every time. 
                    // Let's check session storage if we want to limit it, but for now, show it.
                    // To follow best practices, we might use sessionStorage to show only once per session if desired.
                    // But requirement is "when home page loads", so let's show it.

                    // Optional: Check if previously closed in this session to avoid annoyance?
                    // const seen = sessionStorage.getItem(`notice_seen_${activePopup.id}`);
                    // if (!seen) {
                    setPopupData(activePopup);
                    setIsOpen(true);
                    // }
                }
            } catch (error) {
                console.error('Failed to fetch notice popup:', error);
            }
        };

        fetchPopup();
    }, []);

    if (!isOpen || !popupData) return null;

    const handleClose = () => {
        setIsOpen(false);
        // sessionStorage.setItem(`notice_seen_${popupData.id}`, 'true');
    };

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div
                className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300"
                style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-2xl font-serif font-bold text-[#0B2C54] mx-auto">
                        {popupData.title || 'Notice'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close notice"
                    >
                        <FaTimes className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-1 overflow-y-auto bg-gray-50">
                    {popupData.image_url ? (
                        <img
                            src={popupData.image_url}
                            alt={popupData.title || "Notice Content"}
                            className="w-full h-auto object-contain block rounded-lg"
                        />
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No content available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
