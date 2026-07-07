import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, Polygon } from "react-leaflet";
import { fields, farmData, stressColors, stageColors } from "../data/mockData";

const LAYER_OPTIONS = [
  { id: "stress", label: "💧 Moisture Stress" },
  { id: "crop", label: "🌾 Crop Type" },
  { id: "stage", label: "🌱 Growth Stage" },
  { id: "ndvi", label: "📈 NDVI" },
];

const cropColors = {
  Rice: "#f5c842", Wheat: "#a8d08d", Maize: "#6dbf67",
  Cotton: "#9b59b6", Sugarcane: "#2ecc71", Soybean: "#f39c12",
};

export default function FieldMap({ onSelectField }) {
  const [layer, setLayer] = useState("stress");
  const [timelinePos, setTimelinePos] = useState(100);

  const colorFor = (f) => {
    if (layer === "stress") return stressColors[f.stress];
    if (layer === "crop") return cropColors[f.crop] || "#888";
    if (layer === "stage") return stageColors[f.stage];
    if (layer === "ndvi") {
      const ndvi = f.moisture / 100;
      if (ndvi > 0.6) return "#22c55e";
      if (ndvi > 0.4) return "#84cc16";
      if (ndvi > 0.25) return "#eab308";
      return "#ef4444";
    }
    return "#00c896";
  };

  const radiusFor = (f) => 8 + f.area / 8;

  return (
    <div style={{ position: "relative", height: "100%", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(0,200,150,0.2)" }}>
      <MapContainer
        center={farmData.coordinates}
        zoom={13}
        style={{ height: "100%", width: "100%", background: "#030a0f" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        {fields.map(f => (
          <CircleMarker
            key={f.id}
            center={[f.lat, f.lng]}
            radius={radiusFor(f)}
            pathOptions={{
              color: colorFor(f),
              fillColor: colorFor(f),
              fillOpacity: 0.55,
              weight: 2,
            }}
            eventHandlers={{ click: () => onSelectField(f) }}
          >
            <Popup>
              <div style={{ fontFamily: "Inter", fontSize: 12 }}>
                <strong>Field {f.id}</strong> — {f.crop}<br />
                Stage: {f.stage}<br />
                Stress: {f.stress}<br />
                Moisture: {f.moisture}%<br />
                Area: {f.area} ha
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Layer selector overlay */}
      <div style={{
        position: "absolute", top: 12, left: 12, zIndex: 500,
        background: "rgba(5,15,24,0.92)",
        border: "1px solid rgba(0,200,150,0.3)",
        borderRadius: 8, padding: 8,
        display: "flex", flexDirection: "column", gap: 4
      }}>
        <div style={{ fontSize: 9, color: "#7aa89a", fontWeight: 600, marginBottom: 2, paddingLeft: 2 }}>MAP LAYERS</div>
        {LAYER_OPTIONS.map(opt => (
          <button key={opt.id} onClick={() => setLayer(opt.id)} style={{
            background: layer === opt.id ? "rgba(0,200,150,0.2)" : "transparent",
            border: `1px solid ${layer === opt.id ? "rgba(0,200,150,0.5)" : "transparent"}`,
            borderRadius: 5, padding: "5px 10px",
            fontSize: 10, color: layer === opt.id ? "#00c896" : "#9eb8b0",
            cursor: "pointer", textAlign: "left", whiteSpace: "nowrap"
          }}>{opt.label}</button>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 12, left: 12, zIndex: 500,
        background: "rgba(5,15,24,0.92)",
        border: "1px solid rgba(0,200,150,0.3)",
        borderRadius: 8, padding: "8px 10px",
      }}>
        <div style={{ fontSize: 9, color: "#7aa89a", fontWeight: 600, marginBottom: 4 }}>
          {layer === "stress" && "STRESS LEVEL"}
          {layer === "crop" && "CROP TYPE"}
          {layer === "stage" && "GROWTH STAGE"}
          {layer === "ndvi" && "NDVI INDEX"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {layer === "stress" && Object.entries(stressColors).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
              <span style={{ fontSize: 9, color: "#e8f4f0" }}>{k}</span>
            </div>
          ))}
          {layer === "crop" && Object.entries(cropColors).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
              <span style={{ fontSize: 9, color: "#e8f4f0" }}>{k}</span>
            </div>
          ))}
          {layer === "stage" && Object.entries(stageColors).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
              <span style={{ fontSize: 9, color: "#e8f4f0" }}>{k}</span>
            </div>
          ))}
          {layer === "ndvi" && ["#22c55e", "#84cc16", "#eab308", "#ef4444"].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              <span style={{ fontSize: 9, color: "#e8f4f0" }}>{["High (>0.6)", "Moderate", "Low", "Very Low (<0.25)"][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline slider overlay */}
      <div style={{
        position: "absolute", bottom: 12, right: 12, left: 220, zIndex: 500,
        background: "rgba(5,15,24,0.92)",
        border: "1px solid rgba(0,200,150,0.3)",
        borderRadius: 8, padding: "8px 14px",
        display: "flex", alignItems: "center", gap: 10
      }}>
        <span style={{ fontSize: 9, color: "#7aa89a", whiteSpace: "nowrap" }}>⏳ TIME MACHINE</span>
        <span style={{ fontSize: 9, color: "#3d6058" }}>Apr</span>
        <input
          type="range" min={0} max={100} value={timelinePos}
          onChange={e => setTimelinePos(Number(e.target.value))}
          style={{ flex: 1, accentColor: "#00c896" }}
        />
        <span style={{ fontSize: 9, color: "#00c896", fontWeight: 600, whiteSpace: "nowrap" }}>
          {timelinePos > 90 ? "Today" : timelinePos > 60 ? "Jun 2026" : timelinePos > 30 ? "May 2026" : "Apr 2026"}
        </span>
      </div>

      {/* Satellite badge */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 500,
        background: "rgba(5,15,24,0.92)",
        border: "1px solid rgba(0,200,150,0.3)",
        borderRadius: 8, padding: "6px 12px",
        fontSize: 9, color: "#00c896", display: "flex", alignItems: "center", gap: 6
      }}>
        🛰️ Sentinel-2 + Sentinel-1 Fusion · Updated {farmData.date}
      </div>
    </div>
  );
}
