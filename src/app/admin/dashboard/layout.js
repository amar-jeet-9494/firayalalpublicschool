'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaTable, FaSignOutAlt, FaCog } from 'react-icons/fa';
import '../admin.css';

export default function DashboardLayout({ children }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin');
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="/logo.png" alt="FPS" className="w-8 h-8" onError={(e) => e.target.style.display='none'} />
                    <span className="brand-name">FPS Admin</span>
                </div>
                
                <nav className="sidebar-nav">
                    <Link href="/admin/dashboard" className="nav-item active">
                        <FaTable className="nav-icon" />
                        <span>Data Tables</span>
                    </Link>
                    <Link href="#" className="nav-item">
                        <FaCog className="nav-icon" />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
