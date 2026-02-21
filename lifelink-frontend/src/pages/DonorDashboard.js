import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';



const DonorDashboard = () => {
    const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email");

        if (!email) return;

        const response = await fetch(
          `http://localhost:8081/api/donor/profile?email=${email}`
        );

        if (!response.ok) return;

        const data = await response.json();
        setFullName(data.fullName || "");
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #F8F9FA;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Sidebar */
        .sidebar {
          width: 240px;
          background-color: white;
          padding: 2rem 0;
          border-right: 1px solid #E5E7EB;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 1.5rem;
          margin-bottom: 2rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: #2196F3;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1F2937;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0 1rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #6B7280;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .menu-item:hover {
          background-color: #F3F4F6;
          color: #1F2937;
        }

        .menu-item.active {
          background-color: #DBEAFE;
          color: #2563EB;
        }

        .menu-item svg {
          width: 20px;
          height: 20px;
        }

        .schedule-btn {
          margin: 1.5rem 1rem;
          padding: 0.875rem 1.5rem;
          background: #2196F3;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s;
        }

        .schedule-btn:hover {
          background: #1976D2;
          transform: translateY(-2px);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 240px;
          padding: 2rem;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .search-bar {
          flex: 1;
          max-width: 500px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%239CA3AF"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>');
          background-repeat: no-repeat;
          background-position: 0.75rem center;
          background-size: 1.25rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #2196F3;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-details {
          text-align: right;
        }

        .user-name {
          font-weight: 600;
          color: #1F2937;
        }

        .user-role {
          font-size: 0.75rem;
          color: #10B981;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #2563EB;
        }

        /* Welcome Section */
        .welcome-section {
          margin-bottom: 2rem;
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          color: #6B7280;
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #6B7280;
          float: right;
          margin-top: -2rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue { background: #DBEAFE; color: #2563EB; }
        .stat-icon.green { background: #D1FAE5; color: #10B981; }
        .stat-icon.red { background: #FEE2E2; color: #EF4444; }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 0.25rem;
        }

        .stat-meta {
          font-size: 0.875rem;
          color: #10B981;
          font-weight: 500;
        }

        .stat-subtitle {
          font-size: 0.875rem;
          color: #9CA3AF;
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        /* Alert Box */
        .alert-box {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .alert-icon {
          color: #EF4444;
          font-size: 1.25rem;
        }

        .alert-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1F2937;
        }

        .alert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #FEF2F2;
          border-radius: 8px;
          border-left: 4px solid #EF4444;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .blood-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #EF4444;
        }

        .alert-details h4 {
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.25rem;
        }

        .alert-details p {
          font-size: 0.875rem;
          color: #6B7280;
        }

        .help-btn {
          padding: 0.5rem 1.5rem;
          background: #EF4444;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        /* History Table */
        .history-section {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1F2937;
        }

        .view-all-link {
          color: #2196F3;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .history-table th {
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 1rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .history-table td {
          padding: 1rem 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .type-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .type-badge.blood {
          background: #DBEAFE;
          color: #2563EB;
        }

        .type-badge.platelets {
          background: #F3E8FF;
          color: #9333EA;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #10B981;
          font-weight: 600;
          font-size: 0.875rem;
        }

        /* Sidebar Content */
        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .info-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1F2937;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .doc-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doc-icon.blue { background: #DBEAFE; color: #2563EB; }
        .doc-icon.purple { background: #EDE9FE; color: #7C3AED; }

        .doc-details h4 {
          font-weight: 600;
          color: #1F2937;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .doc-details p {
          font-size: 0.75rem;
          color: #9CA3AF;
        }

        .download-icon {
          margin-left: auto;
          color: #9CA3AF;
          cursor: pointer;
        }

        /* Map Card */
        .map-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .map-placeholder {
          width: 100%;
          height: 150px;
          background: #F3F4F6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .map-marker {
          width: 32px;
          height: 32px;
          background: #2196F3;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
        }

        .map-marker::before {
          content: '';
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .main-content {
            margin-left: 0;
          }
        }
      `}</style>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          

          <nav className="sidebar-menu">
            <Link to="/dashboard" className="menu-item active">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Dashboard
            </Link>

            <Link to="/donations" className="menu-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              My Donations
            </Link>

            <Link to="/eligibility" className="menu-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Eligibility
            </Link>

            <Link to="/centers" className="menu-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              Find Centers
            </Link>

            <Link to="/settings" className="menu-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              Settings
            </Link>
          </nav>

          <button className="schedule-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            Schedule Donation
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="header">
            <div className="search-bar">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search centers or reports..."
              />
            </div>
            <div className="header-actions">
  <div className="user-info">
    <div className="user-details">
      <div className="user-name">
        {fullName || "User"}
      </div>
      <div className="user-role">
        <span style={{ fontSize: "10px" }}>●</span> Donor
      </div>
    </div>

    <div className="user-avatar">
      {fullName
        ? fullName
            .split(" ")
            .map(name => name[0])
            .join("")
            .toUpperCase()
        : "U"}
    </div>
  </div>
</div>
          </header>

          {/* Welcome Section */}
          <section className="welcome-section">
            <h1 className="welcome-title">
  Welcome back, {fullName ? fullName.split(" ")[0] : "Donor"}!
</h1>
            <p className="welcome-subtitle">You're making a real difference. Check your latest status below.</p>
            <div className="date-badge">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              Today is {formattedDate}
            </div>
          </section>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Next Eligible Date</span>
                <div className="stat-icon blue">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="stat-value">Nov 15, 2023</div>
              <div className="stat-meta">📅 18 Days Remaining</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Donations</span>
                <div className="stat-icon green">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <div className="stat-value">5 Donations</div>
              <div className="stat-subtitle">Since joining in 2021</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Lives Saved</span>
                <div className="stat-icon red">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="stat-value">15 Lives</div>
              <div className="stat-meta">🎯 Top 5% of donors</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            <div>
              {/* Emergency Alert */}
              <div className="alert-box">
                <div className="alert-header">
                  <span className="alert-icon">⚠️</span>
                  <h3 className="alert-title">Emergency Alerts Near You</h3>
                </div>
                <div className="alert-item">
                  <div className="alert-content">
                    <div className="blood-icon">🩸</div>
                    <div className="alert-details">
                      <h4>Urgent O+ Needed</h4>
                      <p>Central Medical Center is facing a critical shortage for surgeries.</p>
                    </div>
                  </div>
                  <button className="help-btn">Help Now</button>
                </div>
              </div>

              {/* Donation History */}
              <div className="history-section">
                <div className="section-header">
                  <h3 className="section-title">Recent Donation History</h3>
                  <a href="#" className="view-all-link">View All</a>
                </div>
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>DATE</th>
                      <th>LOCATION</th>
                      <th>TYPE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aug 12, 2023</td>
                      <td>City General Hospital</td>
                      <td><span className="type-badge blood">WHOLE BLOOD</span></td>
                      <td><span className="status-badge">✓ COMPLETED</span></td>
                    </tr>
                    <tr>
                      <td>May 15, 2023</td>
                      <td>Red Cross Mobile Unit</td>
                      <td><span className="type-badge platelets">PLATELETS</span></td>
                      <td><span className="status-badge">✓ COMPLETED</span></td>
                    </tr>
                    <tr>
                      <td>Feb 02, 2023</td>
                      <td>Central Medical Center</td>
                      <td><span className="type-badge blood">WHOLE BLOOD</span></td>
                      <td><span className="status-badge">✓ COMPLETED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="sidebar-content">
              {/* Medical Instructions */}
              <div className="info-card">
                <div className="info-header">
                  <h3 className="info-title">Medical Instructions</h3>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="info-item">
                  <div className="doc-icon blue">📄</div>
                  <div className="doc-details">
                    <h4>Post-Donation Care Guide</h4>
                    <p>Added by Dr. Sarah Miller • Oct 15</p>
                  </div>
                  <svg className="download-icon" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="info-item">
                  <div className="doc-icon blue">🔬</div>
                  <div className="doc-details">
                    <h4>October Lab Results</h4>
                    <p>Central Pathology Lab • Oct 20</p>
                  </div>
                  <svg className="download-icon" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="info-item">
                  <div className="doc-icon purple">📋</div>
                  <div className="doc-details">
                    <h4>Pre-Donation Eligibility</h4>
                    <p>LifeLink Guidelines • Sep 30</p>
                  </div>
                  <svg className="download-icon" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>

              {/* Nearby Centers */}
              <div className="map-card">
                <h3 className="info-title" style={{marginBottom: '1rem'}}>Nearby Centers</h3>
                <p style={{fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem'}}>
                  There are 4 active donation centers within 5 miles of you.
                </p>
                <div className="map-placeholder">
                  <div className="map-marker"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DonorDashboard;