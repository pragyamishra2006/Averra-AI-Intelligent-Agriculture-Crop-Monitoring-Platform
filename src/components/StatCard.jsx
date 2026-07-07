import React from "react";

export default function StatCard({ icon, label, value, sub, color = "#00c896", trend, small }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(7,21,32,0.9) 0%, rgba(5,15,24,0.9) 100%)",
      border: `1px solid ${color}25`,
      borderRadius: 10,
      padding: small ? "10px 12px" : "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60, transparent)`
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: small ? 16 : 20 }}>{icon}</span>
        {trend && (
          <span style={{
            fontSize: 9, fontWeight: 600,
            color: trend > 0 ? "#22c55e" : "#ef4444",
            background: trend > 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            padding: "2px 5px", borderRadius: 3
          }}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{
        fontFamily: "Orbitron",
        fontSize: small ? 18 : 22,
        fontWeight: 700,
        color,
        lineHeight: 1.1
      }}>{value}</div>
      <div style={{ fontSize: 10, color: "#7aa89a", fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 9, color: "#3d6058" }}>{sub}</div>}
    </div>
  );
}
