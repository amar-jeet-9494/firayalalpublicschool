
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

const facultyData = {
    leadership: [
        { 
            name: 'Mrs. Sushma Munjal', 
            designation: 'Academic Director',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Directorm.avif'
        },
        { 
            name: 'Shri. Niraj Kumar Sinha', 
            designation: 'Principal',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-14.avif'
        },
        { 
            name: 'Mrs. Haneet Munjal', 
            designation: 'Vice Principal',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-14.avif'
        }
    ],
    examination: [
        { 
            name: 'Mr. Sunil Prasad', 
            designation: 'Examination Incharge',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/22.avif'
        },
        { 
            name: 'Mr. Dhruva Narayan Saha', 
            designation: 'HOD | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Dhruva-1.avif'
        },
        { 
            name: 'Mrs. Archana', 
            designation: 'HOD | Hindi',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/27.avif'
        },
        { 
            name: 'Mr. Vinay Kumar Balabhadra', 
            designation: 'HOD | Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-8.avif'
        },
        { 
            name: 'Mr. Baban Kumar Tiwari', 
            designation: 'HOD | Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Baban-1.avif'
        },
        { 
            name: 'Mrs. Anchan Prasad Keshari', 
            designation: 'HOD | Social Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/24.avif'
        },
        { 
            name: 'Mr. Sanjeev Kumar Shrivastava', 
            designation: 'HOD | Computer Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-12.avif'
        }
    ],
    administration: [
        { 
            name: 'Mr. Kumar Bijayraj Verma', 
            designation: 'Administrative Incharge',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Bijay.avif'
        },
        { 
            name: 'Mrs. Guneet', 
            designation: 'Public Relations Officer',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Gunnet.avif'
        },
        { 
            name: 'Mr. Niraj', 
            designation: 'Accountant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Niraj.avif'
        }
    ],
    foundational: [
        { 
            name: 'Mrs. Supriti Shekhar', 
            designation: 'Foundational Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Supriti.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Naghma Mallick', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/14.avif'
        },
        { 
            name: 'Mrs. Sushma Thapa', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/17.avif'
        },
        { 
            name: 'Ms. Ichha Nagpal', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Iccha.avif'
        },
        { 
            name: 'Ms. Ria Raj', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Ria.avif'
        },
        { 
            name: 'Mrs. Shalu Aggarwal', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-7.avif'
        }
    ],
    elementary: [
        { 
            name: 'Mrs. Padmaja Pattayat', 
            designation: 'Elementary Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/31.avif',
            isCoordinator: true 
        },
        { 
            name: 'Ms. Ishrani Viola Barla', 
            designation: 'TGT Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/19.avif'
        },
        { 
            name: 'Mrs. Shefali Chakraborty', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/23.avif'
        },
        { 
            name: 'Mrs. Shashikala Singh', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/28.avif'
        },
        { 
            name: 'Mr. Manish', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-10.avif'
        },
        { 
            name: 'Ms. Moushmi Mahto', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Moushmi.avif'
        },
        { 
            name: 'Ms. Ankita Rani', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Ankita.avif'
        },
        { 
            name: 'Mrs. Sneha Kumari', 
            designation: 'PRT',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/32.avif'
        }
    ],
    middle: [
        { 
            name: 'Mrs. Sravani Sinha', 
            designation: 'Middle Section Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/13.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Doel Roy', 
            designation: 'TGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Doel.avif'
        },
        { 
            name: 'Mrs. Anchan Prasad Keshari', 
            designation: 'TGT | Social Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/24.avif'
        },
        { 
            name: 'Mrs. Silki Roba', 
            designation: 'TGT | Social Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Silki.avif'
        },
        { 
            name: 'Mrs. Usha Pandey', 
            designation: 'TGT | Hindi & Sanskrit',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Usha.avif'
        },
        { 
            name: 'Ms. Ayushi Prasad', 
            designation: 'PGT | Chemistry',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/12.avif'
        },
        { 
            name: 'Mrs. Puja Kumari', 
            designation: 'PGT | Chemistry',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/20.avif'
        },
        { 
            name: 'Mr. Abhiraj Mitra', 
            designation: 'PGT I Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/10.avif'
        },
        { 
            name: 'Mr. Sanjeev Sinha', 
            designation: 'TGT I I.T.',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-3.avif'
        }
    ],
    senior: [
        { 
            name: 'Mrs. Shiny Singh', 
            designation: 'Senior Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Shiny.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Archana', 
            designation: 'PGT Hindi',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/27.avif'
        },
        { 
            name: 'Mr. Kumar Bijayraj Verma', 
            designation: 'PGT | PHE',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/Bijay.avif'
        },
        { 
            name: 'Mr. Sunil Prasad', 
            designation: 'TGT | Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/22.avif'
        },
        { 
            name: 'Mr. Sanjeev Kumar Shrivastava', 
            designation: 'PGT | I.P.',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-12.avif'
        },
        { 
            name: 'Dr. Monika Bhatia', 
            designation: 'PGT | Economics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/16.avif'
        },
        { 
            name: 'Mr. Baban Kumar Tiwari', 
            designation: 'TGT | Science',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Baban.avif'
        },
        { 
            name: 'Mr. Shyama Nand Sah', 
            designation: 'PGT | Physics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Shyama.avif'
        },
        { 
            name: 'Mr. Dhruva Narayan Saha', 
            designation: 'PGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Dhruva.avif'
        },
        { 
            name: 'Mr. Vinay Kumar Balabhadra', 
            designation: 'PGT | Mathematics',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-8.avif'
        },
        { 
            name: 'Mrs. Manorama Kumari', 
            designation: 'PGT | Biology',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Manorama.avif'
        },
        { 
            name: 'Mrs. Shilpa Roy', 
            designation: 'PGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Shilpa.avif'
        },
        { 
            name: 'Mrs. Sonal Kumari Singh', 
            designation: 'PGT | B.St. & Accounts',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Sonal.PNG'
        },
        { 
            name: 'Mrs. Richa Ghosh', 
            designation: 'PGT | English',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/13-1.avif'
        }
    ],
    coScholastic: [
        { 
            name: 'Mrs. Krishna Samson', 
            designation: 'Skill Vantage Coordinator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/14-3.avif',
            isCoordinator: true 
        },
        { 
            name: 'Mrs. Mukta Rani', 
            designation: 'Art & Craft Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/10/29.avif'
        },
        { 
            name: 'Mr. Amit Kumar Modak', 
            designation: 'PTE',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Amit.avif'
        },
        { 
            name: 'Mr. Amar Pathak', 
            designation: 'Music Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/10-3.avif'
        },
        { 
            name: 'Mr. Uttam Prasad', 
            designation: 'Dance Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/8-4.avif'
        },
        { 
            name: 'Ms. Suman Beauty', 
            designation: 'Librarian',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/9-4.avif'
        },
        { 
            name: 'Mr. Manish Kumar', 
            designation: 'Table Tennis Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/1-12.avif'
        },
        { 
            name: 'Mr. Gyani Kumar', 
            designation: 'Taekwondo Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/14-2.avif'
        },
        { 
            name: 'Mr. Sumit Singh', 
            designation: 'Kabaddi Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/3-7.avif'
        },
        { 
            name: 'Mr. Avinash Thapa', 
            designation: 'Basketball Educator',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/2-11.avif'
        }
    ],
    ge4Staff: [
        { 
            name: 'Agatha Topno', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/18.avif'
        },
        { 
            name: 'Suman Kachhap', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/19.avif'
        },
        { 
            name: 'Laxmi Rani', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/22.avif'
        },
        { 
            name: 'Magdali Xalxo', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/25.avif'
        },
        { 
            name: 'Amar Lata Toppo', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/26.avif'
        },
        { 
            name: 'Sandhya Devi', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Sandhya.avif'
        },
        { 
            name: 'Sarita Choudhary', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Savita.avif'
        },
        { 
            name: 'Renu Devi', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Renu.avif'
        },
        { 
            name: 'Purnima Devi', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Purnima.avif'
        },
        { 
            name: 'James Topno', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/30.avif'
        },
        { 
            name: 'Bharat Kumar Mahto', 
            designation: 'Non-Teaching Staff',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/24.avif'
        },
        { 
            name: 'Narayan Mahto', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/4-7.avif'
        },
        { 
            name: 'Md. Zamadar Hussain', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Md.-Zamadar-Hussain-_-Driver.avif'
        },
        { 
            name: 'Raj Kishor Choudhary', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Raj-Kishor-Choudhary-_-Driver.avif'
        },
        { 
            name: 'Birju Chik Baraik', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Birju-Chik-Baraik-_-Driver.avif'
        },
        { 
            name: 'Tirth Mahto', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Tirth-Mahto-_-Driver.avif'
        },
        { 
            name: 'Sanjeev Mahili', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/12-2.avif'
        },
        { 
            name: 'Sanju Nayak', 
            designation: 'Driver',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Sanju-Nayak-_-Driver.avif'
        },
        { 
            name: 'Pawan Munda', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Pawan-Munda-_-Helper.avif'
        },
        { 
            name: 'Md. Sarfaraz Hussain', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7-6.avif'
        },
        { 
            name: 'Jageshwar Munda', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Jageshwar-Munda-_-Helper.avif'
        },
        { 
            name: 'Charku Mahli', 
            designation: 'Bus Attendant',
            image: 'https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Charku-Mahli-_-Helper.avif'
        }
    ]
};

async function migrateFaculty() {
    console.log("Preparing Faculty Data Migration...");

    let flattenedData = [];

    // Flatten the data and add 'category'
    for (const [category, members] of Object.entries(facultyData)) {
        members.forEach(member => {
            flattenedData.push({
                ...member,
                category: category // 'leadership', 'examination', etc.
            });
        });
    }

    console.log(`Flattened ${flattenedData.length} faculty records.`);

    const tableName = 'faculty_master_list';

    // Upsert into dynamic_tables
    const { data, error } = await supabase
        .from('dynamic_tables')
        .upsert({ 
            name: tableName, 
            content: flattenedData 
        }, { onConflict: 'name' })
        .select();

    if (error) {
        console.error("Error migrating faculty data:", error);
    } else {
        console.log(`Successfully migrated ${tableName} to Supabase!`);
    }
}

migrateFaculty();
