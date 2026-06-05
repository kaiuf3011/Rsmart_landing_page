import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExploreRGU from './components/ExploreRGU';
import AcademicWings from './components/AcademicWings';
import AnimatedStats from './components/AnimatedStats';
import Happenings from './components/Happenings';
import InnovationImpact from './components/InnovationImpact';
import WhyRaiseSmart from './components/WhyRaiseSmart';
import Comparison from './components/Comparison';
import Placements from './components/Placements';
import S4S from './components/S4S';
import Infrastructures from './components/Infrastructures';
import Footer from './components/Footer';
import CompanyMarquee from './components/CompanyMarquee';
import AdmissionsSection from './components/AdmissionsSection';
import { motion, useScroll } from 'framer-motion';

// Page Imports
// @ts-ignore
import AboutUsPage from '../pages/AboutUs';
// @ts-ignore
import CampusLifePage from '../pages/CampusLife';
// @ts-ignore
import PlacementsPage from '../pages/Placements';
// @ts-ignore
import InnovationHubPage from '../pages/InnovationHub';
// @ts-ignore
import GlobalImmersionPage from '../pages/GlobalImmersion';
// @ts-ignore
import INDUSTRIALEXPERIANCEPage from '../pages/INDUSTRIALEXPERIANCE';
// @ts-ignore
import TECHFESTPage from '../pages/TECHFEST';
// @ts-ignore
import HACKATHONPage from '../pages/HACKATHON';
// @ts-ignore
import RGFPage from '../pages/RGF';
// @ts-ignore
import INTERNATIONALSPORTSFACILITIESPage from '../pages/INTERNATIONALSPORTSFACILITIES';
// @ts-ignore
import ADMISSIONSPage from '../pages/ADMISSIONS';
// @ts-ignore
import ALUMININETWORKPage from '../pages/ALUMININETWORK';
// @ts-ignore
import NEWSANDEVENTSPage from '../pages/NEWSANDEVENTS';
// @ts-ignore
import STUDENTTESTIMONIALSPage from '../pages/STUDENTTESTIMONIALS';
// @ts-ignore
import VIRTUALTOURPage from '../pages/VIRTUALTOUR';
// @ts-ignore
import CONTACTUSPage from '../pages/CONTACTUS';

// Premium scrolling and animation frameworks
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Initialize smooth scrolling engine
  useEffect(() => {
    // Only run smooth scroll on landing page
    if (currentPage !== 'home') return;

    const lenis = new Lenis({
      autoRaf: false, // We will manually sync it with GSAP
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    // This ensures animations and scrolling are perfectly perfectly in sync
    const handleTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTick);

    // Turn off GSAP's lag smoothing to prevent jitter with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handleTick);
      lenis.destroy();
    };
  }, [currentPage]);

  // Horizontal scroll / swipe gesture to return to home page from any subpage
  useEffect(() => {
    if (currentPage === 'home') return;

    let isNavigating = false;
    let accumulatedX = 0;
    let wheelTimeout: any = null;

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating) return;

      // Detect horizontal scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        accumulatedX += e.deltaX;

        // Swipe right (scrolling left) to return home (negative deltaX)
        if (accumulatedX < -120) {
          isNavigating = true;
          setCurrentPage('home');
          accumulatedX = 0;
        }

        if (wheelTimeout) clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          accumulatedX = 0;
        }, 150);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isNavigating || e.touches.length !== 1) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = currentX - touchStartX;
      const diffY = currentY - touchStartY;
      const duration = Date.now() - touchStartTime;

      // Swipe from left to right (diffX > 0)
      if (diffX > 100 && Math.abs(diffX) > Math.abs(diffY) * 1.5 && duration < 300) {
        isNavigating = true;
        setCurrentPage('home');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [currentPage]);

  return (
    <div className="app-container">
      <motion.div 
        className="scroll-progress" 
        style={{ scaleX: scrollYProgress, transformOrigin: "0%", position: "fixed", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--color-primary)", zIndex: 1000 }} 
      />
      <Header navigateTo={setCurrentPage} />
      
      {currentPage === 'home' ? (
        <main>
          <Hero />
          <ExploreRGU navigateTo={setCurrentPage} />
          <AcademicWings />
          <AnimatedStats />
          <Happenings />
          <InnovationImpact />
          <WhyRaiseSmart />
          <CompanyMarquee />
          <Comparison />
          <Placements />
          <S4S />
          <Infrastructures />
          <AdmissionsSection />
        </main>
      ) : (
        <main className="subpage-container" style={{ paddingTop: '80px' }}>
          {currentPage === 'about-us' && <AboutUsPage navigateTo={setCurrentPage} />}
          {currentPage === 'campus-life' && <CampusLifePage navigateTo={setCurrentPage} />}
          {currentPage === 'placements' && <PlacementsPage navigateTo={setCurrentPage} />}
          {currentPage === 'innovation-hub' && <InnovationHubPage navigateTo={setCurrentPage} />}
          {currentPage === 'global-immersion' && <GlobalImmersionPage navigateTo={setCurrentPage} />}
          {currentPage === 'industrial-experience' && <INDUSTRIALEXPERIANCEPage navigateTo={setCurrentPage} />}
          {currentPage === 'techfest' && <TECHFESTPage navigateTo={setCurrentPage} />}
          {currentPage === 'hackathon' && <HACKATHONPage navigateTo={setCurrentPage} />}
          {currentPage === 'rgf' && <RGFPage navigateTo={setCurrentPage} />}
          {currentPage === 'sports' && <INTERNATIONALSPORTSFACILITIESPage navigateTo={setCurrentPage} />}
          {currentPage === 'admissions' && <ADMISSIONSPage navigateTo={setCurrentPage} />}
          {currentPage === 'alumni' && <ALUMININETWORKPage navigateTo={setCurrentPage} />}
          {currentPage === 'news' && <NEWSANDEVENTSPage navigateTo={setCurrentPage} />}
          {currentPage === 'testimonials' && <STUDENTTESTIMONIALSPage navigateTo={setCurrentPage} />}
          {currentPage === 'virtual-tour' && <VIRTUALTOURPage navigateTo={setCurrentPage} />}
          {currentPage === 'contact-us' && <CONTACTUSPage navigateTo={setCurrentPage} />}
        </main>
      )}

      <Footer />
    </div>
  );
};

export default App;
