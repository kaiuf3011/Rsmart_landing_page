import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './ApplicationForm.css';

const COURSE_SPECIALIZATIONS: Record<string, string[]> = {
  bsc: [
    "Computer Science with AI Certification by INTEL",
    "Computer Science With Cyber Security",
    "Information Technology With Datascience",
    "Artificial Intelligence and machine earning with GIP",
    "Computer Science Artificail Intelligence with GIP",
    "Computer science with AIDS with GIP",
    "Visual Communication - Certified AI ready animation & VFX Designer with GIP",
    "Visual Communication - Certified AI ready animation & VFX Designer",
    "Costume Design and Fashion With GIP"
  ],
  mba: [
    "RCAS - MBA (GIP - ASIA)",
    "RTC - MBA (GIP - ASIA)"
  ],
  btech: [
    "AIDS",
    "Computer Science engineering (AIML)",
    "Computer Science engineering",
    "Computer Science engineering (CYBER SECURITY)"
  ]
};

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    course: '',
    specialization: '',
    institute: ''
  });
  const [captchaInput, setCaptchaInput] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  // OTP States
  const [otpInput, setOtpInput] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'otp_error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If course changes, reset specialization
    if (name === 'course') {
      setFormData(prev => ({ ...prev, course: value, specialization: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email address first.");
      return;
    }

    setOtpSending(true);
    setSubmitStatus('idle');

    // DEMO MODE: Simulate a network request to send OTP
    setTimeout(() => {
      setOtpSending(false);
      setOtpSent(true);
      // Optional: Just alert the user they can enter anything for the demo
      console.log("DEMO MODE: Any 4+ digit OTP will work.");
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    if (!otpInput) {
      alert("Please enter the OTP sent to your email.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // DEMO MODE: Simulate OTP Verification
      // Accept any OTP that is at least 4 characters long for the demo
      if (otpInput.length < 4) {
        setSubmitStatus('otp_error');
        setIsSubmitting(false);
        return;
      }

      // Step 2: Insert Application Data (This still saves to your Supabase table!)
      const { error: dbError } = await supabase
        .from('applications')
        .insert([formData]);

      if (dbError) throw dbError;
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '', email: '', mobile: '', 
        state: '', city: '', course: '', specialization: '', institute: ''
      });
      setCaptchaInput('');
      setOtpInput('');
      setOtpSent(false);
      setAgreed(false);

    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-form-container">
      <h2 className="app-form-title">Application Form</h2>
      
      {submitStatus === 'success' && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#DCFCE7', color: '#166534', borderRadius: '8px', textAlign: 'center' }}>
          Application submitted successfully!
        </div>
      )}

      {submitStatus === 'otp_error' && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '8px', textAlign: 'center' }}>
          Invalid OTP! Please check your email and try again.
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '8px', textAlign: 'center' }}>
          Failed to submit application. Please try again.
        </div>
      )}

      <form className="app-form" onSubmit={handleSubmit}>
        {/* Row 1: Name */}
        <div className="form-row">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Full Name *" required className="form-input" />
        </div>

        {/* Row 2: Email */}
        <div className="form-row">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address *" required className="form-input" />
        </div>

        {/* Row 3: OTP */}
        <div className="form-row otp-row">
          <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP *" required className="form-input" />
          <button type="button" className="btn-get-otp" onClick={handleSendOtp} disabled={otpSending || !formData.email}>
            {otpSending ? 'Sending...' : otpSent ? 'Resend OTP' : 'Get OTP'}
          </button>
        </div>

        {/* Row 4: Mobile */}
        <div className="form-row mobile-input-wrapper">
          <div className="country-code">+91</div>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number *" required className="form-input" />
        </div>

        {/* Row 5: State and City */}
        <div className="form-row two-col">
          <select className="form-select" name="state" value={formData.state} onChange={handleChange} required>
            <option value="" disabled>Select State *</option>
            <option value="tn">Tamil Nadu</option>
            <option value="ka">Karnataka</option>
            <option value="kl">Kerala</option>
          </select>
          <select className="form-select" name="city" value={formData.city} onChange={handleChange} required>
            <option value="" disabled>Select City *</option>
            <option value="cbe">Coimbatore</option>
            <option value="chn">Chennai</option>
            <option value="mdu">Madurai</option>
          </select>
        </div>

        {/* Row 6: Course and Specialization */}
        <div className="form-row two-col">
          <select className="form-select" name="course" value={formData.course} onChange={handleChange} required>
            <option value="" disabled>Select Course *</option>
            <option value="btech">B.E & B.Tech</option>
            <option value="bsc">B.Sc</option>
            <option value="mba">MBA</option>
          </select>
          <select className="form-select" name="specialization" value={formData.specialization} onChange={handleChange} required disabled={!formData.course}>
            <option value="" disabled>Select Specialization *</option>
            {formData.course && COURSE_SPECIALIZATIONS[formData.course]?.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Row 7: Institute */}
        <div className="form-row">
          <select className="form-select" name="institute" value={formData.institute} onChange={handleChange} required>
            <option value="" disabled>Select Institute Applying for *</option>
            <option value="rathinam">Rathinam Group of Institutions</option>
            <option value="smart">Raise Smart School of Technology</option>
          </select>
        </div>

        {/* Captcha */}
        <div className="form-row captcha-row">
          <div className="captcha-box">
            <span className="captcha-text">3 S F J F 4</span>
            <button type="button" className="btn-refresh-captcha">
              <RefreshCw size={18} />
            </button>
          </div>
          <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Enter Captcha" required className="form-input" />
        </div>

        {/* Agreement Checkbox */}
        <div className="form-row checkbox-row">
          <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
          <label htmlFor="agree">
            I agree to receive information regarding my submitted application by signing up on Rathinam Group of Institutions *
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit-form" disabled={isSubmitting}>
          {isSubmitting ? 'SUBMITTING...' : 'APPLY NOW'}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
