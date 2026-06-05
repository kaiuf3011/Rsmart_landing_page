import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// @ts-ignore
import StaggeredMenu from './StaggeredMenu';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const staggeredMenuRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleMobileMenuToggle = () => {
    if (staggeredMenuRef.current) {
      staggeredMenuRef.current.toggle();
    }
  };

  useGSAP(() => {
    // 1. Drop in the main pill
    gsap.fromTo('.navbar-pill', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
    
    // 2. Cascade the nav links in
    gsap.fromTo('.nav-link',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
    );

    // 3. Pop in the action buttons on the right
    gsap.fromTo('.nav-right > *',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)", delay: 0.5 }
    );
  }, { scope: headerRef });

  return (
    <header className={`main-header ${isScrolled ? 'header-scrolled' : ''}`} ref={headerRef}>
      <div className="navbar-pill">
        <a href="/" className="nav-left logo-box">
          <img src="/rsmart-logo-transparent.png" alt="Raise Smart School of Technology Logo" className="rsmart-logo-img" />
        </a>

        <nav className="nav-center hide-mobile">
          <ul className="nav-list">
            <li><a href="#programs" className="nav-link">Academics</a></li>
            <li><a href="#s4s" className="nav-link">S4S Community</a></li>
            <li><a href="#placements" className="nav-link">Placements</a></li>
            <li><a href="#rstnat" className="nav-link">RSTNAT</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        <div className="nav-right">
          <a href="#admissions" className="btn-admissions hide-mobile">
            <span className="plus-circle"><Plus size={16} strokeWidth={3} /></span>
            Apply Now
          </a>

          <button className="icon-btn circle-btn menu-toggle-btn" onClick={handleMobileMenuToggle} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="mobile-only-menu">
        <StaggeredMenu
          ref={staggeredMenuRef}
          isFixed={true}
          hideHeader={true}
          onMenuOpen={() => setMobileMenuOpen(true)}
          onMenuClose={() => setMobileMenuOpen(false)}
          colors={['#1E293B', '#4F46E5']}
          items={[
            { label: 'Academics', ariaLabel: 'Go to Academics', link: '#programs' },
            { label: 'S4S Community', ariaLabel: 'Go to S4S Community', link: '#s4s' },
            { label: 'Placements', ariaLabel: 'Go to Placements', link: '#placements' },
            { label: 'RSTNAT', ariaLabel: 'Go to RSTNAT', link: '#rstnat' },
            { label: 'Contact', ariaLabel: 'Go to Contact', link: '#contact' }
          ]}
          socialItems={[
            { label: 'Facebook', link: '#' },
            { label: 'Instagram', link: '#' },
            { label: 'LinkedIn', link: '#' }
          ]}
        />
      </div>
    </header>
  );
};

export default Header;