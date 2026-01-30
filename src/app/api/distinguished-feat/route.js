import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all feats
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('distinguished_feat')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add new feat
export async function POST(request) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('distinguished_feat')
            .insert([{
                title: body.title,
                image_url: body.image_url,
                alt_text: body.alt_text || body.title
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update feat
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, title, image_url, alt_text } = body;
        
        const { error } = await supabase
            .from('distinguished_feat')
            .update({ title, image_url, alt_text })
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove feat
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const { error } = await supabase
            .from('distinguished_feat')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
