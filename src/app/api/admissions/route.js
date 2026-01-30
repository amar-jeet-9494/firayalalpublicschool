import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEnquiryEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // 1. Insert into Supabase
    const { error } = await supabase
      .from('admissions')
      .insert([data]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Send Email
    const emailSent = await sendEnquiryEmail('amarjeet@globalwebify.com', data);

    return NextResponse.json({ success: true, emailSent });
  } catch (error) {
    console.error('Admission API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
    try {
        const { id, status } = await request.json();
        const { error } = await supabase
            .from('admissions')
            .update({ status })
            .eq('id', id);
        
        if(error) throw error;
        return NextResponse.json({ success: true });
    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
