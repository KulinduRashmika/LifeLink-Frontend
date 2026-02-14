import React, { useState } from 'react';
import '../style/PatientMedicalreport.css';

const MedicalReports = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const reports = [
    {
      id: 1,
      name: 'Full Blood Count.pdf',
      category: 'Blood Test',
      uploadDate: 'Oct 26, 2023',
      status: 'verified',
      fileType: 'pdf'
    },
    {
      id: 2,
      name: 'Kidney Function Scan.jpg',
      category: 'Scan',
      uploadDate: 'Oct 25, 2023',
      status: 'pending',
      fileType: 'jpg'
    },
    {
      id: 3,
      name: 'Hepatitis B Screen.pdf',
      category: 'Screening',
      uploadDate: 'Oct 24, 2023',
      status: 'rejected',
      fileType: 'pdf'
    },
    {
      id: 4,
      name: 'Consent Form_v2.pdf',
      category: 'Consent',
      uploadDate: 'Oct 20, 2023',
      status: 'verified',
      fileType: 'pdf'
    }
  ];

  const feedbackItems = [
    {
      type: 'rejection',
      title: 'REJECTION REASON',
      date: 'Oct 24, 2023',
      content: 'Your "Hepatitis B Screen" was rejected due to missing physician signature and official clinic stamp. Please re-upload a verified copy.',
      highlight: 'Hepatitis B Screen'
    },
    {
      type: 'note',
      title: 'GENERAL NOTE',
      date: 'Oct 20, 2023',
      content: 'All scan reports must include the radiologist\'s summary page to be considered complete.'
    }
  ];

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    console.log('Files selected:', fileArray);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      console.log('Uploading files:', selectedFiles);
      // Handle file upload logic here
      setSelectedFiles([]);
    }
  };

  const handleView = (report) => {
    console.log('Viewing report:', report);
    // Handle view logic
  };

  const handleDownload = (report) => {
    console.log('Downloading report:', report);
    // Handle download logic
  };

  const handleDelete = (report) => {
    console.log('Deleting report:', report);
    // Handle delete logic
  };

  return (
    <div className="medical-reports-container">
      {/* Sidebar */}
      <aside className="sidebar">
        

        <nav className="nav">
          <a href="/dashboard/patient" className="nav-item">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a href="/myrequests" className="nav-item">
            <span className="nav-icon">📄</span>
            <span>My Requests</span>
          </a>
          <a href="/medical-reports" className="nav-item active">
            <span className="nav-icon">📋</span>
            <span>Medical Reports</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👨‍⚕️</span>
            <span>Doctor Instructions</span>
          </a>
          <a href="/patient/emergency-request" className="nav-item emergency">
            <span className="nav-icon">🚨</span>
            <span>Emergency Request</span>
          </a>
          <a href="/patient/messages" className="nav-item">
            <span className="nav-icon">💬</span>
            <span>Messages</span>
            <span className="badge">3</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="support-section">
            <h4>SUPPORT</h4>
            <a href="#" className="nav-item">
              <span className="nav-icon">❓</span>
              <span>Help Center</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </a>
          </div>

          <div className="user-profile-sidebar">
            <div className="user-avatar">
              <img src="https://i.pravatar.cc/150?img=8" alt="User" />
            </div>
            <div className="user-info-sidebar">
              <div className="user-name-sidebar">James Wilson</div>
              <div className="user-id-sidebar">ID: #PX-99281</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content-reports">
        {/* Header */}
        <header className="reports-header">
          <div className="header-top">
            <div className="logo-small">
              <div className="logo-icon-small">
                <span>❤️</span>
              </div>
              <span className="logo-text-small">LifeLink</span>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <span>🔔</span>
              </button>
              <button className="icon-btn">
                <span>👤</span>
              </button>
            </div>
          </div>
          <div className="header-content">
            <h1 className="page-title">Medical Reports</h1>
            <p className="page-subtitle">Manage and upload your clinical documentation for donor eligibility.</p>
          </div>
        </header>

        <div className="reports-layout">
          {/* Left Column - Upload Section */}
          <div className="upload-column">
            {/* Upload New Report */}
            <div className="upload-card">
              <div className="card-header-upload">
                <span className="upload-icon">☁️</span>
                <h3 className="card-title">Upload New Report</h3>
              </div>
              
              <div 
                className={`dropzone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="dropzone-icon">
                  <span>📤</span>
                </div>
                <p className="dropzone-text">Drag and drop your files here</p>
                <p className="dropzone-subtext">or click to browse local files</p>
                
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                
                <div className="file-types">
                  <span className="file-type-badge">PDF</span>
                  <span className="file-type-badge">JPG</span>
                  <span className="file-type-badge">PNG</span>
                </div>
              </div>

              <button 
                className="btn-upload" 
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
              >
                <span className="plus-icon">+</span>
                Upload Report
              </button>
              <p className="upload-note">Max file size: 10MB</p>
            </div>

            {/* Report Feedback */}
            <div className="feedback-card">
              <div className="card-header-feedback">
                <span className="feedback-icon">⚠️</span>
                <h3 className="card-title">Report Feedback</h3>
              </div>

              <div className="feedback-list">
                {feedbackItems.map((item, index) => (
                  <div key={index} className={`feedback-item ${item.type}`}>
                    <div className="feedback-header">
                      <span className="feedback-title">{item.title}</span>
                      <span className="feedback-date">{item.date}</span>
                    </div>
                    <p className="feedback-content">
                      {item.highlight ? (
                        <>
                          Your "<strong>{item.highlight}</strong>" {item.content.split(item.highlight)[1]}
                        </>
                      ) : (
                        item.content
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Existing Reports */}
          <div className="reports-column">
            <div className="existing-reports-card">
              <div className="card-header-reports">
                <div className="header-left">
                  <span className="reports-icon">📄</span>
                  <h3 className="card-title">Existing Reports</h3>
                </div>
                <div className="search-filter">
                  <div className="search-box-reports">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input-reports"
                    />
                  </div>
                  <button className="filter-btn">
                    <span>☰</span>
                  </button>
                </div>
              </div>

              <div className="reports-table-wrapper">
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>REPORT NAME</th>
                      <th>CATEGORY</th>
                      <th>UPLOAD DATE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id}>
                        <td>
                          <div className="report-name-cell">
                            <span className={`file-icon ${report.fileType}`}>
                              {report.fileType === 'pdf' ? '📄' : '🖼️'}
                            </span>
                            <span>{report.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`category-badge ${report.category.toLowerCase().replace(' ', '-')}`}>
                            {report.category}
                          </span>
                        </td>
                        <td className="date-cell">{report.uploadDate}</td>
                        <td>
                          <span className={`status-badge ${report.status}`}>
                            {report.status === 'verified' && '● Verified'}
                            {report.status === 'pending' && '● Pending'}
                            {report.status === 'rejected' && '● Rejected'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn view"
                              onClick={() => handleView(report)}
                              title="View"
                            >
                              👁️
                            </button>
                            <button 
                              className="action-btn download"
                              onClick={() => handleDownload(report)}
                              title="Download"
                            >
                              ⬇️
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => handleDelete(report)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <span className="pagination-info">Showing 4 of 12 reports</span>
                <div className="pagination-buttons">
                  <button className="pagination-btn">‹</button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">2</button>
                  <button className="pagination-btn">3</button>
                  <button className="pagination-btn">›</button>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon blue">
                  <span>🔒</span>
                </div>
                <div className="info-content">
                  <h4 className="info-title">Secure Data Handling</h4>
                  <p className="info-text">All reports are encrypted and only accessible by authorized medical staff.</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon green">
                  <span>✓</span>
                </div>
                <div className="info-content">
                  <h4 className="info-title">Fast Verification</h4>
                  <p className="info-text">Most reports are verified within 24-48 hours of submission.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          LIFELINK © 2023 • HEALTHCARE FOR ALL • PRIVACY POLICY • TERMS OF SERVICE
        </footer>
      </main>
    </div>
  );
};

export default MedicalReports;