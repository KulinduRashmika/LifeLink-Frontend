import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const EmergencyAlerts = () => {

  const location = useLocation();   // ✅ Active route detection

  const [alertType, setAlertType] = useState('');
  const [priority, setPriority] = useState('CRITICAL');
  const [radius, setRadius] = useState('50');
  const [assetNeeded, setAssetNeeded] = useState('');
  const [message, setMessage] = useState('');
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcasted, setBroadcasted] = useState(false);

  const maxChars = 160;

  const navItems = [
    { to: '/admin/dashboard', icon: '⊞', label: 'Dashboard' },
    { to: '/admin/usermanage', icon: '👥', label: 'User Management' },
    { to: '/admin/hospitalmanage', icon: '🏥', label: 'Hospital Management' },
    { to: '/admin/alerts', icon: '🔔', label: 'Emergency Alerts' },
    { to: '/admin/reports', icon: '📊', label: 'Reports' },
    { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];

  const priorityLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  const estimatedDonors = radius ? Math.round(parseInt(radius || 0) * 24.8) : 0;
  const estimatedFacilities = radius ? Math.round(parseInt(radius || 0) * 0.28) : 0;

  const handleBroadcast = () => {
    setBroadcasting(true);
    setTimeout(() => {
      setBroadcasting(false);
      setBroadcasted(true);
      setTimeout(() => setBroadcasted(false), 3000);
    }, 1800);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .ea-app {
          display: flex;
          min-height: 100vh;
          background: #F8FAFC;
          font-family: 'DM Sans', sans-serif;
        }

        /* SIDEBAR */
        .ea-sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
        }

        .ea-logo {
          padding: 20px;
          border-bottom: 1px solid #F3F4F6;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .ea-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg,#3B82F6,#2563EB);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ea-logo-name {
          font-weight: 800;
          font-size: 14px;
        }

        .ea-logo-sub {
          font-size: 10px;
          color: #9CA3AF;
          text-transform: uppercase;
        }

        .ea-nav {
          padding: 15px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .ea-nav-link {
          display: flex;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13.5px;
          color: #6B7280;
          transition: 0.15s;
        }

        .ea-nav-link:hover {
          background: #F3F4F6;
          color: #111827;
        }

        .ea-nav-link.active {
          background: #2563EB;
          color: white;
          font-weight: 600;
        }

        .ea-user-card {
          padding: 15px;
          border-top: 1px solid #F3F4F6;
        }

        /* MAIN */
        .ea-main {
          margin-left: 260px;
          padding: 30px;
          flex: 1;
        }

        .ea-page-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .ea-page-sub {
          color: #9CA3AF;
          margin-bottom: 25px;
        }

        .ea-panel {
          background: white;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
        }

        .ea-input, .ea-select, .ea-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          margin-top: 6px;
          margin-bottom: 16px;
        }

        .ea-broadcast-btn {
          padding: 10px 20px;
          background: #EF4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .ea-broadcast-btn.success {
          background: #10B981;
        }
      `}</style>

      <div className="ea-app">

        {/* SIDEBAR */}
        <aside className="ea-sidebar">
          <div className="ea-logo">
            <div className="ea-logo-icon">🛡</div>
            <div>
              <div className="ea-logo-name">LifeLink Admin</div>
              <div className="ea-logo-sub">Super Admin Panel</div>
            </div>
          </div>

          <nav className="ea-nav">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`ea-nav-link${location.pathname === item.to ? ' active' : ''}`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>

          <div className="ea-user-card">
            <strong>Dr. Sarah Chen</strong>
            <div style={{fontSize:'12px',color:'#9CA3AF'}}>System Administrator</div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="ea-main">

          <div className="ea-page-title">Deploy Emergency Notification</div>
          <div className="ea-page-sub">
            Broadcast urgent medical alerts to donors and hospitals.
          </div>

          <div className="ea-panel">

            <label>Alert Type</label>
            <select className="ea-select" value={alertType} onChange={e => setAlertType(e.target.value)}>
              <option value="">Select Type</option>
              <option>Blood Request</option>
              <option>Organ Transplant</option>
              <option>General Emergency</option>
            </select>

            <label>Radius (KM)</label>
            <input type="number" className="ea-input" value={radius} onChange={e => setRadius(e.target.value)} />

            <label>Specific Asset Needed</label>
            <input type="text" className="ea-input" value={assetNeeded} onChange={e => setAssetNeeded(e.target.value)} />

            <label>Message</label>
            <textarea
              className="ea-textarea"
              maxLength={maxChars}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />

            <button
              className={`ea-broadcast-btn${broadcasted ? ' success' : ''}`}
              onClick={handleBroadcast}
            >
              {broadcasted ? "✓ Alert Sent!" : "📡 Broadcast Alert"}
            </button>

          </div>
        </div>

      </div>
    </>
  );
};

export default EmergencyAlerts;