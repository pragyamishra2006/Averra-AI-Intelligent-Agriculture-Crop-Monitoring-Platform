import React from "react";
import { farmData } from "../data/mockData";
import StatCard from "./StatCard";

export default function Sidebar() {
  const layers = [
    { icon: "🛰️", label: "Sentinel-2 Optical", active: true },
    { icon: "📡", label: "Sentinel-1 SAR", active: true },
    { icon: "🌾", label: "Crop Classification", active: true },
    { icon: "💧", label: "Moisture Heatmap", active: false },
    { icon: "🌱", label: "Growth Stage", active: false },
    { icon: "📈", label: "NDVI Layer", active: false },
    { icon: "🌦️", label: "Weather Overlay", active: false },
  ];

  return (
    <div style={{
      width: 200, flexShrink: 0,
      background: "linear-gradient(180deg, #050f18 0%, #030a0f 100%)",
      borderRight: "1px solid rgba(0,200,150,0.15)",
      display: "flex", flexDirection: "column",
      padding: 12, gap: 14, overflowY: "auto"
    }}>
      <div>
        <div style={{ fontSize: 9, color: "#3d6058", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
          ACTIVE FARM
        </div>
        <div style={{
          background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)",
          borderRadius: 8, padding: 10
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#00c896" }}>{farmData.id}</div>
          <div style={{ fontSize: 9, color: "#7aa89a", marginTop: 2 }}>{farmData.location}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 9 }}>
            <span style={{ color: "#3d6058" }}>Area</span>
            <span style={{ color: "#e8f4f0" }}>{farmData.area}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 9 }}>
            <span style={{ color: "#3d6058" }}>Fields</span>
            <span style={{ color: "#e8f4f0" }}>{farmData.fields}</span>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 9, color: "#3d6058", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
          DATA LAYERS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {layers.map(l => (
            <label key={l.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 8px", borderRadius: 6,
              background: l.active ? "rgba(0,200,150,0.08)" : "transparent",
              cursor: "pointer", fontSize: 10.5
            }}>
              <input type="checkbox" defaultChecked={l.active} style={{ accentColor: "#00c896", width: 12, height: 12 }} />
              <span>{l.icon}</span>
              <span style={{ color: l.active ? "#e8f4f0" : "#7aa89a" }}>{l.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 9, color: "#3d6058", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
          ACCURACY
        </div>
        <StatCard icon="🎯" label="Model Accuracy" value={`${farmData.overallAccuracy}%`} color="#00c896" small />
      </div>

      <div style={{ marginTop: "auto" }}>
        <div style={{
          fontSize: 9, color: "#3d6058", textAlign: "center", lineHeight: 1.6,
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10
        }}>
          🚀 Stellar Spark<br />ISRO Hackathon 2026
        </div>
      </div>
    </div>
  );
}
