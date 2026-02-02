import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    try {
        let query = supabase.from('notice_popups').select('*').order('created_at', { ascending: false });

        if (active) {
            query = query.eq('is_active', true);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, image_url, is_active } = body;

        // If setting this to active, optionally set others to inactive if we only want one active at a time?
        // For now, let's allow multiple or let the frontend pick the first active one. 
        // But usually "Notice" popup is singular. Let's not enforce DB constraint yet, just logic.

        const { data, error } = await supabase
            .from('notice_popups')
            .insert([{ title, image_url, is_active }])
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, title, image_url, is_active } = body;

        const { data, error } = await supabase
            .from('notice_popups')
            .update({ title, image_url, is_active })
            .eq('id', id)
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const { error } = await supabase
            .from('notice_popups')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
