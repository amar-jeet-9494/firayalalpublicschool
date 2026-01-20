/**
 * WordPress Headless CMS API Utilities
 * Fetch content dynamically from WordPress REST API
 */

const WP_API_BASE = 'https://firayalalpublicschool.edu.in/wp-json/wp/v2';

/**
 * Fetch a single page by its ID
 * @param {number} pageId - WordPress page ID
 * @returns {Promise<Object>} - Page data including title, content, featured_media
 */
export async function getPageById(pageId) {
    try {
        const response = await fetch(`${WP_API_BASE}/pages/${pageId}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds for ISR
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching page:', error);
        throw error;
    }
}

/**
 * Fetch a page by its slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object>} - Page data
 */
export async function getPageBySlug(slug) {
    try {
        const response = await fetch(`${WP_API_BASE}/pages?slug=${slug}`, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.status}`);
        }

        const data = await response.json();
        return data[0] || null;
    } catch (error) {
        console.error('Error fetching page by slug:', error);
        throw error;
    }
}

/**
 * Fetch featured media (image) by media ID
 * @param {number} mediaId - WordPress media ID
 * @returns {Promise<Object|null>} - Media data with source_url or null
 */
export async function getFeaturedMedia(mediaId) {
    if (!mediaId || mediaId === 0) return null;

    try {
        const response = await fetch(`${WP_API_BASE}/media/${mediaId}`, {
            next: { revalidate: 3600 } // Cache media for 1 hour
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return {
            id: data.id,
            url: data.source_url,
            alt: data.alt_text || '',
            width: data.media_details?.width,
            height: data.media_details?.height,
            sizes: data.media_details?.sizes
        };
    } catch (error) {
        console.error('Error fetching media:', error);
        return null;
    }
}

/**
 * Fetch complete page with featured image resolved
 * @param {number} pageId - WordPress page ID
 * @returns {Promise<Object>} - Complete page data with featured image
 */
export async function getCompletePageById(pageId) {
    const page = await getPageById(pageId);
    
    let featuredImage = null;
    if (page.featured_media && page.featured_media !== 0) {
        featuredImage = await getFeaturedMedia(page.featured_media);
    }

    return {
        id: page.id,
        title: page.title?.rendered || '',
        content: page.content?.rendered || '',
        excerpt: page.excerpt?.rendered || '',
        featuredImage,
        slug: page.slug,
        date: page.date,
        modified: page.modified,
        template: page.template,
        meta: page.meta
    };
}

/**
 * WordPress page IDs for the school website
 * Update these IDs based on your WordPress installation
 */
export const PAGE_IDS = {
    ELEMENTARY_STAGE: 7206,
    FOUNDATIONAL_STAGE: 3693, // Update with actual ID
    MIDDLE_STAGE: 7291, // Middle Stage page
    SECONDARY_STAGE: 7260, // Update with actual ID
    // Add more page IDs as needed
};

/**
 * Clean and process WordPress HTML content
 * @param {string} html - Raw HTML from WordPress
 * @returns {string} - Cleaned HTML
 */
export function processWordPressContent(html) {
    if (!html) return '';
    return html;
}

/**
 * Extract background slideshow images from Elementor data-settings
 * @param {string} html - Raw HTML from WordPress
 * @returns {Array} - Array of image URLs found in slideshows
 */
export function extractElementorImages(html) {
    if (!html) return [];
    
    const images = [];
    const dataSettingsRegex = /data-settings="([^"]*)"/g;
    let match;
    
    while ((match = dataSettingsRegex.exec(html)) !== null) {
        try {
            const decodedSettings = match[1]
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&');
            
            const settings = JSON.parse(decodedSettings);
            
            if (settings.background_slideshow_gallery) {
                settings.background_slideshow_gallery.forEach(img => {
                    if (img.url) {
                        images.push({ id: img.id, url: img.url, type: 'slideshow' });
                    }
                });
            }
            
            if (settings.background_image?.url) {
                images.push({ url: settings.background_image.url, type: 'background' });
            }
        } catch (e) {
            // Skip invalid JSON
        }
    }
    
    return images;
}

/**
 * Get the first slideshow image for hero section
 * @param {string} html - Raw HTML from WordPress
 * @returns {string|null} - First image URL or null
 */
export function getHeroImageFromContent(html) {
    const images = extractElementorImages(html);
    const slideshowImage = images.find(img => img.type === 'slideshow');
    return slideshowImage ? slideshowImage.url : null;
}

/**
 * Filter WordPress content to keep only content starting from a specific heading
 * This is useful when you have custom components for intro sections and only want
 * specific parts of the WordPress content (like tables, procedures, etc.)
 * 
 * @param {string} html - Raw HTML from WordPress
 * @param {string} headingText - The heading text to start from (e.g., "Minimum Age Required")
 * @returns {string} - Filtered HTML starting from the specified heading, or empty string if not found
 */
export function filterWordPressContentFromHeading(html, headingText) {
    if (!html || !headingText) return '';
    
    // Create a regex pattern to find the heading (case-insensitive)
    // Match heading tags h1-h6 or divs containing the heading text
    const escapedHeading = headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Look for the heading text in the HTML
    // This pattern finds the section containing the heading
    const headingPattern = new RegExp(`(<[^>]*>\\s*${escapedHeading}\\s*<)`, 'i');
    
    const match = html.search(headingPattern);
    
    if (match === -1) {
        // Try alternative pattern - just find the text
        const simpleIndex = html.toLowerCase().indexOf(headingText.toLowerCase());
        if (simpleIndex === -1) {
            return '';
        }
        
        // Find the nearest opening element tag before the heading
        // Look backwards to find the section/div container
        let startIndex = simpleIndex;
        const precedingHtml = html.substring(0, simpleIndex);
        
        // Find the last occurrence of a section or major container div before the heading
        // Look for elementor section patterns
        const sectionPatterns = [
            /<section[^>]*>/gi,
            /<div[^>]*elementor-element[^>]*>/gi,
            /<div[^>]*class="[^"]*e-con[^"]*"[^>]*>/gi
        ];
        
        let lastSectionStart = 0;
        for (const pattern of sectionPatterns) {
            let sectionMatch;
            while ((sectionMatch = pattern.exec(precedingHtml)) !== null) {
                // Keep the last match that's closest to but before the heading
                if (sectionMatch.index > lastSectionStart) {
                    lastSectionStart = sectionMatch.index;
                }
            }
        }
        
        // If we found a section container, start from there
        if (lastSectionStart > 0) {
            startIndex = lastSectionStart;
        } else {
            // Otherwise, look for the nearest opening tag with newlines (block element)
            const blockElementPattern = /\n\s*(<[a-zA-Z][^>]*>)/g;
            let lastBlock;
            while ((lastBlock = blockElementPattern.exec(precedingHtml)) !== null) {
                if (lastBlock.index < simpleIndex) {
                    startIndex = lastBlock.index;
                }
            }
        }
        
        return html.substring(startIndex);
    }
    
    // Find the section container before this heading
    const precedingHtml = html.substring(0, match);
    
    // Try to find the parent section element
    const sectionPatterns = [
        /<section[^>]*>/gi,
        /<div[^>]*data-id[^>]*>/gi
    ];
    
    let lastSectionStart = 0;
    for (const pattern of sectionPatterns) {
        let sectionMatch;
        while ((sectionMatch = pattern.exec(precedingHtml)) !== null) {
            if (sectionMatch.index > lastSectionStart) {
                lastSectionStart = sectionMatch.index;
            }
        }
    }
    
    if (lastSectionStart > 0) {
        return html.substring(lastSectionStart);
    }
    
    return html.substring(match);
}

