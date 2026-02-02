import { supabase } from './supabase';

export const getPageBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.warn(`Error fetching page with slug ${slug}:`, error.message);
    return null;
  }
  return data;
};

export const getSectionsByPageId = async (pageId) => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('page_id', pageId)
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.warn(`Error fetching sections for page ${pageId}:`, error.message);
    return [];
  }
  return data;
};
