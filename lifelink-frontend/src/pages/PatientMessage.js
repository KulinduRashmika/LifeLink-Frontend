import React, { useState } from "react";
import "../style/PatientMessages.css";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Dr. James",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Please remember to stay hydrated before yo...",
      time: "10:42 AM",
      unread: true,
      online: true,
      verified: true,
    },
    {
      id: 2,
      name: "LifeLink Admin",
      avatar: null,
      icon: "✓",
      iconBg: "#2196F3",
      lastMessage: "Your donation appointment is confirmed for July 1...",
      time: "Yesterday",
      unread: false,
      online: false,
      verified: false,
    },
    {
      id: 3,
      name: "City Hospital",
      avatar: null,
      icon: "🏥",
      iconBg: "#00897B",
      lastMessage: "New lab results are available for review.",
      time: "Monday",
      unread: 2,
      online: false,
      verified: false,
    },
    {
      id: 4,
      name: "Nurse Lisa",
      avatar: "https://i.pravatar.cc/150?img=45",
      lastMessage: "Thank you for following up. We've received your...",
      time: "May 15",
      unread: false,
      online: false,
      verified: false,
    },
  ];

  const currentChat = conversations.find((c) => c.id === selectedChat);

  const messages = [
    {
      id: 1,
      sender: "Dr. James",
      text: "Hello Sarah, I've reviewed your latest blood panel. Everything looks excellent for the upcoming donation.",
      time: "9:15 AM",
      isOwn: false,
      date: "TUESDAY, JUNE 18",
    },
    {
      id: 2,
      sender: "Sarah Jenkins",
      text: "That's great news, Dr. James! Is there anything specific I should do in the 24 hours leading up to the appointment?",
      time: "9:32 AM",
      isOwn: true,
      status: "Read",
    },
    {
      id: 3,
      sender: "Dr. James",
      text: "Please follow the preparation checklist attached below. Mainly, remember to stay hydrated and have a healthy meal before you arrive.",
      time: "10:42 AM",
      isOwn: false,
      attachment: {
        name: "Pre-Donation-Checklist.pdf",
        size: "1.2 MB",
        type: "pdf",
      },
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleDownloadAttachment = (attachment) => {
    console.log("Downloading:", attachment.name);
  };

  return (
    <div className="messages-container">
      {/* Header */}
      <header className="messages-header">
        <div className="header-left">
          
            
        </div>

        <nav className="header-nav">
          <a href="/dashboard/patient" className="nav-link">
            <span>Dashboard</span>
          </a>
          <a href="/myrequests" className="nav-link">
            <span>My Requests</span>
          </a>
          <a href="/patient/medical-reports" className="nav-link">
            <span>Medical Reports</span>
          </a>
          <a href="#" className="nav-link">
            <span>Doctor Instructions</span>
          </a>
          <a href="/patient/emergency-request" className="nav-link emergency">
            <span>Emergency Request</span>
          </a>
        </nav>

        <div className="header-right">
          <div className="user-info-header">
            <div className="user-details-header">
              <span className="user-name-header">Sarah Jenkins</span>
              <span className="user-id-header">Patient ID: #LL-4920</span>
            </div>
            <div className="user-avatar-header">
              <img src="https://i.pravatar.cc/150?img=47" alt="Sarah Jenkins" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="main-content-messages">
        {/* Main Content */}
        <div className="messages-content">
          {/* Conversations List */}
          <aside className="conversations-sidebar">
            <div className="search-box-messages">
              <span className="search-icon-msg">🔍</span>
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-msg"
              />
            </div>

            <div className="conversations-list">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`conversation-item ${selectedChat === conv.id ? "active" : ""}`}
                  onClick={() => setSelectedChat(conv.id)}
                >
                  <div className="conv-avatar">
                    {conv.avatar ? (
                      <img src={conv.avatar} alt={conv.name} />
                    ) : (
                      <div
                        className="conv-icon"
                        style={{ backgroundColor: conv.iconBg }}
                      >
                        <span>{conv.icon}</span>
                      </div>
                    )}
                    {conv.online && <span className="online-indicator"></span>}
                  </div>
                  <div className="conv-content">
                    <div className="conv-header">
                      <span className="conv-name">{conv.name}</span>
                      <span className="conv-time">{conv.time}</span>
                    </div>
                    <div className="conv-preview">
                      <span className="conv-message">{conv.lastMessage}</span>
                      {conv.unread && typeof conv.unread === "number" && (
                        <span className="unread-badge">{conv.unread}</span>
                      )}
                      {conv.unread === true && (
                        <span className="unread-dot"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Chat Area */}
          <main className="chat-area">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-avatar">
                  {currentChat.avatar ? (
                    <img src={currentChat.avatar} alt={currentChat.name} />
                  ) : (
                    <div
                      className="chat-icon"
                      style={{ backgroundColor: currentChat.iconBg }}
                    >
                      <span>{currentChat.icon}</span>
                    </div>
                  )}
                  {currentChat.online && (
                    <span className="online-indicator-chat"></span>
                  )}
                </div>
                <div className="chat-user-details">
                  <div className="chat-user-name-row">
                    <span className="chat-user-name">{currentChat.name}</span>
                    {currentChat.verified && (
                      <span className="verified-badge">
                        <span className="verified-icon">✓</span>
                        <span className="verified-text">
                          MEDICAL PROFESSIONAL
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="chat-actions">
                <span className="hipaa-badge">
                  HIPAA COMPLIANT SECURE CHANNEL
                </span>
                <button className="chat-action-btn">
                  <span>ℹ️</span>
                </button>
                <button className="chat-action-btn">
                  <span>⋮</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-area">
              {messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                  {msg.date && (
                    <div className="message-date-divider">
                      <span>{msg.date}</span>
                    </div>
                  )}

                  <div className={`message ${msg.isOwn ? "own" : "other"}`}>
                    {!msg.isOwn && (
                      <div className="message-avatar">
                        <img src={currentChat.avatar} alt={currentChat.name} />
                      </div>
                    )}

                    <div className="message-content">
                      <div className="message-bubble">
                        <p className="message-text">{msg.text}</p>

                        {msg.attachment && (
                          <div className="message-attachment">
                            <div className="attachment-icon">
                              <span>📄</span>
                            </div>
                            <div className="attachment-info">
                              <span className="attachment-name">
                                {msg.attachment.name}
                              </span>
                              <span className="attachment-size">
                                {msg.attachment.size}
                              </span>
                            </div>
                            <button
                              className="attachment-download"
                              onClick={() =>
                                handleDownloadAttachment(msg.attachment)
                              }
                            >
                              <span>⬇️</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="message-meta">
                        <span className="message-time">{msg.time}</span>
                        {msg.isOwn && msg.status && (
                          <span className="message-status">
                            {" "}
                            • {msg.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <div className="new-messages-divider">
                <span>NEW MESSAGES</span>
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="message-input-area">
              <button type="button" className="input-action-btn">
                <span>➕</span>
              </button>
              <button type="button" className="input-action-btn">
                <span>📎</span>
              </button>
              <input
                type="text"
                placeholder="Type your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="message-input"
              />
              <button type="button" className="input-action-btn emoji-btn">
                <span>😊</span>
              </button>
              <button
                type="submit"
                className="send-btn"
                disabled={!messageText.trim()}
              >
                <span>➤</span>
              </button>
            </form>

            <div className="encryption-notice">
              YOUR CONNECTION IS ENCRYPTED AND HIPAA COMPLIANT
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;
