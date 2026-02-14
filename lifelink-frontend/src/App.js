import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import DonorRegistration from './pages/DonorRegistration';
import PatientRegistration from './pages/PatientRegistration';
import HospitalRegistration from './pages/HospitalRegistration';
import PatientDashboard from './pages/PatientDashboard';
import Myrequests from './pages/Myrequests'; 
import PatientMedicalreports from './pages/PatientMedicalreports';   
import EmergencyRequest from './pages/Emergencyrequest';  
import PatientMessage from './pages/PatientMessage';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/join" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/donor" element={<DonorRegistration />} />
          <Route path="/register/patient" element={<PatientRegistration />} />
          <Route path="/register/hospital" element={<HospitalRegistration />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/patient/medical-reports" element={<PatientMedicalreports />} />
          <Route path="/patient/emergency-request" element={<EmergencyRequest />} />
          <Route path="/myrequests" element={<Myrequests />} />
          <Route path="/patient/messages" element={<PatientMessage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;