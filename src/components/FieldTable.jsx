import React, { useState } from "react";
import { fields, stressColors, stageColors } from "../data/mockData";

const STAGE_ORDER = ["Germination", "Vegetative", "Flowering", "Reproductive", "Maturity", "Harvest Ready"];

export default function FieldTable({ onSelectField }) {
  const [sort, setSort] = useState("id");

  const sorted = [...fields].sort((a, b) => {
    if (sort === "stress") {
      const order = ["Severe", "High", "Moderate", "Low", "No Stress"];
      return order.indexOf(a.stress) - order.indexOf(b.stress);
    }
    if (sort === "stage") return STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage);
    if (sort === "moisture") return a.moisture - b.moisture;
    return a.id - b.id;
  });

  const stressIcon = (s) => {
    if (s === "Severe") return "🔴";
    if (s === "High") return "🟠";
    if (s === "Moderate") return "🟡";
    if (s === "Low") return "🟢";
    return "✅";
  };

  const MoistureBar = ({ value }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: "#0d2030", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${value}%`,
          background: value < 30 ? "#ef4444" : value < 50 ? "#f97316" : value < 65 ? "#eab308" : "#22c55e",
          borderRadius: 3, transition: "width 0.3s"
        }} />
      </div>
      <span style={{ fontSize: 10, fontFamily: "JetBrains Mono", color: "#e8f4f0", minWidth: 28 }}>{value}%</span>
    </div>
  );

  const th = { fontSize: 9, color: "#3d6058", padding: "6px 10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" };
  const td = { fontSize: 10, color: "#e8f4f0", padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" };

  return (
    <div style={{
      background: "rgba(7,21,32,0.9)",
      border: "1px solid rgba(0,200,150,0.15)",
      borderRadius: 10,
      overflow: "hidden",
    }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(0,200,150,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#00c896" }}>🌾 Field Monitor — {fields.length} Fields</span>
        <div style={{ display: "flex", gap: 6 }}>
          {["id", "stress", "stage", "moisture"].map(s => (
            <button key={s} onClick={() => setSort(s)} style={{
              background: sort === s ? "rgba(0,200,150,0.15)" : "transparent",
              border: `1px solid ${sort === s ? "rgba(0,200,150,0.4)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 4, padding: "2px 7px",
              fontSize: 9, color: sort === s ? "#00c896" : "#7aa89a",
              cursor: "pointer", textTransform: "capitalize"
            }}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.3)" }}>
              <th style={th}>Field</th>
              <th style={th}>Crop</th>
              <th style={th}>Growth Stage</th>
              <th style={th}>Moisture</th>
              <th style={th}>Stress Level</th>
              <th style={th}>Area</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(f => (
              <tr key={f.id} style={{ cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,200,150,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                onClick={() => onSelectField(f)}>
                <td style={{ ...td, fontFamily: "JetBrains Mono", fontWeight: 600, color: "#00c896" }}>F-{String(f.id).padStart(2, "0")}</td>
                <td style={td}>{f.crop}</td>
                <td style={td}>
                  <span style={{
                    background: `${stageColors[f.stage]}22`,
                    border: `1px solid ${stageColors[f.stage]}55`,
                    color: stageColors[f.stage],
                    padding: "2px 7px", borderRadius: 4, fontSize: 9, fontWeight: 600
                  }}>{f.stage}</span>
                </td>
                <td style={{ ...td, minWidth: 120 }}><MoistureBar value={f.moisture} /></td>
                <td style={td}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {stressIcon(f.stress)}
                    <span style={{ color: stressColors[f.stress], fontWeight: 600, fontSize: 10 }}>{f.stress}</span>
                  </span>
                </td>
                <td style={{ ...td, color: "#7aa89a" }}>{f.area} ha</td>
                <td style={td}>
                  {(f.stress === "Severe" || f.stress === "High") && (
                    <span style={{
                      background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)",
                      color: "#ef4444", padding: "2px 7px", borderRadius: 4, fontSize: 9, fontWeight: 600
                    }}>Irrigate Now</span>
                  )}
                  {f.stress === "Moderate" && (
                    <span style={{
                      background: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.4)",
                      color: "#eab308", padding: "2px 7px", borderRadius: 4, fontSize: 9, fontWeight: 600
                    }}>Monitor</span>
                  )}
                  {(f.stress === "Low" || f.stress === "No Stress") && (
                    <span style={{
                      background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)",
                      color: "#22c55e", padding: "2px 7px", borderRadius: 4, fontSize: 9, fontWeight: 600
                    }}>Optimal</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
