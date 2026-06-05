import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Happenings.css';

const events = [
  {
    id: 1,
    title: 'CRAFT Hackathons & Innovation Challenges',
    date: '12 AUG',
    location: 'Rathinam IT Park',
    image: '/ctraft.png',
    description: 'Technical competence and career readiness challenges driven by the S4S (Students for Students) CRAFT wing.'
  },
  {
    id: 2,
    title: 'TALKONAUTS Leadership Summit',
    date: '05 SEP',
    location: 'Peer Power Hive',
    image: '/talkonauts.png',
    description: 'Focusing on communication, public speaking, and leadership development with peer-to-peer mentoring.'
  },
  {
    id: 3,
    title: 'Pro Power Talks & AITED Explore',
    date: '20 SEP',
    location: 'Dell & Intel AI Skills Lab',
    image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Media-1-2.jpg-1024x682.jpeg',
    description: 'Biweekly sessions where industry professionals share real-world insights, paired with AI tools exploration.'
  }
];

const EventCard: React.FC<{ event: typeof events[0], index: number }> = ({ event, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Image parallax effect: pan down slightly as the card scrolls up
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      className="event-card"
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <div className="event-image-wrapper" style={{ overflow: 'hidden' }}>
        <motion.img 
          src={event.image} 
          alt={event.title} 
          className="event-image" 
          style={{ y: imageY, scale: 1.15 }}
        />
      </div>
      <div className="event-content">
        <div className="event-location">
          <MapPin size={14} /> {event.location}
        </div>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-desc">{event.description}</p>
        <button className="btn-read-more">Read More</button>
      </div>
    </motion.div>
  );
};

const Happenings: React.FC = () => {
  return (
    <section className="happenings-section section-padding" id="s4s">
      <div className="container">
        <motion.div 
          className="happenings-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-title">S4S COMMUNITY HAPPENINGS</h2>
        </motion.div>
        
        <div className="happenings-grid">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Happenings;
