import React from "react";

export default function StressGauge({ value }) {
  // value range typically -50 to +50
  const clamp = Math.max(-50, Math.min(50, value));
  const pct = (clamp + 50) / 100; // 0 to 1
  const angle = pct * 180 - 90; // -90 to +90 degrees

  const colorAt = (p) => {
    if (p < 0.2) return "#ef4444";
    if (p < 0.4) return "#f97316";
    if (p < 0.6) return "#eab308";
    if (p < 0.8) return "#84cc16";
    return "#22c55e";
  };
  const needleColor = colorAt(pct);

  const r = 70;
  const cx = 90, cy = 85;
  const rad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (startDeg, endDeg, color) => {
    const s = rad(startDeg - 90);
    const e = rad(endDeg - 90);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleLen = 60;
  const nx = cx + needleLen * Math.cos(rad(angle - 90));
  const ny = cy + needleLen * Math.sin(rad(angle - 90));

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(7,21,32,0.9), rgba(5,15,24,0.9))",
      border: "1px solid rgba(0,200,150,0.15)",
      borderRadius: 10,
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{ fontSize: 10, color: "#7aa89a", marginBottom: 4, fontWeight: 600, alignSelf: "flex-start" }}>
        💧 WATER BALANCE
      </div>
      <svg width={180} height={110} viewBox="0 0 180 110">
        {/* Background arc */}
        <path d={arcPath(0, 180, "#1a2530")} stroke="#1a2530" strokeWidth={14} fill="none" strokeLinecap="round" />
        {/* Colored segments */}
        <path d={arcPath(0, 36, "#ef4444")} stroke="#ef4444" strokeWidth={14} fill="none" opacity={0.7} />
        <path d={arcPath(36, 72, "#f97316")} stroke="#f97316" strokeWidth={14} fill="none" opacity={0.7} />
        <path d={arcPath(72, 108, "#eab308")} stroke="#eab308" strokeWidth={14} fill="none" opacity={0.7} />
        <path d={arcPath(108, 144, "#84cc16")} stroke="#84cc16" strokeWidth={14} fill="none" opacity={0.7} />
        <path d={arcPath(144, 180, "#22c55e")} stroke="#22c55e" strokeWidth={14} fill="none" opacity={0.7} />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={needleColor} strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={5} fill={needleColor} />
        {/* Labels */}
        <text x={10} y={105} fontSize={8} fill="#ef4444">-50</text>
        <text x={85} y={20} fontSize={8} fill="#eab308" textAnchor="middle">0</text>
        <text x={160} y={105} fontSize={8} fill="#22c55e">+50</text>
      </svg>
      <div style={{
        fontFamily: "Orbitron",
        fontSize: 28,
        fontWeight: 700,
        color: needleColor,
        marginTop: -10,
        lineHeight: 1
      }}>{value > 0 ? "+" : ""}{value}</div>
      <div style={{ fontSize: 9, color: "#7aa89a", marginTop: 2 }}>mm deficit / surplus</div>
      <div style={{
        marginTop: 6, fontSize: 9, fontWeight: 600,
        color: value < 0 ? "#ef4444" : "#22c55e",
        background: value < 0 ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
        padding: "3px 8px", borderRadius: 4
      }}>
        {value < -20 ? "CRITICAL DEFICIT" : value < 0 ? "WATER DEFICIT" : "WATER SURPLUS"}
      </div>
    </div>
  );
}
