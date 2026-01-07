import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import StickyElements from '@/components/StickyElements';

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <StickyElements />
      
      {/* Placeholder section to test scrolling */}
      <section className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Firayalal Public School
          </h2>
          <p className="text-gray-600 text-lg">
            More content coming soon...
          </p>
        </div>
      </section>
    </>
  );
}
