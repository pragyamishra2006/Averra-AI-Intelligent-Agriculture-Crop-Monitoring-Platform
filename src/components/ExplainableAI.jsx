import React, { useState } from "react";
import { fields } from "../data/mockData";

export default function ExplainableAI({ field }) {
  const f = field || fields[2];

  const spectralBands = [
    { name: "NIR (Near-Infrared)", contribution: 34, value: "0.42 reflectance" },
    { name: "Red Edge", contribution: 28, value: "0.31 reflectance" },
    { name: "SAR VV Polarization", contribution: 22, value: "-12.4 dB" },
    { name: "SWIR (Moisture)", contribution: 16, value: "0.18 reflectance" },
  ];

  const cropConfidence = [
    { crop: f.crop, conf: 92 },
    { crop: "Maize", conf: f.crop === "Maize" ? 0 : 5 },
    { crop: "Sugarcane", conf: f.crop === "Sugarcane" ? 0 : 2 },
    { crop: "Other", conf: 1 },
  ].filter(c => c.conf > 0).sort((a, b) => b.conf - a.conf);

  return (
    <div style={{
      background: "rgba(7,21,32,0.9)",
      border: "1px solid rgba(0,200,150,0.15)",
      borderRadius: 10, padding: "14px 16px",
      display: "flex", flexDirection: "column", gap: 14
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#00c896" }}>🧠 Explainable AI — Field {f.id}</span>
        <span style={{
          fontSize: 9, fontWeight: 600, color: "#1a7eff",
          background: "rgba(26,126,255,0.1)", padding: "2px 8px", borderRadius: 4
        }}>Grad-CAM + SHAP</span>
      </div>

      {/* Pseudo heatmap visualization */}
      <div style={{
        height: 100, borderRadius: 8, position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #1a3a2a 0%, #2a4a1a 30%, #f5a623 55%, #ef4444 75%, #7a1f1f 100%)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(0,0,0,0.15) 10px), repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(0,0,0,0.15) 10px)"
        }} />
        <div style={{
          position: "absolute", bottom: 6, left: 8, fontSize: 9, color: "#fff",
          background: "rgba(0,0,0,0.5)", padding: "2px 6px", borderRadius: 4
        }}>Attention heatmap — region driving prediction</div>
      </div>

      {/* Crop classification confidence */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7aa89a", marginBottom: 6 }}>CROP CLASSIFICATION CONFIDENCE</div>
        {cropConfidence.map(c => (
          <div key={c.crop} style={{ marginBottom: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 2 }}>
              <span style={{ color: "#e8f4f0" }}>{c.crop}</span>
              <span style={{ color: "#00c896", fontWeight: 600 }}>{c.conf}%</span>
            </div>
            <div style={{ height: 5, background: "#0d2030", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${c.conf}%`, background: c.crop === f.crop ? "#00c896" : "#3d6058", borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Spectral contribution */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7aa89a", marginBottom: 6 }}>KEY SPECTRAL INDICATORS</div>
        {spectralBands.map(b => (
          <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 110, fontSize: 9, color: "#9eb8b0" }}>{b.name}</div>
            <div style={{ flex: 1, height: 5, background: "#0d2030", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${b.contribution}%`, background: "#1a7eff", borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 9, color: "#3d6058", width: 90, textAlign: "right" }}>{b.value}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)",
        borderRadius: 6, padding: "8px 10px", fontSize: 10, color: "#9eb8b0", lineHeight: 1.5
      }}>
        💡 <strong style={{ color: "#00c896" }}>AI Explanation:</strong> The model identified {f.crop} with 92% confidence based on NIR reflectance patterns characteristic of {f.stage.toLowerCase()} stage canopy structure, cross-validated against SAR backscatter indicating {f.stress.toLowerCase()} soil moisture stress.
      </div>
    </div>
  );
}
