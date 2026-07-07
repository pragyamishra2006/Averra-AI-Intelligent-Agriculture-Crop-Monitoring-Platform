import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import FieldMap from "./components/FieldMap";
import FieldTable from "./components/FieldTable";
import StatCard from "./components/StatCard";
import AICopilot from "./components/AICopilot";
import IrrigationPanel from "./components/IrrigationPanel";
import ReportGenerator from "./components/ReportGenerator";
import GovernmentDashboard from "./components/GovernmentDashboard";
import ExplainableAI from "./components/ExplainableAI";
import { CropPieChart, MoistureTrendChart, NDVIChart, StressBarChart } from "./components/Charts";
import { farmData, fields } from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedField, setSelectedField] = useState(fields[2]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#030a0f" }}>
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: 14, overflowY: "auto" }}>
          {activeTab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
                <StatCard icon="🌾" label="Total Area" value={farmData.area} color="#00c896" />
                <StatCard icon="📊" label="Model Accuracy" value={`${farmData.overallAccuracy}%`} color="#1a7eff" />
                <StatCard icon="💧" label="Avg Moisture" value="51%" trend={-8} color="#f5a623" />
                <StatCard icon="🌱" label="Avg NDVI" value="0.54" trend={-12} color="#22c55e" />
                <StatCard icon="🚨" label="Stressed Fields" value="3 / 12" color="#ef4444" />
                <StatCard icon="🚜" label="Irrigation Need" value="18,650 m³" color="#9b59b6" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, height: 420 }}>
                <FieldMap onSelectField={setSelectedField} />
                <AICopilot />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <CropPieChart />
                <MoistureTrendChart />
                <NDVIChart />
                <StressBarChart />
              </div>

              <FieldTable onSelectField={setSelectedField} />
            </div>
          )}

          {activeTab === "map" && (
            <div style={{ height: "calc(100vh - 100px)" }}>
              <FieldMap onSelectField={setSelectedField} />
            </div>
          )}

          {activeTab === "analysis" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <ExplainableAI field={selectedField} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <CropPieChart />
                <NDVIChart />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <FieldTable onSelectField={setSelectedField} />
              </div>
            </div>
          )}

          {activeTab === "irrigation" && (
            <div style={{ height: "calc(100vh - 100px)" }}>
              <IrrigationPanel />
            </div>
          )}

          {activeTab === "reports" && (
            <div style={{ height: "calc(100vh - 100px)" }}>
              <ReportGenerator />
            </div>
          )}

          {activeTab === "government" && (
            <div style={{ height: "calc(100vh - 100px)" }}>
              <GovernmentDashboard />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
