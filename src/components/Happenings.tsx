import React, { useState } from 'react';
import './Happenings.css';

const initiatives = [
  {
    id: 1,
    title: 'CRAFT Hackathons & Innovation Challenges',
    shortTitle: 'CRAFT WING',
    subtitle: 'WING 1 — Career Readiness and Future Technology',
    image: '/ctraft.png',
    description: 'Prepare for future careers by developing technical competence, innovation skills, and real-world problem-solving abilities. Take part in hackathons, project presentations, and emerging technology workshops.',
    colorTheme: '#000000',
    tagColor: 'rgba(15, 23, 42, 0.08)'
  },
  {
    id: 2,
    title: 'TALKONAUTS Leadership Summit',
    shortTitle: 'TALKONAUTS',
    subtitle: 'WING 2 — Peer Power Hive & Leadership',
    image: '/talkonauts.png',
    description: 'Empower student leaders through peer-to-peer mentoring, focused leadership development, and interest-based innovation teams working on web development, design, and emerging tech.',
    colorTheme: '#f59e0b',
    tagColor: 'rgba(245, 158, 11, 0.1)'
  },
  {
    id: 3,
    title: 'Pro Power Talks & AITED Explore',
    shortTitle: 'AITED EXPLORE',
    subtitle: 'AI Tools Exploration & Development',
    image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Media-1-2.jpg-1024x682.jpeg',
    description: 'Directly interact with industry professionals sharing real-world insights, and explore Artificial Intelligence tools, machine learning basics, prompt engineering, and AI-driven solutions.',
    colorTheme: '#ef4444',
    tagColor: 'rgba(239, 68, 68, 0.1)'
  }
];

const Happenings: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="happenings-section" id="s4s">
      <div className="happenings-container">
        
        {/* Header content with premium typography */}
        <div className="happenings-header-wrapper">
          <span className="happenings-tagline">S4S Community</span>
          <h2 className="happenings-title">INITIATIVES & WINGS</h2>
          <p className="happenings-subtitle">
            Explore our dynamic student-led wings, clubs, and ongoing innovation programs.
          </p>
        </div>

        {/* Dynamic Interactive Accordion */}
        <div className="happenings-accordion-grid">
          {initiatives.map((initiative, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={initiative.id}
                onClick={() => setActiveIndex(i)}
                className={`accordion-card ${isActive ? 'active' : 'inactive'}`}
              >
                {/* Background image container for hover/inactive states */}
                <div className="card-bg-overlay-wrapper">
                  <div 
                    className="card-bg-image" 
                    style={{ 
                      backgroundImage: `url(${initiative.image})`
                    }}
                  />
                  <div className="card-bg-gradient"></div>
                </div>

                {/* ACTIVE STATE (Detailed Card, white background) */}
                <div className="active-card-content">
                  {/* Image Frame */}
                  <div className="active-card-image-container" style={{ backgroundColor: initiative.id === 2 ? '#ffffff' : '#000000' }}>
                    <img 
                      src={initiative.image} 
                      alt={initiative.title} 
                      className="active-event-image contain" 
                    />
                  </div>

                  {/* Text details */}
                  <div className="active-card-details">
                    <div className="active-meta-row">
                      <span className="active-wing-badge" style={{ color: initiative.id === 1 ? '#0f172a' : initiative.colorTheme }}>
                        {initiative.subtitle}
                      </span>
                    </div>

                    <h3 className="active-event-title">{initiative.title}</h3>
                    <p className="active-event-desc">{initiative.description}</p>
                    
                    <div className="active-card-footer">
                      <span className="active-brand-label" style={{ color: '#64748b' }}>S4S COMMUNITY</span>
                    </div>
                  </div>
                </div>

                {/* INACTIVE STATE (Glassmorphic Tab, centered title) */}
                <div className="inactive-card-content">
                  <div className="inactive-badge">INITIATIVE 0{initiative.id}</div>
                  <div className="inactive-title-wrapper">
                    <h4 className="inactive-event-title">{initiative.shortTitle}</h4>
                  </div>
                  <div className="inactive-explore-indicator">
                    <span>Click to expand</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Happenings;

