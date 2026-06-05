import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Code, Globe, Cpu, Award, Briefcase, MapPin, Users, Monitor } from 'lucide-react';
import './WhyRaiseSmart.css';

interface BenefitData {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
}

const benefits: BenefitData[] = [
  {
    icon: <Building2 size={20} />,
    title: 'IT Park Ecosystem',
    subtitle: 'Direct connection to tech companies and startups.',
    bullets: [
      'Learning integrated with industry',
      'On-campus IT Park for direct ecosystem access',
      'Work alongside real startups and innovators'
    ]
  },
  {
    icon: <Code size={20} />,
    title: 'Build From Day One',
    subtitle: 'Hands-on tech development.',
    bullets: [
      'Project-driven learning from semester one',
      'Develop real applications and software systems',
      'Build a strong professional portfolio early'
    ]
  },
  {
    icon: <Globe size={20} />,
    title: 'Global & Industry Exposure',
    subtitle: 'Learn from global experts.',
    bullets: [
      'Mentorship from tech leaders and entrepreneurs',
      'Engage in masterclasses and tech workshops',
      'Gain insights into global tech standards'
    ]
  },
  {
    icon: <Cpu size={20} />,
    title: 'AI & Emerging Tech',
    subtitle: "Tomorrow's technologies, integrated today.",
    bullets: [
      'Curriculum focused on AI, ML, and Web3',
      'Learn modern software engineering and cloud',
      'Stay ahead with market-demanded skill modules'
    ]
  },
  {
    icon: <Award size={20} />,
    title: 'Skill Certification',
    subtitle: 'Earn industry-validated credentials.',
    bullets: [
      'Gain specialized technical certifications',
      'Master Cloud, AI, and Cybersecurity',
      'Boost your career profile every semester'
    ]
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Industry Immersion',
    subtitle: 'Experience active engineering environments.',
    bullets: [
      'Bridge academic theory with corporate operations',
      'Solve live challenges and industry case studies',
      'Transition smoothly into professional workflows'
    ]
  },
  {
    icon: <MapPin size={20} />,
    title: 'Field Exposure',
    subtitle: 'Step outside into real tech operations.',
    bullets: [
      'Visits to tech hubs and data centers',
      'Observe real engineering and infrastructure',
      'Connect theories to real-world digital systems'
    ]
  },
  {
    icon: <Users size={20} />,
    title: 'Leadership Training',
    subtitle: 'Develop emotional intelligence and leadership.',
    bullets: [
      'Build problem-solving and strategic skills',
      'Outbound camps and team-based exercises',
      'Foster trust, soft skills, and character'
    ]
  },
  {
    icon: <Monitor size={20} />,
    title: 'MacBook Neo',
    subtitle: 'Professional workstation gear.',
    bullets: [
      'Equipped with high-performance MacBooks',
      'Pre-loaded with essential developer tools',
      'Native speed for complex builds and AI'
    ]
  }
];

export const BenefitsColumn = (props: {
  className?: string;
  benefits: BenefitData[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="wrs-column-inner"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.benefits.map((b, i) => (
                <div className="wrs-grid-card" key={i}>
                  <div className="wrs-grid-content">
                    <div className="wrs-grid-header-row">
                      <div className="wrs-grid-icon-badge">{b.icon}</div>
                      <h3 className="wrs-grid-title">{b.title}</h3>
                    </div>
                    <p className="wrs-grid-subtitle">{b.subtitle}</p>
                    
                    <ul className="wrs-grid-bullets">
                      {b.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="wrs-grid-bullet-item">
                          <span className="wrs-bullet-dot"></span>
                          <span className="wrs-grid-bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const WhyRaiseSmart: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const col1 = [benefits[0], benefits[3], benefits[6]];
  const col2 = [benefits[1], benefits[4], benefits[7]];
  const col3 = [benefits[2], benefits[5], benefits[8]];

  return (
    <section className="wrs-section section-padding" id="why-raise-smart" ref={sectionRef}>
      <div className="container wrs-layout-container">
        <div className="wrs-header">
          <h2 className="section-title">Why Raise Smart <span className="text-gradient">School of Technology?</span></h2>
          <div className="wrs-title-indicator-line">
            <span className="dot pink"></span>
            <span className="dot red"></span>
            <span className="dot orange"></span>
            <span className="line"></span>
          </div>
        </div>

        {/* Scrolling Grid Container */}
        <div className="wrs-grid-container">
          <BenefitsColumn benefits={col1} duration={28} className="wrs-col" />
          <BenefitsColumn benefits={col2} duration={20} className="wrs-col" />
          <BenefitsColumn benefits={col3} duration={32} className="wrs-col" />
        </div>
      </div>
    </section>
  );
};

export default WhyRaiseSmart;