import React from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { cropDistribution, moistureTimeline, ndviTimeline } from "../data/mockData";

const tooltipStyle = {
  background: "#050f18",
  border: "1px solid rgba(0,200,150,0.4)",
  borderRadius: 6,
  fontSize: 11,
  color: "#ffffff",
};

const tooltipLabelStyle = { color: "#00e6a8", fontWeight: 700 };
const tooltipItemStyle = { color: "#ffffff" };

export function CropPieChart() {
  return (
    <div style={panelStyle}>
      <div style={titleStyle}>🌾 Crop Distribution</div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={cropDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2}>
            {cropDistribution.map((entry, i) => <Cell key={i} fill={entry.color} stroke="#050f18" strokeWidth={2} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={(v, n, p) => [`${v}% (${p.payload.area})`, n]} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 10px", marginTop: 4 }}>
        {cropDistribution.map(c => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
            <span style={{ color: "#9eb8b0" }}>{c.name}</span>
            <span style={{ color: "#3d6058", marginLeft: "auto" }}>{c.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MoistureTrendChart() {
  return (
    <div style={panelStyle}>
      <div style={titleStyle}>💧 Moisture Trend (4 weeks)</div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={moistureTimeline} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a7eff" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#1a7eff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
          <Area type="monotone" dataKey="value" stroke="#1a7eff" strokeWidth={2} fill="url(#moistureGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NDVIChart() {
  return (
    <div style={panelStyle}>
      <div style={titleStyle}>📈 NDVI (Vegetation Index)</div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={ndviTimeline} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 1]} tick={{ fontSize: 9, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
          <Line type="monotone" dataKey="ndvi" stroke="#00c896" strokeWidth={2.5} dot={{ fill: "#00c896", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StressBarChart() {
  const data = [
    { name: "No Stress", count: 2, color: "#22c55e" },
    { name: "Low", count: 1, color: "#84cc16" },
    { name: "Moderate", count: 2, color: "#eab308" },
    { name: "High", count: 2, color: "#f97316" },
    { name: "Severe", count: 1, color: "#ef4444" },
  ];
  return (
    <div style={panelStyle}>
      <div style={titleStyle}>🚨 Fields by Stress Level</div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fontSize: 8, fill: "#7aa89a" }} axisLine={false} tickLine={false} angle={-15} textAnchor="end" height={40} />
          <YAxis tick={{ fontSize: 9, fill: "#7aa89a" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const panelStyle = {
  background: "rgba(7,21,32,0.9)",
  border: "1px solid rgba(0,200,150,0.15)",
  borderRadius: 10,
  padding: "12px 14px",
};

const titleStyle = {
  fontSize: 11, fontWeight: 600, color: "#00c896", marginBottom: 6,
};
