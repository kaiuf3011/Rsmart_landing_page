import React, { useRef } from 'react';
import { Globe, MessageCircle, Camera, Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => { return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
      }
    });

    tl.fromTo('.ft-brand', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo('.ft-col', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }, "-=0.4")
      .fromTo('.ft-bottom', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");
  }, { scope: footerRef });

  return (
    <footer className="main-footer" id="contact" ref={footerRef}>
      <div className="container">
        <div className="ft-top">
          <div className="ft-brand">
            <img src="/rsmart-logo-transparent.png" alt="Raise Smart School of Technology Logo" className="ft-logo" />
            <p className="ft-mission">Dedicated to delivering excellence in technology education and bridging the gap between academic learning and industry requirements.</p>
            <div className="ft-social">
              {[Globe, MessageCircle, Camera, Briefcase].map((Icon, i) => (
                <a key={i} href="#"><Icon size={15} /></a>
              ))}
            </div>
          </div>
          <div className="ft-links">
            <div className="ft-col">
              <h3>Academics</h3>
              <ul>
                <li><a href="#programmes">Undergraduate</a></li>
                <li><a href="#programmes">Postgraduate</a></li>
                <li><a href="#programmes">Engineering</a></li>
                <li><a href="#comparison">Why Us</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <h3>Contact</h3>
              <ul className="ft-contact">
                <li><MapPin size={13} /><span>Rathinam IT Park, Eachanari, Coimbatore – 641021</span></li>
                <li><Phone size={13} /><span>+91 766 910 9660</span></li>
                <li><Mail size={13} /><span>admissions@rsmartedu.in</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <div>&copy; {new Date().getFullYear()} Raise Smart School of Technology. Part of Rathinam Group.</div>
          <div className="ft-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
