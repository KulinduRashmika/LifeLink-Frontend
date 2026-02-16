import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import DonorNavbar from './components/DonorNavbar';

// Public Pages
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import CriticalEmergencyrequest from './pages/CriticalEmergencyrequest';

// Registration Pages
import DonorRegistration from './pages/DonorRegistration';
import PatientRegistration from './pages/PatientRegistration';
import HospitalRegistration from './pages/HospitalRegistration';

// Donor Pages
import DonorDashboard from './pages/DonorDashboard';
import DonorEligibility from './pages/Donoreligibility';
import MyDonations from './pages/Mydonations';
import DonorMedicalReports from './pages/DonorMedicalReports';
import DonorSettings from './pages/DonorSettings';

// Patient Pages
import PatientDashboard from './pages/PatientDashboard';
import PatientMedicalreports from './pages/PatientMedicalreports';
import EmergencyRequest from './pages/Emergencyrequest';
import Myrequests from './pages/Myrequests';
import PatientMessage from './pages/PatientMessage';

//Admin
import AdminDashboard from './pages/Admindashboard';

import './App.css';


// Conditional Navbar Component
function ConditionalNavbar() {
  const location = useLocation();

  // Donor pages that use DonorNavbar
  const donorPages = [
    '/dashboard/donor',
    '/eligibility',
    '/donations',
    '/medical-reports',
    '/settings'
  ];

  // Pages that don't show any navbar
 const noNavbarPages = [
  '/login',
  '/critical-emergency'
];


  if (noNavbarPages.includes(location.pathname)) {
    return null;
  }

  if (donorPages.includes(location.pathname)) {
    return <DonorNavbar />;
  }

  // Default Navbar (for patient + public)
  return <Navbar />;
}

function AppContent() {
  return (
    <div className="App">
      <ConditionalNavbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/join" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/critical-emergency" element={<CriticalEmergencyrequest />} />

        {/* Registration Routes */}
        <Route path="/register/donor" element={<DonorRegistration />} />
        <Route path="/register/patient" element={<PatientRegistration />} />
        <Route path="/register/hospital" element={<HospitalRegistration />} />

        {/* ================= Donor Routes ================= */}
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/eligibility" element={<DonorEligibility />} />
        <Route path="/donations" element={<MyDonations />} />
        <Route path="/medical-reports" element={<DonorMedicalReports />} />
        <Route path="/settings" element={<DonorSettings />} />

        {/* ================= Patient Routes ================= */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/patient/medical-reports" element={<PatientMedicalreports />} />
        <Route path="/patient/emergency-request" element={<EmergencyRequest />} />
        <Route path="/myrequests" element={<Myrequests />} />
        <Route path="/patient/messages" element={<PatientMessage />} />

        {/* ================= Admin Routes ================= */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
