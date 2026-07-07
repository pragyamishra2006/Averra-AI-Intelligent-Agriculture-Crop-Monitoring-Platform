import React, { useState, useRef } from "react";
import { FileText, Download, CheckCircle, Loader } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { farmData, fields, irrigationData } from "../data/mockData";

export default function ReportGenerator() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef(null);

  const generate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${farmData.id}_AgriSphere_Report.pdf`);
    } catch (err) {
      alert("Something went wrong generating the PDF. Check the console for details.");
      console.error(err);
    }
    setDownloading(false);
  };

  const sections = [
    { name: "Executive Summary", icon: "📋" },
    { name: "Satellite Imagery Analysis", icon: "🛰️" },
    { name: "Crop Classification Results", icon: "🌾" },
    { name: "Phenological Stage Mapping", icon: "🌱" },
    { name: "Moisture Stress Assessment", icon: "💧" },
    { name: "Irrigation Recommendations", icon: "🚜" },
    { name: "Risk Forecast", icon: "📈" },
    { name: "AI Model Confidence & Methodology", icon: "🧠" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, height: "100%" }}>
      {/* Config panel */}
      <div style={{
        width: 280, flexShrink: 0,
        background: "rgba(7,21,32,0.9)",
        border: "1px solid rgba(0,200,150,0.15)",
        borderRadius: 10, padding: 16,
        display: "flex", flexDirection: "column", gap: 14
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#00c896" }}>📄 Generate Report</div>

        <div>
          <div style={{ fontSize: 9, color: "#7aa89a", marginBottom: 6 }}>FARM</div>
          <div style={{ fontSize: 12, color: "#e8f4f0", fontWeight: 600 }}>{farmData.id} — {farmData.location}</div>
        </div>

        <div>
          <div style={{ fontSize: 9, color: "#7aa89a", marginBottom: 6 }}>INCLUDE SECTIONS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sections.map(s => (
              <label key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, color: "#e8f4f0", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "#00c896" }} />
                <span>{s.icon}</span> {s.name}
              </label>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={generating} style={{
          marginTop: "auto",
          background: "linear-gradient(135deg, #00c896, #1a7eff)",
          border: "none", borderRadius: 8, padding: "10px",
          color: "#fff", fontWeight: 700, fontSize: 11,
          cursor: generating ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          opacity: generating ? 0.7 : 1
        }}>
          {generating ? <><Loader size={14} className="spin" /> Generating...</> : <><FileText size={14} /> Generate PDF Report</>}
        </button>

        {generated && (
          <button onClick={downloadPDF} disabled={downloading} style={{
            background: "rgba(0,200,150,0.1)", border: "1px solid rgba(0,200,150,0.4)",
            borderRadius: 8, padding: "10px", color: "#00c896", fontWeight: 700, fontSize: 11,
            cursor: downloading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            opacity: downloading ? 0.7 : 1
          }}>
            {downloading ? <><Loader size={14} className="spin" /> Building PDF...</> : <><Download size={14} /> Download Report</>}
          </button>
        )}
      </div>

      {/* Preview (this exact area is what gets captured into the PDF) */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div ref={reportRef} style={{
          background: "#fff",
          borderRadius: 10,
          padding: "40px 50px",
          color: "#1a1a1a",
          fontFamily: "Inter, sans-serif",
        }}>
          <div style={{ borderBottom: "3px solid #00c896", paddingBottom: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "#666", letterSpacing: "0.1em" }}>STELLAR SPARK · AGRISPHERE AI</div>
            <h1 style={{ fontSize: 24, margin: "6px 0 4px", color: "#0a3d2e" }}>Precision Agriculture Analysis Report</h1>
            <div style={{ fontSize: 11, color: "#888" }}>Farm: {farmData.id} · {farmData.location} · Generated {farmData.date}</div>
          </div>

          <h3 style={{ fontSize: 14, color: "#0a3d2e", marginBottom: 8 }}>📋 Executive Summary</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "#333", marginBottom: 16 }}>
            Satellite-based AI analysis of {farmData.area} across {farmData.fields} fields reveals
            an overall classification accuracy of {farmData.overallAccuracy}%. Three fields exhibit
            High-to-Severe moisture stress requiring immediate irrigation intervention. NDVI trends
            indicate declining vegetation vigor over the past four weeks (0.71 → 0.54), suggesting
            progressive water deficit conditions across the monitored region.
          </p>

          <h3 style={{ fontSize: 14, color: "#0a3d2e", marginBottom: 8 }}>🌾 Crop Classification Results</h3>
          <table style={{ width: "100%", fontSize: 11, marginBottom: 16, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0f9f6" }}>
                <th style={thStyle}>Field</th><th style={thStyle}>Crop</th><th style={thStyle}>Stage</th>
                <th style={thStyle}>Stress</th><th style={thStyle}>Moisture</th>
              </tr>
            </thead>
            <tbody>
              {fields.map(f => (
                <tr key={f.id}>
                  <td style={tdStyle}>F-{f.id}</td><td style={tdStyle}>{f.crop}</td><td style={tdStyle}>{f.stage}</td>
                  <td style={tdStyle}>{f.stress}</td><td style={tdStyle}>{f.moisture}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontSize: 14, color: "#0a3d2e", marginBottom: 8 }}>🚜 Irrigation Recommendation</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "#333" }}>
            <strong>{irrigationData.recommendedAction}.</strong> Apply {irrigationData.depth} of irrigation
            over an estimated {irrigationData.duration}, totaling {irrigationData.totalVolume}. Recommended
            window: {irrigationData.window}. Current water balance stands at {irrigationData.waterBalance}mm.
          </p>

          {generated && (
            <div style={{
              marginTop: 24, padding: "10px 14px", background: "#e6fbf3",
              border: "1px solid #00c896", borderRadius: 6,
              display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#0a3d2e"
            }}>
              <CheckCircle size={16} color="#00c896" /> Report ready — includes all satellite imagery and charts.
            </div>
          )}
        </div>
      </div>
      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const thStyle = { textAlign: "left", padding: "6px 8px", borderBottom: "2px solid #00c896", color: "#0a3d2e" };
const tdStyle = { padding: "5px 8px", borderBottom: "1px solid #eee" };