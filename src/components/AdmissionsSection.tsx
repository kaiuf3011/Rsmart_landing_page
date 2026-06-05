import React from 'react';
import ApplicationForm from './ApplicationForm';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import './AdmissionsSection.css';

const AdmissionsSection: React.FC = () => {
  return (
    <section id="admissions" className="admissions-section">
      <div className="container admissions-container">
        
        {/* Left side text/graphics */}
        <motion.div 
          className="admissions-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="admissions-title">Start Your Journey With Us</h2>
          <p className="admissions-subtitle">
            Join the Raise Smart School of Technology and transform your career with our tech-first upskilling programs. Fill out the application form to take your first step.
          </p>
          
          <div className="admissions-features">
            <div className="feature-item">
              <div className="feature-icon"><GraduationCap size={24} /></div>
              <div>
                <h3>Industry-Led Curriculum</h3>
                <p>Learn exactly what top tech companies are looking for.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon"><BookOpen size={24} /></div>
              <div>
                <h3>Hands-on Projects</h3>
                <p>Build a strong portfolio with real-world applications.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon"><Users size={24} /></div>
              <div>
                <h3>Expert Mentorship</h3>
                <p>Get guided by professionals working in top global firms.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side form */}
        <motion.div 
          className="admissions-form-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ApplicationForm />
        </motion.div>

      </div>
    </section>
  );
};

export default AdmissionsSection;
