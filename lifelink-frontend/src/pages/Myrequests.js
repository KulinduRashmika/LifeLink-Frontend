import React, { useState } from 'react';
import '../style/MyRequests.css';

const MyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({
    type: '',
    organType: '',
    bloodType: '',
    units: '',
    urgency: '',
    hospital: '',
    notes: ''
  });

  const requests = [
    {
      id: '#REQ-8821',
      type: 'O Negative Blood',
      typeIcon: 'O-',
      units: '2 Units',
      hospital: "St. Mary's Central",
      badge: 'O-',
      badgeColor: 'red',
      tracking: [
        {
          title: 'Request Created',
          date: 'Oct 24, 2023 - 09:15 AM',
          description: 'Initial request submitted for O- Negative Blood (2 Units).',
          completed: true
        },
        {
          title: 'Medical Verification',
          date: 'Oct 24, 2023 - 11:30 AM',
          description: 'Dr. Sarah Connor verified the medical necessity.',
          completed: true
        },
        {
          title: 'Donor Matching',
          date: 'In Progress...',
          description: 'Scanning regional blood bank reserves for compatible matches.',
          completed: false,
          inProgress: true
        },
        {
          title: 'Delivery & Transfusion',
          date: 'Pending',
          description: '',
          completed: false,
          inProgress: false
        }
      ],
      hospitalInfo: {
        name: "St. Mary's Central Hospital",
        address: '122 Medical Plaza, Ste 400',
        contact: '(555) 982-1100'
      }
    },
    {
      id: '#REQ-8790',
      type: 'Kidney (Left)',
      typeIcon: 'O',
      units: '1 Unit',
      hospital: 'General Medical City',
      badge: 'O',
      badgeColor: 'blue',
      tracking: [
        {
          title: 'Request Created',
          date: 'Oct 20, 2023 - 10:00 AM',
          description: 'Initial request submitted for Kidney (Left).',
          completed: true
        },
        {
          title: 'Medical Verification',
          date: 'Oct 20, 2023 - 02:15 PM',
          description: 'Medical team verified the transplant requirements.',
          completed: true
        },
        {
          title: 'Donor Matching',
          date: 'Oct 21, 2023 - 09:00 AM',
          description: 'Compatible donor identified and contacted.',
          completed: true
        },
        {
          title: 'Delivery & Transfusion',
          date: 'Scheduled for Oct 28, 2023',
          description: 'Surgery scheduled.',
          completed: false,
          inProgress: true
        }
      ],
      hospitalInfo: {
        name: 'General Medical City',
        address: '456 Health Boulevard',
        contact: '(555) 123-4567'
      }
    },
    {
      id: '#REQ-8512',
      type: 'AB Positive Blood',
      typeIcon: 'AB+',
      units: '3 Units',
      hospital: 'East Valley Hospital',
      badge: 'AB+',
      badgeColor: 'orange',
      tracking: [
        {
          title: 'Request Created',
          date: 'Oct 18, 2023 - 08:30 AM',
          description: 'Initial request submitted for AB+ Blood (3 Units).',
          completed: true
        },
        {
          title: 'Medical Verification',
          date: 'Oct 18, 2023 - 10:45 AM',
          description: 'Verified by Dr. Michael Chen.',
          completed: true
        },
        {
          title: 'Donor Matching',
          date: 'Oct 18, 2023 - 03:20 PM',
          description: 'Blood units secured from regional bank.',
          completed: true
        },
        {
          title: 'Delivery & Transfusion',
          date: 'Oct 19, 2023 - 11:00 AM',
          description: 'Transfusion completed successfully.',
          completed: true
        }
      ],
      hospitalInfo: {
        name: 'East Valley Hospital',
        address: '789 Wellness Drive',
        contact: '(555) 987-6543'
      }
    },
    {
      id: '#REQ-8445',
      type: 'A Negative Blood',
      typeIcon: 'A-',
      units: '1 Unit',
      hospital: 'Memorial Health',
      badge: 'A-',
      badgeColor: 'red-light',
      tracking: [
        {
          title: 'Request Created',
          date: 'Oct 15, 2023 - 02:00 PM',
          description: 'Initial request submitted for A- Blood (1 Unit).',
          completed: true
        },
        {
          title: 'Medical Verification',
          date: 'Oct 15, 2023 - 03:30 PM',
          description: 'Medical necessity confirmed.',
          completed: true
        },
        {
          title: 'Donor Matching',
          date: 'Oct 16, 2023 - 09:15 AM',
          description: 'Compatible blood unit located.',
          completed: true
        },
        {
          title: 'Delivery & Transfusion',
          date: 'Oct 16, 2023 - 02:00 PM',
          description: 'Delivered and administered.',
          completed: true
        }
      ],
      hospitalInfo: {
        name: 'Memorial Health',
        address: '321 Care Street',
        contact: '(555) 456-7890'
      }
    }
  ];

  const filteredRequests = requests.filter(request =>
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetail = () => {
    setSelectedRequest(null);
  };

  const handleOpenNewRequest = () => {
    setShowNewRequestModal(true);
  };

  const handleCloseNewRequest = () => {
    setShowNewRequestModal(false);
    setNewRequestForm({
      type: '',
      organType: '',
      bloodType: '',
      units: '',
      urgency: '',
      hospital: '',
      notes: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewRequestForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('New Request:', newRequestForm);
    // Close modal after submission
    handleCloseNewRequest();
    // You can add the new request to the requests array or send to backend
  };

  const activeRequests = requests.filter(r => 
    r.tracking.some(t => t.inProgress)
  ).length;

  const completedRequests = requests.filter(r => 
    r.tracking.every(t => t.completed)
  ).length;

  return (
    <div className="my-requests-container">
      {/* Sidebar */}
      <aside className="sidebar">
      

        <nav className="nav">
          <a href="/dashboard/patient" className="nav-item">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a href="/myrequests" className="nav-item active">
            <span className="nav-icon">📄</span>
            <span>My Requests</span>
          </a>
          <a href="/patient/medical-reports" className="nav-item">
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
      <main className="main-content-requests">
        <div className="requests-header">
          <div>
            <h1 className="page-title">My Requests</h1>
            <p className="page-subtitle">Track and manage your medical donation requests in real-time.</p>
          </div>
          <button className="btn-new-request" onClick={handleOpenNewRequest}>
            <span className="plus-icon">+</span>
            New Request
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card-large blue">
            <div className="stat-card-content">
              <div className="stat-label">Total Requests</div>
              <div className="stat-value-large">{requests.length}</div>
            </div>
            <div className="stat-icon-large">
              <span>📋</span>
            </div>
          </div>

          <div className="stat-card-large white">
            <div className="stat-card-content">
              <div className="stat-label">Active Requests</div>
              <div className="stat-value-large blue-text">{activeRequests}</div>
            </div>
            <div className="stat-icon-large">
              <span>📝</span>
            </div>
          </div>

          <div className="stat-card-large white">
            <div className="stat-card-content">
              <div className="stat-label">Completed</div>
              <div className="stat-value-large green-text">{completedRequests}</div>
            </div>
            <div className="stat-icon-large">
              <span>✓</span>
            </div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="requests-section">
          <div className="find-center">
            <label className="find-label">Find Center:</label>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by ID, hospital or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>REQUEST ID</th>
                  <th>TYPE</th>
                  <th>UNITS</th>
                  <th>HOSPITAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    onClick={() => handleRequestClick(request)}
                    className={selectedRequest?.id === request.id ? 'selected' : ''}
                  >
                    <td className="request-id">{request.id}</td>
                    <td>
                      <div className="type-cell">
                        <span className={`type-badge ${request.badgeColor}`}>
                          {request.typeIcon}
                        </span>
                        <span>{request.type}</span>
                      </div>
                    </td>
                    <td>{request.units}</td>
                    <td>{request.hospital}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer">
              Showing 1 to {filteredRequests.length} of {requests.length} requests
            </div>
          </div>
        </div>
      </main>

      {/* Request Detail Sidebar */}
      {selectedRequest && (
        <aside className="request-detail-sidebar">
          <div className="detail-header">
            <div>
              <h2 className="detail-title">Request Detail</h2>
              <p className="detail-id">{selectedRequest.id}</p>
            </div>
            <button className="close-btn" onClick={handleCloseDetail}>
              ✕
            </button>
          </div>

          <div className="detail-content">
            <h3 className="section-heading">TRACKING TIMELINE</h3>
            
            <div className="tracking-timeline">
              {selectedRequest.tracking.map((step, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker-wrapper">
                    <div className={`timeline-marker ${step.completed ? 'completed' : ''} ${step.inProgress ? 'in-progress' : ''}`}>
                      {step.completed && '✓'}
                    </div>
                    {index < selectedRequest.tracking.length - 1 && (
                      <div className={`timeline-connector ${step.completed ? 'completed' : ''}`} />
                    )}
                  </div>
                  <div className="timeline-content">
                    <h4 className={`timeline-title ${step.inProgress ? 'in-progress-text' : ''}`}>
                      {step.title}
                    </h4>
                    <p className="timeline-date">{step.date}</p>
                    {step.description && (
                      <p className="timeline-description">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="hospital-location-section">
              <h3 className="section-heading">HOSPITAL LOCATION</h3>
              <div className="hospital-info-card">
                <div className="hospital-icon">
                  <span>🏥</span>
                </div>
                <div className="hospital-details">
                  <h4 className="hospital-name">{selectedRequest.hospitalInfo.name}</h4>
                  <p className="hospital-address">{selectedRequest.hospitalInfo.address}</p>
                  <p className="hospital-contact">Contact: {selectedRequest.hospitalInfo.contact}</p>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary">Update Request Info</button>
              <button className="btn-danger">Cancel Request</button>
            </div>
          </div>
        </aside>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="modal-overlay" onClick={handleCloseNewRequest}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Create New Request</h2>
                <p className="modal-subtitle">Fill in the details for your medical donation request</p>
              </div>
              <button className="close-btn" onClick={handleCloseNewRequest}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="request-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Request Type *</label>
                  <select
                    name="type"
                    value={newRequestForm.type}
                    onChange={handleFormChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select request type</option>
                    <option value="blood">Blood Donation</option>
                    <option value="organ">Organ Transplant</option>
                    <option value="tissue">Tissue Donation</option>
                    <option value="plasma">Plasma Donation</option>
                  </select>
                </div>

                {/* ✅ CONDITIONAL ORGAN SELECTOR */}
                {newRequestForm.type === "organ" && (
                  <div className="form-group">
                    <label className="form-label">Select Organ *</label>
                    <select
                      name="organType"
                      value={newRequestForm.organType}
                      onChange={handleFormChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select organ</option>
                      <option value="kidney">Kidney</option>
                      <option value="liver">Liver</option>
                      <option value="heart">Heart</option>
                      <option value="lung">Lung</option>
                      <option value="pancreas">Pancreas</option>
                      <option value="intestine">Intestine</option>
                      <option value="cornea">Cornea</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Blood Type *</label>
                  <select
                    name="bloodType"
                    value={newRequestForm.bloodType}
                    onChange={handleFormChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Units Required *</label>
                  <input
                    type="number"
                    name="units"
                    value={newRequestForm.units}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="Enter number of units"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Urgency Level *</label>
                  <select
                    name="urgency"
                    value={newRequestForm.urgency}
                    onChange={handleFormChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select urgency level</option>
                    <option value="critical">Critical - Immediate</option>
                    <option value="high">High - Within 24 hours</option>
                    <option value="medium">Medium - Within 48 hours</option>
                    <option value="low">Low - Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hospital/Medical Center *</label>
                <select
                  name="hospital"
                  value={newRequestForm.hospital}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                >
                  <option value="">Select hospital</option>
                  <option value="st-marys">St. Mary's Central Hospital</option>
                  <option value="general-medical">General Medical City</option>
                  <option value="east-valley">East Valley Hospital</option>
                  <option value="memorial">Memorial Health</option>
                  <option value="city-general">City General Hospital</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea
                  name="notes"
                  value={newRequestForm.notes}
                  onChange={handleFormChange}
                  className="form-textarea"
                  placeholder="Enter any additional information or special requirements..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseNewRequest}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;