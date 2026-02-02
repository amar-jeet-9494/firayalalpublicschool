'use client';

import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import FPSSection from '@/components/FPSSection';
import EducationSection from '@/components/EducationSection';
import EventsSection from '@/components/EventsSection';
import DistinguishedFeat from '@/components/DistinguishedFeat';
import HonoursCarousel from '@/components/HonoursCarousel';
import PrincipalMessage from '@/components/PrincipalMessage';
import FacultyCarousel from '@/components/FacultyCarousel';
import AnnualDayGallery from '@/components/AnnualDayGallery';
import SilverJubilee from '@/components/SilverJubilee';
import Testimonials from '@/components/Testimonials';
import SixPillars from '@/components/SixPillars';
import AcademicStages from '@/components/AcademicStages';
import SuccessStories from '@/components/SuccessStories';
import ForParents from '@/components/ForParents';
import FAQ from '@/components/FAQ';
import LifeAtFPS from '@/components/LifeAtFPS';
import BusTrackingAdmission from '@/components/BusTrackingAdmission';

// Map component types (string from DB) to actual Components
const COMPONENT_MAP = {
    'HeroBanner': HeroBanner,
    'FPSSection': FPSSection,
    'EducationSection': EducationSection,
    'EventsSection': EventsSection,
    'DistinguishedFeat': DistinguishedFeat,
    'HonoursCarousel': HonoursCarousel,
    'PrincipalMessage': PrincipalMessage,
    'FacultyCarousel': FacultyCarousel,
    'AnnualDayGallery': AnnualDayGallery,
    'SilverJubilee': SilverJubilee,
    'Testimonials': Testimonials,
    'SixPillars': SixPillars,
    'AcademicStages': AcademicStages,
    'SuccessStories': SuccessStories,
    'ForParents': ForParents,
    'FAQ': FAQ,
    'LifeAtFPS': LifeAtFPS,
    'BusTrackingAdmission': BusTrackingAdmission,
};

export default function DynamicPageBuilder({ sections }) {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <>
            {sections.map((section) => {
                const Component = COMPONENT_MAP[section.component_type];
                if (!Component) {
                    console.warn(`Unknown component type: ${section.component_type}`);
                    return null;
                }

                // Pass the dynamic content as props to the component
                // We spread section.content which is the JSONB object
                return (
                    <Component
                        key={section.id}
                        {...section.content}
                        sectionId={section.id}
                    />
                );
            })}
        </>
    );
}
