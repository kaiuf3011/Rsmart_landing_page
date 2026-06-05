import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  // Typing effect
  const [typedText, setTypedText] = useState('');
  const fullText = "Raise Smart";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 120); // Typing speed
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 50, damping: 12 } }
  };

  return (
    <section className="hero-section" ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        className="hero-bg-video-wrapper" 
        style={{ y: videoY, scale: videoScale, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
      >
        <video
          src="/rsmart.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg-video"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
      <motion.div className="hero-overlay" style={{ opacity: overlayOpacity, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 1 }} />
      
      <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="hero-text-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="hero-title-main">
            <motion.span className="hero-title-line" variants={itemVariants} style={{ display: 'block' }}>
              <span>{typedText}</span><span className="cursor-blink">|</span>
            </motion.span>
            <motion.span className="hero-title-line" variants={itemVariants} style={{ display: 'block' }}>
              <span>School of Technology</span>
            </motion.span>
          </h1>
          <motion.p className="hero-tagline" variants={itemVariants}>
            A premier tech-first upskilling and knowledge partner located inside the Rathinam IT and Technology Park in Coimbatore.
          </motion.p>
          <motion.a href="#admissions" className="btn-apply-hero" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Apply Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;