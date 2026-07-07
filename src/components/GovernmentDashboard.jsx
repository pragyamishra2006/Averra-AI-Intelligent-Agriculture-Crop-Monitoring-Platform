import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { governmentStats } from "../data/mockData";
import StatCard from "./StatCard";

const riskColor = { Low: "#22c55e", Moderate: "#eab308", High: "#f97316", Severe: "#ef4444" };

export default function GovernmentDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", overflowY: "auto", paddingRight: 4 }}>
      <div style={{
        background: "linear-gradient(135deg, rgba(26,126,255,0.1), rgba(0,200,150,0.05))",
        border: "1px solid rgba(26,126,255,0.3)",
        borderRadius: 10, padding: "14px 18px"
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>🏛️ Regional Agricultural Monitoring — Bihar State</div>
        <div style={{ fontSize: 11, color: "#7aa89a", marginTop: 4 }}>
          Aggregated satellite-derived statistics across 5 districts · ISRO multi-source data fusion
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <StatCard icon="🌾" label="Total Monitored Area" value="2.4M ha" color="#00c896" />
        <StatCard icon="💧" label="Avg. Soil Moisture" value="46%" color="#1a7eff" />
        <StatCard icon="🚨" label="Drought Hotspots" value="2 Districts" color="#ef4444" />
        <StatCard icon="🚜" label="Irrigation Demand" value="High" color="#f97316" />
      </div>

      <div style={{
        background: "rgba(7,21,32,0.9)",
        border: "1px solid rgba(0,200,150,0.15)",
        borderRadius: 10, padding: "14px 16px"
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#00c896", marginBottom: 10 }}>📊 Soil Moisture by District</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={governmentStats} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="region" tick={{ fontSize: 10, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#050f18", border: "1px solid rgba(0,200,150,0.4)", borderRadius: 6, fontSize: 11, color: "#ffffff" }}
              labelStyle={{ color: "#00e6a8", fontWeight: 700 }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Bar dataKey="moisture" radius={[4, 4, 0, 0]}>
              {governmentStats.map((d, i) => <Cell key={i} fill={riskColor[d.risk]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        background: "rgba(7,21,32,0.9)",
        border: "1px solid rgba(0,200,150,0.15)",
        borderRadius: 10, overflow: "hidden"
      }}>
        <div style={{ padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#00c896", borderBottom: "1px solid rgba(0,200,150,0.1)" }}>
          🗺️ District-Level Risk Assessment
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.3)" }}>
              {["District", "Rice %", "Wheat %", "Soil Moisture", "Drought Risk"].map(h => (
                <th key={h} style={{ fontSize: 9, color: "#3d6058", padding: "6px 12px", textTransform: "uppercase", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {governmentStats.map(d => (
              <tr key={d.region} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "8px 12px", fontSize: 11, color: "#e8f4f0", fontWeight: 600 }}>{d.region}</td>
                <td style={{ padding: "8px 12px", fontSize: 11, color: "#9eb8b0" }}>{d.rice}%</td>
                <td style={{ padding: "8px 12px", fontSize: 11, color: "#9eb8b0" }}>{d.wheat}%</td>
                <td style={{ padding: "8px 12px", fontSize: 11, color: "#9eb8b0" }}>{d.moisture}%</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: riskColor[d.risk],
                    background: `${riskColor[d.risk]}22`, padding: "3px 8px", borderRadius: 4
                  }}>{d.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
