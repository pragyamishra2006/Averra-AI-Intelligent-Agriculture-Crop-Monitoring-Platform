export const farmData = {
  id: "FARM_0127",
  name: "Field Cluster Alpha",
  location: "Patna District, Bihar",
  date: "29 Jun 2026",
  area: "847 ha",
  fields: 12,
  overallAccuracy: 92.4,
  coordinates: [25.5941, 85.1376],
};

export const cropDistribution = [
  { name: "Rice", value: 34, color: "#f5c842", area: "288 ha" },
  { name: "Wheat", value: 22, color: "#a8d08d", area: "186 ha" },
  { name: "Maize", value: 15, color: "#6dbf67", area: "127 ha" },
  { name: "Cotton", value: 10, color: "#9b59b6", area: "85 ha" },
  { name: "Sugarcane", value: 8, color: "#2ecc71", area: "68 ha" },
  { name: "Soybean", value: 7, color: "#f39c12", area: "59 ha" },
  { name: "Others", value: 4, color: "#95a5a6", area: "34 ha" },
];

export const moistureTimeline = [
  { date: "Jun 1", value: 72, stress: "Low" },
  { date: "Jun 5", value: 65, stress: "Low" },
  { date: "Jun 10", value: 55, stress: "Moderate" },
  { date: "Jun 15", value: 42, stress: "High" },
  { date: "Jun 20", value: 38, stress: "High" },
  { date: "Jun 25", value: 31, stress: "Severe" },
  { date: "Jun 29", value: 29, stress: "Severe" },
];

export const ndviTimeline = [
  { date: "Apr", ndvi: 0.22 },
  { date: "May", ndvi: 0.58 },
  { date: "Jun 1", ndvi: 0.71 },
  { date: "Jun 10", ndvi: 0.68 },
  { date: "Jun 20", ndvi: 0.61 },
  { date: "Jun 29", ndvi: 0.54 },
];

export const fields = [
  { id: 1, crop: "Rice", stage: "Vegetative", stress: "High", moisture: 38, lat: 25.600, lng: 85.140, area: 42 },
  { id: 2, crop: "Wheat", stage: "Maturity", stress: "Moderate", moisture: 52, lat: 25.597, lng: 85.145, area: 38 },
  { id: 3, crop: "Maize", stage: "Flowering", stress: "Severe", moisture: 24, lat: 25.593, lng: 85.138, area: 55 },
  { id: 4, crop: "Cotton", stage: "Reproductive", stress: "Low", moisture: 68, lat: 25.590, lng: 85.150, area: 31 },
  { id: 5, crop: "Rice", stage: "Germination", stress: "No Stress", moisture: 82, lat: 25.604, lng: 85.133, area: 47 },
  { id: 6, crop: "Soybean", stage: "Vegetative", stress: "High", moisture: 35, lat: 25.588, lng: 85.142, area: 29 },
  { id: 7, crop: "Sugarcane", stage: "Harvest Ready", stress: "Moderate", moisture: 55, lat: 25.596, lng: 85.130, area: 62 },
  { id: 8, crop: "Wheat", stage: "Flowering", stress: "No Stress", moisture: 76, lat: 25.601, lng: 85.155, area: 44 },
];

export const irrigationData = {
  recommendedAction: "Irrigate in next 24–48 hours",
  reason: "Moderate to Severe Stress in 6 of 12 fields",
  depth: "25–35 mm",
  duration: "6–8 hours",
  totalVolume: "18,650 m³",
  waterBalance: -12,
  priorityFields: [3, 1, 6],
  window: "Early morning (4:00–7:00 AM)",
};

export const alerts = [
  { id: 1, type: "severe", message: "Field 3 (Maize): Severe moisture stress detected", time: "2 hours ago", icon: "🚨" },
  { id: 2, type: "high", message: "Field 1 (Rice): High stress — irrigation overdue", time: "4 hours ago", icon: "⚠️" },
  { id: 3, type: "high", message: "Field 6 (Soybean): Water deficit 18mm below threshold", time: "6 hours ago", icon: "⚠️" },
  { id: 4, type: "info", message: "Sentinel-2 imagery updated for zone A12", time: "1 day ago", icon: "🛰️" },
  { id: 5, type: "success", message: "Field 8 (Wheat): Optimal moisture maintained", time: "1 day ago", icon: "✅" },
];

export const stressColors = {
  "No Stress": "#22c55e",
  "Low": "#84cc16",
  "Moderate": "#eab308",
  "High": "#f97316",
  "Severe": "#ef4444",
};

export const stageColors = {
  "Germination": "#86efac",
  "Vegetative": "#4ade80",
  "Flowering": "#a3e635",
  "Reproductive": "#facc15",
  "Maturity": "#fb923c",
  "Harvest Ready": "#92400e",
};

export const aiMessages = [
  {
    role: "assistant",
    content: "Welcome to Averra AI. I'm your agricultural intelligence copilot. I have analyzed all 12 fields in **FARM_0127**. Here's a quick summary:\n\n🌾 **Dominant crop:** Rice (34% coverage)\n💧 **Critical concern:** 3 fields showing Severe-to-High moisture stress\n🚜 **Immediate action:** Irrigation recommended for Fields 3, 1, and 6 within 24–48 hours\n📈 **NDVI trend:** Declining — 0.71 → 0.54 over 4 weeks\n\nType 'Analyze field 3' or ask me anything about your crops."
  }
];

export const governmentStats = [
  { region: "Patna", rice: 42, wheat: 28, moisture: 38, risk: "High" },
  { region: "Gaya", rice: 35, wheat: 32, moisture: 52, risk: "Moderate" },
  { region: "Muzaffarpur", rice: 51, wheat: 18, moisture: 44, risk: "High" },
  { region: "Bhagalpur", rice: 29, wheat: 38, moisture: 61, risk: "Low" },
  { region: "Darbhanga", rice: 47, wheat: 25, moisture: 35, risk: "Severe" },
];
