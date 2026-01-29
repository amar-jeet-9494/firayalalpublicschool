import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        if (name) {
            // Fetch content of a specific table
            const { data, error } = await supabase
                .from('dynamic_tables')
                .select('content')
                .eq('name', name)
                .single();
            
            if (error) throw error;
            return NextResponse.json(data);
        } else {
            // Fetch list of all tables (for dashboard)
            const { data, error } = await supabase
                .from('dynamic_tables')
                .select('id, name, created_at')
                .order('name', { ascending: true });

            if (error) throw error;
            return NextResponse.json(data);
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { name, content } = body;
        
        if (!name || !content) {
            return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('dynamic_tables')
            .update({ content })
            .eq('name', name)
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
