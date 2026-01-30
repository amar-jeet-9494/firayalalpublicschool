'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    FaSearch, FaSortAmountDown, FaPlus, FaFilter, 
    FaEdit, FaTrash, FaTimes, FaCamera, FaArrowLeft, FaChalkboardTeacher 
} from 'react-icons/fa';
import MediaUploader from '@/components/admin/MediaUploader';

// Departments from public page config
const departments = [
    { key: 'leadership', title: 'Leadership' },
    { key: 'examination', title: 'Examination Department' },
    { key: 'administration', title: 'Administration Department' },
    { key: 'foundational', title: 'Foundational Section' },
    { key: 'elementary', title: 'Elementary Section' },
    { key: 'middle', title: 'Middle Section' },
    { key: 'senior', title: 'Senior Section' },
    { key: 'coScholastic', title: 'Co-Scholastic' },
    { key: 'ge4Staff', title: 'GE4 Staff' }
];

export default function FacultyAdminPage() {
    const router = useRouter();
    const TABLE_NAME = 'faculty_master_list';

    // State
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Positions');
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'a-z'
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null); // null = add mode
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        category: 'leadership',
        image: '',
        isCoordinator: false
    });
    const [saving, setSaving] = useState(false);

    // Fetch Data
    const fetchFaculty = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/dynamic-tables?name=${TABLE_NAME}`);
            const data = await response.json();
            if (data && data.content) {
                // Ensure content is array
                setFaculty(Array.isArray(data.content) ? data.content : []);
            } else {
                setFaculty([]);
            }
        } catch (error) {
            console.error('Error fetching faculty:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaculty();
    }, []);

    // Filter and Sort Logic
    const filteredFaculty = faculty.filter(member => {
        const matchesSearch = member.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              member.designation?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Positions' || member.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedFaculty = [...filteredFaculty].sort((a, b) => {
        if (sortOrder === 'a-z') return (a.name || '').localeCompare(b.name || '');
        // For 'newest', we assume array order represents addition order (fetch returns natural order)
        // So reversing for newest, keeping for oldest if we assume append-only.
        // If we don't have created_at, we rely on index.
        if (sortOrder === 'newest') return -1; 
        if (sortOrder === 'oldest') return 1;
        return 0;
    });

    // CRUD Handlers
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            let newContent = [...faculty];
            
            if (editingMember !== null) {
                // Update
                newContent[editingMember] = formData; // editingMember is index here for simplicity
            } else {
                // Add
                newContent.push(formData);
            }

            const response = await fetch('/api/dynamic-tables', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: TABLE_NAME, content: newContent }),
            });

            if (!response.ok) throw new Error('Failed to save');

            setFaculty(newContent);
            closeModal();
        } catch (error) {
            console.error('Error saving faculty:', error);
            alert('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (index) => {
        if (!confirm('Are you sure you want to delete this faculty member?')) return;

        try {
            const newContent = faculty.filter((_, i) => i !== index);
            
            const response = await fetch('/api/dynamic-tables', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: TABLE_NAME, content: newContent }),
            });

            if (!response.ok) throw new Error('Failed to delete');

            setFaculty(newContent);
        } catch (error) {
            console.error('Error deleting faculty:', error);
            alert('Failed to delete. Please try again.');
        }
    };

    // Modal Helpers
    const openAddModal = () => {
        setEditingMember(null);
        setFormData({ name: '', designation: '', category: 'leadership', image: '', isCoordinator: false });
        setIsModalOpen(true);
    };

    const openEditModal = (member, index) => {
        setEditingMember(index);
        setFormData({ ...member });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.replace(/^(Mrs?\.?|Ms\.?|Dr\.?|Shri\.?)\s*/i, '').split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return parts[0].substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <FaArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manage Faculty</h1>
                        <p className="text-slate-500 text-sm">Add and edit the faculty profiles displayed on the site.</p>
                    </div>
                </div>
                <button 
                    onClick={openAddModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                    <FaPlus size={14} /> Add Faculty
                </button>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search faculty..." 
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="relative">
                            <select 
                                className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-blue-400 cursor-pointer min-w-[200px]"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All Positions">All Positions</option>
                                {departments.map(d => (
                                    <option key={d.key} value={d.key}>{d.title}</option>
                                ))}
                            </select>
                            <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                        </div>

                        <div className="relative">
                            <select 
                                className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-blue-400 cursor-pointer min-w-[180px]"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="newest">Sort: Newest First</option>
                                <option value="oldest">Sort: Oldest First</option>
                                <option value="a-z">Sort: A-Z</option>
                            </select>
                            <FaSortAmountDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                        </div>
                    </div>
                </div>

                {/* List View */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading faculty members...</div>
                ) : filteredFaculty.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaChalkboardTeacher className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">No faculty members found</h3>
                        <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or add a new faculty member.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedFaculty.map((member, index) => {
                            // Find actual index in original array for deletion/editing
                            // This is tricky if sorting/filtering. 
                            // Quick fix: pass the member object to modal, but for saving we need index.
                            // Better: map original index to the sorted item or find index by reference if unique.
                            // Assuming unique objects, or just using indexOf on save? 
                            // Let's rely on finding index in handleCRUD based on object reference or adding an ID.
                            // Since we don't have stable IDs, we'll find index in the full 'faculty' array.
                            const originalIndex = faculty.indexOf(member);

                            return (
                                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                                                    {getInitials(member.name)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                                                {member.isCoordinator && (
                                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Coordinator</span>
                                                )}
                                            </div>
                                            <p className="text-gray-500 text-sm">{member.designation}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                    {departments.find(d => d.key === member.category)?.title || member.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 pl-16 md:pl-0">
                                        <button 
                                            onClick={() => openEditModal(member, originalIndex)}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                                        >
                                            <FaEdit size={14} /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(originalIndex)}
                                            className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 flex items-center gap-2 transition-colors"
                                        >
                                            <FaTrash size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                <div className="mt-6 text-sm text-gray-500">
                    Showing {filteredFaculty.length} of {faculty.length} entries
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">
                                {editingMember !== null ? 'Edit Faculty Member' : 'Add New Faculty Member'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Mr. John Doe"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.designation}
                                    onChange={e => setFormData({...formData, designation: e.target.value})}
                                    placeholder="e.g. Senior Mathematics Teacher"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category / Section</label>
                                    <select 
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                    >
                                        {departments.map(d => (
                                            <option key={d.key} value={d.key}>{d.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            checked={formData.isCoordinator}
                                            onChange={e => setFormData({...formData, isCoordinator: e.target.checked})}
                                        />
                                        <span className="text-sm font-medium text-gray-700">Is Coordinator via Organogram?</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Image</label>
                                <MediaUploader 
                                    value={formData.image} 
                                    onChange={(url) => setFormData({...formData, image: url})} 
                                    placeholder="Enter image URL or upload file..."
                                />
                            </div>

                            <div className="pt-4 flex gap-3 justify-end">
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    {saving ? 'Saving...' : (editingMember !== null ? 'Save Changes' : 'Add Faculty')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
