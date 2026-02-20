import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HospitalManagement = () => {
  const [activeNav, setActiveNav] = useState('hospitals');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { label: 'Total Registered', value: '1,284', delta: '+12%', deltaColor: '#10B981', icon: '🏥', iconBg: '#EFF6FF' },
    { label: 'Active Blood Banks', value: '452', delta: '+5%', deltaColor: '#10B981', icon: '🩸', iconBg: '#FFF1F2' },
    { label: 'Pending Verification', value: '28', delta: '-8%', deltaColor: '#EF4444', icon: '📋', iconBg: '#FFF7ED' },
    { label: 'Alert Success Rate', value: '94.2%', delta: '+2%', deltaColor: '#10B981', icon: '⚡', iconBg: '#EFF6FF' },
  ];

  const institutions = [
    {
      initials: 'SM', initialsColor: '#2563EB', initialsBg: '#DBEAFE',
      name: "St. Mary's General Hospital", id: 'ID: LL-29384',
      type: 'HOSPITAL', typeColor: '#2563EB', typeBg: '#EFF6FF',
      location: 'Manhattan, NY',
      verStatus: 'Verified', verColor: '#059669', verBg: '#D1FAE5', verIcon: '✅',
      contact: 'Dr. James Wilson', contactEmail: 'j.wilson@stmarys.org',
      actions: 'view-edit',
    },
    {
      initials: 'RB', initialsColor: '#EF4444', initialsBg: '#FEE2E2',
      name: 'Red Cross Blood Bank Central', id: 'ID: LL-11209',
      type: 'BLOOD BANK', typeColor: '#EF4444', typeBg: '#FEE2E2',
      location: 'Brooklyn, NY',
      verStatus: 'Pending Review', verColor: '#F59E0B', verBg: '#FEF3C7', verIcon: '🔄',
      contact: 'Maria Rodriguez', contactEmail: 'm.rodriguez@redcross.org',
      actions: 'verify',
    },
    {
      initials: 'CH', initialsColor: '#2563EB', initialsBg: '#DBEAFE',
      name: 'City Hope Medical Center', id: 'ID: LL-44582',
      type: 'HOSPITAL', typeColor: '#2563EB', typeBg: '#EFF6FF',
      location: 'Queens, NY',
      verStatus: 'On Hold', verColor: '#6B7280', verBg: '#F3F4F6', verIcon: '⏸',
      contact: 'Samuel L. Jackson', contactEmail: 'sam.j@cityhope.com',
      actions: 'view-edit',
    },
    {
      initials: 'BM', initialsColor: '#2563EB', initialsBg: '#DBEAFE',
      name: 'Baptist Memorial Hospital', id: 'ID: LL-90210',
      type: 'HOSPITAL', typeColor: '#2563EB', typeBg: '#EFF6FF',
      location: 'Staten Island, NY',
      verStatus: 'Verified', verColor: '#059669', verBg: '#D1FAE5', verIcon: '✅',
      contact: 'Linda Harper', contactEmail: 'l.harper@baptist.org',
      actions: 'view-edit',
    },
    {
      initials: 'NB', initialsColor: '#EF4444', initialsBg: '#FEE2E2',
      name: 'National Blood Services HQ', id: 'ID: LL-55310',
      type: 'BLOOD BANK', typeColor: '#EF4444', typeBg: '#FEE2E2',
      location: 'Bronx, NY',
      verStatus: 'Verified', verColor: '#059669', verBg: '#D1FAE5', verIcon: '✅',
      contact: 'Dr. Rao Patel', contactEmail: 'r.patel@nbs.org',
      actions: 'view-edit',
    },
  ];

  const tabs = [
    { key: 'all', label: 'All Institutions' },
    { key: 'hospitals', label: 'Hospitals' },
    { key: 'bloodbanks', label: 'Blood Banks' },
    { key: 'pending', label: 'Pending Review', badge: 28 },
  ];

  const filtered = institutions.filter(inst => {
    const matchSearch = !searchQuery ||
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'hospitals' && inst.type === 'HOSPITAL') ||
      (activeTab === 'bloodbanks' && inst.type === 'BLOOD BANK') ||
      (activeTab === 'pending' && inst.verStatus === 'Pending Review');
    return matchSearch && matchTab;
  });

  const navItems = [
    { key: 'dashboard', to: '/admin/dashboard', icon: '⊞', label: 'Dashboard' },
    { key: 'users', to: '/admin/usermanage', icon: '👥', label: 'User Management' },
    { key: 'hospitals', to: '/admin/hospitalmanage', icon: '✛', label: 'Hospital Management' },
    { key: 'alerts', to: '/admin/alerts', icon: '✳', label: 'Emergency Alerts' },
    { key: 'reports', to: '/admin/reports', icon: '📊', label: 'Reports' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .hm-app {
          display: flex;
          min-height: 100vh;
          background: #F8FAFC;
          font-family: 'DM Sans', -apple-system, sans-serif;
        }

        /* ── SIDEBAR ── */
        .hm-sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          z-index: 100;
        }

        .hm-logo {
          padding: 20px 22px;
          border-bottom: 1px solid #F3F4F6;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hm-logo-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }

        .hm-logo-name {
          font-size: 14px;
          font-weight: 800;
          color: #111827;
          line-height: 1.2;
        }

        .hm-logo-sub {
          font-size: 10px;
          font-weight: 700;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .hm-nav {
          padding: 16px 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hm-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6B7280;
          text-decoration: none;
          transition: all 0.15s;
          border: none;
          background: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          text-align: left;
        }

        .hm-nav-link:hover { background: #F3F4F6; color: #111827; }
        .hm-nav-link.active { background: #EFF6FF; color: #2563EB; font-weight: 600; }
        .hm-nav-icon { font-size: 16px; width: 22px; text-align: center; }

        .hm-sidebar-bottom {
          padding: 12px;
          border-top: 1px solid #F3F4F6;
        }

        .hm-settings-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6B7280;
          text-decoration: none;
          transition: all 0.15s;
          width: 100%;
        }

        .hm-settings-link:hover { background: #F3F4F6; color: #111827; }

        /* ── TOPBAR ── */
        .hm-topbar {
          position: fixed;
          top: 0; left: 260px; right: 0;
          height: 62px;
          background: white;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          padding: 0 28px;
          gap: 14px;
          z-index: 200;
        }

        .hm-search-wrap {
          position: relative;
          flex: 1;
          max-width: 380px;
        }

        .hm-search-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          font-size: 13px; color: #9CA3AF;
        }

        .hm-search-input {
          width: 100%;
          padding: 8px 14px 8px 34px;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          font-size: 13px;
          background: #F9FAFB;
          font-family: 'DM Sans', sans-serif;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }

        .hm-search-input:focus { border-color: #2563EB; background: white; }
        .hm-search-input::placeholder { color: #9CA3AF; }

        .hm-topbar-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hm-notif-btn {
          position: relative;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: white;
          border: 1px solid #E5E7EB;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px;
          transition: background 0.12s;
        }

        .hm-notif-btn:hover { background: #F3F4F6; }

        .hm-notif-dot {
          position: absolute;
          top: 6px; right: 6px;
          width: 8px; height: 8px;
          background: #EF4444;
          border: 2px solid white;
          border-radius: 50%;
        }

        .hm-user-block {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .hm-user-info { text-align: right; }
        .hm-user-name { font-size: 13px; font-weight: 700; color: #111827; }
        .hm-user-role { font-size: 10.5px; color: #9CA3AF; }

        .hm-user-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 2px solid #E5E7EB;
          background: linear-gradient(135deg, #FCA5A5, #F87171);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          overflow: hidden;
        }

        /* ── MAIN ── */
        .hm-main {
          margin-left: 260px;
          margin-top: 62px;
          flex: 1;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── PAGE HEADER ── */
        .hm-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .hm-page-title {
          font-size: 24px;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.4px;
        }

        .hm-page-sub {
          font-size: 13px;
          color: #9CA3AF;
          margin-top: 4px;
        }

        .hm-register-btn {
          background: #2563EB;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 11px 22px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s;
          box-shadow: 0 4px 12px rgba(37,99,235,0.25);
        }

        .hm-register-btn:hover { background: #1D4ED8; }

        /* ── STATS ── */
        .hm-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .hm-stat-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 20px;
          animation: hmFadeUp 0.3s ease both;
          transition: box-shadow 0.15s;
        }

        .hm-stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .hm-stat-card:nth-child(1) { animation-delay: 0.05s; }
        .hm-stat-card:nth-child(2) { animation-delay: 0.10s; }
        .hm-stat-card:nth-child(3) { animation-delay: 0.15s; }
        .hm-stat-card:nth-child(4) { animation-delay: 0.20s; }

        @keyframes hmFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hm-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .hm-stat-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }

        .hm-stat-delta {
          font-size: 12px;
          font-weight: 700;
        }

        .hm-stat-label {
          font-size: 12px;
          color: #9CA3AF;
          margin-bottom: 6px;
        }

        .hm-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
          font-family: 'Space Mono', monospace;
        }

        /* ── TABLE PANEL ── */
        .hm-table-panel {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
        }

        /* ── TABS ── */
        .hm-tabs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid #F3F4F6;
        }

        .hm-tabs {
          display: flex;
          gap: 0;
        }

        .hm-tab {
          padding: 14px 16px;
          font-size: 13.5px;
          font-weight: 600;
          color: #9CA3AF;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
          border-bottom: 2.5px solid transparent;
          margin-bottom: -1px;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hm-tab:hover { color: #374151; }
        .hm-tab.active { color: #2563EB; border-bottom-color: #2563EB; }

        .hm-tab-badge {
          background: #FEF3C7;
          color: #D97706;
          font-size: 10.5px;
          font-weight: 800;
          padding: 1px 7px;
          border-radius: 10px;
        }

        .hm-tab-actions {
          display: flex;
          gap: 6px;
        }

        .hm-tab-action-btn {
          width: 32px; height: 32px;
          border-radius: 7px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #6B7280;
          cursor: pointer;
          transition: all 0.12s;
        }

        .hm-tab-action-btn:hover { border-color: #2563EB; color: #2563EB; }

        /* ── TABLE ── */
        .hm-table { width: 100%; border-collapse: collapse; }

        .hm-table th {
          text-align: left;
          padding: 11px 20px;
          font-size: 10.5px;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 700;
          background: #FAFAFA;
          border-bottom: 1px solid #F3F4F6;
        }

        .hm-table tbody tr {
          transition: background 0.12s;
          cursor: pointer;
        }

        .hm-table tbody tr:hover { background: #F9FAFB; }

        .hm-table td {
          padding: 16px 20px;
          font-size: 13px;
          color: #374151;
          border-bottom: 1px solid #F9FAFB;
          vertical-align: middle;
        }

        .hm-table tbody tr:last-child td { border-bottom: none; }

        .hm-inst-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hm-inst-initials {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }

        .hm-inst-name {
          font-weight: 700;
          color: #111827;
          font-size: 13.5px;
          line-height: 1.3;
        }

        .hm-inst-id {
          font-size: 11px;
          color: #9CA3AF;
          margin-top: 2px;
          font-family: 'Space Mono', monospace;
        }

        .hm-type-chip {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.4;
          text-align: center;
        }

        .hm-ver-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
        }

        .hm-contact-name {
          font-weight: 600;
          color: #111827;
          font-size: 13px;
        }

        .hm-contact-email {
          font-size: 11.5px;
          color: #9CA3AF;
          margin-top: 2px;
        }

        .hm-actions-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hm-action-btn {
          width: 30px; height: 30px;
          border-radius: 7px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 13px; color: #6B7280;
          transition: all 0.12s;
        }

        .hm-action-btn:hover { border-color: #2563EB; color: #2563EB; background: #EFF6FF; }

        .hm-verify-btn {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #2563EB;
          border-radius: 7px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.12s;
          line-height: 1.4;
          text-align: center;
        }

        .hm-verify-btn:hover { background: #2563EB; color: white; }

        .hm-more-btn {
          width: 30px; height: 30px;
          border-radius: 7px;
          background: none;
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 16px; color: #9CA3AF;
          transition: all 0.12s;
        }

        .hm-more-btn:hover { background: #F3F4F6; color: #374151; }

        /* ── MODAL ── */
        .hm-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: hmFadeIn 0.15s ease;
        }

        @keyframes hmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hm-modal {
          background: white;
          border-radius: 16px;
          padding: 30px;
          width: 520px;
          max-width: 95vw;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: hmSlideUp 0.2s ease;
        }

        @keyframes hmSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hm-modal-title { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 4px; }
        .hm-modal-sub { font-size: 13px; color: #9CA3AF; margin-bottom: 22px; }

        .hm-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .hm-modal-full { grid-column: 1 / -1; }

        .hm-modal-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .hm-modal-label {
          font-size: 11px;
          font-weight: 700;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .hm-modal-input, .hm-modal-select {
          padding: 9px 12px;
          border: 1.5px solid #E5E7EB;
          border-radius: 8px;
          font-size: 13.5px;
          color: #111827;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s;
          width: 100%;
          background: white;
        }

        .hm-modal-input:focus, .hm-modal-select:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }

        .hm-modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .hm-modal-cancel {
          padding: 9px 18px;
          border-radius: 8px;
          border: 1.5px solid #E5E7EB;
          background: white;
          font-size: 13.5px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.12s;
        }

        .hm-modal-cancel:hover { background: #F9FAFB; }

        .hm-modal-submit {
          padding: 9px 22px;
          border-radius: 8px;
          border: none;
          background: #2563EB;
          font-size: 13.5px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.12s;
        }

        .hm-modal-submit:hover { background: #1D4ED8; }

        @media (max-width: 1100px) {
          .hm-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hm-sidebar { display: none; }
          .hm-main { margin-left: 0; }
          .hm-topbar { left: 0; }
        }
      `}</style>

      <div className="hm-app">

        {/* ── SIDEBAR ── */}
        <aside className="hm-sidebar">
          <div className="hm-logo">
            <div className="hm-logo-icon">🛡</div>
            <div>
              <div className="hm-logo-name">LifeLink Admin</div>
              <div className="hm-logo-sub">Super Admin Panel</div>
            </div>
          </div>

          <nav className="hm-nav">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={item.to}
                className={`hm-nav-link${activeNav === item.key ? ' active' : ''}`}
                onClick={() => setActiveNav(item.key)}
              >
                <span className="hm-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hm-sidebar-bottom">
            <Link to="/admin/settings" className="hm-settings-link">
              <span className="hm-nav-icon">⚙️</span>
              Settings
            </Link>
          </div>
        </aside>

        {/* ── TOPBAR ── */}
        <header className="hm-topbar">
          <div className="hm-search-wrap">
            <span className="hm-search-icon">🔍</span>
            <input
              type="text"
              className="hm-search-input"
              placeholder="Search hospitals, IDs, contacts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hm-topbar-right">
            <button className="hm-notif-btn">
              🔔
              <span className="hm-notif-dot"></span>
            </button>
            <div className="hm-user-block">
              <div className="hm-user-info">
                <div className="hm-user-name">Dr. Sarah Chen</div>
                <div className="hm-user-role">System Administrator</div>
              </div>
              <div className="hm-user-avatar">👩‍⚕️</div>
            </div>
          </div>
        </header>

        {/* ── MAIN ── */}
        <div className="hm-main">

          {/* PAGE HEADER */}
          <div className="hm-page-header">
            <div>
              <div className="hm-page-title">Hospital Management</div>
              <div className="hm-page-sub">Oversee and verify participating hospitals and blood banks within the network</div>
            </div>
            <button className="hm-register-btn" onClick={() => setShowModal(true)}>
              🏥 Register New Institution
            </button>
          </div>

          {/* STAT CARDS */}
          <div className="hm-stats-grid">
            {stats.map((s, i) => (
              <div className="hm-stat-card" key={i}>
                <div className="hm-stat-top">
                  <div className="hm-stat-icon" style={{ background: s.iconBg }}>{s.icon}</div>
                  <div className="hm-stat-delta" style={{ color: s.deltaColor }}>{s.delta}</div>
                </div>
                <div className="hm-stat-label">{s.label}</div>
                <div className="hm-stat-value">{s.value}</div>
              </div>
            ))}
          </div>

          {/* TABLE PANEL */}
          <div className="hm-table-panel">
            <div className="hm-tabs-row">
              <div className="hm-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    className={`hm-tab${activeTab === tab.key ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                    {tab.badge && <span className="hm-tab-badge">{tab.badge}</span>}
                  </button>
                ))}
              </div>
              <div className="hm-tab-actions">
                <button className="hm-tab-action-btn">≡</button>
                <button className="hm-tab-action-btn">⬇</button>
              </div>
            </div>

            <table className="hm-table">
              <thead>
                <tr>
                  <th>Institution Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Verification Status</th>
                  <th>Primary Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inst, i) => (
                  <tr key={i}>
                    <td>
                      <div className="hm-inst-cell">
                        <div
                          className="hm-inst-initials"
                          style={{ background: inst.initialsBg, color: inst.initialsColor }}
                        >
                          {inst.initials}
                        </div>
                        <div>
                          <div className="hm-inst-name">{inst.name}</div>
                          <div className="hm-inst-id">{inst.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className="hm-type-chip"
                        style={{ background: inst.typeBg, color: inst.typeColor }}
                      >
                        {inst.type}
                      </span>
                    </td>
                    <td style={{ color: '#6B7280' }}>{inst.location}</td>
                    <td>
                      <div className="hm-ver-cell" style={{ color: inst.verColor }}>
                        <span>{inst.verIcon}</span>
                        {inst.verStatus}
                      </div>
                    </td>
                    <td>
                      <div className="hm-contact-name">{inst.contact}</div>
                      <div className="hm-contact-email">{inst.contactEmail}</div>
                    </td>
                    <td>
                      <div className="hm-actions-cell">
                        {inst.actions === 'verify' ? (
                          <>
                            <button className="hm-verify-btn">Verify<br/>Now</button>
                            <button className="hm-more-btn">⋮</button>
                          </>
                        ) : (
                          <>
                            <button className="hm-action-btn" title="View">👁</button>
                            <button className="hm-action-btn" title="Edit">✏️</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#9CA3AF', padding: '32px', fontSize: '13px' }}>
                      No institutions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── REGISTER MODAL ── */}
        {showModal && (
          <div className="hm-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="hm-modal" onClick={e => e.stopPropagation()}>
              <div className="hm-modal-title">Register New Institution</div>
              <div className="hm-modal-sub">Add a hospital or blood bank to the LifeLink network.</div>
              <div className="hm-modal-grid">
                <div className="hm-modal-group hm-modal-full">
                  <label className="hm-modal-label">Institution Name</label>
                  <input type="text" className="hm-modal-input" placeholder="e.g. City General Hospital" />
                </div>
                <div className="hm-modal-group">
                  <label className="hm-modal-label">Type</label>
                  <select className="hm-modal-select">
                    <option>Hospital</option>
                    <option>Blood Bank</option>
                  </select>
                </div>
                <div className="hm-modal-group">
                  <label className="hm-modal-label">Location</label>
                  <input type="text" className="hm-modal-input" placeholder="e.g. Manhattan, NY" />
                </div>
                <div className="hm-modal-group">
                  <label className="hm-modal-label">Primary Contact Name</label>
                  <input type="text" className="hm-modal-input" placeholder="Dr. Jane Smith" />
                </div>
                <div className="hm-modal-group">
                  <label className="hm-modal-label">Contact Email</label>
                  <input type="email" className="hm-modal-input" placeholder="contact@hospital.org" />
                </div>
                <div className="hm-modal-group">
                  <label className="hm-modal-label">Phone</label>
                  <input type="text" className="hm-modal-input" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="hm-modal-group">
                  <label className="hm-modal-label">Verification Status</label>
                  <select className="hm-modal-select">
                    <option>Pending Review</option>
                    <option>Verified</option>
                    <option>On Hold</option>
                  </select>
                </div>
              </div>
              <div className="hm-modal-actions">
                <button className="hm-modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="hm-modal-submit" onClick={() => setShowModal(false)}>Register Institution</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default HospitalManagement;