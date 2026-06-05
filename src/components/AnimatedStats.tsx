import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import './AnimatedStats.css';

const stats = [
  { value: 50, suffix: '+', text: 'INDUSTRY PARTNERS', prefix: '', light: false },
  { value: 3, suffix: ' Cr+', text: 'HIGHEST PACKAGE', prefix: '₹', light: false },
  { value: 58, suffix: ' LPA', text: 'AVG TOP PLACEMENT', prefix: '₹', light: true },
  { value: 100, suffix: '%', text: 'SCHOLARSHIPS VIA RSTNAT', prefix: '', light: false },
];

const StatCard: React.FC<{ stat: typeof stats[0]; index: number }> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest).toString());

  useEffect(() => {
    if (isInView) {
      animate(count, stat.value, { duration: 2, ease: "easeOut", delay: index * 0.15 });
    }
  }, [isInView, stat.value, count, index]);

  return (
    <motion.div 
      ref={cardRef}
      className={`stat-box ${stat.light ? 'stat-box-light' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
    >
      <div className="stat-number">
        {stat.prefix}
        <motion.span>{rounded}</motion.span>
        {stat.suffix}
      </div>
      <div className="stat-text">{stat.text}</div>
    </motion.div>
  );
};

const AnimatedStats: React.FC = () => {
  return (
    <section className="transformative-section section-padding">
      <div className="container">
        <div className="transformative-content">
          <div className="transformative-text">
            <h2>BE TRANSFORMATIVE.<br />DISCOVER EXCELLENCE.</h2>
          </div>
          <div className="transformative-stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
