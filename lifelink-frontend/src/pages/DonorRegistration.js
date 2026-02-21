import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPages.css';
import axios from 'axios';

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nicNumber: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    password: '',
    location: '',
    bloodGroup: '',
    lastDonationDate: '',
    organPreferences: {
      kidney: false,
      liver: false,
      heart: false,
      eyes: false,
      lungs: false
    },
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

  const handleOrganChange = (organ) => {
    setFormData(prev => ({
      ...prev,
      organPreferences: {
        ...prev.organPreferences,
        [organ]: !prev.organPreferences[organ]
      }
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      medicalReport: e.target.files[0]
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  data.append(
    "donor",
    new Blob([JSON.stringify(formData)], {
      type: "application/json",
    })
  );

  data.append("medicalReport", formData.medicalReport);

  try {
    await axios.post(
      "http://localhost:8081/api/donor/register",
      data
    );

    alert("Registration successful!");
  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }
};

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-form-wrapper">
          <div className="registration-header">
            <h1 className="registration-title">Donor Registration</h1>
            <button className="help-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
              </svg>
              Help Save Lives
            </button>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            {/* Personal Details Section */}
            <div className="form-section">
              <h2 className="section-title">Personal Details</h2>
              
              <div className="form-group full-width">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nicNumber">NIC Number</label>
                  <input
                    type="text"
                    id="nicNumber"
                    name="nicNumber"
                    placeholder="123456789V"
                    value={formData.nicNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
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
                    placeholder="+94 77 000 0000"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter your city or area"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Donation Details Section */}
            <div className="form-section">
              <h2 className="section-title">Donation Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lastDonationDate">Last Donation Date</label>
                  <input
                    type="date"
                    id="lastDonationDate"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Organ Donation Preference</label>
                <div className="checkbox-grid">
                  {Object.keys(formData.organPreferences).map(organ => (
                    <label key={organ} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.organPreferences[organ]}
                        onChange={() => handleOrganChange(organ)}
                      />
                      <span className="checkbox-text">
                        {organ.charAt(0).toUpperCase() + organ.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Medical Report Upload Section */}
            <div className="form-section">
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
                      : 'Drag and drop your report'}
                  </p>
                  <p className="upload-subtext">or <span className="browse-link">browse files</span> (PDF, JPG, PNG)</p>
                </label>
              </div>

              <div className="info-box">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                </svg>
                <p>This report will be analyzed to determine your organ health and donation eligibility. All medical data is encrypted and handled according to healthcare privacy standards.</p>
              </div>
            </div>

            {/* Consent Section */}
            <div className="form-section">
              <label className="consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                />
                <span>I confirm the information provided is correct and I consent to the registration terms</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn donor-submit">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z"/>
              </svg>
              Register as Donor
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="registration-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-illustration">
              <svg viewBox="0 0 300 300" fill="none">
                <rect width="300" height="300" fill="#7EC4CF" rx="15"/>
                <g transform="translate(80, 80)">
                  <circle cx="70" cy="50" r="30" fill="#4A9BA8"/>
                  <rect x="45" y="80" width="50" height="70" fill="#4A9BA8" rx="10"/>
                  <circle cx="60" cy="95" r="12" fill="#F44336"/>
                  <line x1="55" y1="95" x2="65" y2="95" stroke="white" strokeWidth="2"/>
                  <line x1="60" y1="90" x2="60" y2="100" stroke="white" strokeWidth="2"/>
                </g>
              </svg>
            </div>
            <div className="sidebar-badge">
              <p className="sidebar-quote">"Be the reason someone smiles today."</p>
              <p className="sidebar-impact">Your contribution can save up to 8 lives. Join our community of lifesavers today and make a lasting impact.</p>
              <div className="sidebar-stats">
                <div className="stat-circles">
                  <div className="stat-circle"></div>
                  <div className="stat-circle"></div>
                  <div className="stat-circle"></div>
                </div>
                <p className="stat-text">12K+ Registered Donors</p>
              </div>
            </div>
          </div>

          <div className="help-card">
            <h3>Need Help?</h3>
            <p>Our support team is available 24/7 to guide you through the registration.</p>
            <Link to="/support" className="help-link">
              Chat with Support
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0l-1.5 1.5L11 6.5l-4.5 4.5L8 12.5l6-6z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;