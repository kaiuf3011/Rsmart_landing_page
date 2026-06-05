import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, MessageSquare, Users, Target, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import './S4S.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/1d868436-bab4-4732-b20b-2f6be7c25ed8.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/2b355402-ed0d-46fb-86f3-028b010eb718.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/50b318d4-b623-4ce4-afe4-cfee12eafaa8.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/ab4a6008-48e1-4880-8f5e-29233545bdc9.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/5961d84b-8606-442f-b9bc-7416763f0ea6.jpg',
  '/talkonauts-vishva.jpeg',
];

const benefits = [
  { icon: <Users size={18} />, text: 'Peer-to-peer learning' },
  { icon: <Target size={18} />, text: 'Leadership development' },
  { icon: <Globe size={18} />, text: 'Industry exposure' },
  { icon: <Code size={18} />, text: 'Technical excellence' },
  { icon: <MessageSquare size={18} />, text: 'Collaborative growth' },
];

const platformsData = [
  {
    id: 'aited',
    title: 'AITED',
    badgeText: 'AI Tools Exploration & Development',
    badgeColor: '#a855f7',
    gradient: 'purple',
    description: 'Students explore Artificial Intelligence tools and emerging technologies, experiment with modern platforms, and stay updated with technological trends.',
  },
  {
    id: 'pro-power-talks',
    title: 'Pro Power Talks',
    badgeText: 'Industry Interaction (Biweekly Sessions)',
    badgeColor: '#0f172a',
    gradient: 'dark',
    description: 'Industry professionals interact directly with students, sharing real-world insights, career guidance, and exposure to current market demands.',
  },
  {
    id: 'peer-power-hive',
    title: 'Peer Power Hive',
    badgeText: 'Interest-Based Innovation Teams',
    badgeColor: '#a855f7',
    gradient: 'light-purple',
    description: 'Students form teams based on common interests such as Game Design, Game Development, Web Development, and Mobile App Development. They engage in focused evening sessions, exploring the latest tools under faculty mentorship.',
  },
  {
    id: 'peer-power-talks',
    title: 'Peer Power Talks',
    badgeText: 'Students Empowering Students',
    badgeColor: '#0f172a',
    gradient: 'slate',
    description: 'Students share their knowledge, competition experiences, and new learnings with peers, strengthening communication and collaborative learning.',
  }
];

const cardAnimation = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -4 },
};

const S4S: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => { return;
    gsap.fromTo('.s4s-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    gsap.fromTo('.s4s-benefit', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.s4s-benefits', start: 'top 85%' } });
    
    // Slider entrance and parallax
    gsap.fromTo('.s4s-slider-wrapper', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.s4s-slider-wrapper', start: 'top 80%' } });
    gsap.to('.s4s-slide', {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: '.s4s-slider-wrapper', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    gsap.fromTo('.s4s-wing', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: '.s4s-wings', start: 'top 85%' } });

    // Animate platforms (was missing)
    gsap.fromTo('.s4s-platform', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: '.s4s-platforms', start: 'top 85%' } }
    );
  }, { scope: sectionRef });

  return (
    <section className="s4s-section section-padding" id="s4s-community" ref={sectionRef}>
      <div className="container">
        <div className="s4s-header">
          <h2 className="section-title">STUDENTS FOR STUDENTS <span className="s4s-brackets">[S4S]</span></h2>
          <p className="s4s-desc">
            Students for Students (S4S) is a student-led platform designed to create a culture of shared learning, leadership, and innovation on campus. Built on the belief that when students learn from students, growth multiplies, S4S ensures that every opportunity becomes a learning experience for the entire student community.
          </p>
        </div>

        <div className="s4s-hero-container">
          {/* Background Slider */}
          <div className="s4s-slider-bg">
            {slides.map((src, i) => (
              <img key={i} src={src} alt={`Student Life ${i + 1}`} className={`s4s-slide-bg ${i === activeSlide ? 'active' : ''}`} loading="lazy" />
            ))}
            <div className="s4s-slider-overlay"></div>
          </div>
          
          {/* Foreground Content */}
          <div className="s4s-hero-content">
            <div className="s4s-hero-text">
              <h2 className="s4s-hero-title">Students for Students</h2>
              <p className="s4s-hero-subtitle">A student-led platform designed to create a culture of shared learning, leadership, and innovation on campus.</p>
              <h3 className="s4s-promotes-title">S4S promotes</h3>
              <div className="s4s-benefits">
                {benefits.map((b, i) => (
                  <div key={i} className="s4s-benefit">
                    <span className="s4s-benefit-icon">{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="s4s-slide-dots">
            {slides.map((_, i) => (
              <button key={i} className={`s4s-dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)} />
            ))}
          </div>
        </div>

        <div className="s4s-wings-label">
          <span>WING 1</span>
          <span>WING 2</span>
        </div>

        <div className="s4s-wings">
          <div className="s4s-wing">
            <div className="s4s-wing-content">
              <h3>CRAFT <span className="wing-sub">— Career Readiness and Future Technology</span></h3>
              <p className="wing-objective">Objective: To prepare students for future careers by developing technical competence, innovation skills, and real-world problem-solving abilities.</p>
              <ul>
                <li>Hackathons and technical competitions</li>
                <li>Project presentations and innovation challenges</li>
                <li>Emerging technologies</li>
                <li>Skill-building workshops</li>
                <li>Knowledge-sharing sessions</li>
              </ul>
            </div>
            <img src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Media-1.jpg-1024x1024.jpeg" alt="CRAFT Wing" className="s4s-wing-img" loading="lazy" />
          </div>
          <div className="s4s-wing">
            <div className="s4s-wing-content">
              <h3>AITED <span className="wing-sub">— AI Tools Exploration & Development</span></h3>
              <p className="wing-objective">Objective: To empower students with hands-on experience in Artificial Intelligence, exploring modern tools and emerging technological trends.</p>
              <ul>
                <li>AI tool experimentation</li>
                <li>Prompt engineering workshops</li>
                <li>Emerging tech trends</li>
                <li>Machine learning basics</li>
                <li>AI-driven problem solving</li>
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" alt="AITED Wing" className="s4s-wing-img" loading="lazy" />
          </div>
        </div>

        <div className="s4s-platforms-header">
          <h2 className="section-title">Our Innovation <span className="text-gradient-neon">Platforms</span></h2>
        </div>

        <div className="s4s-platforms">
          {platformsData.map((platform) => (
            <motion.div
              key={platform.id}
              variants={cardAnimation}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="s4s-gradient-card-wrapper"
            >
              <div className={`s4s-gradient-card gradient-${platform.gradient}`}>
                {/* Card Content */}
                <div className="s4s-gradient-card-content">
                  {/* Badge */}
                  <div className="s4s-gradient-card-badge">
                    <span 
                      className="s4s-gradient-card-dot" 
                      style={{ backgroundColor: platform.badgeColor }}
                    />
                    {platform.badgeText}
                  </div>

                  {/* Title and Description */}
                  <div className="s4s-gradient-card-text-group">
                    <h3 className="s4s-gradient-card-title">{platform.title}</h3>
                    <p className="s4s-gradient-card-desc">{platform.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default S4S;
