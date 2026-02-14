import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DonorNavbar = () => {
  const location = useLocation();

  return (
    <>
      <style>{`
        .donor-navbar {
          background: white;
          border-bottom: 1px solid #E5E7EB;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .navbar-logo-icon {
          width: 32px;
          height: 32px;
          background: #2196F3;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .navbar-logo-text {
          font-weight: 700;
          font-size: 1.25rem;
          color: #1F2937;
        }

        .navbar-menu {
          display: flex;
          gap: 2rem;
        }

        .navbar-link {
          color: #6B7280;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9375rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .navbar-link:hover {
          color: #1F2937;
        }

        .navbar-link.active {
          color: #2563EB;
          border-bottom-color: #2563EB;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .navbar-search {
          position: relative;
        }

        .navbar-search-input {
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.875rem;
          background: #F9FAFB;
          width: 250px;
          font-family: inherit;
        }

        .navbar-search-input:focus {
          outline: none;
          border-color: #2196F3;
        }

        .navbar-search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
        }

        .navbar-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F9FAFB;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .navbar-icon-btn:hover {
          background: #E5E7EB;
        }

        .notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #EF4444;
          border-radius: 50%;
          border: 2px solid white;
        }

        .navbar-user-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2196F3;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .navbar-user-badge:hover {
          background: #1976D2;
        }

        .navbar-back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6B7280;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9375rem;
          transition: color 0.2s;
        }

        .navbar-back-link:hover {
          color: #1F2937;
        }

        @media (max-width: 768px) {
          .donor-navbar {
            padding: 1rem;
          }

          .navbar-menu {
            display: none;
          }

          .navbar-search-input {
            width: 150px;
          }
        }
      `}</style>

      <nav className="donor-navbar">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 18l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18z"/>
            </svg>
          </div>
          <span className="navbar-logo-text">LifeLink</span>
        </Link>

        <div className="navbar-menu">
          <Link 
            to="/dashboard/donor" 
            className={`navbar-link ${location.pathname === '/dashboard/donor' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/donations" 
            className={`navbar-link ${location.pathname === '/donations' ? 'active' : ''}`}
          >
            Donations
          </Link>
          <Link 
            to="/eligibility" 
            className={`navbar-link ${location.pathname === '/eligibility' ? 'active' : ''}`}
          >
            Eligibility
          </Link>
          <Link 
            to="/medical-reports" 
            className={`navbar-link ${location.pathname === '/medical-reports' ? 'active' : ''}`}
          >
            Medical Reports
          </Link>
        </div>

        <div className="navbar-actions">
          <div className="navbar-search">
            <svg className="navbar-search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              className="navbar-search-input" 
              placeholder="Search resources..."
            />
          </div>

          <button className="navbar-icon-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
            <span className="notification-badge"></span>
          </button>

          <div className="navbar-user-badge">JD</div>
        </div>
      </nav>
    </>
  );
};

export default DonorNavbar;