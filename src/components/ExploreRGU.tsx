import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight,
  Users, MapPin, Briefcase, Lightbulb, Globe, Factory,
  Zap, Code2, Trophy, GraduationCap,
  Network, Newspaper, MessageSquare, Star, Eye, PhoneCall,
  ChevronUp, ChevronDown
} from 'lucide-react';
import './ExploreRGU.css';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
export interface ExploreItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  keywords: string[];
  color: string;
  link: string;
}

const exploreItems: ExploreItem[] = [
  {
    id: 'about-us',
    title: 'About Us',
    description: 'Discover our vision, mission, and the story behind RGU — a legacy of academic excellence and innovation.',
    icon: <Star size={22} />,
    category: 'University Information',
    keywords: ['about', 'history', 'mission', 'vision', 'rgu', 'rathinam', 'university', 'overview'],
    color: '#3B82F6',
    link: '#about',
  },
  {
    id: 'campus-life',
    title: 'Campus Life',
    description: 'Explore hostels, cafeteria, clubs, events, and the vibrant student culture across our sprawling campus.',
    icon: <MapPin size={22} />,
    category: 'Student Life',
    keywords: ['campus', 'hostel', 'clubs', 'cafeteria', 'life', 'student', 'food', 'stay', 'dorm'],
    color: '#10B981',
    link: '#campus-life',
  },
  {
    id: 'placements',
    title: 'Placements',
    description: 'Record-breaking placement outcomes with top MNCs. See real salaries, companies, and student success stories.',
    icon: <Briefcase size={22} />,
    category: 'Career Growth',
    keywords: ['placement', 'job', 'salary', 'career', 'hiring', 'company', 'mnc', 'package', 'recruit', 'offer'],
    color: '#8B5CF6',
    link: '#placements',
  },
  {
    id: 'innovation-hub',
    title: 'Innovation Hub',
    description: 'A thriving ecosystem for startups, patents, and breakthrough research. Build what the world needs next.',
    icon: <Lightbulb size={22} />,
    category: 'Innovation',
    keywords: ['innovation', 'startup', 'research', 'patent', 'incubation', 'lab', 'build', 'create', 'entrepreneur'],
    color: '#F59E0B',
    link: '#innovation',
  },
  {
    id: 'global-immersion',
    title: 'Global Immersion',
    description: 'International collaborations, exchange programs, and global exposure opportunities at partner universities.',
    icon: <Globe size={22} />,
    category: 'Global Opportunities',
    keywords: ['global', 'international', 'exchange', 'abroad', 'partner', 'foreign', 'overseas', 'study abroad'],
    color: '#06B6D4',
    link: '#global',
  },
  {
    id: 'industrial-experience',
    title: 'Industrial Experience',
    description: 'Internships, industry visits, and live projects with 500+ partner companies from day one.',
    icon: <Factory size={22} />,
    category: 'Career Growth',
    keywords: ['internship', 'industry', 'experience', 'project', 'live', 'practical', 'work', 'company', 'visit'],
    color: '#EF4444',
    link: '#industrial',
  },
  {
    id: 'techfest',
    title: 'TechFest',
    description: 'South India\'s largest annual technology festival — competitions, workshops, keynotes, and networking.',
    icon: <Zap size={22} />,
    category: 'Innovation',
    keywords: ['techfest', 'tech', 'festival', 'event', 'competition', 'workshop', 'keynote', 'annual'],
    color: '#F97316',
    link: '#techfest',
  },
  {
    id: 'hackathon',
    title: 'Hackathon',
    description: '48-hour intensive coding challenges, open to all students. Win prizes, solve real-world problems.',
    icon: <Code2 size={22} />,
    category: 'Innovation',
    keywords: ['hackathon', 'coding', 'challenge', 'hack', 'build', 'prize', '48 hour', 'code', 'development'],
    color: '#6366F1',
    link: '#hackathon',
  },
  {
    id: 'rgf',
    title: 'Culturals',
    description: 'Experience the vibrant cultural life, annual fests, pongal, onam, diwali, and DJ nights at RGU.',
    icon: <Users size={22} />,
    category: 'Student Life',
    keywords: ['culturals', 'festival', 'dance', 'pongal', 'onam', 'diwali', 'christmas', 'dj night', 'iftar', 'rgf', 'celebration'],
    color: '#14B8A6',
    link: '#rgf',
  },
  {
    id: 'sports',
    title: 'International Sports Facilities',
    description: 'World-class stadiums, courts, pools, and training centers. Home to national and state-level champions.',
    icon: <Trophy size={22} />,
    category: 'Student Life',
    keywords: ['sports', 'stadium', 'court', 'pool', 'athletics', 'games', 'gym', 'cricket', 'football', 'fitness', 'international'],
    color: '#22C55E',
    link: '#sports',
  },
  {
    id: 'admissions',
    title: 'Admissions',
    description: 'Everything you need to know about joining RGU — eligibility, deadlines, fees, and the application process.',
    icon: <GraduationCap size={22} />,
    category: 'Academics',
    keywords: ['admission', 'apply', 'join', 'enroll', 'fee', 'eligibility', 'deadline', 'form', 'application', 'how to apply'],
    color: '#3B82F6',
    link: '#admissions',
  },

  {
    id: 'alumni',
    title: 'Alumni Network',
    description: 'Join 50,000+ successful alumni across 60+ countries. Connect, mentor, and collaborate globally.',
    icon: <Network size={22} />,
    category: 'Career Growth',
    keywords: ['alumni', 'network', 'graduate', 'old students', 'connect', 'mentor', 'past student', 'community'],
    color: '#0EA5E9',
    link: '#alumni',
  },

  {
    id: 'news',
    title: 'News & Events',
    description: 'Stay updated with the latest campus news, upcoming events, announcements, and achievements.',
    icon: <Newspaper size={22} />,
    category: 'University Information',
    keywords: ['news', 'events', 'announcement', 'update', 'latest', 'happening', 'achievement', 'press'],
    color: '#64748B',
    link: '#news',
  },
  {
    id: 'testimonials',
    title: 'Student Testimonials',
    description: 'Real stories from real students — hear how RGU transformed their careers and lives.',
    icon: <MessageSquare size={22} />,
    category: 'Student Life',
    keywords: ['testimonial', 'review', 'story', 'experience', 'student review', 'feedback', 'opinion', 'success'],
    color: '#EC4899',
    link: '#testimonials',
  },
  {
    id: 'virtual-tour',
    title: 'Virtual Tour',
    description: 'Take a virtual 360-degree walkthrough of our smart campus classrooms, labs, libraries, hostels, and sports facilities.',
    icon: <Eye size={22} />,
    category: 'University Information',
    keywords: ['virtual', 'tour', 'walkthrough', '360', 'campus', 'infrastructure', 'video', 'view'],
    color: '#F43F5E',
    link: '#virtual-tour',
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    description: 'Get in touch with Rathinam Global University for admissions, program details, accommodation, and campus support.',
    icon: <PhoneCall size={22} />,
    category: 'University Information',
    keywords: ['contact', 'phone', 'email', 'admissions support', 'help', 'address', 'location', 'inquiry'],
    color: '#0EA5E9',
    link: '#contact-us',
  },
];



