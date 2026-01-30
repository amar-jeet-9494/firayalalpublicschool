import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replaceAll(' ', '_');
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // Ignore error if directory already exists
    }

    // Write file to public/uploads
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the relative URL
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
