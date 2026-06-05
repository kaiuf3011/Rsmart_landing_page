import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './InnovationImpact.css';

gsap.registerPlugin(ScrollTrigger);

const InnovationImpact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => { return;
    gsap.fromTo('.innovation-text', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.innovation-row', start: 'top 80%' } });
    gsap.fromTo('.innovation-image', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.innovation-row', start: 'top 80%' } });
    
    gsap.fromTo('.impact-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: '.impact-section', start: 'top 75%' } });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Innovation Section */}
      <section className="innovation-section section-padding">
        <div className="container">
          <div className="innovation-row">
            <div className="innovation-text">
              <h2>INDUSTRY IMMERSION</h2>
              <p>Every semester includes structured industry immersion programs, live projects, company interactions, and mandatory skill certifications. Students work in a collaborative, corporate-style environment known as the Peer Power Hive, equipped with MacBook Neos and a state-of-the-art AI Skills Lab inaugurated by Dell & Intel.</p>
              <button className="btn btn-outline">Learn More</button>
            </div>
            <div className="innovation-image">
              <div className="image-wrapper">
                <img src="/image.png" alt="Students collaborating" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section section-padding">
        <div className="container">
          <div className="impact-content">
            <div className="impact-stats">
              <div className="impact-stat">
                <h3>₹3 Crore</h3>
                <span>HIGHEST SALARY PACKAGE SECURED</span>
              </div>
            </div>
            <div className="impact-text">
              <h2>PEER-TO-PEER GROWTH & CAREER OUTCOMES</h2>
              <p>Placement preparation does not happen at the end of the degree. Resume building, LinkedIn optimization, and mock interviews begin in semester one. Graduates have secured packages up to ₹3 Crore per annum, with multiple students placed in the ₹45 LPA to ₹58 LPA range.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationImpact;
