'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

export function TableEditorContent({ predefinedTable }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tableName = predefinedTable || searchParams.get('table');
    
    // If passed a predefined table (e.g. 'faculty'), we might want to override the title display
    const isPredefined = !!predefinedTable;

    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!tableName) {
            setLoading(false);
            return;
        }

        const fetchContent = async () => {
            try {
                const response = await fetch(`/api/dynamic-tables?name=${encodeURIComponent(tableName)}`);
                const data = await response.json();

                if (!response.ok) {
                    setMsg('Error loading table');
                    setLoading(false);
                    return;
                }

                if (data) {
                    const content = data.content; // Should be array of objects
                    if (Array.isArray(content) && content.length > 0) {
                        setRows(content);
                        setHeaders(Object.keys(content[0]));
                    } else if (Array.isArray(content) && content.length === 0) {
                         setRows([]);
                         setHeaders(['Column 1']); // Default if empty
                    }
                }
            } catch (err) {
                console.error(err);
                setMsg('Error loading table');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [tableName]);

    const handleCellChange = (rowIndex, header, value) => {
        const newRows = [...rows];
        newRows[rowIndex] = { ...newRows[rowIndex], [header]: value };
        setRows(newRows);
    };

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        
        try {
            const response = await fetch('/api/dynamic-tables', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: tableName, content: rows }),
            });
            
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            setMsg('Changes saved successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (error) {
            console.error(error);
            setMsg('Failed to save changes');
        }
        setSaving(false);
    };

    const handleAddRow = () => {
        const newRow = {};
        headers.forEach(h => newRow[h] = "");
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (index) => {
        if (confirm('Delete this row?')) {
            const newRows = rows.filter((_, i) => i !== index);
            setRows(newRows);
        }
    };

    if (loading) return <div className="p-10">Loading Data...</div>;

    if (!tableName) {
        return (
            <div className="p-10 text-center">
                <p className="text-gray-500 mb-4">No table selected.</p>
                <button 
                    onClick={() => router.back()}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    &larr; Back to Data Tables
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            {/* Toolbar - Only show if not predefined or if we want to show actions but no back button/title */ }
            {!isPredefined && (
            <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800">
                        <FaArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{tableName}</h1>
                        <p className="text-sm text-gray-500">{rows.length} Rows</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    {msg && <span className={`text-sm my-auto font-medium ${msg.includes('Success') ? 'text-green-600' : 'text-blue-600'}`}>{msg}</span>}
                    
                    <button onClick={handleAddRow} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <FaPlus /> Add Row
                    </button>
                    
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="px-4 py-2 bg-[#10385c] text-white rounded-md hover:bg-[#0d2e4d] flex items-center gap-2"
                    >
                        <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
            )}
            
            {/* If predefined, we still need the actions (Add/Save). So we should render a toolbar but simpler? 
               Actually, for predefined tables, we probably want the ADD/SAVE buttons but maybe not the Back button and Title if the wrapper page provides it.
               Let's render a simplified toolbar for predefined tables.
            */}
            {isPredefined && (
                 <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                    <div>
                        {/* Title handled by wrapper, but we can show row count here or nothing */}
                        <p className="text-sm text-gray-500">{rows.length} Records</p>
                    </div>

                    <div className="flex gap-3">
                        {msg && <span className={`text-sm my-auto font-medium ${msg.includes('Success') ? 'text-green-600' : 'text-blue-600'}`}>{msg}</span>}
                        
                        <button onClick={handleAddRow} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <FaPlus /> Add Member
                        </button>
                        
                        <button 
                            onClick={handleSave} 
                            disabled={saving}
                            className="px-4 py-2 bg-[#10385c] text-white rounded-md hover:bg-[#0d2e4d] flex items-center gap-2"
                        >
                            <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}

            {/* Editor Grid */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="admin-table w-full text-left">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="w-10 px-4 py-3 border-b font-medium text-gray-500">#</th>
                                    {headers.map(h => (
                                        <th key={h} className="px-4 py-3 border-b font-medium text-gray-500 min-w-[150px]">{h}</th>
                                    ))}
                                    <th className="w-10 px-4 py-3 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50 group">
                                        <td className="px-4 py-2 text-gray-400 text-sm border-b">{rowIndex + 1}</td>
                                        {headers.map(header => (
                                            <td key={`${rowIndex}-${header}`} className="border-b p-0">
                                                <input 
                                                    type="text" 
                                                    className="w-full h-full px-4 py-3 bg-transparent border-none focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
                                                    value={row[header] || ''}
                                                    onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                                                />
                                            </td>
                                        ))}
                                        <td className="border-b px-2 text-center">
                                            <button 
                                                onClick={() => handleDeleteRow(rowIndex)}
                                                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete Row"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TableEditorPage() {
    return (
        <Suspense fallback={<div>Loading Editor...</div>}>
            <TableEditorContent />
        </Suspense>
    );
}
