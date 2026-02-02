import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to get the Education Section ID
async function getEducationSectionId() {
    // 1. Get Home Page ID
    const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', '/')
        .single();
    
    if (pageError || !page) throw new Error('Home page not found');

    // 2. Get Section ID
    const { data: section, error: sectionError } = await supabase
        .from('sections')
        .select('id')
        .eq('page_id', page.id)
        .eq('component_type', 'EducationSection')
        .single();

    if (sectionError || !section) throw new Error('Education section not found');

    return section.id;
}

export async function GET() {
    try {
        const id = await getEducationSectionId();
        
        const { data, error } = await supabase
            .from('sections')
            .select('content')
            .eq('id', id)
            .single();

        if (error) throw error;
        
        // Return just the content for the frontend form
        return NextResponse.json({ data: data.content });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const id = await getEducationSectionId();

        // Update the content field
        const { data, error } = await supabase
            .from('sections')
            .update({ content: body })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data: data.content });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
