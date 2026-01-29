'use client';

import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

export default function AdminHeader() {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10 shadow-sm">
            {/* Search (Optional/Decorative) */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100 w-64">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm text-gray-600 w-full"
                    suppressHydrationWarning
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
                    <FaBell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800 leading-none">Admin User</p>
                        <p className="text-xs text-gray-500 mt-1">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FaUserCircle size={24} />
                    </div>
                </div>
            </div>
        </header>
    );
}
