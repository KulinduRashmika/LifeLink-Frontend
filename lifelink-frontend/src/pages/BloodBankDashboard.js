import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const LifeLinkDashboard = () => {
  const [activeNav, setActiveNav] = useState('overview');
  const [activeTab, setActiveTab] = useState('blood');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const inventoryBlood = [
    { name: 'O-', units: 12, total: 80, status: 'CRITICAL SUPPLY', statusColor: '#EF4444', statusBg: '#FEE2E2', barColor: '#EF4444' },
    { name: 'Kidney', units: 4, total: 20, status: 'MATCHING', statusColor: '#14B8A6', statusBg: '#CCFBF1', barColor: '#14B8A6', label: 'available' },
    { name: 'Liver', units: 2, total: 20, status: 'URGENT MATCH', statusColor: '#F59E0B', statusBg: '#FEF3C7', barColor: '#F59E0B', label: 'available' },
    { name: 'Cornea', units: 18, total: 30, status: 'STABLE', statusColor: '#10B981', statusBg: '#D1FAE5', barColor: '#10B981' },
  ];

  const inventoryOrgans = [
    { name: 'Heart', units: 1, total: 10, status: 'CRITICAL', statusColor: '#EF4444', statusBg: '#FEE2E2', barColor: '#EF4444', label: 'available' },
    { name: 'Lung', units: 3, total: 15, status: 'LOW STOCK', statusColor: '#F59E0B', statusBg: '#FEF3C7', barColor: '#F59E0B', label: 'available' },
    { name: 'Pancreas', units: 5, total: 20, status: 'ADEQUATE', statusColor: '#3B82F6', statusBg: '#DBEAFE', barColor: '#3B82F6', label: 'available' },
    { name: 'Kidney', units: 9, total: 20, status: 'STABLE', statusColor: '#10B981', statusBg: '#D1FAE5', barColor: '#10B981', label: 'available' },
  ];

  const recentActivity = [
    { icon: '🩸', iconBg: '#DBEAFE', title: 'New Donation Received', description: 'O+ donation received from City Clinic (Batch #BC-441)', time: 'JUST NOW' },
    { icon: '✓', iconBg: '#D1FAE5', title: 'Dispatch Successful', description: 'Match #LL-899 delivered to St. Jude\'s Medical Hospital', time: '45 MINUTES AGO' },
    { icon: '!', iconBg: '#FEE2E2', title: 'Emergency Request Created', description: 'Priority 1 request for O- negative units for North Trauma Center', time: '2 HOURS AGO' },
    { icon: '✔', iconBg: '#FEF3C7', title: 'Testing Completed', description: '24 units of A+ passed screening and moved to inventory', time: '5 HOURS AGO' },
  ];

  const allMatches = [
    { id: '#LL-902', donor: 'John Doe', patientId: 'Patient ID: 88295', asset: 'Blood', type: 'O-', typeColor: '#EF4444', typeBg: '#FEE2E2', recipient: 'Central General', status: 'PROCESSING', statusColor: '#D97706', statusBg: '#FEF3C7' },
    { id: '#LL-899', donor: 'Sarah Williams', patientId: 'Patient ID: 12044', asset: 'Blood', type: 'B+', typeColor: '#2563EB', typeBg: '#DBEAFE', recipient: "St. Jude's Children", status: 'DISPATCHED', statusColor: '#059669', statusBg: '#D1FAE5' },
    { id: '#LL-897', donor: 'Robert Chen', patientId: 'Patient ID: 90211', asset: 'Organ', type: 'Liver', typeColor: '#0F766E', typeBg: '#CCFBF1', recipient: 'North Medical Center', status: 'DISPATCHED', statusColor: '#059669', statusBg: '#D1FAE5' },
    { id: '#LL-894', donor: 'Maria Santos', patientId: 'Patient ID: 55102', asset: 'Blood', type: 'A+', typeColor: '#7C3AED', typeBg: '#EDE9FE', recipient: 'City General', status: 'PROCESSING', statusColor: '#D97706', statusBg: '#FEF3C7' },
  ];

const navItems = [
  { key: 'dashboard', icon: '⊞', label: 'Dashboard', path: '#' },
  { key: 'inventory', icon: '📦', label: 'Inventory', path: '/bloodbank/inventory' },
  { key: 'dispatch', icon: '🚚', label: 'Dispatch', path: '/bloodbank/dispatch' },
  { key: 'reports', icon: '📊', label: 'Reports', path: '/bloodbank/reports' },
  { key: 'settings', icon: '⚙️', label: 'Settings', path: '/bloodbank/setting' },
];
  const filtered = allMatches.filter(m =>
    m.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inventory = activeTab === 'blood' ? inventoryBlood : inventoryOrgans;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .ll-app {
          display: flex;
          min-height: 100vh;
          background: #F1F5F9;
          font-family: 'DM Sans', -apple-system, sans-serif;
        }

        /* ── SIDEBAR ── */
        .ll-sidebar {
          width: 230px;
          background: white;
          border-right: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          z-index: 100;
        }

        .ll-logo {
          padding: 20px 20px 18px;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ll-logo-icon {
          width: 38px; height: 38px;
          background: #2563EB;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }

        .ll-logo-name {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.2;
        }

        .ll-logo-sub {
          font-size: 11px;
          color: #94A3B8;
          font-weight: 400;
        }

        .ll-nav {
          padding: 14px 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ll-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }

        .ll-nav-item:hover {
          background: #F8FAFC;
          color: #0F172A;
        }

        .ll-nav-item.active {
          background: #EFF6FF;
          color: #2563EB;
          font-weight: 600;
        }

        .ll-nav-icon { font-size: 16px; width: 20px; text-align: center; }

        .ll-sys-health {
          padding: 14px 20px;
          border-top: 1px solid #E2E8F0;
          font-size: 11px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ll-pulse-dot {
          width: 7px; height: 7px;
          background: #10B981;
          border-radius: 50%;
          animation: llPulse 2s infinite;
        }

        @keyframes llPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── MAIN ── */
        .ll-main {
          margin-left: 230px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* ── TOPBAR ── */
        .ll-topbar {
          background: white;
          border-bottom: 1px solid #E2E8F0;
          padding: 0 28px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .ll-topbar-left h1 {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
        }

        .ll-topbar-left p {
          font-size: 12px;
          color: #94A3B8;
          margin-top: 2px;
        }

        .ll-topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ll-btn {
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .ll-btn-outline {
          background: white;
          color: #374151;
          border: 1px solid #D1D5DB;
        }

        .ll-btn-outline:hover { background: #F9FAFB; }

        .ll-btn-primary {
          background: #2563EB;
          color: white;
        }

        .ll-btn-primary:hover { background: #1D4ED8; }

        .ll-avatar {
          width: 36px; height: 36px;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          cursor: pointer;
        }

        /* ── CONTENT ── */
        .ll-content {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── STATS ── */
        .ll-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        .ll-stat-card {
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px 20px;
          transition: box-shadow 0.2s;
          animation: llFadeUp 0.3s ease both;
        }

        .ll-stat-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .ll-stat-card:nth-child(1) { animation-delay: 0.05s; }
        .ll-stat-card:nth-child(2) { animation-delay: 0.10s; }
        .ll-stat-card:nth-child(3) { animation-delay: 0.15s; }
        .ll-stat-card:nth-child(4) { animation-delay: 0.20s; }
        .ll-stat-card:nth-child(5) { animation-delay: 0.25s; }

        @keyframes llFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ll-stat-label {
          font-size: 11px;
          font-weight: 600;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }

        .ll-stat-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .ll-stat-value {
          font-family: 'Space Mono', monospace;
          font-size: 26px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1;
        }

        .ll-stat-sub {
          font-size: 11px;
          color: #94A3B8;
          margin-top: 6px;
        }

        .ll-stat-card.priority {
          border-color: #FECACA;
          background: linear-gradient(135deg, white 70%, #FFF5F5);
        }

        .ll-stat-card.priority .ll-stat-value { color: #EF4444; }

        /* ── MID ROW ── */
        .ll-mid-row {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 16px;
        }

        /* ── PANEL ── */
        .ll-panel {
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
        }

        .ll-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #F1F5F9;
        }

        .ll-panel-title {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
        }

        .ll-tabs {
          display: flex;
          gap: 4px;
        }

        .ll-tab {
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          color: #64748B;
          border: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
        }

        .ll-tab.active { background: #2563EB; color: white; }
        .ll-tab:hover:not(.active) { background: #F1F5F9; color: #0F172A; }

        .ll-link-btn {
          font-size: 12px;
          color: #2563EB;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
        }

        /* ── INVENTORY GRID ── */
        .ll-inv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #F1F5F9;
        }

        .ll-inv-cell {
          background: white;
          padding: 20px;
          transition: background 0.15s;
        }

        .ll-inv-cell:hover { background: #F8FAFC; }

        .ll-inv-name {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 4px;
          color: #0F172A;
        }

        .ll-inv-units {
          font-family: 'Space Mono', monospace;
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
        }

        .ll-inv-units span {
          font-size: 12px;
          font-weight: 400;
          color: #94A3B8;
          font-family: 'DM Sans', sans-serif;
        }

        .ll-inv-bar {
          height: 3px;
          border-radius: 2px;
          background: #E2E8F0;
          margin: 10px 0 6px;
        }

        .ll-inv-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        .ll-inv-status {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: inline-block;
          padding: 2px 7px;
          border-radius: 4px;
        }

        /* ── ACTIVITY ── */
        .ll-activity-list { padding: 4px 0; }

        .ll-act-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 13px 20px;
          border-bottom: 1px solid #F8FAFC;
          transition: background 0.12s;
          cursor: pointer;
        }

        .ll-act-item:last-of-type { border-bottom: none; }
        .ll-act-item:hover { background: #F8FAFC; }

        .ll-act-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 1px;
          font-weight: 700;
        }

        .ll-act-title {
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .ll-act-desc {
          font-size: 11.5px;
          color: #64748B;
          line-height: 1.4;
        }

        .ll-act-time {
          font-size: 10px;
          color: #94A3B8;
          margin-top: 3px;
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
        }

        .ll-view-all-btn {
          display: block;
          text-align: center;
          padding: 12px;
          font-size: 12px;
          color: #2563EB;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          border-top: 1px solid #F1F5F9;
          transition: background 0.12s;
        }

        .ll-view-all-btn:hover { background: #F8FAFC; }

        /* ── BOTTOM ROW ── */
        .ll-bottom-row {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
        }

        /* ── TABLE ── */
        .ll-table-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ll-search-input {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 6px 12px;
          color: #0F172A;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          outline: none;
          width: 180px;
          transition: border-color 0.15s;
        }

        .ll-search-input:focus { border-color: #2563EB; background: white; }

        .ll-icon-btn {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; color: #94A3B8;
          transition: all 0.15s;
        }

        .ll-icon-btn:hover { border-color: #2563EB; color: #2563EB; }

        .ll-table { width: 100%; border-collapse: collapse; }

        .ll-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 10.5px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-bottom: 1px solid #F1F5F9;
          font-weight: 700;
          background: #FAFBFC;
        }

        .ll-table tbody tr {
          transition: background 0.12s;
          cursor: pointer;
        }

        .ll-table tbody tr:hover { background: #F8FAFC; }

        .ll-table td {
          padding: 12px 16px;
          font-size: 13px;
          border-bottom: 1px solid #F1F5F9;
          color: #374151;
        }

        .ll-table tbody tr:last-child td { border-bottom: none; }

        .ll-match-id {
          font-family: 'Space Mono', monospace;
          font-size: 11.5px;
          color: #2563EB;
          font-weight: 700;
        }

        .ll-donor-name { font-weight: 600; color: #0F172A; }
        .ll-patient-id { font-size: 11px; color: #94A3B8; }

        .ll-type-chip {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 2px 8px;
          border-radius: 5px;
          font-size: 11px; font-weight: 700;
          font-family: 'Space Mono', monospace;
        }

        .ll-asset-chip {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 5px;
          font-size: 11px; font-weight: 600;
        }

        .ll-status-chip {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 5px;
          font-size: 10.5px; font-weight: 700;
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .ll-edit-btn {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; cursor: pointer; color: #94A3B8;
          transition: all 0.15s;
        }

        .ll-edit-btn:hover { border-color: #2563EB; color: #2563EB; }

        /* ── HELP CARD ── */
        .ll-help-card {
          background: linear-gradient(145deg, #1D4ED8 0%, #2563EB 60%, #3B82F6 100%);
          border-radius: 12px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: white;
        }

        .ll-help-icon {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 2px;
        }

        .ll-help-title {
          font-size: 16px;
          font-weight: 700;
        }

        .ll-help-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.75);
          line-height: 1.55;
        }

        .ll-help-btn {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          width: 100%;
          margin-top: 6px;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }

        .ll-help-btn:hover { background: rgba(255,255,255,0.25); }

        @media (max-width: 1300px) {
          .ll-stats-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 1024px) {
          .ll-mid-row, .ll-bottom-row { grid-template-columns: 1fr; }
          .ll-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ll-sidebar { display: none; }
          .ll-main { margin-left: 0; }
        }
      `}</style>

      <div className="ll-app">

        

        {/* ── SIDEBAR ── */}
        
        <aside className="ll-sidebar">
          <div className="ll-logo">
            <div className="ll-logo-icon">🩸</div>
            <div>
              <div className="ll-logo-name">LifeLink</div>
              <div className="ll-logo-sub">Blood & Organ Center</div>
            </div>
          </div>

          <nav className="ll-nav">
  {navItems.map(item => (
    <Link
      key={item.key}
      to={item.path}
      className={`ll-nav-item${location.pathname === item.path ? ' active' : ''}`}
    >
      <span className="ll-nav-icon">{item.icon}</span>
      {item.label}
    </Link>
  ))}
</nav>

          <div className="ll-sys-health">
            <div className="ll-pulse-dot"></div>
            System Health · Cloud Synced
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="ll-main">

          {/* ── TOPBAR ── */}
          <header className="ll-topbar">
            <div className="ll-topbar-left">
              <h1>Blood & Organ Center Management</h1>
              <p>Real-time monitoring of global blood and organ supply with critical emergency matching.</p>
            </div>
            <div className="ll-topbar-right">
              <button className="ll-btn ll-btn-outline">Logout</button>
              <button className="ll-btn ll-btn-primary">Profile</button>
              <div className="ll-avatar">👤</div>
            </div>
          </header>

          {/* ── CONTENT ── */}
          <div className="ll-content">

            {/* ── STATS ── */}
            <div className="ll-stats-grid">
              <div className="ll-stat-card">
                <div className="ll-stat-label">Blood Supply</div>
                <div className="ll-stat-badge" style={{ background: '#D1FAE5', color: '#059669' }}>+2.4%</div>
                <div className="ll-stat-value">1,284</div>
                <div className="ll-stat-sub">Units in storage</div>
              </div>
              <div className="ll-stat-card">
                <div className="ll-stat-label">Pending Matches</div>
                <div className="ll-stat-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>Pending</div>
                <div className="ll-stat-value">23</div>
                <div className="ll-stat-sub">Awaiting verification</div>
              </div>
              <div className="ll-stat-card">
                <div className="ll-stat-label">Active Dispatches</div>
                <div className="ll-stat-badge" style={{ background: '#DBEAFE', color: '#2563EB' }}>Active</div>
                <div className="ll-stat-value">7</div>
                <div className="ll-stat-sub">In transit now</div>
              </div>
              <div className="ll-stat-card priority">
                <div className="ll-stat-label">Priority Requests</div>
                <div className="ll-stat-badge" style={{ background: '#FEE2E2', color: '#EF4444' }}>Priority</div>
                <div className="ll-stat-value">3</div>
                <div className="ll-stat-sub">Needs immediate action</div>
              </div>
              <div className="ll-stat-card">
                <div className="ll-stat-label">Organ Matches</div>
                <div className="ll-stat-badge" style={{ background: '#DBEAFE', color: '#2563EB' }}>8 New</div>
                <div className="ll-stat-value">14</div>
                <div className="ll-stat-sub">Kidney, Liver, Cornea</div>
              </div>
            </div>

            {/* ── MID ROW ── */}
            <div className="ll-mid-row">

              {/* Inventory */}
              <div className="ll-panel">
                <div className="ll-panel-header">
                  <span className="ll-panel-title">Inventory Grid</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="ll-tabs">
                      <button
                        className={`ll-tab${activeTab === 'blood' ? ' active' : ''}`}
                        onClick={() => setActiveTab('blood')}
                      >Blood</button>
                      <button
                        className={`ll-tab${activeTab === 'organs' ? ' active' : ''}`}
                        onClick={() => setActiveTab('organs')}
                      >Organs</button>
                    </div>
                    <button className="ll-link-btn">View Full Inventory</button>
                  </div>
                </div>
                <div className="ll-inv-grid">
                  {inventory.map((item, i) => (
                    <div className="ll-inv-cell" key={i}>
                      <div className="ll-inv-name" style={{ color: item.barColor }}>{item.name}</div>
                      <div className="ll-inv-units">
                        {item.units} <span>{item.label || 'units'}</span>
                      </div>
                      <div className="ll-inv-bar">
                        <div
                          className="ll-inv-bar-fill"
                          style={{ width: `${Math.round((item.units / item.total) * 100)}%`, background: item.barColor }}
                        />
                      </div>
                      <div
                        className="ll-inv-status"
                        style={{ color: item.statusColor, background: item.statusBg }}
                      >
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="ll-panel">
                <div className="ll-panel-header">
                  <span className="ll-panel-title">Recent Activity</span>
                </div>
                <div className="ll-activity-list">
                  {recentActivity.map((a, i) => (
                    <div className="ll-act-item" key={i}>
                      <div className="ll-act-icon" style={{ background: a.iconBg }}>{a.icon}</div>
                      <div>
                        <div className="ll-act-title">{a.title}</div>
                        <div className="ll-act-desc">{a.description}</div>
                        <div className="ll-act-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                  <button className="ll-view-all-btn">View All Activities →</button>
                </div>
              </div>
            </div>

            {/* ── BOTTOM ROW ── */}
            <div className="ll-bottom-row">

              {/* Dispatch Table */}
              <div className="ll-panel">
                <div className="ll-panel-header">
                  <span className="ll-panel-title">Incoming Matches & Dispatch</span>
                  <div className="ll-table-header-row">
                    <input
                      type="text"
                      className="ll-search-input"
                      placeholder="Search matches…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                    <button className="ll-icon-btn">⊟</button>
                    <button className="ll-icon-btn">🔍</button>
                  </div>
                </div>
                <table className="ll-table">
                  <thead>
                    <tr>
                      <th>Match ID</th>
                      <th>Donor / Patient</th>
                      <th>Asset Type</th>
                      <th>Type</th>
                      <th>Recipient Hospital</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, i) => (
                      <tr key={i}>
                        <td><span className="ll-match-id">{row.id}</span></td>
                        <td>
                          <div className="ll-donor-name">{row.donor}</div>
                          <div className="ll-patient-id">{row.patientId}</div>
                        </td>
                        <td>
                          <span
                            className="ll-asset-chip"
                            style={{
                              background: row.asset === 'Blood' ? '#FEE2E2' : '#CCFBF1',
                              color: row.asset === 'Blood' ? '#EF4444' : '#0F766E'
                            }}
                          >
                            {row.asset}
                          </span>
                        </td>
                        <td>
                          <span
                            className="ll-type-chip"
                            style={{ background: row.typeBg, color: row.typeColor }}
                          >
                            {row.type}
                          </span>
                        </td>
                        <td style={{ color: '#374151', fontSize: '12.5px' }}>{row.recipient}</td>
                        <td>
                          <span
                            className="ll-status-chip"
                            style={{ background: row.statusBg, color: row.statusColor }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <button className="ll-edit-btn">✏️</button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', color: '#94A3B8', padding: '24px' }}>
                          No matches found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Help Card */}
              <div className="ll-help-card">
                <div className="ll-help-icon">🏥</div>
                <div className="ll-help-title">Need Help?</div>
                <div className="ll-help-desc">
                  Contact the central medical coordinating office for emergency overrides,
                  priority escalations, or cross-region dispatch requests.
                </div>
                <button className="ll-help-btn">
                  📞 Call Support
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LifeLinkDashboard;