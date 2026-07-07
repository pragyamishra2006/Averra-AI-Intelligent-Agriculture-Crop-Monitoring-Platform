import React from "react";
import { Droplet, Clock, Gauge, AlertTriangle, CheckCircle } from "lucide-react";
import { irrigationData, fields } from "../data/mockData";
import StressGauge from "./StressGauge";

export default function IrrigationPanel() {
  const priorityFields = fields.filter(f => irrigationData.priorityFields.includes(f.id));

  const Card = ({ icon, label, value, color = "#00c896" }) => (
    <div style={{
      background: "rgba(7,21,32,0.9)",
      border: `1px solid ${color}25`,
      borderRadius: 10, padding: "12px 14px",
      display: "flex", flexDirection: "column", gap: 6
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ color }}>{icon}</div>
        <span style={{ fontSize: 10, color: "#7aa89a", fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ fontFamily: "Orbitron", fontSize: 18, fontWeight: 700, color }}>{value}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", overflowY: "auto", paddingRight: 4 }}>
      {/* Header Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(245,166,35,0.08))",
        border: "1px solid rgba(239,68,68,0.3)",
        borderRadius: 10, padding: "14px 18px",
        display: "flex", alignItems: "center", gap: 14
      }}>
        <AlertTriangle size={28} color="#ef4444" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{irrigationData.recommendedAction}</div>
          <div style={{ fontSize: 11, color: "#f5a623", marginTop: 2 }}>{irrigationData.reason}</div>
        </div>
      </div>

      {/* Stat Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <Card icon={<Droplet size={16} />} label="Irrigation Depth" value={irrigationData.depth} color="#1a7eff" />
        <Card icon={<Clock size={16} />} label="Est. Duration" value={irrigationData.duration} color="#f5a623" />
        <Card icon={<Gauge size={16} />} label="Total Volume" value={irrigationData.totalVolume} color="#00c896" />
        <Card icon={<Clock size={16} />} label="Irrigation Window" value={irrigationData.window} color="#9b59b6" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <StressGauge value={irrigationData.waterBalance} />

        {/* Priority fields */}
        <div style={{
          background: "rgba(7,21,32,0.9)",
          border: "1px solid rgba(0,200,150,0.15)",
          borderRadius: 10, padding: "14px 16px"
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#00c896", marginBottom: 10 }}>
            🚜 Priority Irrigation Queue
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {priorityFields.map((f, i) => (
              <div key={f.id} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(0,0,0,0.2)", borderRadius: 6, padding: "8px 10px"
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: i === 0 ? "#ef4444" : i === 1 ? "#f97316" : "#eab308",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#e8f4f0" }}>Field {f.id} — {f.crop}</div>
                  <div style={{ fontSize: 9, color: "#7aa89a" }}>{f.stage} · {f.moisture}% moisture</div>
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700,
                  color: f.stress === "Severe" ? "#ef4444" : "#f97316",
                }}>{f.stress}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All fields irrigation schedule */}
      <div style={{
        background: "rgba(7,21,32,0.9)",
        border: "1px solid rgba(0,200,150,0.15)",
        borderRadius: 10, padding: "14px 16px"
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#00c896", marginBottom: 10 }}>
          📅 7-Day Irrigation Schedule
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map((d, i) => (
            <div key={d} style={{
              minWidth: 90,
              background: i < 2 ? "rgba(239,68,68,0.1)" : "rgba(0,0,0,0.2)",
              border: `1px solid ${i < 2 ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 8, padding: "10px 8px", textAlign: "center"
            }}>
              <div style={{ fontSize: 9, color: "#7aa89a", marginBottom: 6 }}>{d}</div>
              {i < 2 ? (
                <>
                  <Droplet size={16} color="#ef4444" style={{ margin: "0 auto" }} />
                  <div style={{ fontSize: 9, color: "#ef4444", marginTop: 4, fontWeight: 600 }}>Irrigate</div>
                </>
              ) : (
                <>
                  <CheckCircle size={16} color="#22c55e" style={{ margin: "0 auto" }} />
                  <div style={{ fontSize: 9, color: "#22c55e", marginTop: 4, fontWeight: 600 }}>Monitor</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
