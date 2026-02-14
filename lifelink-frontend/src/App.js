import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import DonorNavbar from './components/DonorNavbar';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import DonorRegistration from './pages/DonorRegistration';
import PatientRegistration from './pages/PatientRegistration';
import HospitalRegistration from './pages/HospitalRegistration';
import DonorDashboard from './pages/DonorDashboard';
import DonorEligibility from './pages/Donoreligibility';
import MyDonations from './pages/Mydonations';
import DonorMedicalReports from './pages/DonorMedicalReports';
import DonorSettings from './pages/DonorSettings';
import Login from './pages/Login';
import './App.css';

// Component to conditionally render navbar
function ConditionalNavbar() {
  const location = useLocation();
  
  // Donor pages that use DonorNavbar
  const donorPages = ['/dashboard/donor', '/eligibility', '/donations', '/medical-reports'];
  
  // Pages that don't show any navbar
  const noNavbarPages = ['/login'];
  
  if (noNavbarPages.includes(location.pathname)) {
    return null;
  }
  
  if (donorPages.includes(location.pathname)) {
    return <DonorNavbar />;
  }
  
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
        
        {/* Registration Routes */}
        <Route path="/register/donor" element={<DonorRegistration />} />
        <Route path="/register/patient" element={<PatientRegistration />} />
        <Route path="/register/hospital" element={<HospitalRegistration />} />
        
        {/* Donor Dashboard Routes */}
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/eligibility" element={<DonorEligibility />} />
        <Route path="/donations" element={<MyDonations />} />
        <Route path="/medical-reports" element={<DonorMedicalReports />} />
        <Route path="/settings" element={<DonorSettings />} />
        {/* Add more donor routes as needed */}
        {/* <Route path="/donations" element={<DonorDonations />} /> */}
        {/* <Route path="/medical-reports" element={<DonorMedicalReports />} /> */}
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