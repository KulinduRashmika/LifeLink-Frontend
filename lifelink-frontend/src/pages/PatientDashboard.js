import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/PatientDashboard.css";

const PatientDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");

  const medicalReports = [
    {
      id: 1,
      name: "Blood Analysis - Panel A",
      date: "Sep 28, 2026",
      status: "verified",
    },
    {
      id: 2,
      name: "Pre-Surgery ECG",
      date: "Oct 02, 2026",
      status: "verified",
    },
    {
      id: 3,
      name: "Liver Function Test",
      date: "Oct 09, 2026",
      status: "pending",
    },
    {
      id: 4,
      name: "Medical History Summary",
      date: "Sep 15, 2026",
      status: "verified",
    },
  ];

  const timelineSteps = [
    { id: 1, label: "Submitted", completed: true },
    { id: 2, label: "Admin Review", completed: false, active: true },
    { id: 3, label: "Donor Matched", completed: false },
    { id: 4, label: "Scheduled", completed: false },
    { id: 5, label: "Completed", completed: false },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        

        <nav className="nav">
          <a
            href="#"
            className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveNav("dashboard")}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard Overview</span>
          </a>
          <a
            href="/myrequests"
            className="nav-item"
            onClick={() => setActiveNav("requests")}
          >
            <span className="nav-icon">📄</span>
            <span>My Requests</span>
          </a>
          <a
            href="/patient/medical-reports"
            className="nav-item"
            onClick={() => setActiveNav("reports")}
          >
            <span className="nav-icon">📋</span>
            <span>Medical Reports</span>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={() => setActiveNav("instructions")}
          >
            <span className="nav-icon">👨‍⚕️</span>
            <span>Doctor Instructions</span>
          </a>
          <a
            href="/patient/emergency-request"
            className="nav-item emergency"
            onClick={() => setActiveNav("emergency")}
          >
            <span className="nav-icon">🚨</span>
            <span>Emergency Request</span>
          </a>
          <a
            href="/patient/messages"
            className="nav-item"
            onClick={() => setActiveNav("messages")}
          >
            <span className="nav-icon">💬</span>
            <span>Messages</span>
            <span className="badge">3</span>
          </a>
        </nav>

        <a href="#" className="settings-link">
          <span className="nav-icon">⚙️</span>
          <span>Settings</span>
        </a>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="header-title">Patient Dashboard</h1>
          <div className="user-info">
            <button className="notification-btn">🔔</button>
            <div className="user-profile">
              <div className="user-details">
                <div className="user-name">Alex Thompson</div>
                <div className="user-id">Patient ID: #LL-9921</div>
              </div>
              <div className="avatar">
                <img src="https://i.pravatar.cc/150?img=1" alt="User" />
              </div>
              <span className="dropdown-icon">▼</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <span>💧</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">CURRENT</div>
              <div className="stat-title">Active Request</div>
              <div className="stat-value">
                0+ <span className="stat-subtext">(Pending)</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              <span>❗</span>
            </div>
            <div className="stat-content">
              <div className="stat-title">Urgency</div>
              <div className="stat-value critical">Critical</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <span>👥</span>
            </div>
            <div className="stat-content">
              <div className="stat-title">Donors Found</div>
              <div className="stat-value">12</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <span>✓</span>
            </div>
            <div className="stat-content">
              <div className="stat-title">Verification Status</div>
              <div className="stat-value">Verified</div>
            </div>
          </div>
        </section>

        {/* Donation Timeline */}
        <section className="timeline-section">
          <h2 className="section-title">Donation Timeline</h2>
          <div className="timeline">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="timeline-step">
                <div className="timeline-icon-wrapper">
                  <div
                    className={`timeline-icon ${step.completed ? "completed" : ""} ${step.active ? "active" : ""}`}
                  >
                    {step.completed && "✓"}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div
                      className={`timeline-line ${step.completed ? "completed" : ""}`}
                    />
                  )}
                </div>
                <div
                  className={`timeline-label ${step.active ? "active" : ""}`}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section */}
        <div className="bottom-grid">
          {/* Doctor Instructions */}
          <aside className="instructions-card">
            <div className="card-header">
              <span className="card-icon">👨‍⚕️</span>
              <span className="card-title">Doctor Instructions</span>
            </div>

            <div className="instruction-item">
              <h3 className="instruction-title">Pre-Surgery Prep</h3>
              <p className="instruction-text">
                Follow the fasting guidelines and medication adjustments as
                listed in the documentation.
              </p>
              <div className="instruction-footer">
                <span className="instruction-date">📅 Oct 12, 2026</span>
                <button className="pdf-button">⬇ PDF</button>
              </div>
            </div>

            <div className="support-card">
              <div className="support-image">
                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop"
                  alt="Support"
                />
              </div>
              <h3 className="support-title">Need Support?</h3>
              <p className="support-text">
                Our coordinators are available 24/7 to assist with your donation
                process.
              </p>
              <button className="support-button">Chat with Support</button>
            </div>
          </aside>

          {/* Medical Reports */}
          <section className="reports-card">
            <div className="card-header">
              <span className="card-title">Medical Reports</span>
              <button className="upload-button">☁ Upload New Report</button>
            </div>

            <div className="reports-table">
              <div className="table-header">
                <div className="table-header-cell">REPORT NAME</div>
                <div className="table-header-cell">DATE</div>
                <div className="table-header-cell">STATUS</div>
                <div className="table-header-cell">ACTION</div>
              </div>

              {medicalReports.map((report) => (
                <div key={report.id} className="table-row">
                  <div className="table-cell">
                    <span className="report-icon">📄</span>
                    {report.name}
                  </div>
                  <div className="table-cell">{report.date}</div>
                  <div className="table-cell">
                    <span className={`status-badge ${report.status}`}>
                      {report.status === "verified" ? "VERIFIED" : "PENDING"}
                    </span>
                  </div>
                  <div className="table-cell">
                    <a href="#" className="view-link">
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button className="emergency-button">
              <span>🚨</span>
              <span>📢</span>
              Send Emergency Alert
            </button>
            <p className="emergency-text">
              Use this button only in case of immediate surgical complications
              or critical donor failure.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="footer">
          © 2026 LifeLink Medical Systems. All Rights Reserved. HIPAA Compliant
          Platform.
        </footer>
      </main>
    </div>
  );
};

export default PatientDashboard;
