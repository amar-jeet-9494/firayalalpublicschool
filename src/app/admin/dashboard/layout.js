'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../admin.css';

export default function DashboardLayout({ children }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <AdminSidebar onLogout={handleLogout} />

            {/* Header */}
            <AdminHeader />

            {/* Main Content */}
            <main className="pt-16 min-h-screen transition-all duration-300 md:pl-64">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
