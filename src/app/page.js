import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyElements from '@/components/StickyElements';
import DynamicPageBuilder from '@/components/DynamicPageBuilder';
import { getPageBySlug, getSectionsByPageId } from '@/lib/page-service';

// Fallback Imports (for when DB is not ready or empty)
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
import NoticePopup from '@/components/NoticePopup';

// Revalidate every 60 seconds for ISR
export const revalidate = 60; 

export default async function Home() {
  const page = await getPageBySlug('/');
  const sections = page ? await getSectionsByPageId(page.id) : [];

  const useDynamic = sections && sections.length > 0;

  return (
    <>
      <Header isTransparent={true} />
      <NoticePopup />
      
      {/* Dynamic Content Rendering */}
      {useDynamic ? (
        <>
           {/* Note: HeroBanner in dynamic list will handle its own layout, but StickyElements is usually fixed overlay */}
           {/* If sticky elements is part of the layout, we keep it here */}
           <DynamicPageBuilder sections={sections} />
        </>
      ) : (
        /* FALLBACK STATIC LAYOUT */
        <>
          <HeroBanner />
          {/* About & Services Section */}
          <FPSSection />
          
          {/* Holistic Education Section */}
          <EducationSection />
          
          {/* Events & Notices Section */}
          <EventsSection />
          
          {/* Distinguished Feat Section */}
          <DistinguishedFeat />
          
          {/* Honours & Accolades Section */}
          <HonoursCarousel />
    
          {/* Principal's Message Section */}
          <PrincipalMessage />
    
          {/* Faculty Carousel Section */}
          <FacultyCarousel />
    
          {/* Annual Day Gallery Section */}
          <AnnualDayGallery />
    
          {/* Silver Jubilee Section */}
          <SilverJubilee />
    
          {/* Testimonials Section */}
          <Testimonials />
    
          {/* Six Pillars - Our Approach Section */}
          <SixPillars />
    
          {/* Academic Stages Section */}
          <AcademicStages />
    
          {/* Success Stories Section */}
          <SuccessStories />
    
          {/* For Parents Section */}
          <ForParents />
    
          {/* FAQ Section */}
          <FAQ />
    
          {/* Life at F.P.S. Gallery Section */}
          <LifeAtFPS />
    
          {/* Bus Tracking & Admission Section */}
          <BusTrackingAdmission />
        </>
      )}

      {/* Sticky Elements (Always present) */}
      <StickyElements />
      
      {/* Footer Section */}
      <Footer />
    </>
  );
}






