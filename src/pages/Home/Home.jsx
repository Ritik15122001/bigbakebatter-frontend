import Hero from '../../components/sections/Hero';
import MerchGrid from '../../components/sections/MerchGrid';
import TrustStrip from '../../components/sections/TrustStrip';
import FeaturedSection from '../../components/sections/FeaturedSection';
import OccasionsSection from '../../components/sections/OccasionsSection';
import CategoryRail from '../../components/sections/CategoryRail';
import BestsellersSection from '../../components/sections/BestsellersSection';
import FlavoursSection from '../../components/sections/FlavoursSection';
import CustomCakeBand from '../../components/sections/CustomCakeBand';
import CorporateCakesBand from '../../components/sections/CorporateCakesBand';
import StepsSection from '../../components/sections/StepsSection';
import ReviewsSection from '../../components/sections/ReviewsSection';
import JournalSection from '../../components/sections/JournalSection';
import FAQSection from '../../components/sections/FAQSection';
import NewsletterSection from '../../components/sections/NewsletterSection';
import { useContentStore } from '../../store/contentStore';

export default function Home() {
  const banners = useContentStore((s) => s.banners);

  return (
    <>
      {banners.length > 0 && <Hero banners={banners} />}
      <section className="hero-afterglow">
        <div className="merch-wrap">
          <MerchGrid />
        </div>
        <div className="container">
          <TrustStrip />
        </div>
      </section>
      <FeaturedSection />
      <OccasionsSection />
      <CategoryRail />
      <BestsellersSection />
      <FlavoursSection />
      <CustomCakeBand />
      <CorporateCakesBand />
      <StepsSection />
      <ReviewsSection />
      <JournalSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
