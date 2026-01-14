import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import StickyElements from '@/components/StickyElements';
import FPSSection from '@/components/FPSSection';
import PrincipalMessage from '@/components/PrincipalMessage';
import EducationSection from '@/components/EducationSection';
import EventsSection from '@/components/EventsSection';
import DistinguishedFeat from '@/components/DistinguishedFeat';
import HonoursCarousel from '@/components/HonoursCarousel';
import FacultyCarousel from '@/components/FacultyCarousel';
import AnnualDayGallery from '@/components/AnnualDayGallery';
import SilverJubilee from '@/components/SilverJubilee';
import Testimonials from '@/components/Testimonials';
import SixPillars from '@/components/SixPillars';

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <StickyElements />
      
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
    </>
  );
}




