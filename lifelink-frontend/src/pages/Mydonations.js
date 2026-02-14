import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyDonations = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const donations = [
    {
      date: 'Oct 20, 2023',
      time: '10:30 AM',
      location: 'Central Blood Bank',
      type: 'Platelets',
      status: 'Scheduled',
      icon: '📍'
    },
    {
      date: 'Aug 12, 2023',
      time: '09:15 AM',
      location: 'City General Hospital',
      type: 'Whole Blood',
      status: 'Completed',
      icon: '🏥'
    },
    {
      date: 'May 15, 2023',
      time: '02:00 PM',
      location: 'Mobile Unit - Downtown',
      type: 'Platelets',
      status: 'Completed',
      icon: '🚐'
    },
    {
      date: 'Feb 10, 2023',
      time: '11:45 AM',
      location: 'City General Hospital',
      type: 'Whole Blood',
      status: 'Completed',
      icon: '🏥'
    }
  ];

  return (
    <>
      <style>{`
        .donations-layout {
          display: flex;
          min-height: calc(100vh - 65px);
          background-color: #F8F9FA;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .sidebar {
          width: 240px;
          background-color: white;
          padding: 2rem 0;
          border-right: 1px solid #E5E7EB;
          height: calc(100vh - 65px);
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
          width: 40px;
          height: 40px;
          background: #2196F3;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .logo-text-container h3 {
          font-weight: 700;
          font-size: 1.125rem;
          color: #1F2937;
          margin: 0;
        }

        .logo-text-container p {
          font-size: 0.75rem;
          color: #9CA3AF;
          margin: 0;
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
          position: fixed;
          bottom: 2rem;
          left: 1rem;
          right: 1rem;
          width: calc(240px - 2rem);
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
        }

        .main-content {
          flex: 1;
          padding: 2rem;
        }

        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .search-bar {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-btn {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: white;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #EF4444;
          border-radius: 50%;
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
          font-size: 0.875rem;
        }

        .user-badge-text {
          font-size: 0.75rem;
          color: #10B981;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6B7280;
          font-size: 1rem;
        }

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
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .stat-icon.blue { background: #DBEAFE; }
        .stat-icon.red { background: #FEE2E2; }
        .stat-icon.purple { background: #EDE9FE; }

        .stat-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stat-badge.green {
          background: #D1FAE5;
          color: #10B981;
        }

        .stat-badge.blue {
          background: #DBEAFE;
          color: #2563EB;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 0.25rem;
        }

        .stat-meta {
          font-size: 0.875rem;
          color: #9CA3AF;
        }

        .records-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .records-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .records-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1F2937;
        }

        .records-actions {
          display: flex;
          gap: 0.75rem;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: 1px solid #E5E7EB;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #F3F4F6;
        }

        .records-table {
          width: 100%;
          border-collapse: collapse;
        }

        .records-table th {
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 1rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .records-table td {
          padding: 1.25rem 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .date-cell {
          display: flex;
          flex-direction: column;
        }

        .date-text {
          font-weight: 600;
          color: #1F2937;
        }

        .time-text {
          font-size: 0.875rem;
          color: #9CA3AF;
        }

        .location-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .location-icon {
          color: #9CA3AF;
        }

        .type-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .status-badge.scheduled {
          background: #DBEAFE;
          color: #2563EB;
        }

        .status-badge.completed {
          background: #D1FAE5;
          color: #10B981;
        }

        .action-link {
          color: #2196F3;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .action-link:hover {
          text-decoration: underline;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #E5E7EB;
        }

        .pagination-info {
          font-size: 0.875rem;
          color: #6B7280;
        }

        .pagination-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .pagination-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid #E5E7EB;
          background: white;
          color: #2196F3;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pagination-btn:hover {
          background: #F3F4F6;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #E5E7EB;
          text-align: center;
          color: #9CA3AF;
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .top-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .search-bar {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="donations-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          

          <nav className="sidebar-menu">
            <Link to="/dashboard/donor" className="menu-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Dashboard
            </Link>

            <Link to="/donations" className="menu-item active">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
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
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            Schedule Donation
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Top Header */}
          <div className="top-header">
            <div className="search-bar">
              <svg className="search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search donation records..."
              />
            </div>

            <div className="user-section">
              <button className="notification-btn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
                <span className="notification-dot"></span>
              </button>

              <div className="user-info">
                <div className="user-details">
                  <div className="user-name">John Doe</div>
                  <div className="user-badge-text">O+ DONOR</div>
                </div>
                <div className="user-avatar">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23667eea'/%3E%3Ccircle cx='20' cy='17' r='7' fill='white'/%3E%3Cpath d='M10 35c0-5.523 4.477-10 10-10s10 4.477 10 10' fill='white'/%3E%3C/svg%3E" alt="John Doe" />
                </div>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">My Donation History</h1>
            <p className="page-subtitle">Manage your clinical contributions and track your life-saving impact.</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon blue">💉</div>
                <span className="stat-badge green">+1 this year</span>
              </div>
              <div className="stat-label">Total Donations</div>
              <div className="stat-value">5</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon red">❤️</div>
                <span className="stat-badge blue">High Impact</span>
              </div>
              <div className="stat-label">Total Lives Saved</div>
              <div className="stat-value">15</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon purple">📅</div>
                <span className="stat-badge blue">Recent</span>
              </div>
              <div className="stat-label">Last Donation</div>
              <div className="stat-value" style={{fontSize: '1.5rem'}}>Aug 12, 2023</div>
              <div className="stat-meta">34 days ago</div>
            </div>
          </div>

          {/* Records Table */}
          <div className="records-section">
            <div className="records-header">
              <h3 className="records-title">Recent Records</h3>
              <div className="records-actions">
                <button className="icon-btn" title="Filter">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="icon-btn" title="Download">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>

            <table className="records-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>LOCATION</th>
                  <th>DONATION TYPE</th>
                  <th>STATUS</th>
                  <th>REPORT</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={index}>
                    <td>
                      <div className="date-cell">
                        <span className="date-text">{donation.date}</span>
                        <span className="time-text">{donation.time}</span>
                      </div>
                    </td>
                    <td>
                      <div className="location-cell">
                        <span className="location-icon">{donation.icon}</span>
                        <span>{donation.location}</span>
                      </div>
                    </td>
                    <td>
                      <span className="type-badge">{donation.type}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${donation.status.toLowerCase()}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td>
                      {donation.status === 'Scheduled' ? (
                        <a href="#" className="action-link">
                          Edit ✏️
                        </a>
                      ) : (
                        <a href="#" className="action-link">
                          View 👁️
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <span className="pagination-info">Showing 4 of 5 donations</span>
              <div className="pagination-buttons">
                <button className="pagination-btn" disabled={currentPage === 1}>
                  Previous
                </button>
                <button className="pagination-btn">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            © 2023 LifeLink Medical. All rights reserved.
            <div style={{marginTop: '0.5rem'}}>
              <a href="#" style={{color: '#2196F3', marginRight: '1rem'}}>Privacy Policy</a>
              <a href="#" style={{color: '#2196F3'}}>Support Center</a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyDonations;