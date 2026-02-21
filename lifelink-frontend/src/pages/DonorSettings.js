import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DonorSettings = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    nicNumber: "",
    phone: "",
    email: "",
    address: ""
  });

  // Fetch donor profile on load
 useEffect(() => {
  const fetchDonorDetails = async () => {
    try {
      const email = localStorage.getItem("email");

      const response = await fetch(
        `http://localhost:8081/api/donor/profile?email=${email}`
      );

      if (!response.ok) {
        console.log("Response not OK:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Profile Data:", data);

      setFormData({
        fullName: data.fullName || "",
        nicNumber: data.nicNumber || "",
        phone: data.contactNumber || "",   // 🔥 FIXED
        email: data.email || "",
        address: data.location || ""       // 🔥 FIXED
      });

    } catch (error) {
      console.error("Error fetching donor details:", error);
    }
  };

  fetchDonorDetails();
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    window.location.reload();
  };

const handleUpdate = async () => {
  try {
    await fetch("http://localhost:8081/api/donor/update-address", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: formData.address })
    });

    alert("Address updated successfully!");
  } catch (error) {
    console.error("Error updating address:", error);
  }
};



  return (
    <>
      <style>{`
        .settings-layout {
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
          background-color: #2196F3;
          color: white;
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

        .settings-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .settings-icon {
          width: 48px;
          height: 48px;
          background: #DBEAFE;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2196F3;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1F2937;
          margin: 0;
        }

        .user-info-header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
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
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
        }

        .user-name {
          text-align: right;
        }

        .user-name strong {
          display: block;
          font-weight: 600;
          color: #1F2937;
          font-size: 0.875rem;
        }

        .user-avatar-circle {
          width: 36px;
          height: 36px;
          background: #2196F3;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .settings-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #F3F4F6;
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: #1F2937;
        }

        .card-title svg {
          color: #2196F3;
        }

        .readonly-badge {
          padding: 0.25rem 0.75rem;
          background: #F3F4F6;
          color: #6B7280;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-group input {
          padding: 0.75rem 1rem;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.9375rem;
          color: #6B7280;
          background: #F9FAFB;
        }

        .form-group input:disabled {
          cursor: not-allowed;
        }

        .form-group input:not(:disabled) {
          background: white;
          color: #1F2937;
        }

        .form-group input:not(:disabled):focus {
          outline: none;
          border-color: #2196F3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        }

        .address-input {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          background: white;
        }

        .address-input svg {
          color: #9CA3AF;
        }

        .address-input input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.9375rem;
          color: #1F2937;
        }

        .address-note {
          font-size: 0.8125rem;
          color: #6B7280;
          font-style: italic;
          margin-top: 0.5rem;
        }

        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-cancel {
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
        }

        .btn-cancel:hover {
          background: #F9FAFB;
        }

        .btn-primary {
          background: #2196F3;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: #1976D2;
          transform: translateY(-1px);
        }

        .info-boxes {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .info-box {
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          gap: 1rem;
        }

        .info-box.blue {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
        }

        .info-box.yellow {
          background: #FEF3C7;
          border: 1px solid #FDE68A;
        }

        .info-box-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-box.blue .info-box-icon {
          background: #DBEAFE;
          color: #2563EB;
        }

        .info-box.yellow .info-box-icon {
          background: #FEF3C7;
          color: #D97706;
        }

        .info-box-content h4 {
          font-weight: 700;
          color: #1F2937;
          font-size: 0.9375rem;
          margin: 0 0 0.25rem 0;
        }

        .info-box-content p {
          font-size: 0.8125rem;
          color: #6B7280;
          line-height: 1.5;
          margin: 0;
        }

        .footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #E5E7EB;
          text-align: center;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #9CA3AF;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .footer-text {
          font-size: 0.75rem;
          color: #9CA3AF;
        }

        @media (max-width: 1024px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .info-boxes {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .main-content {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="settings-layout">
        {/* Sidebar */}
                <aside className="sidebar">
                  
        
                  <nav className="sidebar-menu">
                    <Link to="/dashboard/donor" className="menu-item">
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
        
                    <Link to="/settings" className="menu-item active">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                      </svg>
                      Settings
                    </Link>
                  </nav>
        
                </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <div className="settings-header">
            <div className="settings-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="page-title">Account Settings</h1>
          </div>

          <div className="user-info-header">
            <button className="notification-btn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
            </button>

            <div className="user-badge">
  <div className="user-name">
    <strong>{formData.fullName || "User"}</strong>
  </div>

  <div className="user-avatar-circle">
    {formData.fullName
      ? formData.fullName
          .split(" ")
          .map(name => name[0])
          .join("")
          .toUpperCase()
      : "U"}
  </div>
</div>
          </div>

          {/* Profile Details */}
          <div className="settings-card">
            <div className="card-header">
              <h3 className="card-title">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                Profile Details
              </h3>
              <span className="readonly-badge">Read Only</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>NIC Number</label>
                <input 
                  type="text" 
                  value={formData.nicNumber}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="settings-card">
            <div className="card-header">
              <h3 className="card-title">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Address Information
              </h3>
            </div>

            <div className="form-group">
              <label>Address Line</label>
              <div className="address-input">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </div>
              <p className="address-note">
                This address will be used for coordinating donation pick-ups or medical supply deliveries.
              </p>
            </div>

            <div className="action-buttons">
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                </svg>
                Update Address
              </button>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="info-boxes">
            <div className="info-box blue">
              <div className="info-box-icon">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="info-box-content">
                <h4>Identity Verified</h4>
                <p>Your account is fully verified with your NIC. Contact support to update core identity details.</p>
              </div>
            </div>

            <div className="info-box yellow">
              <div className="info-box-icon">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="info-box-content">
                <h4>Security Tip</h4>
                <p>Keep your address up to date to ensure you receive medical reports correctly.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-logo">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              LifeLink Medical Systems
            </div>
            <p className="footer-text">© 2024 SECURE PATIENT PORTAL</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default DonorSettings;