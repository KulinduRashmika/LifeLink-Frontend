import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPages.css';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nicHospitalId: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    location: '',
    requiredBloodGroupOrgan: '',
    urgencyLevel: 'normal',
    hospitalName: '',
    medicalReport: null,
    consent: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      medicalReport: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient registration submitted:', formData);
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-form-wrapper">
          <div className="registration-header">
            <h1 className="registration-title">Patient Registration</h1>
            <p className="registration-subtitle">Provide patient details and medical reports to request blood or organ support</p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            {/* Patient Details Section */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 4-8 8-8s8 4 8 8"/>
                </svg>
              </div>
              <h2 className="section-title">Patient Details</h2>
              
              <div className="form-group full-width">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter patient's full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nicHospitalId">NIC / Hospital ID</label>
                  <input
                    type="text"
                    id="nicHospitalId"
                    name="nicHospitalId"
                    placeholder="ID Number"
                    value={formData.nicHospitalId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="e.g. 35"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="+123 456 7890"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical Requirement Section */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm2 13h-2v-3H7v-2h3V9h2v3h3v2h-3v3z"/>
                </svg>
              </div>
              <h2 className="section-title">Medical Requirement</h2>
              
              <div className="form-group full-width">
                <label htmlFor="requiredBloodGroupOrgan">Required Blood Group or Organ</label>
                <select
                  id="requiredBloodGroupOrgan"
                  name="requiredBloodGroupOrgan"
                  value={formData.requiredBloodGroupOrgan}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose Requirement</option>
                  <optgroup label="Blood Groups">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </optgroup>
                  <optgroup label="Organs">
                    <option value="kidney">Kidney</option>
                    <option value="liver">Liver</option>
                    <option value="heart">Heart</option>
                    <option value="lungs">Lungs</option>
                    <option value="eyes">Eyes</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Urgency Level</label>
                <div className="urgency-buttons">
                  <button
                    type="button"
                    className={`urgency-btn ${formData.urgencyLevel === 'normal' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, urgencyLevel: 'normal'})}
                  >
                    NORMAL
                  </button>
                  <button
                    type="button"
                    className={`urgency-btn urgent ${formData.urgencyLevel === 'urgent' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, urgencyLevel: 'urgent'})}
                  >
                    URGENT
                  </button>
                  <button
                    type="button"
                    className={`urgency-btn critical ${formData.urgencyLevel === 'critical' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, urgencyLevel: 'critical'})}
                  >
                    CRITICAL
                  </button>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  placeholder="Registered hospital name"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Medical Report Upload */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                </svg>
              </div>
              <h2 className="section-title">Medical Report Upload</h2>
              
              <div className="upload-area">
                <input
                  type="file"
                  id="medicalReport"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.png"
                  style={{ display: 'none' }}
                />
                <label htmlFor="medicalReport" className="upload-label">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#E3F2FD"/>
                    <path d="M24 16v16m-8-8h16" stroke="#2196F3" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <p className="upload-text">
                    {formData.medicalReport 
                      ? formData.medicalReport.name 
                      : 'Drag & drop or browse files'}
                  </p>
                  <p className="upload-subtext">SUPPORTED: PDF, JPG, PNG (MAX 5MB)</p>
                </label>
              </div>

              <div className="info-box">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                </svg>
                <p>These reports will be reviewed by LifeLink admin and doctors to verify the request</p>
              </div>
            </div>

            {/* Consent */}
            <div className="form-section">
              <label className="consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                />
                <span>I confirm that the above information is accurate and I consent to the medical verification process required for the donation support request.</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn patient-submit">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
              </svg>
              Register Patient
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="registration-sidebar">
          <div className="sidebar-card patient-sidebar">
            <div className="sidebar-illustration">
              <svg viewBox="0 0 300 300" fill="none">
                <rect width="300" height="300" fill="#E3F2FD" rx="15"/>
                <g transform="translate(80, 80)">
                  <rect x="20" y="40" width="100" height="80" fill="white" rx="8"/>
                  <rect x="30" y="20" width="80" height="15" fill="#90CAF9" rx="5"/>
                  <circle cx="70" cy="70" r="20" fill="#2196F3"/>
                  <line x1="55" y1="90" x2="85" y2="90" stroke="#64B5F6" strokeWidth="3"/>
                </g>
              </svg>
            </div>
            <div className="sidebar-badge">
              <h3 className="sidebar-title">Priority Care Network</h3>
              <p className="sidebar-impact">Every second counts. Our verified network of donors and hospitals ensures that critical cases receive immediate attention and support.</p>
              <div className="sidebar-stats">
                <div className="stat-item">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#E3F2FD"/>
                    <path d="M16 8v8l4 4" stroke="#2196F3" strokeWidth="2" fill="none"/>
                  </svg>
                  <div>
                    <p className="stat-number">JOIN 10K+</p>
                    <p className="stat-label">PATIENTS SUPPORTED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-card">
            <div className="help-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm3 18h-6v-2h2v-6h-2v-2h4v8h2v2z"/>
              </svg>
            </div>
            <h3>Security Guaranteed</h3>
            <p>LifeLink uses end-to-end encryption to protect patient records. Verification is handled exclusively by authorized medical professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;