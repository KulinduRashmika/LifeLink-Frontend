import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const stats = [
    { label: 'TOTAL USERS', value: '1,284', meta: '↗ +12% from last month', metaColor: '#10B981', icon: '👥' },
    { label: 'ACTIVE STAFF', value: '856', meta: '↗ +5% this week', metaColor: '#10B981', icon: '🧑‍⚕️' },
    { label: 'PENDING APPROVALS', value: '12', meta: 'Needs attention', metaColor: '#F59E0B', icon: '⏳' },
    { label: 'DEACTIVATED ACCOUNTS', value: '42', meta: 'No change', metaColor: '#9CA3AF', icon: '🚫' },
  ];

  const allUsers = [
    { name: 'Dr. Michael Chen', dept: 'Cardiology', email: 'm.chen@lifelink.com', role: 'DOCTOR', roleColor: '#2563EB', roleBg: '#DBEAFE', lastLogin: '2 mins ago', status: 'Active', avatar: '👨‍⚕️', avatarBg: '#EFF6FF' },
    { name: 'Angela Ross', dept: 'Supply Chain', email: 'a.ross@lifelink.com', role: 'LOGISTICS', roleColor: '#D97706', roleBg: '#FEF3C7', lastLogin: '1 hour ago', status: 'Active', avatar: '👩‍💼', avatarBg: '#FFF7ED' },
    { name: 'David Miller', dept: 'Pathology Lab', email: 'd.miller@lifelink.com', role: 'LAB TECH', roleColor: '#7C3AED', roleBg: '#EDE9FE', lastLogin: 'Yesterday', status: 'Inactive', avatar: '👨‍🔬', avatarBg: '#F5F3FF' },
    { name: 'Jennifer Wu', dept: 'IT Ops', email: 'j.wu@lifelink.com', role: 'ADMIN', roleColor: '#059669', roleBg: '#D1FAE5', lastLogin: 'Just now', status: 'Active', avatar: '👩‍💻', avatarBg: '#ECFDF5' },
    { name: 'Marcus Reyes', dept: 'Emergency Unit', email: 'm.reyes@lifelink.com', role: 'DOCTOR', roleColor: '#2563EB', roleBg: '#DBEAFE', lastLogin: '3 hours ago', status: 'Active', avatar: '👨‍⚕️', avatarBg: '#EFF6FF' },
    { name: 'Priya Kapoor', dept: 'Blood Bank', email: 'p.kapoor@lifelink.com', role: 'LAB TECH', roleColor: '#7C3AED', roleBg: '#EDE9FE', lastLogin: '2 days ago', status: 'Inactive', avatar: '👩‍🔬', avatarBg: '#F5F3FF' },
  ];

  const roles = ['All Roles', 'DOCTOR', 'LOGISTICS', 'LAB TECH', 'ADMIN'];
  const statuses = ['All Status', 'Active', 'Inactive'];

  const filtered = allUsers.filter(u => {
    const matchSearch = !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'All Roles' || u.role === roleFilter;
    const matchStatus = statusFilter === 'All Status' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const navItems = [
    { to: '/admin/dashboard', icon: <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>, label: 'Dashboard' },
    { to: '/admin/usermanage', icon: <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>, label: 'User Management', active: true },
    { to: '/admin/hospitalmanage', icon: <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>, label: 'Hospital Management' },
    { to: '/admin/alerts', icon: <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>, label: 'Emergency Alerts' },
    { to: '/admin/reports', icon: <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>, label: 'Reports' },
    { to: '/admin/settings', icon: <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>, label: 'Settings' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .um-app {
          display: flex;
          min-height: 100vh;
          background: #F8FAFC;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ── SIDEBAR ── */
        .um-sidebar {
          width: 210px;
          background: white;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          z-index: 100;
        }

        .um-logo {
          padding: 18px 20px;
          border-bottom: 1px solid #F3F4F6;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .um-logo-icon {
          width: 36px; height: 36px;
          background: #2563EB;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
        }

        .um-logo-name {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.3px;
        }

        .um-nav {
          padding: 14px 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .um-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6B7280;
          text-decoration: none;
          transition: all 0.15s;
        }

        .um-nav-link:hover { background: #F3F4F6; color: #111827; }
        .um-nav-link.active { background: #EFF6FF; color: #2563EB; font-weight: 600; }

        .um-settings-link {
          margin: 0 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6B7280;
          text-decoration: none;
          transition: all 0.15s;
        }

        .um-settings-link:hover { background: #F3F4F6; color: #111827; }

        /* ── TOPBAR ── */
        .um-topbar {
          position: fixed;
          top: 0; left: 210px; right: 0;
          height: 58px;
          background: white;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 12px;
          z-index: 200;
        }

        .um-search-wrap {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .um-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          font-size: 14px;
        }

        .um-search-input {
          width: 100%;
          padding: 8px 14px 8px 34px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 13.5px;
          background: #F9FAFB;
          font-family: 'DM Sans', sans-serif;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }

        .um-search-input:focus { border-color: #2563EB; background: white; }
        .um-search-input::placeholder { color: #9CA3AF; }

        .um-topbar-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .um-notif-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 8px;
          background: white;
          border: 1px solid #E5E7EB;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px;
          transition: background 0.12s;
        }

        .um-notif-btn:hover { background: #F3F4F6; }

        .um-notif-dot {
          position: absolute;
          top: 6px; right: 6px;
          width: 8px; height: 8px;
          background: #EF4444;
          border: 2px solid white;
          border-radius: 50%;
        }

        .um-topbar-divider {
          width: 1px; height: 28px;
          background: #E5E7EB;
        }

        .um-user-block {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .um-user-info { text-align: right; }
        .um-user-name { font-size: 13px; font-weight: 700; color: #111827; }
        .um-user-role { font-size: 10.5px; color: #9CA3AF; font-weight: 500; }

        .um-user-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2px solid #E5E7EB;
          overflow: hidden;
          background: linear-gradient(135deg, #A7F3D0, #60A5FA);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }

        /* ── MAIN ── */
        .um-main {
          margin-left: 210px;
          margin-top: 58px;
          flex: 1;
          padding: 26px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── PAGE HEADER ── */
        .um-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .um-page-title {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.3px;
        }

        .um-page-sub {
          font-size: 13px;
          color: #9CA3AF;
          margin-top: 3px;
        }

        .um-add-btn {
          background: #2563EB;
          color: white;
          border: none;
          border-radius: 9px;
          padding: 10px 20px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: background 0.15s;
          box-shadow: 0 4px 12px rgba(37,99,235,0.2);
        }

        .um-add-btn:hover { background: #1D4ED8; }

        /* ── STATS ── */
        .um-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .um-stat-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          transition: box-shadow 0.15s;
          animation: umFadeUp 0.3s ease both;
        }

        .um-stat-card:nth-child(1) { animation-delay: 0.05s; }
        .um-stat-card:nth-child(2) { animation-delay: 0.10s; }
        .um-stat-card:nth-child(3) { animation-delay: 0.15s; }
        .um-stat-card:nth-child(4) { animation-delay: 0.20s; }

        @keyframes umFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .um-stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }

        .um-stat-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 8px;
        }

        .um-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
          line-height: 1;
          margin-bottom: 8px;
        }

        .um-stat-meta {
          font-size: 12px;
          font-weight: 600;
        }

        .um-stat-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: #F3F4F6;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        /* ── TABLE PANEL ── */
        .um-table-panel {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
        }

        .um-table-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 20px;
          border-bottom: 1px solid #F3F4F6;
        }

        .um-toolbar-search-wrap {
          position: relative;
          flex: 1;
        }

        .um-toolbar-search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 13px;
          color: #9CA3AF;
        }

        .um-toolbar-search {
          width: 100%;
          padding: 8px 12px 8px 30px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 13px;
          background: #F9FAFB;
          font-family: 'DM Sans', sans-serif;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }

        .um-toolbar-search:focus { border-color: #2563EB; background: white; }
        .um-toolbar-search::placeholder { color: #9CA3AF; }

        .um-filter-select {
          padding: 8px 32px 8px 12px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #374151;
          background: white;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239CA3AF' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: border-color 0.15s;
        }

        .um-filter-select:focus { border-color: #2563EB; }

        /* ── TABLE ── */
        .um-table { width: 100%; border-collapse: collapse; }

        .um-table th {
          text-align: left;
          padding: 10px 20px;
          font-size: 10.5px;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 700;
          border-bottom: 1px solid #F3F4F6;
          background: #FAFAFA;
        }

        .um-table tbody tr {
          transition: background 0.12s;
          cursor: pointer;
        }

        .um-table tbody tr:hover { background: #F9FAFB; }

        .um-table td {
          padding: 14px 20px;
          font-size: 13px;
          color: #374151;
          border-bottom: 1px solid #F9FAFB;
          vertical-align: middle;
        }

        .um-table tbody tr:last-child td { border-bottom: none; }

        .um-user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .um-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          border: 1.5px solid #E5E7EB;
        }

        .um-user-name-text {
          font-weight: 700;
          color: #111827;
          font-size: 13.5px;
        }

        .um-user-dept {
          font-size: 11.5px;
          color: #9CA3AF;
          margin-top: 1px;
        }

        .um-role-chip {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .um-status-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .um-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }

        .um-actions-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .um-action-btn {
          width: 30px; height: 30px;
          border-radius: 7px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 13px;
          color: #6B7280;
          transition: all 0.12s;
        }

        .um-action-btn:hover { border-color: #2563EB; color: #2563EB; background: #EFF6FF; }
        .um-action-btn.danger:hover { border-color: #EF4444; color: #EF4444; background: #FEE2E2; }

        /* ── PAGINATION ── */
        .um-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-top: 1px solid #F3F4F6;
        }

        .um-pagination-info {
          font-size: 12.5px;
          color: #9CA3AF;
        }

        .um-pagination-info strong { color: #111827; }

        .um-page-btns {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .um-page-btn {
          width: 32px; height: 32px;
          border-radius: 7px;
          border: 1px solid #E5E7EB;
          background: white;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.12s;
        }

        .um-page-btn:hover { background: #F3F4F6; }
        .um-page-btn.active { background: #2563EB; color: white; border-color: #2563EB; }
        .um-page-btn.ellipsis { border: none; background: none; cursor: default; color: #9CA3AF; }
        .um-page-btn.ellipsis:hover { background: none; }

        /* ── MODAL ── */
        .um-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: umFadeIn 0.15s ease;
        }

        @keyframes umFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .um-modal {
          background: white;
          border-radius: 14px;
          padding: 28px;
          width: 480px;
          max-width: 95vw;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: umSlideUp 0.2s ease;
        }

        @keyframes umSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .um-modal-title {
          font-size: 17px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 4px;
        }

        .um-modal-sub {
          font-size: 13px;
          color: #9CA3AF;
          margin-bottom: 22px;
        }

        .um-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .um-modal-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .um-modal-label {
          font-size: 11px;
          font-weight: 700;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .um-modal-input, .um-modal-select {
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

        .um-modal-input:focus, .um-modal-select:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }

        .um-modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .um-modal-cancel {
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

        .um-modal-cancel:hover { background: #F9FAFB; }

        .um-modal-submit {
          padding: 9px 20px;
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

        .um-modal-submit:hover { background: #1D4ED8; }

        @media (max-width: 1100px) {
          .um-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .um-sidebar { display: none; }
          .um-main { margin-left: 0; }
          .um-topbar { left: 0; }
          .um-stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="um-app">

        {/* ── SIDEBAR ── */}
        <aside className="um-sidebar">
          <div className="um-logo">
            <div className="um-logo-icon">💧</div>
            <div className="um-logo-name">LifeLink</div>
          </div>

          <nav className="um-nav">
            {navItems.slice(0, 5).map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className={`um-nav-link${item.active ? ' active' : ''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <Link to="/admin/settings" className="um-settings-link">
            {navItems[5].icon}
            Settings
          </Link>
        </aside>

        {/* ── TOPBAR ── */}
        <header className="um-topbar">
          <div className="um-search-wrap">
            <span className="um-search-icon">🔍</span>
            <input
              type="text"
              className="um-search-input"
              placeholder="Global search..."
            />
          </div>

          <div className="um-topbar-right">
            <button className="um-notif-btn">
              🔔
              <span className="um-notif-dot"></span>
            </button>
            <div className="um-topbar-divider"></div>
            <div className="um-user-block">
              <div className="um-user-info">
                <div className="um-user-name">Sarah Jenkins</div>
                <div className="um-user-role">System Administrator</div>
              </div>
              <div className="um-user-avatar">👩‍⚕️</div>
            </div>
          </div>
        </header>

        {/* ── MAIN ── */}
        <div className="um-main">

          {/* PAGE HEADER */}
          <div className="um-page-header">
            <div>
              <div className="um-page-title">User Management</div>
              <div className="um-page-sub">Configure user roles and system permissions</div>
            </div>
            <button className="um-add-btn" onClick={() => setShowAddModal(true)}>
              👥 Add New User
            </button>
          </div>

          {/* STAT CARDS */}
          <div className="um-stats-grid">
            {stats.map((s, i) => (
              <div className="um-stat-card" key={i}>
                <div>
                  <div className="um-stat-label">{s.label}</div>
                  <div className="um-stat-value">{s.value}</div>
                  <div className="um-stat-meta" style={{ color: s.metaColor }}>{s.meta}</div>
                </div>
                <div className="um-stat-icon">{s.icon}</div>
              </div>
            ))}
          </div>

          {/* TABLE PANEL */}
          <div className="um-table-panel">
            <div className="um-table-toolbar">
              <div className="um-toolbar-search-wrap">
                <span className="um-toolbar-search-icon">🔍</span>
                <input
                  type="text"
                  className="um-toolbar-search"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="um-filter-select"
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
              >
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
              <select
                className="um-filter-select"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <table className="um-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={i}>
                    <td>
                      <div className="um-user-cell">
                        <div className="um-avatar" style={{ background: user.avatarBg }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div className="um-user-name-text">{user.name}</div>
                          <div className="um-user-dept">{user.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#6B7280', fontSize: '12.5px' }}>{user.email}</td>
                    <td>
                      <span
                        className="um-role-chip"
                        style={{ background: user.roleBg, color: user.roleColor }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td style={{ color: '#6B7280' }}>{user.lastLogin}</td>
                    <td>
                      <div className="um-status-cell">
                        <div
                          className="um-status-dot"
                          style={{ background: user.status === 'Active' ? '#10B981' : '#D1D5DB' }}
                        />
                        <span style={{ color: user.status === 'Active' ? '#111827' : '#9CA3AF' }}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="um-actions-cell">
                        <button className="um-action-btn" title="Edit">✏️</button>
                        <button className="um-action-btn" title="Activity Log">🕐</button>
                        <button className="um-action-btn danger" title="Deactivate">🚫</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#9CA3AF', padding: '28px', fontSize: '13px' }}>
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="um-pagination">
              <div className="um-pagination-info">
                Showing <strong>1-10</strong> of <strong>1,284</strong> users
              </div>
              <div className="um-page-btns">
                <button className="um-page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>‹</button>
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    className={`um-page-btn${currentPage === p ? ' active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button className="um-page-btn ellipsis">...</button>
                <button className="um-page-btn" onClick={() => setCurrentPage(129)}>129</button>
                <button className="um-page-btn" onClick={() => setCurrentPage(p => Math.min(129, p + 1))}>›</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── ADD USER MODAL ── */}
        {showAddModal && (
          <div className="um-modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="um-modal" onClick={e => e.stopPropagation()}>
              <div className="um-modal-title">Add New User</div>
              <div className="um-modal-sub">Fill in the details to create a new staff account.</div>
              <div className="um-modal-grid">
                <div className="um-modal-group">
                  <label className="um-modal-label">First Name</label>
                  <input type="text" className="um-modal-input" placeholder="John" />
                </div>
                <div className="um-modal-group">
                  <label className="um-modal-label">Last Name</label>
                  <input type="text" className="um-modal-input" placeholder="Doe" />
                </div>
                <div className="um-modal-group">
                  <label className="um-modal-label">Email</label>
                  <input type="email" className="um-modal-input" placeholder="j.doe@lifelink.com" />
                </div>
                <div className="um-modal-group">
                  <label className="um-modal-label">Department</label>
                  <input type="text" className="um-modal-input" placeholder="e.g. Cardiology" />
                </div>
                <div className="um-modal-group">
                  <label className="um-modal-label">Role</label>
                  <select className="um-modal-select">
                    <option>DOCTOR</option>
                    <option>LOGISTICS</option>
                    <option>LAB TECH</option>
                    <option>ADMIN</option>
                  </select>
                </div>
                <div className="um-modal-group">
                  <label className="um-modal-label">Status</label>
                  <select className="um-modal-select">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="um-modal-actions">
                <button className="um-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="um-modal-submit" onClick={() => setShowAddModal(false)}>Create User</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default UserManagement;