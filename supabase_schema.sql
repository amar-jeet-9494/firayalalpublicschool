-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create 'pages' table
create table if not exists pages (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null, -- SEO Title
  description text,    -- SEO Description
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create 'sections' table
create table if not exists sections (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references pages(id) on delete cascade,
  component_type text not null, -- e.g., 'HeroBanner', 'FPSSection'
  content jsonb default '{}'::jsonb, -- Stores dynamic props
  order_index integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Seed Data: Home Page
-- Insert 'Home' page if it doesn't exist
insert into pages (slug, title, description)
values ('/', 'Firayalal Public School - Best CBSE School in Ranchi', 'Firayalal Public School is a leading co-educational CBSE school in Ranchi, offering quality education from Bal Vatika to Class XII.')
on conflict (slug) do nothing;

-- Get Home Page ID
do $$
declare
  home_page_id uuid;
begin
  select id into home_page_id from pages where slug = '/';

  -- Clear existing sections to avoid duplicates on re-run
  delete from sections where page_id = home_page_id;

  -- A. Hero Banner Section
  insert into sections (page_id, component_type, order_index, content)
  values (
    home_page_id,
    'HeroBanner',
    0,
    '{
      "welcomeText": "Welcome to",
      "title": "Firayalal Public School",
      "subtitle": "ATTAIN AND EXCEL",
      "description": "Affiliated to CBSE, New Delhi | Senior Secondary (10+2)",
      "videoUrl": "https://firayalalpublicschool.edu.in/wp-content/uploads/2026/01/Firayalal-Public-School-Ranchi.mp4",
      "thumbnailUrl": "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/12/Firayalal-Public-School-Ranchi.avif"
    }'::jsonb
  );

  -- B. About Section (FPSSection)
  insert into sections (page_id, component_type, order_index, content)
  values (
    home_page_id,
    'FPSSection',
    1,
    '{
      "heading": "Firayalal Public School",
      "subHeading": "Nurturing Future Leaders",
      "paragraphs": [
        "Firayalal Public School (F.P.S.) is a co-educational CBSE School in Ranchi providing quality education from Bal Vatika II (Earlier-Nursery) to Grade XII.",
        "Our approach ensures that each student receives <span class=\"highlight\">individual attention,</span> which is possible only in a school environment that gives importance to <span class=\"highlight\">quality over quantity.</span>",
        "We take pride in providing <strong>research-based, counselling driven education</strong> that culminates in the development of the <strong>Emerging Student Profile (ESP).</strong>",
        "It is affiliated to the CBSE Board of Education, New Delhi. F.P.S. is recognized as one among the top CBSE Schools in Ranchi. It provides a harmonious learning environment, stresses on co-operative relationships and emotional equilibrium. It has been a cornerstone of education for more than 2.5 decades.",
        "Firayalal Public School is committed to a <strong>secular and inclusive education</strong> to develop the students to be informed, responsible and global citizens who are prepared to succeed academically and beyond."
      ],
      "services": [
        { "icon": "https://cdn-icons-png.flaticon.com/512/3135/3135745.png", "label": "Admissions" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/2232/2232688.png", "label": "Library" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/4105/4105448.png", "label": "Emergency Contact" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/2965/2965879.png", "label": "Publications" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/1828/1828918.png", "label": "Notices" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/2859/2859740.png", "label": "Photo Albums" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/891/891462.png", "label": "Online fee" },
        { "icon": "https://cdn-icons-png.flaticon.com/512/2258/2258540.png", "label": "Results" }
      ]
    }'::jsonb
  );

  -- C. Education Section (Holistic Education)
  insert into sections (page_id, component_type, order_index, content)
  values (
    home_page_id,
    'EducationSection',
    2,
    '{
      "section": "Holistic Education",
      "headings": [
        "Holistic Education at F.P.S.",
        "One Among the Top CBSE Schools in Ranchi"
      ],
      "description": "At Firayalal Public School, life for students exist beyond the syllabi. As one of the leading CBSE schools in Ranchi, we devote ourselves towards comprehensive education, which encompasses <strong>character formation, self-discipline and values.</strong> We aim to develop the students to be responsible citizens and future nation builders, making F.P.S. among one of the <strong>best CBSE schools in Ranchi.</strong>",
      "statistics": [
        { "title": "Students Enrolled", "value": "6,000", "suffix": "+" },
        { "title": "Qualified Teachers", "value": "60", "suffix": "+" },
        { "title": "Years of Excellence", "value": "27", "suffix": "+" },
        { "title": "Academic Excellence", "value": "100", "suffix": "%" }
      ],
      "image_slideshows": [
        {
          "transition": "slide_left",
          "direction": "horizontal",
          "duration_ms": 3000,
          "images": [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-191429.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-191514.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-191550.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-04-191631.avif"
          ]
        },
        {
          "transition": "slide_down",
          "direction": "vertical",
          "duration_ms": 3000,
          "images": [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-24-100353.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-24-100519.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Screenshot-2025-11-24-100649.avif"
          ]
        },
        {
          "transition": "slide_up",
          "direction": "vertical",
          "duration_ms": 3000,
          "images": [
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/5.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/7.avif",
            "https://firayalalpublicschool.edu.in/wp-content/uploads/2025/11/Untitled-design-7.avif"
          ]
        }
      ]
    }'::jsonb
  );

  -- D. Events Section
  insert into sections (page_id, component_type, order_index, content)
  values (
    home_page_id,
    'EventsSection',
    3,
    '{}'::jsonb
  );

  -- E. Principal Message
  insert into sections (page_id, component_type, order_index, content)
  values (
    home_page_id,
    'PrincipalMessage',
    6,
    '{}'::jsonb
  );

  -- F. Other Sections (Still Placeholder)
  insert into sections (page_id, component_type, order_index, content) values
    (home_page_id, 'DistinguishedFeat', 4, '{}'::jsonb),
    (home_page_id, 'HonoursCarousel', 5, '{}'::jsonb),
    -- PrincipalMessage is now done at index 6
    (home_page_id, 'FacultyCarousel', 7, '{}'::jsonb),
    (home_page_id, 'AnnualDayGallery', 8, '{}'::jsonb),
    (home_page_id, 'SilverJubilee', 9, '{}'::jsonb),
    (home_page_id, 'Testimonials', 10, '{}'::jsonb),
    (home_page_id, 'SixPillars', 11, '{}'::jsonb),
    (home_page_id, 'AcademicStages', 12, '{}'::jsonb),
    (home_page_id, 'SuccessStories', 13, '{}'::jsonb),
    (home_page_id, 'ForParents', 14, '{}'::jsonb),
    (home_page_id, 'FAQ', 15, '{}'::jsonb),
    (home_page_id, 'LifeAtFPS', 16, '{}'::jsonb),
    (home_page_id, 'BusTrackingAdmission', 17, '{}'::jsonb);

end $$;
