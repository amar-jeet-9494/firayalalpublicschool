import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch site settings (specifically theme_fonts)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'theme_fonts')
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        // Default settings if not found
        const defaultSettings = { 
            heading: 'Inter', 
            body: 'Times New Roman', 
            baseSize: '16px', 
            headingWeight: '600'
        };

        return NextResponse.json(data ? data.value : defaultSettings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Update site settings
export async function POST(request) {
    try {
        const body = await request.json();
        
        // key is constant for now
        const { error } = await supabase
            .from('site_settings')
            .upsert({ 
                key: 'theme_fonts', 
                value: body 
            }, { onConflict: 'key' });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
