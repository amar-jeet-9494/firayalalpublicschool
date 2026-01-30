import { supabase } from '@/lib/supabase';

export default async function sitemap() {
    const baseUrl = 'https://firayalalpublicschool.edu.in';

    // Static routes
    const routes = [
        '',
        '/about-us',
        '/admission-process',
        '/academics',
        '/infrastructure',
        '/faculty',
        '/contact-us',
        '/results',
        '/achievements',
        '/gallery',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes from SEO table (if you want to include custom added paths)
    // For now we stick to known routes, but we can fetch more if needed
    
    return routes;
}
