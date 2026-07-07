import React, { useState, useEffect } from "react";
import { Bell, Settings, User, Wifi } from "lucide-react";
import { farmData, alerts } from "../data/mockData";

export default function TopBar({ activeTab, setActiveTab }) {
  const [time, setTime] = useState(new Date());
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const unread = alerts.filter(a => a.type === "severe" || a.type === "high").length;

  return (
    <header style={{
      background: "linear-gradient(90deg, #030a0f 0%, #050f18 50%, #030a0f 100%)",
      borderBottom: "1px solid rgba(0,200,150,0.2)",
      height: 56,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: 12,
      position: "relative",
      zIndex: 100,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 200 }}>
        <img src="/logo.png" alt="TerraMind AI logo" style={{
          width: 48, height: 48, borderRadius: "50%",
          objectFit: "cover", flexShrink: 0,
          border: "2px solid #ff6a00"
        }} />
        <div>
          <div style={{ fontFamily: "Orbitron", fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            TERRA<span style={{ color: "#ff6a00" }}>MIND</span>
          </div>
          <div style={{ fontFamily: "Orbitron", fontSize: 8, color: "#00c896", letterSpacing: "0.15em" }}>
            TERRAMIND AI
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <nav style={{ display: "flex", gap: 2, flex: 1, justifyContent: "center" }}>
        {[
          { id: "dashboard", label: "🛰️ Dashboard" },
          { id: "map", label: "🗺️ Field Map" },
          { id: "analysis", label: "🌾 AI Analysis" },
          { id: "irrigation", label: "💧 Irrigation" },
          { id: "reports", label: "📄 Reports" },
          { id: "government", label: "🏛️ Gov View" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: activeTab === tab.id ? "rgba(0,200,150,0.15)" : "transparent",
            border: activeTab === tab.id ? "1px solid rgba(0,200,150,0.4)" : "1px solid transparent",
            borderRadius: 6,
            color: activeTab === tab.id ? "#00c896" : "#7aa89a",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 500,
            padding: "5px 12px",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 260, justifyContent: "flex-end" }}>
        {/* Live indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c896", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#00c896" }}>
            {time.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · {time.toLocaleTimeString()}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#7aa89a" }}>
          <Wifi size={13} />
          <span style={{ fontSize: 10, fontFamily: "JetBrains Mono" }}>SAT LINK</span>
        </div>

        {/* Farm info */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#00c896", fontWeight: 600 }}>{farmData.id}</div>
          <div style={{ fontSize: 9, color: "#7aa89a" }}>{farmData.location}</div>
        </div>

        {/* Alert bell */}
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setShowAlerts(!showAlerts)}>
          <Bell size={16} color="#7aa89a" />
          {unread > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4,
              background: "#ef4444", borderRadius: "50%",
              width: 14, height: 14, fontSize: 9,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700
            }}>{unread}</div>
          )}
        </div>

        <Settings size={16} color="#7aa89a" style={{ cursor: "pointer" }} />

        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, #00c896, #1a7eff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer"
        }}>
          <User size={13} color="#fff" />
        </div>
      </div>

      {/* Alerts dropdown */}
      {showAlerts && (
        <div style={{
          position: "absolute", top: 58, right: 16,
          width: 320, background: "#050f18",
          border: "1px solid rgba(0,200,150,0.25)",
          borderRadius: 10, zIndex: 999, overflow: "hidden"
        }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(0,200,150,0.1)", fontSize: 11, fontWeight: 600, color: "#00c896" }}>
            🔔 Active Alerts ({alerts.length})
          </div>
          {alerts.map(a => (
            <div key={a.id} style={{
              padding: "8px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex", gap: 8, alignItems: "flex-start"
            }}>
              <span style={{ fontSize: 13 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "#e8f4f0" }}>{a.message}</div>
                <div style={{ fontSize: 9, color: "#7aa89a", marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </header>
  );
}