import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch SEO data
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    try {
        if (path) {
            // Fetch single page
            const { data, error } = await supabase
                .from('page_seo')
                .select('*')
                .eq('page_path', path)
                .single();
            
            if (error && error.code !== 'PGRST116') throw error; // Ignore not found error
            return NextResponse.json({ data: data || null });
        } else {
            // Fetch all pages (limited to 100 for now)
            const { data, error } = await supabase
                .from('page_seo')
                .select('*')
                .order('page_path');
            
            if (error) throw error;
            return NextResponse.json({ data });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Upsert SEO data
export async function POST(request) {
    try {
        const body = await request.json();
        const { page_path, title, description, keywords, og_image } = body;

        // Upsert (Insert or Update if page_path exists)
        const { data, error } = await supabase
            .from('page_seo')
            .upsert({ 
                page_path, 
                title, 
                description, 
                keywords, 
                og_image,
                updated_at: new Date().toISOString()
            }, { onConflict: 'page_path' })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('SEO Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
