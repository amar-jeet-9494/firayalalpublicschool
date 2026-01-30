import { supabase } from '@/lib/supabase';

// Default metadata if no DB entry found
const defaultMetadata = {
    title: 'Firayalal Public School - Ranchi',
    description: 'Firayalal Public School (FPS) is a premier educational institution in Ranchi, offering world-class education with a focus on holistic development.',
    keywords: 'school, ranchi, education, cbse, best school in ranchi',
};

export async function getPageMetadata(path) {
    try {
        // Fetch SEO data from Supabase
        const { data, error } = await supabase
            .from('page_seo')
            .select('*')
            .eq('page_path', path)
            .single();

        if (error || !data) {
            return {
                title: defaultMetadata.title,
                description: defaultMetadata.description,
                keywords: defaultMetadata.keywords,
            };
        }

        return {
            title: data.title || defaultMetadata.title,
            description: data.description || defaultMetadata.description,
            keywords: data.keywords || defaultMetadata.keywords,
            openGraph: data.og_image ? {
                images: [{ url: data.og_image }]
            } : undefined
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return defaultMetadata;
    }
}
