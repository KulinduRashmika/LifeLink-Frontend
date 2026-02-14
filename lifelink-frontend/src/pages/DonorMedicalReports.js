import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MedicalReports = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload
  };

  const handleFileSelect = (e) => {
    // Handle file selection
  };

  return (
    <>
      <style>{`
        .medical-reports-layout {
          display: flex;
          min-height: calc(100vh - 65px);
          background-color: #F8F9FA;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .sidebar {
          width: 260px;
          background-color: white;
          padding: 2rem 0;
          border-right: 1px solid #E5E7EB;
          height: calc(100vh - 65px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
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

        .logo-text h3 {
          font-weight: 700;
          font-size: 1.125rem;
          color: #1F2937;
          margin: 0;
        }

        .logo-text p {
          font-size: 0.75rem;
          color: #9CA3AF;
          margin: 0;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0 1rem;
          flex: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
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

        .user-panel {
          padding: 1rem 1.5rem;
          border-top: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-panel-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .user-panel-info h4 {
          font-weight: 600;
          font-size: 0.875rem;
          color: #1F2937;
          margin: 0;
        }

        .user-panel-info p {
          font-size: 0.75rem;
          color: #9CA3AF;
          margin: 0;
        }

        .logout-icon {
          margin-left: auto;
          color: #9CA3AF;
          cursor: pointer;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 1.875rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6B7280;
          font-size: 1rem;
        }

        .info-banner {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 2rem;
          display: flex;
          gap: 1rem;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: #DBEAFE;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563EB;
          flex-shrink: 0;
        }

        .info-content h4 {
          font-weight: 700;
          color: #1F2937;
          margin: 0 0 0.5rem 0;
          font-size: 0.9375rem;
        }

        .info-content p {
          color: #6B7280;
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
        }

        .info-link {
          color: #2196F3;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .info-link:hover {
          text-decoration: underline;
        }

        .upload-section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .upload-area {
          border: 2px dashed #D1D5DB;
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          transition: all 0.3s;
          cursor: pointer;
        }

        .upload-area.drag-active {
          border-color: #2196F3;
          background: #F0F9FF;
        }

        .upload-area:hover {
          border-color: #2196F3;
          background: #FAFAFA;
        }

        .upload-icon {
          width: 64px;
          height: 64px;
          background: #F3F4F6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #9CA3AF;
        }

        .upload-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .upload-subtitle {
          color: #6B7280;
          font-size: 0.9375rem;
          margin-bottom: 1.5rem;
        }

        .upload-btn {
          padding: 0.75rem 2rem;
          background: #2196F3;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9375rem;
          transition: all 0.3s;
        }

        .upload-btn:hover {
          background: #1976D2;
        }

        .upload-note {
          margin-top: 1rem;
          font-size: 0.8125rem;
          color: #9CA3AF;
        }

        .reports-section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
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

        .reports-count {
          font-size: 0.875rem;
          color: #6B7280;
        }

        .report-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          margin-bottom: 1rem;
          transition: all 0.2s;
        }

        .report-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .report-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .report-icon.green { background: #D1FAE5; }
        .report-icon.blue { background: #DBEAFE; }
        .report-icon.gray { background: #F3F4F6; }

        .report-info {
          flex: 1;
        }

        .report-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .report-title {
          font-weight: 700;
          color: #1F2937;
          font-size: 1rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.active {
          background: #D1FAE5;
          color: #10B981;
        }

        .status-badge.expired {
          background: #FEE2E2;
          color: #EF4444;
        }

        .report-meta {
          display: flex;
          gap: 1.5rem;
          font-size: 0.8125rem;
          color: #6B7280;
        }

        .report-meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .report-action {
          padding: 0.5rem 1.25rem;
          border: 1px solid #E5E7EB;
          background: white;
          color: #2196F3;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .report-action:hover {
          background: #F3F4F6;
        }

        .report-action.view {
          border-color: #2196F3;
        }

        .eligibility-banner {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .eligibility-icon {
          width: 48px;
          height: 48px;
          background: #DBEAFE;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2196F3;
        }

        .eligibility-content {
          flex: 1;
        }

        .eligibility-content h4 {
          font-weight: 700;
          color: #1F2937;
          font-size: 1rem;
          margin: 0 0 0.25rem 0;
        }

        .eligibility-content p {
          color: #6B7280;
          font-size: 0.875rem;
          margin: 0;
        }

        .eligibility-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .btn-outline {
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
        }

        .btn-outline:hover {
          background: #F9FAFB;
        }

        .btn-primary {
          background: #2196F3;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: #1976D2;
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .main-content {
            padding: 1rem;
          }

          .report-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .eligibility-banner {
            flex-direction: column;
            text-align: center;
          }

          .eligibility-actions {
            width: 100%;
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="medical-reports-layout">
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
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Medical Reports</h1>
            <p className="page-subtitle">Manage and track your health certifications for donation eligibility.</p>
          </div>

          {/* Info Banner */}
          <div className="info-banner">
            <div className="info-icon">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="info-content">
              <h4>Validity Period Note</h4>
              <p>Medical reports are valid for <strong>3 months</strong> from the date of upload. An updated report is required for ongoing donation eligibility.</p>
              <a href="#" className="info-link">
                Learn more about eligibility criteria →
              </a>
            </div>
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-icon">
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="upload-title">Upload New Medical Report</h3>
              <p className="upload-subtitle">Drag and drop your medical documents here, or click to browse files.</p>
              <input 
                type="file" 
                id="file-upload" 
                style={{display: 'none'}} 
                onChange={handleFileSelect}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload">
                <button className="upload-btn" onClick={() => document.getElementById('file-upload').click()}>
                  Select File
                </button>
              </label>
              <p className="upload-note">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
            </div>
          </div>

          {/* Previous Reports */}
          <div className="reports-section">
            <div className="section-header">
              <h3 className="section-title">Previous Reports</h3>
              <span className="reports-count">Showing 3 Reports</span>
            </div>

            {/* Active Report 1 */}
            <div className="report-card">
              <div className="report-icon green">📄</div>
              <div className="report-info">
                <div className="report-header">
                  <h4 className="report-title">Annual Blood Profile Review</h4>
                  <span className="status-badge active">ACTIVE</span>
                </div>
                <div className="report-meta">
                  <span className="report-meta-item">
                    📅 Uploaded: Oct 24, 2023
                  </span>
                  <span className="report-meta-item">
                    ⏰ Expires: Jan 24, 2024
                  </span>
                </div>
              </div>
              <button className="report-action view">
                View Report
              </button>
            </div>

            {/* Active Report 2 */}
            <div className="report-card">
              <div className="report-icon blue">📋</div>
              <div className="report-info">
                <div className="report-header">
                  <h4 className="report-title">Hepatitis B Clearance Cert</h4>
                  <span className="status-badge active">ACTIVE</span>
                </div>
                <div className="report-meta">
                  <span className="report-meta-item">
                    📅 Uploaded: Sep 12, 2023
                  </span>
                  <span className="report-meta-item">
                    ⏰ Expires: Dec 12, 2023
                  </span>
                </div>
              </div>
              <button className="report-action view">
                View Report
              </button>
            </div>

            {/* Expired Report */}
            <div className="report-card" style={{opacity: 0.6}}>
              <div className="report-icon gray">📄</div>
              <div className="report-info">
                <div className="report-header">
                  <h4 className="report-title">Hemoglobin Analysis Q2</h4>
                  <span className="status-badge expired">EXPIRED</span>
                </div>
                <div className="report-meta">
                  <span className="report-meta-item">
                    📅 Uploaded: May 15, 2023
                  </span>
                  <span className="report-meta-item">
                    ⏰ Expired: Aug 15, 2023
                  </span>
                </div>
              </div>
              <button className="report-action">
                View Archived
              </button>
            </div>
          </div>

          {/* Eligibility Status Banner */}
          <div className="eligibility-banner">
            <div className="eligibility-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="eligibility-content">
              <h4>Current Eligibility Status</h4>
              <p>Based on your valid reports, you are currently <strong>eligible</strong> to donate.</p>
            </div>
            <div className="eligibility-actions">
              <button className="btn btn-outline">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                Download History
              </button>
              <Link to="/schedule" className="btn btn-primary">
                Schedule Donation
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MedicalReports;