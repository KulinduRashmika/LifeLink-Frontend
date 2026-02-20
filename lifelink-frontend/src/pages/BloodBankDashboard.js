import { useState } from "react";

const statusColor = {
  PROCESSING: { bg: "#FFF4E5", text: "#D97706", dot: "#F59E0B" },
  DISPATCHED: { bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
  CRITICAL: { bg: "#FEF2F2", text: "#991B1B", dot: "#EF4444" },
  PENDING: { bg: "#FFFBEB", text: "#92400E", dot: "#F59E0B" },
  ACTIVE: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
};

const bloodTypes = [
  { type: "O−", units: 12, level: "CRITICAL SUPPLY", color: "#EF4444", bar: 4, note: "1 bag expires < 24h" },
  { type: "A+", units: 342, level: "SAFE LEVEL", color: "#10B981", bar: 86, note: "Stable supply" },
  { type: "B+", units: 45, level: "LOW SUPPLY", color: "#F59E0B", bar: 28, note: "Order recommended" },
  { type: "AB+", units: 156, level: "SAFE LEVEL", color: "#10B981", bar: 72, note: "Stable supply" },
];

const matches = [
  { id: "#LL-902", name: "John Doe", patientId: "88293", type: "O−", typeColor: "#EF4444", hospital: "Central General", status: "PROCESSING" },
  { id: "#LL-899", name: "Sarah Williams", patientId: "12044", type: "B+", typeColor: "#F59E0B", hospital: "St. Jude's Children", status: "DISPATCHED" },
  { id: "#LL-897", name: "Robert Chen", patientId: "90211", type: "A+", typeColor: "#3B82F6", hospital: "North Medical Center", status: "DISPATCHED" },
];

const activities = [
  { icon: "●", color: "#3B82F6", title: "New Donation Received", desc: "O+ donation received from City Clinic (Batch #BC-441)", time: "JUST NOW" },
  { icon: "✓", color: "#10B981", title: "Dispatch Successful", desc: "Match #LL-899 delivered to St. Jude's Medical Hospital", time: "45 MINUTES AGO" },
  { icon: "▲", color: "#EF4444", title: "Emergency Request Created", desc: "Priority 1 request for O− negative units for North Trauma Center", time: "2 HOURS AGO" },
  { icon: "◆", color: "#6366F1", title: "Testing Completed", desc: "24 units of A+ passed screening and moved to inventory", time: "5 HOURS AGO" },
];

const navItems = [
  { icon: "⊞", label: "Dashboard", active: true },
  { icon: "☰", label: "Inventory", active: false },
  { icon: "⬡", label: "Dispatch", active: false },
  { icon: "▦", label: "Reports", active: false },
  { icon: "⚙", label: "Settings", active: false },
];

export default function LifeLinkDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Trebuchet MS', sans-serif",
      background: "#F1F5F9",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        .nav-item:hover { background: rgba(59,130,246,0.08) !important; }
        .match-row:hover { background: #F8FAFC !important; }
        .btn-primary:hover { background: #1D4ED8 !important; }
        .btn-outline:hover { background: #F1F5F9 !important; }
        .action-btn:hover { color: #3B82F6 !important; }
        .stat-card { transition: transform 0.15s, box-shadow 0.15s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
        .blood-card { transition: transform 0.15s, box-shadow 0.15s; }
        .blood-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.09) !important; }
        .progress-bar { transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .pulse { animation: pulse 2s infinite; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        .fade-in { animation: fadeIn 0.4s ease both; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Top Nav */}
      <header style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 16, fontWeight: 700,
          }}>⬡</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#0F172A", letterSpacing: "-0.3px" }}>
            LifeLink Blood Bank Panel
          </span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn-primary" style={{
            background: "#2563EB", color: "#fff", border: "none",
            borderRadius: 8, padding: "7px 18px", fontWeight: 600,
            fontSize: 13, cursor: "pointer", transition: "background 0.15s",
            fontFamily: "inherit",
          }}>Logout</button>
          <button className="btn-outline" style={{
            background: "#fff", color: "#374151", border: "1.5px solid #E2E8F0",
            borderRadius: 8, padding: "6px 16px", fontWeight: 600,
            fontSize: 13, cursor: "pointer", transition: "background 0.15s",
            fontFamily: "inherit",
          }}>Profile</button>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#F1F5F9", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#94A3B8", fontSize: 18, cursor: "pointer",
          }}>👤</div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: 200,
          background: "#FFFFFF",
          borderRight: "1px solid #E2E8F0",
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "calc(100vh - 56px)",
          position: "sticky",
          top: 56,
          height: "calc(100vh - 56px)",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map(item => (
              <button
                key={item.label}
                className="nav-item"
                onClick={() => setActiveNav(item.label)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 8, border: "none",
                  background: activeNav === item.label ? "#EFF6FF" : "transparent",
                  color: activeNav === item.label ? "#2563EB" : "#64748B",
                  fontWeight: activeNav === item.label ? 600 : 500,
                  fontSize: 14, cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s, color 0.15s",
                  fontFamily: "inherit",
                  borderLeft: activeNav === item.label ? "3px solid #2563EB" : "3px solid transparent",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", marginBottom: 6 }}>
              SYSTEM HEALTH
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#374151", fontWeight: 500 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block" }} className="pulse"></span>
              Cloud Synced
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "28px 28px 40px", overflow: "auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px", marginBottom: 4 }}>
              Blood Bank Inventory & Management
            </h1>
            <p style={{ color: "#64748B", fontSize: 14 }}>
              Real-time monitoring of global blood supply and critical emergency matching.
            </p>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
            {[
              {
                label: "Total Units in Stock", value: "1,240", sub: "A+, B+, O−, AB+ & more",
                badge: "+2.4%", badgeColor: "#10B981", badgeBg: "#ECFDF5",
                icon: "🩸", iconBg: "#EFF6FF",
              },
              {
                label: "Pending Tests", value: "45", sub: "New bags awaiting screening",
                badge: "Pending", badgeColor: "#D97706", badgeBg: "#FFFBEB",
                icon: "🧪", iconBg: "#FFFBEB",
              },
              {
                label: "Active Matches", value: "12", sub: "Dispatched to hospitals",
                badge: "Active", badgeColor: "#2563EB", badgeBg: "#EFF6FF",
                icon: "📡", iconBg: "#EFF6FF",
              },
              {
                label: "Emergency Requests", value: "3", sub: "Immediate action required",
                badge: "Priority", badgeColor: "#DC2626", badgeBg: "#FEF2F2",
                icon: "🚨", iconBg: "#FEF2F2", valueColor: "#DC2626",
              },
            ].map((card, i) => (
              <div key={i} className="stat-card fade-in" style={{
                background: "#FFFFFF", borderRadius: 14, padding: "20px 20px 18px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)", cursor: "default",
                animationDelay: `${i * 0.07}s`,
                border: i === 3 ? "1.5px solid #FEE2E2" : "1px solid #F1F5F9",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: card.iconBg, display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{card.icon}</div>
                  <span style={{
                    background: card.badgeBg, color: card.badgeColor,
                    borderRadius: 6, padding: "3px 9px", fontSize: 11.5, fontWeight: 700,
                  }}>{card.badge}</span>
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500, marginBottom: 4 }}>{card.label}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: card.valueColor || "#0F172A", lineHeight: 1, marginBottom: 4 }}>
                  {card.value}
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
            {/* Left Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Blood Inventory Grid */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Blood Inventory Grid</h2>
                  <button style={{
                    background: "none", border: "none", color: "#2563EB",
                    fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                  }}>View All Types →</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                  {bloodTypes.map((bt, i) => (
                    <div key={i} className="blood-card" style={{
                      border: bt.level === "CRITICAL SUPPLY" ? "1.5px solid #FCA5A5" : "1.5px solid #E2E8F0",
                      borderRadius: 12, padding: "16px 14px",
                      background: bt.level === "CRITICAL SUPPLY" ? "#FFF8F8" : "#FAFCFF",
                      position: "relative",
                    }}>
                      {bt.level === "CRITICAL SUPPLY" && (
                        <div className="pulse" style={{
                          position: "absolute", top: 10, right: 10,
                          width: 8, height: 8, borderRadius: "50%", background: "#EF4444",
                        }} />
                      )}
                      <div style={{ fontSize: 22, fontWeight: 800, color: bt.color, marginBottom: 4, letterSpacing: "-0.5px" }}>
                        {bt.type}
                      </div>
                      <div style={{ fontSize: 13, color: "#374151", marginBottom: 10 }}>
                        <span style={{ fontWeight: 700, fontSize: 18, color: "#0F172A" }}>{bt.units}</span>
                        <span style={{ color: "#94A3B8", fontWeight: 400 }}> units</span>
                      </div>
                      {/* Progress Bar */}
                      <div style={{ height: 5, background: "#F1F5F9", borderRadius: 99, marginBottom: 8, overflow: "hidden" }}>
                        <div className="progress-bar" style={{
                          width: `${bt.bar}%`, height: "100%",
                          background: bt.color, borderRadius: 99,
                        }} />
                      </div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: bt.color, letterSpacing: "0.04em" }}>{bt.level}</div>
                      <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 2 }}>{bt.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matches & Dispatch */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Incoming Matches & Dispatch</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["⇅", "🔍"].map((icon, i) => (
                      <button key={i} style={{
                        width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E2E8F0",
                        background: "#FAFAFA", cursor: "pointer", fontSize: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{icon}</button>
                    ))}
                  </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                      {["MATCH ID", "DONOR / PATIENT", "TYPE", "RECIPIENT HOSPITAL", "STATUS", "ACTION"].map(h => (
                        <th key={h} style={{
                          fontSize: 11, fontWeight: 700, color: "#94A3B8",
                          padding: "8px 12px", textAlign: "left", letterSpacing: "0.06em",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((m, i) => (
                      <tr key={i} className="match-row" style={{
                        borderBottom: i < matches.length - 1 ? "1px solid #F8FAFC" : "none",
                        transition: "background 0.12s",
                      }}>
                        <td style={{ padding: "14px 12px", fontSize: 13, fontWeight: 700, color: "#2563EB", fontFamily: "'DM Mono', monospace" }}>{m.id}</td>
                        <td style={{ padding: "14px 12px" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{m.name}</div>
                          <div style={{ fontSize: 11.5, color: "#94A3B8" }}>Patient ID: {m.patientId}</div>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: 34, height: 24, borderRadius: 6, border: `1.5px solid ${m.typeColor}20`,
                            background: `${m.typeColor}12`, color: m.typeColor,
                            fontSize: 12, fontWeight: 800,
                          }}>{m.type}</span>
                        </td>
                        <td style={{ padding: "14px 12px", fontSize: 13, color: "#374151" }}>{m.hospital}</td>
                        <td style={{ padding: "14px 12px" }}>
                          <span style={{
                            background: statusColor[m.status].bg,
                            color: statusColor[m.status].text,
                            borderRadius: 6, padding: "3px 9px",
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                            display: "inline-flex", alignItems: "center", gap: 5,
                          }}>
                            <span style={{
                              width: 6, height: 6, borderRadius: "50%",
                              background: statusColor[m.status].dot, display: "inline-block",
                            }} />
                            {m.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <button className="action-btn" style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#94A3B8", fontSize: 16, transition: "color 0.15s",
                          }}>✏️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Recent Activity */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>Recent Activity</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {activities.map((act, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 12, paddingBottom: 14,
                      borderBottom: i < activities.length - 1 ? "1px solid #F1F5F9" : "none",
                      paddingTop: i > 0 ? 14 : 0,
                    }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: 8,
                        background: `${act.color}15`, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        color: act.color, fontSize: 11, flexShrink: 0, marginTop: 1,
                      }}>{act.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 2 }}>{act.title}</div>
                        <div style={{ fontSize: 11.5, color: "#64748B", lineHeight: 1.4, marginBottom: 4 }}>{act.desc}</div>
                        <div style={{ fontSize: 10.5, color: "#94A3B8", fontWeight: 600, letterSpacing: "0.04em" }}>{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{
                  width: "100%", marginTop: 14, padding: "9px 0",
                  background: "none", border: "1.5px solid #E2E8F0",
                  borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#64748B",
                  cursor: "pointer", transition: "background 0.15s", fontFamily: "inherit",
                }}>View All Activities</button>
              </div>

              {/* Need Help */}
              <div style={{
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                borderRadius: 14, padding: 22, color: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Need Help?</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 18, lineHeight: 1.5 }}>
                  Contact the central medical coordinating office for emergency overrides.
                </p>
                <button style={{
                  width: "100%", padding: "11px 0",
                  background: "#FFFFFF", color: "#1D4ED8",
                  border: "none", borderRadius: 10, fontSize: 13.5,
                  fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "opacity 0.15s",
                }}>
                  📞 Call Support
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}