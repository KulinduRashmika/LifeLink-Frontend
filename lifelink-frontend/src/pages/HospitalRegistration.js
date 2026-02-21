import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPages.css';

const HospitalRegistration = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    registrationId: '',
    institutionType: '',
    contactPerson: '',
    officialEmail: '',
    contactNumber: '',
    physicalAddress: '',
    password: '',
    confirmPassword: '',
    facilities: {
      bloodCollection: false,
      organHarvesting: false,
      icuFacilities: false,
      emergencyCare: false,
      labAnalysis: false
    },
    verificationDoc: null
  });

  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, and PNG files are allowed');
      return;
    }

    setFormData(prev => ({
      ...prev,
      verificationDoc: file
    }));
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (!formData.verificationDoc) {
      alert('Please upload a verification document');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword() || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();

      // Append all scalar fields
      formDataToSend.append('institutionName', formData.institutionName);
      formDataToSend.append('registrationId', formData.registrationId);
      formDataToSend.append('institutionType', formData.institutionType);
      formDataToSend.append('contactPerson', formData.contactPerson);
      formDataToSend.append('officialEmail', formData.officialEmail);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('physicalAddress', formData.physicalAddress);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);

      // ✅ IMPORTANT (Option A): send nested facilities using dot-notation
      Object.entries(formData.facilities).forEach(([key, value]) => {
        formDataToSend.append(`facilities.${key}`, String(value));
      });

      // Append the file
      formDataToSend.append('verificationDoc', formData.verificationDoc);

      // Send to backend
      const response = await fetch('http://localhost:8080/api/hospitals/register', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        setSubmitMessage({
          type: 'success',
          text: `Registration successful! Institution ID: ${data.data?.id || ''}`
        });

        setTimeout(() => {
          setFormData({
            institutionName: '',
            registrationId: '',
            institutionType: '',
            contactPerson: '',
            officialEmail: '',
            contactNumber: '',
            physicalAddress: '',
            password: '',
            confirmPassword: '',
            facilities: {
              bloodCollection: false,
              organHarvesting: false,
              icuFacilities: false,
              emergencyCare: false,
              labAnalysis: false
            },
            verificationDoc: null
          });

          const fileInput = document.getElementById('verificationDoc');
          if (fileInput) fileInput.value = '';

          setSubmitMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.message || 'Registration failed'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Error connecting to server. Make sure backend is running on port 8080.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-form-wrapper">
          <div className="registration-header">
            <h1 className="registration-title">Hospital / Blood Bank Registration</h1>
            <p className="registration-subtitle">
              Register your institution to join the network and manage life-saving blood and organ resources efficiently.
            </p>
          </div>

          {submitMessage.text && (
            <div className={`status-message ${submitMessage.type}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {submitMessage.type === 'success' ? (
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" />
                ) : (
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
                )}
              </svg>
              <span>{submitMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form" encType="multipart/form-data">
            {/* Institution Details Section */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L2 8v8c0 5.5 4.5 10 10 12 5.5-2 10-6.5 10-12V8l-10-5z" />
                </svg>
              </div>
              <h2 className="section-title">Institution Details</h2>

              <div className="form-group full-width">
                <label htmlFor="institutionName">Institution Name *</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  placeholder="e.g. City General Hospital"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="registrationId">Registration / License ID *</label>
                  <input
                    type="text"
                    id="registrationId"
                    name="registrationId"
                    placeholder="HOSP-8829-X"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="institutionType">Institution Type *</label>
                  <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="hospital">Hospital</option>
                    <option value="blood-bank">Blood Bank</option>
                    <option value="clinic">Clinic</option>
                    <option value="transplant-center">Transplant Center</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person *</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Full Name & Designation"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="officialEmail">Official Email *</label>
                  <input
                    type="email"
                    id="officialEmail"
                    name="officialEmail"
                    placeholder="admin@hospital.org"
                    value={formData.officialEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="contactNumber">Contact Number *</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="physicalAddress">Physical Address *</label>
                <textarea
                  id="physicalAddress"
                  name="physicalAddress"
                  placeholder="Full address of the facility"
                  value={formData.physicalAddress}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <h2 className="section-title">Account Security</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength="8"
                  />
                  <small className="input-hint">Minimum 8 characters</small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    minLength="8"
                  />
                </div>
              </div>

              {passwordError && (
                <div className="error-message">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13H7v-2h2v2zm0-4H7V4h2v5z" />
                  </svg>
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            {/* Facilities */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-4H6v-2h4V7h4v4h4v2h-4v4z" />
                </svg>
              </div>
              <h2 className="section-title">Facilities & Services</h2>

              <div className="form-group full-width">
                <div className="checkbox-grid facilities-grid">
                  {Object.keys(formData.facilities).map(facility => (
                    <label key={facility} className="checkbox-label facility-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.facilities[facility]}
                        onChange={() => handleFacilityChange(facility)}
                      />
                      <span className="checkbox-text">
                        {facility
                          .split(/(?=[A-Z])/)
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="form-section">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h2 className="section-title">Verification Documents</h2>
              <p className="section-subtitle">
                Upload your Medical License or Operating Permit issued by the Ministry of Health. *
              </p>

              <div className="upload-area">
                <input
                  type="file"
                  id="verificationDoc"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  required
                />
                <label htmlFor="verificationDoc" className="upload-label">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#E3F2FD" />
                    <path d="M24 16v16m-8-8h16" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <p className="upload-text">
                    {formData.verificationDoc ? formData.verificationDoc.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="upload-subtext">PDF, JPG or PNG (max. 10MB)</p>
                </label>
              </div>

              <div className="info-box">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
                </svg>
                <p>All documents must be valid and are subject to verification by the Ministry of Health and LifeLink admins.</p>
              </div>
            </div>

            <button type="submit" className="submit-btn hospital-submit" disabled={isSubmitting}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0L0 4.8v8.4c0 5.5 4 10 10 12 6-2 10-6.5 10-12V4.8L10 0z" />
              </svg>
              {isSubmitting ? 'Submitting...' : 'Register Institution'}
            </button>
          </form>
        </div>

        {/* Sidebar (unchanged from your original) */}
        <div className="registration-sidebar">
          <div className="sidebar-card hospital-sidebar">
            <div className="sidebar-illustration">
              <svg viewBox="0 0 300 400" fill="none">
                <defs>
                  <linearGradient id="hospitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1976D2', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#64B5F6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="300" height="400" fill="url(#hospitalGrad)" rx="15" />
                <g transform="translate(50, 100)">
                  <rect x="20" y="40" width="160" height="200" fill="white" rx="10" opacity="0.95" />
                  <rect x="80" y="20" width="40" height="30" fill="#4CAF50" rx="5" />
                  <rect x="40" y="70" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="85" y="70" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="130" y="70" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="40" y="125" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="85" y="125" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="130" y="125" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="40" y="180" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="85" y="180" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <rect x="130" y="180" width="30" height="40" fill="#E3F2FD" rx="4" />
                  <line x1="95" y1="30" x2="105" y2="30" stroke="white" strokeWidth="3" />
                  <line x1="100" y1="25" x2="100" y2="35" stroke="white" strokeWidth="3" />
                </g>
              </svg>
            </div>
            <div className="sidebar-badge">
              <h3 className="sidebar-title">Join a Global Network</h3>
              <p className="sidebar-impact">
                By registering, you become part of a real-time ecosystem connecting donors with critical needs.
              </p>
              <div className="sidebar-stats">
                <div className="stat-item">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#E8F5E9" />
                    <path d="M16 8v8l4 4" stroke="#4CAF50" strokeWidth="2" fill="none" />
                  </svg>
                  <div>
                    <p className="stat-number">Real-time Updates</p>
                    <p className="stat-label">Inventory sync across all centers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-card hospital-help">
            <div className="help-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 8v8l4 4" />
              </svg>
            </div>
            <h3>Compliance Ready</h3>
            <p>Regulatory standards maintained for organ transplant.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistration;