import React, { useState, useMemo, useEffect } from 'react';
import { BrainCircuit, Code, Shield, Cpu, Palette, MonitorPlay, Shirt, PieChart, TrendingUp, LineChart } from 'lucide-react';
import './AcademicWings.css';

interface ProgramItem {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  bg: string;
}

interface ProgramGroup {
  category: string;
  id: string;
  items: ProgramItem[];
}

const programGroups: ProgramGroup[] = [
  {
    id: 'bsc',
    category: "BSc Programs",
    items: [
      {
        id: '1',
        title: 'Computer Science with AI Certification by INTEL',
        description: 'Master artificial intelligence algorithms, neural networking, and prompt engineering, certified directly by INTEL.',
        imgSrc: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop',
        icon: <MonitorPlay size={32} />,
        bg: '#DBEDF9'
      },
      {
        id: '2',
        title: 'Computer Science With Cyber Security',
        description: 'Configure active network defenses, audit system vulnerabilities, and implement secure data architectures.',
        imgSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
        icon: <Shield size={32} />,
        bg: '#EEF2EC'
      },
      {
        id: '3',
        title: 'Information Technology With Data Science',
        description: 'Deep dive into big data processing, statistical computing models, predictive analytics, and SQL systems.',
        imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        icon: <LineChart size={32} />,
        bg: '#F6EBEB'
      },
      {
        id: '4',
        title: 'Artificial Intelligence and Machine Learning with GIP',
        description: 'Understand advanced machine learning models, convolutional neural networks, and NLP systems with global exposure.',
        imgSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
        icon: <BrainCircuit size={32} />,
        bg: '#DDF0F7'
      },
      {
        id: '5',
        title: 'Computer Science Artificial Intelligence with GIP',
        description: 'Learn computational models, intelligent agent frameworks, and robotic control workflows.',
        imgSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
        icon: <Cpu size={32} />,
        bg: '#EAF4E8'
      },
      {
        id: '6',
        title: 'Computer Science with AIDS with GIP',
        description: 'Master software engineering principles, distributed systems, and backend development architectures.',
        imgSrc: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop',
        icon: <Code size={32} />,
        bg: '#F8F5E9'
      },
      {
        id: '7',
        title: 'Visual Communication - Certified AI ready animation & VFX Designer with GIP',
        description: 'Launch your design career in 3D animation, visual effects editing, motion graphics, and UI design.',
        imgSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        icon: <Palette size={32} />,
        bg: '#F4ECE6'
      },
      {
        id: '8',
        title: 'Visual Communication - Certified AI ready animation & VFX Designer',
        description: 'Design creative digital layouts, sandbox game environments, and modern media assets.',
        imgSrc: 'https://images.unsplash.com/photo-1551269901-5c5e14c30d74?q=80&w=800&auto=format&fit=crop',
        icon: <Palette size={32} />,
        bg: '#FCF3D7'
      },
      {
        id: '9',
        title: 'Costume Design and Fashion With GIP',
        description: 'Learn retail fashion operations, apparel engineering, textile patterns, and modern creative styling.',
        imgSrc: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
        icon: <Shirt size={32} />,
        bg: '#E4CCEA'
      },
    ]
  },
  {
    id: 'be-btech',
    category: "B.E & B.Tech Programs",
    items: [
      {
        id: '12',
        title: 'AIDS',
        description: 'Specialized Engineering track focusing on large-scale Artificial Intelligence systems and Big Data technologies.',
        imgSrc: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop',
        icon: <BrainCircuit size={32} />,
        bg: '#EEF0EB'
      },
      {
        id: '13',
        title: 'Computer Science Engineering (AIML)',
        description: 'Build robust machine learning pipelines, computational intelligence frameworks, and advanced neural algorithms.',
        imgSrc: 'https://images.unsplash.com/photo-1501526029524-a8ea952b15be?q=80&w=800&auto=format&fit=crop',
        icon: <Cpu size={32} />,
        bg: '#DDF0F7'
      },
      {
        id: '14',
        title: 'Computer Science Engineering',
        description: 'Develop full-stack web architectures, distributed systems, cloud computing microservices, and databases.',
        imgSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        icon: <Code size={32} />,
        bg: '#EAF4E8'
      },
      {
        id: '15',
        title: 'Computer Science Engineering (CYBER SECURITY)',
        description: 'Audit cloud infrastructure security, perform penetration testing, and configure operational system defense policies.',
        imgSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
        icon: <Shield size={32} />,
        bg: '#EEF2EC'
      }
    ]
  },
  {
    id: 'mba',
    category: "MBA Programs",
    items: [
      {
        id: '10',
        title: 'RCAS - MBA (GIP - ASIA)',
        description: 'Bridge business analytics and executive leadership with tech venture creation and strategic global management.',
        imgSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        icon: <PieChart size={32} />,
        bg: '#8FBDF0'
      },
      {
        id: '11',
        title: 'RTC - MBA (GIP - ASIA)',
        description: 'Develop technology management expertise, financial consulting skills, and startup operations, with international modules.',
        imgSrc: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
        icon: <TrendingUp size={32} />,
        bg: '#E4F1FA'
      },
    ]
  }
];

const AcademicWings: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('bsc');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Identify selected program group
  const currentGroup = useMemo(() => {
    return programGroups.find(g => g.id === activeCategory) || programGroups[0];
  }, [activeCategory]);

  const currentItems = currentGroup.items;

  // Reset activeIndex when changing tabs to prevent index bounds overflow
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = useMemo(() => {
    if (isDesktop) {
      const columns = currentItems
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = currentItems
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, currentItems, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="interest-section section-padding" id="programs">
      <div className="container">
        <div className="interest-header">
          <div className="interest-title-wrapper">
            <span className="interest-tagline">Academic Specializations</span>
            <h2 className="interest-title">WHAT'S YOUR INTEREST?</h2>
          </div>
          <div className="interest-actions">
            <button className="btn btn-outline">Search For Programs</button>
            <button className="btn btn-primary">Apply Now</button>
          </div>
        </div>

        {/* Degree Category Selection Tabs */}
        <div className="degree-tabs-row">
          {programGroups.map((group) => (
            <button
              key={group.id}
              className={`degree-tab-btn ${activeCategory === group.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(group.id)}
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Expanding Cards Accordion */}
        <ul
          className="expanding-cards-container"
          style={{
            ...gridStyle,
            ...(isDesktop 
              ? { gridTemplateRows: '1fr' }
              : { gridTemplateColumns: '1fr' }
            )
          }}
        >
          {currentItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                key={item.id}
                className="expanding-card-item"
                onMouseEnter={() => handleInteraction(index)}
                onFocus={() => handleInteraction(index)}
                onClick={() => handleInteraction(index)}
                tabIndex={0}
                data-active={isActive}
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="expanding-card-img"
                />
                <div className="expanding-card-overlay" />

                <article className="expanding-card-content">
                  {/* Rotated text for inactive cards on desktop */}
                  <h3 className="expanding-card-rotated-title">
                    {item.title}
                  </h3>

                  {/* Active Slide details */}
                  <div className="expanding-card-active-content">
                    <div className="expanding-card-icon" style={{ backgroundColor: item.bg }}>
                      {item.icon}
                    </div>

                    <h3 className="expanding-card-title">
                      {item.title}
                    </h3>

                    <p className="expanding-card-desc">
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AcademicWings;
