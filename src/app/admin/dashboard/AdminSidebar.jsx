'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaCalendarAlt, FaBullhorn, FaCog, FaSignOutAlt, FaTable, FaChalkboardTeacher, FaEnvelope, FaGlobe, FaCommentDots, FaUserTie, FaStar, FaAward, FaImages } from 'react-icons/fa';

export default function AdminSidebar({ onLogout }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, href: '/admin/dashboard' },
        { name: 'Calendar', icon: <FaCalendarAlt />, href: '/admin/dashboard/calendar' },
        { name: 'Announcements', icon: <FaBullhorn />, href: '/admin/dashboard/announcements' },
        { name: 'Principal\'s Page', icon: <FaUserTie />, href: '/admin/dashboard/principal' },
        { name: 'Distinguished Feat', icon: <FaStar />, href: '/admin/dashboard/distinguished-feat' },
        { name: 'Honours & Milestones', icon: <FaAward />, href: '/admin/dashboard/honours-milestones' },
        { name: 'Faculty', icon: <FaChalkboardTeacher />, href: '/admin/dashboard/faculty' },
        { name: 'Enquiries', icon: <FaEnvelope />, href: '/admin/dashboard/enquiries' },
        { name: 'Testimonials', icon: <FaCommentDots />, href: '/admin/dashboard/testimonials' },
        { name: 'SEO Manager', icon: <FaGlobe />, href: '/admin/dashboard/seo' },
        { name: 'Photo Gallery', icon: <FaImages />, href: '/admin/dashboard/photo-gallery' },
        { name: 'Data Tables', icon: <FaTable />, href: '/admin/dashboard/editor' }, // Maybe link to dashboard or specific table list? Keep generic for now.
    ];

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transition-transform transform md:translate-x-0 -translate-x-full z-20 flex flex-col h-full shadow-xl">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <img
                        src="https://firayalalpublicschool.edu.in/wp-content/uploads/2020/10/fps-logo.png"
                        alt="FPS Logo"
                        className="w-8 h-8 object-contain"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    <span className="text-xl font-bold tracking-wide">FPS Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}

                <div className="pt-6 mt-6 border-t border-slate-800">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Settings</p>
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        <span className="text-lg"><FaCog /></span>
                        Settings
                    </Link>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                    suppressHydrationWarning
                >
                    <FaSignOutAlt />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
