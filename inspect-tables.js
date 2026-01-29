
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env.local
let env = {};
try {
    const envPath = path.resolve('.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
        }
    });
} catch (e) {
    console.error("Could not read .env.local", e);
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials not found in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tablesToCheck = [
    '18-middle-stage-2026-01-28',
    '20-strength.csv-2026-01-28',
    '4-school-focus-area-details-2026-01-28',
    '21-foundational-stage-2026-01-28',
    '19-secondary-stage-2026-01-28',
    '10-school-rooms-2026-01-28',
    '3-school-class-strength-2026-01-28' // added to compare with 20-strength
];

async function inspect() {
    console.log("Inspecting tables...");
    
    // First, list all tables via dynamic_tables to be sure we have the right names
    const { data: dynamicTables, error: dtError } = await supabase
        .from('dynamic_tables')
        .select('name');
        
    if (dtError) {
        console.error("Error fetching dynamic tables list:", dtError);
        return;
    }

    const availableNames = dynamicTables.map(t => t.name);
    
    for (const tableName of tablesToCheck) {
        if (!availableNames.includes(tableName)) {
            console.log(`\n[${tableName}] NOT FOUND in dynamic_tables`);
            continue;
        }

        const { data, error } = await supabase
            .from('dynamic_tables')
            .select('content')
            .eq('name', tableName)
            .single();

        if (error) {
            console.error(`Error fetching ${tableName}:`, error.message);
        } else if (data && data.content && data.content.length > 0) {
            console.log(`\n[${tableName}] Sample Row (Total Rows: ${data.content.length}):`);
            // Show keys of the first row
            console.log("Keys:", Object.keys(data.content[0]));
            console.log("Row:", JSON.stringify(data.content[0], null, 2));
        } else {
             console.log(`\n[${tableName}] is empty or invalid structure.`);
        }
    }
}

inspect();
