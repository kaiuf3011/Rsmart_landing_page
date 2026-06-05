import React, { useEffect } from 'react';
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

// Premium scrolling and animation frameworks
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Initialize smooth scrolling engine
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false, // We will manually sync it with GSAP
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    // This ensures animations and scrolling are perfectly perfectly in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Turn off GSAP's lag smoothing to prevent jitter with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <motion.div 
        className="scroll-progress" 
        style={{ scaleX: scrollYProgress, transformOrigin: "0%", position: "fixed", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--color-primary)", zIndex: 1000 }} 
      />
      <Header />
      <main>
        <Hero />
        <ExploreRGU />
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
      <Footer />
    </div>
  );
};

export default App;
