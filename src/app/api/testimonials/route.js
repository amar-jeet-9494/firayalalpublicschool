import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch testimonials
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode'); // 'admin' or undefined (public)

    try {
        let query = supabase.from('testimonials').select('*');

        if (mode !== 'admin') {
            // Public view: Only approved
            query = query.eq('status', 'Approved');
        }

        // Sort by newest first
        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Submit new testimonial
export async function POST(request) {
    try {
        const body = await request.json();
        
        // Basic validation
        if (!body.name || !body.message || !body.category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('testimonials')
            .insert([{
                name: body.name,
                role: body.role, // e.g. Class 9 A
                category: body.category, // Student, Parent, Teacher
                message: body.message,
                image_url: body.image_url,
                rating: body.rating,
                email: body.email,
                phone: body.phone,
                submission_type: body.submission_type || 'Feedback',
                status: 'Pending' // Always pending by default
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Testimonial Submit Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update status (Admin)
export async function PUT(request) {
    try {
        const { id, status } = await request.json();
        
        const { error } = await supabase
            .from('testimonials')
            .update({ status })
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove testimonial (Admin)
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
