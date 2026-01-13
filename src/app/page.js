import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import StickyElements from '@/components/StickyElements';
import FPSSection from '@/components/FPSSection';
import PrincipalMessage from '@/components/PrincipalMessage';
import EducationSection from '@/components/EducationSection';
import EventsSection from '@/components/EventsSection';
import DistinguishedFeat from '@/components/DistinguishedFeat';
import HonoursCarousel from '@/components/HonoursCarousel';

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
    </>
  );
}
