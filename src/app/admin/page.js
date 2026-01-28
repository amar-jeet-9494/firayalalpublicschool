'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';
import './admin.css';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // For this MVP, we'll implement a simple hardcoded check
        // In Step 2, we can connect this to Supabase Auth if the user desires
        // Current credentials: admin / fps@2025
        if (email === 'admin@fps.com' && password === 'fps@2025') {
            // Set a simple cookie or local storage token
            localStorage.setItem('admin_token', 'authenticated');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="admin-login-container">
            <div className="login-card">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <FaLock className="w-8 h-8 text-[#10385c]" />
                    </div>
                </div>
                
                <h1 className="login-title">Admin Portal</h1>
                <p className="login-subtitle">Sign in to manage school data</p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@fps.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
