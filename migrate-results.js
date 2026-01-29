
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

const resultsData = [
    {
        year: '2024 - 2025',
        heading: 'FPS Result - 2024',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/2-3.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/COMMERCE.avif'
        ]
    },
    {
        year: '2023 - 2024',
        heading: 'FPS Result - 2023',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-20-at-12.40.02_bf02af2e.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-20-at-12.40.02_284a0aee.avif'
        ]
    },
    {
        year: '2022 - 2023',
        heading: 'FPS Result - 2022',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif'
        ]
    },
    {
        year: '2021 - 2022',
        heading: 'FPS Result - 2022',
        images: [
             'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22b.avif',
             'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/22a.avif'
        ]
    },
    {
        year: '2020 - 2021',
        heading: 'FPS Result - 2021',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/21b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/21a.avif'
        ]
    },
    {
        year: '2019 - 2020',
        heading: 'FPS Result - 2020',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/20a.avif'
        ]
    },
    {
        year: '2018 - 2019',
        heading: 'FPS Result - 2019',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/19c.avif'
        ]
    },
    {
        year: '2017 - 2018',
        heading: 'FPS Result - 2018',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/18b-1.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/18a-1.avif'
        ]
    },
    {
        year: '2016 - 2017',
        heading: 'FPS Result - 2017',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/17a-1.avif'
        ]
    },
    {
        year: '2015 - 2016',
        heading: 'FPS Result - 2016',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/16d.avif'
        ]
    },
    {
        year: '2014 - 2015',
        heading: 'FPS Result - 2015',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15e.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/15f.avif'
        ]
    },
    {
        year: '2013 - 2014',
        heading: 'FPS Result - 2014',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014g.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014b.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014d.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014c.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014f.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2014e.avif'

        ]
    },
    {
        year: '2012 - 2013',
        heading: 'FPS Result - 2013',
        images: [
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2013a.avif',
            'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/09/2013b.avif'
        ]
    }
];

async function migrateResults() {
    console.log("Preparing Results Data Migration...");

    const tableName = 'results_data';

    // Upsert into dynamic_tables
    const { data, error } = await supabase
        .from('dynamic_tables')
        .upsert({ 
            name: tableName, 
            content: resultsData 
        }, { onConflict: 'name' })
        .select();

    if (error) {
        console.error("Error migrating results data:", error);
    } else {
        console.log(`Successfully migrated ${tableName} to Supabase!`);
    }
}

migrateResults();