const PLACEHOLDERS = [
  'Explore your future career paths at Raise Smart...',
  'Search international sports and student clubs...',
  'Discover academic programs and global partnerships...',
  'Look up top placements, internships, and startup stories...',
];

/* ─────────────────────────────────────────
   SEARCH RESULT ROW
───────────────────────────────────────── */
interface SearchResultProps {
  item: ExploreItem;
  onSelect: (item: ExploreItem) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ item, onSelect }) => (
  <motion.button
    className="search-result-row"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    onClick={() => onSelect(item)}
  >
    <span className="search-result-icon" style={{ background: `${item.color}18`, color: item.color }}>
      {item.icon}
    </span>
    <span className="search-result-text">
      <span className="search-result-title">{item.title}</span>
      <span className="search-result-cat">{item.category}</span>
    </span>
    <ArrowRight size={14} className="search-result-arrow" />
  </motion.button>
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const ExploreRGU: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ExploreItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rotationIntervalRef = useRef<number | null>(null);

  // Continuous smooth rotation using requestAnimationFrame
  const [rotationAngle, setRotationAngle] = useState(180);

  const radius = 320; 

  // Dynamic tactile/haptic vibe
  const triggerHaptic = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(8);
    }
  };

  const rotateClockwise = () => {
    triggerHaptic();
    setRotationAngle(prev => prev + 22.5);
  };

  const rotateCounterClockwise = () => {
    triggerHaptic();
    setRotationAngle(prev => prev - 22.5);
  };

  const startAutoRotate = () => {
    if (rotationIntervalRef.current !== null) return;
    rotationIntervalRef.current = window.setInterval(() => {
      setRotationAngle(prev => (prev + 22.5) % 360);
      triggerHaptic();
    }, 2000); // 2 seconds pause between ticks
  };

  const pauseAutoRotate = () => {
    if (rotationIntervalRef.current !== null) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }
  };

  // Initialize auto-rotation on mount
  useEffect(() => {
    startAutoRotate();
    return () => pauseAutoRotate();
  }, []);

  // Hover pause/resume handlers
  const handleBubbleMouseEnter = (itemId: string) => {
    setHoveredItemId(itemId);
    pauseAutoRotate();
  };

  const handleBubbleMouseLeave = () => {
    setHoveredItemId(null);
    if (!selectedItemId) {
      startAutoRotate();
    }
  };

  /* Rotating placeholders */
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx(i => (i + 1) % PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);
  
  /* Live search logic */
  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const lower = value.toLowerCase();
    const results = exploreItems.filter(item =>
      item.keywords.some(k => k.includes(lower)) ||
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower)
    );
    
    // Sort suggestions by relevance:
    // 1. Starts with query (highest)
    // 2. Contains query in title
    // 3. Keyword matches
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      
      const aStarts = aTitle.startsWith(lower) ? 1 : 0;
      const bStarts = bTitle.startsWith(lower) ? 1 : 0;
      if (aStarts !== bStarts) return bStarts - aStarts;

      const aContains = aTitle.includes(lower) ? 1 : 0;
      const bContains = bTitle.includes(lower) ? 1 : 0;
      if (aContains !== bContains) return bContains - aContains;

      return 0;
    });

    setSearchResults(results);
    setShowDropdown(true);
  }, []);

  /* Click outside dropdown to close */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Navigate to item */
  const handleSelect = (item: ExploreItem) => {
    triggerHaptic();
    setTransitioning(true);
    setShowDropdown(false);
    setQuery('');
    setTimeout(() => {
      window.location.href = item.link;
      setTransitioning(false);
    }, 500);
  };

  /* Bubble interaction: Instant direct navigation on Click */
  const handleBubbleClick = (item: ExploreItem) => {
    pauseAutoRotate();
    handleSelect(item);
  };

  // Dynamic featured highlight index (item closest to 180deg)
  const activeItemIdx = exploreItems.findIndex((_, idx) => {
    const angle = (idx * 22.5) + rotationAngle;
    const normalizedAngle = ((angle % 360) + 360) % 360;
    return Math.abs(normalizedAngle - 180) < 11.25;
  });

  // Selected item data for expanded card
  const selectedItem = exploreItems.find(item => item.id === selectedItemId) || null;

  return (
    <>
      {/* Page transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="explore-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <section className="explore-section" id="explore-rgu">
        {/* ── GALAXY HERO ── */}
        <div className="explore-hero">
          {/* Decorative dot grid pattern (CSS-only) */}
          <div className="stars"></div>
          
          <div className="explore-container">
            {/* Left Column: Branding, Heading, Search Bar */}
            <div className="explore-left-col">
              <motion.span
                className="explore-hero__eyebrow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Raise Smart | Coimbatore
              </motion.span>
              
              <motion.h2
                className="explore-hero__heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your Future <br />
                <span className="explore-hero__brand">Starts Here.</span>
              </motion.h2>
              
              <motion.p
                className="explore-hero__sub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Step into the nexus of innovation and global education. Explore India's premier tech-first upskilling and knowledge partner.
              </motion.p>

              {/* Search input bar */}
              <motion.div
                className="explore-search-wrapper"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="explore-search-bar">
                  <Search size={20} className="explore-search-icon" />
                  <input
                    ref={inputRef}
                    type="text"
                    className="explore-search-input"
                    value={query}
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={() => query && setShowDropdown(true)}
                    placeholder={PLACEHOLDERS[placeholderIdx]}
                    aria-label="Search campus sections"
                    autoComplete="off"
                  />
                  {query && (
                    <button className="explore-search-clear" onClick={() => { setQuery(''); setShowDropdown(false); inputRef.current?.focus(); }} aria-label="Clear search">
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Dropdown suggestions */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      ref={dropdownRef}
                      className="explore-search-dropdown"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {searchResults.length > 0 ? (
                        <>
                          <p className="dropdown-label">{searchResults.length} suggestion{searchResults.length !== 1 ? 's' : ''} found</p>
                          {searchResults.map(item => (
                            <SearchResult key={item.id} item={item} onSelect={handleSelect} />
                          ))}
                        </>
                      ) : (
                        <p className="dropdown-empty">No results for "<strong>{query}</strong>". Try clicking bubbles on the right!</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column: Clock Orbit Circular Explorer */}
            <div className="explore-right-col">
              <div 
                className="orbit-portal-sphere"
              >
                {/* Central Core */}
                <div className={`orbit-central-core ${selectedItemId ? 'expanded-panel' : ''}`}> 
                  <span className="orbit-vertical-text">EXPLORE</span>
                  {selectedItem && (
                    <div className="orbit-expanded-card">
                      <div className="card-morph-header">
                        <div className="card-morph-badge">{selectedItem.category}</div>
                        <h3 className="card-morph-title">{selectedItem.title}</h3>
                      </div>
                      <p className="card-morph-desc">{selectedItem.description}</p>
                      <button
                        className="card-explore-action-btn"
                        onClick={() => {
                          handleSelect(selectedItem);
                          // clear selection after navigation
                          setSelectedItemId(null);
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  )}
                </div>

                {/* Manual Rotation Controls */}
                <button 
                  className="orbit-control-btn orbit-control-up" 
                  onClick={rotateCounterClockwise}
                  aria-label="Rotate up"
                >
                  <ChevronUp size={20} />
                </button>
                <button 
                  className="orbit-control-btn orbit-control-down" 
                  onClick={rotateClockwise}
                  aria-label="Rotate down"
                >
                  <ChevronDown size={20} />
                </button>

                {/* Orbit Path line */}
                <div className="orbit-path-line"></div>

                {/* 16 Options positioned around the circle */}
                {exploreItems.map((item, idx) => {
                  const angle = (idx * 22.5) + rotationAngle;
                  const normalizedAngle = ((angle % 360) + 360) % 360;

                  const diff = Math.abs(normalizedAngle - 180);
                  
                  let opacity = 0;
                  let scale = 0.8;
                  let isVisible = false;

                  if (diff <= 95) {
                    isVisible = true;
                    const factor = 1 - (diff / 95); 
                    opacity = 0.25 + 0.75 * factor;
                    scale = 0.85 + 0.25 * factor;
                  }

                  const angleRad = (angle * Math.PI) / 180;
                  const x = radius * Math.cos(angleRad);
                  const y = radius * Math.sin(angleRad);

                  // Determine if this bubble is the selected one for animated transition
                  const isSelected = selectedItemId === item.id;
                  const targetTransform = isSelected
                    ? 'translate(-50%, -50%) translate(0px, 0px) scale(1.2)'
                    : `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;

                  return (
                    <div
                      key={item.id}
                      className={`orbiting-bubble-item ${
                        activeItemIdx === idx ? 'active-orbit' : ''
                      }`}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: targetTransform,
                        opacity: opacity,
                        pointerEvents: isVisible && !selectedItemId ? 'auto' : 'none',
                        zIndex: Math.round(opacity * 100),
                        transition: isSelected ? 'transform 0.6s ease-out, opacity 0.4s ease' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, border-color 0.3s'
                      }}
                      onMouseEnter={() => handleBubbleMouseEnter(item.id)}
                      onMouseLeave={handleBubbleMouseLeave}
                      onClick={() => handleBubbleClick(item)}
                    >
                      <div className="orbit-bubble-icon" style={{ background: `${item.color}15`, color: item.color }}>
                        {item.icon}
                      </div>
                      <span className="orbit-bubble-label">{item.title}</span>
                      {hoveredItemId === item.id && (
                        <div className="orbit-tooltip-preview">
                          <span className="tooltip-title">{item.title}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreRGU;
