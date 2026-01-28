const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Manual env loader
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
        console.error("Error reading .env.local");
        process.exit(1);
    }
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    const { data, error } = await supabase
        .from('dynamic_tables')
        .select('name');
    

    if (error) console.error(error);
    else fs.writeFileSync('tables_list.txt', JSON.stringify(data, null, 2));
}

listTables();
