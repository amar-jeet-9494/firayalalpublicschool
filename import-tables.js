const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// 1. Check for keys
// Note: This script runs in Node, so we might need to load .env.local manualy if not using 'dotenv' package explicitly.
// For simplicity, we'll try to read the file manually if process.env is empty.
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        envFile.split('\n').forEach(line => {
            if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
            if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
        });
    } catch (e) {
        console.error("Error reading .env.local. Make sure it exists!");
        process.exit(1);
    }
}

const supabase = createClient(supabaseUrl, supabaseKey);
const TABLE_DIR = './tablepress';

async function importTables() {
    if (!fs.existsSync(TABLE_DIR)) {
        console.error(`Directory ${TABLE_DIR} not found! Please create it and put your CSVs there.`);
        return;
    }

    const files = fs.readdirSync(TABLE_DIR).filter(file => file.endsWith('.csv'));
    console.log(`Found ${files.length} CSV files to import...`);

    for (const file of files) {
        const tableName = path.basename(file, '.csv').toLowerCase().replace(/\s+/g, '_'); // e.g. "School Timetable.csv" -> "school_timetable"
        console.log(`Processing ${file} -> Table Name: ${tableName}`);

        const results = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(TABLE_DIR, file))
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });

        // Upload to Supabase
        const { error } = await supabase
            .from('dynamic_tables')
            .upsert({ 
                name: tableName, 
                content: results 
            }, { onConflict: 'name' });

        if (error) console.error(`Failed to import ${tableName}:`, error.message);
        else console.log(`Successfully imported ${tableName} (${results.length} rows)`);
    }
}

importTables();
