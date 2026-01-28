'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

function TableEditorContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tableName = searchParams.get('table');

    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!tableName) return;

        const fetchContent = async () => {
            const { data, error } = await supabase
                .from('dynamic_tables')
                .select('content')
                .eq('name', tableName)
                .single();
            
            if (error) {
                console.error(error);
                setMsg('Error loading table');
            } else if (data) {
                const content = data.content; // Should be array of objects
                if (Array.isArray(content) && content.length > 0) {
                    setRows(content);
                    setHeaders(Object.keys(content[0]));
                } else if (Array.isArray(content) && content.length === 0) {
                     setRows([]);
                     setHeaders(['Column 1']); // Default if empty
                }
            }
            setLoading(false);
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
        const { error } = await supabase
            .from('dynamic_tables')
            .update({ content: rows })
            .eq('name', tableName);

        if (error) {
            setMsg('Failed to save changes');
        } else {
            setMsg('Changes saved successfully!');
            setTimeout(() => setMsg(''), 3000);
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

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
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
