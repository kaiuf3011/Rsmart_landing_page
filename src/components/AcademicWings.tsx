import React from 'react';
import { BrainCircuit, Code, Shield, Cpu, Palette, MonitorPlay, Shirt, PieChart, TrendingUp, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import './AcademicWings.css';

const programGroups = [
  {
    category: "BSc Programs",
    items: [
      { id: '1', title: 'Computer Science with AI Certification by INTEL', icon: <MonitorPlay size={24} />, bg: '#DBEDF9' },
      { id: '2', title: 'Computer Science With Cyber Security', icon: <Shield size={24} />, bg: '#EEF2EC' },
      { id: '3', title: 'Information Technology With Data Science', icon: <LineChart size={24} />, bg: '#F6EBEB' },
      { id: '4', title: 'Artificial Intelligence and Machine Learning with GIP', icon: <BrainCircuit size={24} />, bg: '#DDF0F7' },
      { id: '5', title: 'Computer Science Artificial Intelligence with GIP', icon: <Cpu size={24} />, bg: '#EAF4E8' },
      { id: '6', title: 'Computer Science with AIDS with GIP', icon: <Code size={24} />, bg: '#F8F5E9' },
      { id: '7', title: 'Visual Communication - Certified AI ready animation & VFX Designer with GIP', icon: <Palette size={24} />, bg: '#F4ECE6' },
      { id: '8', title: 'Visual Communication - Certified AI ready animation & VFX Designer', icon: <Palette size={24} />, bg: '#FCF3D7' },
      { id: '9', title: 'Costume Design and Fashion With GIP', icon: <Shirt size={24} />, bg: '#E4CCEA' },
    ]
  },
  {
    category: "B.E & B.Tech Programs",
    items: [
      { id: '12', title: 'AIDS', icon: <BrainCircuit size={24} />, bg: '#EEF0EB' },
      { id: '13', title: 'Computer Science Engineering (AIML)', icon: <Cpu size={24} />, bg: '#DDF0F7' },
      { id: '14', title: 'Computer Science Engineering', icon: <Code size={24} />, bg: '#EAF4E8' },
      { id: '15', title: 'Computer Science Engineering (CYBER SECURITY)', icon: <Shield size={24} />, bg: '#EEF2EC' }
    ]
  },
  {
    category: "MBA Programs",
    items: [
      { id: '10', title: 'RCAS - MBA (GIP - ASIA)', icon: <PieChart size={24} />, bg: '#8FBDF0' },
      { id: '11', title: 'RTC - MBA (GIP - ASIA)', icon: <TrendingUp size={24} />, bg: '#E4F1FA' },
    ]
  }
];

const AcademicWings: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: (i % 4) * 0.1, // Stagger effect by column (max 4 columns)
        duration: 0.6,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section className="interest-section section-padding" id="programs">
      <div className="container">
        <motion.div 
          className="interest-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="interest-title">WHAT'S YOUR INTEREST?</h2>
          <div className="interest-actions">
            <button className="btn btn-outline">Search For Programs</button>
            <button className="btn btn-light-gray">Apply Now</button>
          </div>
        </motion.div>
        
        <div className="programs-container">
          {programGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="program-group">
              <h3 className="program-group-title">{group.category}</h3>
              <div className="interest-grid">
                {group.items.map((item, i) => (
                  <motion.div 
                    key={item.id} 
                    className="interest-card"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                  >
                    <div className="interest-icon-box" style={{ backgroundColor: item.bg }}>
                      {item.icon}
                    </div>
                    <span className="interest-name">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicWings;
