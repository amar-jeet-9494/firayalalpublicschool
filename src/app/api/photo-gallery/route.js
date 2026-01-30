import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all images
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('photo_gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add new image
export async function POST(request) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('photo_gallery')
            .insert([{
                image_url: body.image_url,
                category: body.category
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update image (e.g. toggle annual day)
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        const { data, error } = await supabase
            .from('photo_gallery')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove image
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const { error } = await supabase
            .from('photo_gallery')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
