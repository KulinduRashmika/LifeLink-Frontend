import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">LIFE DONATION NETWORK</div>
            <h1 className="hero-title">
              Save Lives with <span className="text-blue">Smart</span> Blood & Organ Donation
            </h1>
            <p className="hero-description">
              Connecting donors, patients, and hospitals in real-time with an automated matching ecosystem.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z"/>
                </svg>
                Donate Now
              </button>
              <button className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <path d="M10 4c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1s1-.448 1-1V5c0-.552-.448-1-1-1z"/>
                  <circle cx="10" cy="14" r="1"/>
                </svg>
                Request Blood / Organ
              </button>
              <button className="btn-emergency">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <path d="M13 5h-2V3H9v2H7v2h2v2h2V7h2V5z"/>
                  <path d="M13 11H7v2h6v-2z"/>
                </svg>
                EMERGENCY REQUEST
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="doctor-illustration">
                <svg viewBox="0 0 400 400" fill="none">
                  <rect width="400" height="400" fill="#7EC4CF" rx="20"/>
                  <g transform="translate(80, 80)">
                    {/* Doctor 1 */}
                    <circle cx="60" cy="80" r="30" fill="#4A9BA8"/>
                    <rect x="35" y="110" width="50" height="80" fill="#4A9BA8" rx="10"/>
                    {/* Doctor 2 */}
                    <circle cx="120" cy="80" r="30" fill="#5DB3C1"/>
                    <rect x="95" y="110" width="50" height="80" fill="#5DB3C1" rx="10"/>
                    {/* Doctor 3 */}
                    <circle cx="180" cy="80" r="30" fill="#E8F5F7"/>
                    <rect x="155" y="110" width="50" height="80" fill="#ffffff" rx="10"/>
                    <line x1="175" y1="120" x2="185" y2="130" stroke="#7EC4CF" strokeWidth="3"/>
                    <line x1="185" y1="120" x2="175" y2="130" stroke="#7EC4CF" strokeWidth="3"/>
                  </g>
                </svg>
              </div>
              <div className="card-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0L0 4.8v8.4h3.2V8h9.6v5.2H16V4.8L8 0z"/>
                </svg>
                1,200+ Lives Saved
                <div className="badge-subtitle">Since last quarter</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-container">
          <h2 className="trust-title">Trusted by Top Medical Institutions Worldwide</h2>
          <p className="trust-subtitle">Facilitating life-saving connections through an accessible global infrastructure</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section" id="mission">
        <div className="mission-container">
          <div className="mission-badge">OUR PURPOSE</div>
          <h2 className="mission-title">Our Mission</h2>
          <p className="mission-description">
            Our mission is to simplify and expedite the critical gap between donors and patients. We believe that no one should die due to a lack of immediate access to blood or organ matches.
          </p>
          <p className="mission-description">
            By leveraging <span className="text-highlight">smart technology</span> and <span className="text-highlight">real-time alerts</span>, we've built a system that streamlines the donation process, ensuring that help arrives exactly when and where it's needed most.
          </p>
          <div className="mission-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z"/>
                </svg>
              </div>
              <span className="feature-text">Instant Response</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="feature-text">Smart Ecosystem</span>
            </div>
          </div>
          <div className="mission-image">
            <svg viewBox="0 0 400 300" fill="none">
              <rect width="400" height="300" fill="#E8F5F7" rx="15"/>
              <g transform="translate(80, 60)">
                <circle cx="60" cy="60" r="35" fill="#7EC4CF"/>
                <rect x="30" y="95" width="60" height="90" fill="#7EC4CF" rx="10"/>
                <circle cx="120" cy="60" r="35" fill="#5DB3C1"/>
                <rect x="90" y="95" width="60" height="90" fill="#5DB3C1" rx="10"/>
                <circle cx="180" cy="60" r="35" fill="#E8F5F7"/>
                <rect x="150" y="95" width="60" height="90" fill="#ffffff" rx="10"/>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-image">
            <svg viewBox="0 0 300 400" fill="none">
              <rect width="300" height="400" fill="#7EC4CF" rx="15"/>
              <g transform="translate(40, 100)">
                <circle cx="60" cy="60" r="35" fill="#4A9BA8"/>
                <rect x="30" y="95" width="60" height="90" fill="#4A9BA8" rx="10"/>
                <circle cx="120" cy="60" r="35" fill="#5DB3C1"/>
                <rect x="90" y="95" width="60" height="90" fill="#5DB3C1" rx="10"/>
                <circle cx="180" cy="60" r="35" fill="#E8F5F7"/>
                <rect x="150" y="95" width="60" height="90" fill="#ffffff" rx="10"/>
              </g>
            </svg>
          </div>
          <div className="about-content">
            <div className="about-badge">WHO WE ARE</div>
            <h2 className="about-title">About LifeLink</h2>
            <p className="about-description">
              Founded in 2024, LifeLink was born from a simple yet powerful realization: technology could bridge the critical gap between life and death in emergency medical situations. What started as an effort to streamline blood donations has grown into a global network.
            </p>
            <p className="about-description">
              Our commitment to healthcare is unwavering. We've safeguarded patient data, refined our algorithms and built partnerships with over 500 leading medical institutions to ensure that every blood donation and organ match is handled with the highest standards of care and urgency.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-badge">OUR EXPERTS</div>
          <h2 className="team-title">The Minds Behind LifeLink</h2>
          <p className="team-subtitle">A dedicated team of medical professionals and technology experts working around the clock</p>
          
          <div className="team-grid">
            <div className="team-card featured">
              <div className="team-badge-card">MEDICAL LEAD</div>
              <div className="team-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="40" fill="#2196F3"/>
                  <circle cx="40" cy="35" r="15" fill="white"/>
                  <ellipse cx="40" cy="65" rx="25" ry="20" fill="white"/>
                </svg>
              </div>
              <h3 className="team-name">Dr. Sarah Chen</h3>
              <p className="team-role">CHIEF EXECUTIVE<br/>OFFICER</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="40" fill="#90CAF9"/>
                  <circle cx="40" cy="35" r="15" fill="white"/>
                  <ellipse cx="40" cy="65" rx="25" ry="20" fill="white"/>
                </svg>
              </div>
              <h3 className="team-name">Marcus Thorne</h3>
              <p className="team-role">AI/ML SPECIALIST</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="40" fill="#90CAF9"/>
                  <circle cx="40" cy="35" r="15" fill="white"/>
                  <ellipse cx="40" cy="65" rx="25" ry="20" fill="white"/>
                </svg>
              </div>
              <h3 className="team-name">Dr. James Wilson</h3>
              <p className="team-role">MEDICAL CONSULTANT</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="40" fill="#90CAF9"/>
                  <circle cx="40" cy="35" r="15" fill="white"/>
                  <ellipse cx="40" cy="65" rx="25" ry="20" fill="white"/>
                </svg>
              </div>
              <h3 className="team-name">Elena Rodriguez</h3>
              <p className="team-role">VP HOSPITAL</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="40" fill="#90CAF9"/>
                  <circle cx="40" cy="35" r="15" fill="white"/>
                  <ellipse cx="40" cy="65" rx="25" ry="20" fill="white"/>
                </svg>
              </div>
              <h3 className="team-name">David Park</h3>
              <p className="team-role">OPERATIONS DIRECTOR</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-container">
          <h2 className="how-title">How LifeLink Works</h2>
          <p className="how-subtitle">
            Our platform simplifies the complex donation lifecycle into three smart, secure steps
          </p>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#E3F2FD"/>
                  <circle cx="24" cy="20" r="8" fill="#2196F3"/>
                  <path d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#2196F3"/>
                </svg>
              </div>
              <h3 className="how-card-title">Register as Donor</h3>
              <p className="how-card-description">
                Upload medical credentials and build your verified donor profile with our secure encryption platform
              </p>
            </div>

            <div className="how-card">
              <div className="how-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#E3F2FD"/>
                  <path d="M24 8l-4 8h-8l6 6-2 8 8-4 8 4-2-8 6-6h-8z" fill="#2196F3"/>
                </svg>
              </div>
              <h3 className="how-card-title">Smart Matching</h3>
              <p className="how-card-description">
                Our AI-driven matching engine connects donors with patients based on location, type, and urgency
              </p>
            </div>

            <div className="how-card">
              <div className="how-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#E3F2FD"/>
                  <path d="M20 24l4 4 8-8M36 24c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z" stroke="#2196F3" strokeWidth="3" fill="none"/>
                </svg>
              </div>
              <h3 className="how-card-title">Real-Time Alerts</h3>
              <p className="how-card-description">
                Instant notifications are sent to donors and hospitals to communicate and act on life-saving requests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>LifeLink</span>
            </div>
          </div>
          
          <div className="footer-links">
            <a href="#about">ABOUT US</a>
            <a href="#privacy">PRIVACY</a>
            <a href="#terms">TERMS</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 LifeLink | Heart Donation Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;