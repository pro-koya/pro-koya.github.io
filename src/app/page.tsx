import { SiteHeader } from '@/components/Header/SiteHeader';
import { HeroSection } from '@/components/Hero/HeroSection';
import { WorksSection } from '@/components/Works/WorksSection';
import { CapabilitiesSection } from '@/components/Capabilities/CapabilitiesSection';
import { AboutSection } from '@/components/About/AboutSection';
import { WorkStyleSection } from '@/components/WorkStyle/WorkStyleSection';
import { ContactSection } from '@/components/Contact/ContactSection';
import { SiteFooter } from '@/components/Footer/SiteFooter';
import { RevealObserver } from '@/components/RevealObserver';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <WorksSection />
        <CapabilitiesSection />
        <AboutSection />
        <WorkStyleSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
