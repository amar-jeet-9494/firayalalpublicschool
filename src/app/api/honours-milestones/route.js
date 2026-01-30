import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all items
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('honours_milestones')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add new item
export async function POST(request) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('honours_milestones')
            .insert([{
                title: body.title,
                designation: body.designation,
                image_url: body.image_url,
                link: body.link || '/photo-gallery/' // Default link if not provided
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update item
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, title, designation, image_url, link } = body;
        
        const { error } = await supabase
            .from('honours_milestones')
            .update({ title, designation, image_url, link })
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove item
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const { error } = await supabase
            .from('honours_milestones')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
