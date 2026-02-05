'use client';

import { useEffect, useState } from 'react';

export default function ThemeRegistry() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error("Failed to load theme settings", error);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        if (!settings) return;

        const { heading, body, baseSize, headingWeight } = settings;

        // 1. Construct Google Fonts URL
        // We need to deduplicate fonts if they are the same
        const fonts = new Set([heading, body].filter(Boolean));

        if (fonts.size > 0) {
            const fontFamilies = Array.from(fonts).map(font => {
                // Formatting: "Open Sans" -> "Open+Sans:wght@400;500;600;700"
                // We'll just request a broad range of weights to be safe
                return `${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800`;
            });

            const linkParams = fontFamilies.join('&');
            const url = `https://fonts.googleapis.com/css2?family=${linkParams}&display=swap`;

            // Check if link already exists to avoid duplicates
            let link = document.getElementById('dynamic-theme-fonts');
            if (!link) {
                link = document.createElement('link');
                link.id = 'dynamic-theme-fonts';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
            link.href = url;
        }

        // 2. Apply CSS Variables
        const root = document.documentElement;
        if (heading) root.style.setProperty('--font-heading', `"${heading}", sans-serif`);
        if (body) root.style.setProperty('--font-body', `"${body}", sans-serif`);
        if (baseSize) root.style.setProperty('--base-font-size', baseSize);
        if (headingWeight) root.style.setProperty('--heading-font-weight', headingWeight);

        // 3. Fallback for Tailwind config if using globals.css matching
        // We'll likely need to update globals.css to use these variables for <body> and <h1-h6>

    }, [settings]);

    return null; // This component renders nothing visually
}
