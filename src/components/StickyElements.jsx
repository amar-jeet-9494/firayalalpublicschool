'use client';

import { useState } from 'react';

export default function StickyElements() {
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);

    return (
        <>
            {/* Bell Icon - Left Side */}
            <div className="fixed left-4 top-1/3 z-50">
                <a
                    href="#notifications"
                    className="fps-notify-bell"
                    aria-label="Notifications"
                >
                    🔔
                </a>
            </div>

            {/* Admission Enquiry - Right Side Vertical */}
            <button
                onClick={() => setShowEnquiryForm(true)}
                className="fixed right-0 top-1/3 z-50 bg-gradient-to-b from-blue-600 to-blue-700 text-white py-4 px-3 rounded-l-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all hover:-translate-x-1"
            >
                <span className="writing-vertical text-sm font-semibold tracking-wider">
                    Admission Enquiry
                </span>
            </button>

            {/* Phone Icon - Right Side Sticky */}
            <a
                href="tel:+911234567890"
                className="fixed right-0 top-[calc(50%+120px)] z-50 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-l-[5px] flex items-center justify-center text-white shadow-lg hover:-translate-x-1 transition-all hover:shadow-cyan-500/50"
                aria-label="Call us"
            >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
            </a>

            {/* WhatsApp Icon - Right Side Sticky */}
            <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed right-0 top-[calc(50%+180px)] z-50 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-l-[5px] flex items-center justify-center text-white shadow-lg hover:-translate-x-1 transition-all hover:shadow-green-500/50"
                aria-label="Chat on WhatsApp"
            >
                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>

            {/* Enquiry Form Modal */}
            {showEnquiryForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-scale-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Admission Enquiry</h3>
                            <button
                                onClick={() => setShowEnquiryForm(false)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Student Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-500">
                                <option value="">Select Class</option>
                                <option value="nursery">Nursery</option>
                                <option value="lkg">LKG</option>
                                <option value="ukg">UKG</option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                                <option value="4">Class 4</option>
                                <option value="5">Class 5</option>
                                <option value="6">Class 6</option>
                                <option value="7">Class 7</option>
                                <option value="8">Class 8</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                            <textarea
                                placeholder="Your Message"
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg"
                            >
                                Submit Enquiry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
