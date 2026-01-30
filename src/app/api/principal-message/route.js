import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch principal message (row with id=1)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('principal_message')
            .select('*')
            .eq('id', 1)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // Ignore not found, return null
        return NextResponse.json({ data: data || null });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Update or Insert principal message (always id=1)
export async function POST(request) {
    try {
        const body = await request.json();
        
        // We use upsert with id=1 to ensure there's only one record
        const { data, error } = await supabase
            .from('principal_message')
            .upsert({ 
                id: 1,
                name: body.name,
                designation: body.designation,
                message: body.message,
                image_url: body.image_url,
                carousel_slides: body.carousel_slides, // JSONB array
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Principal Message Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
