import { fields, farmData, irrigationData, cropDistribution, ndviTimeline, moistureTimeline } from "./mockData";

const fieldById = (n) => fields.find(f => f.id === n);

const fieldAnalysis = (f) => {
  const stressEmoji = { "No Stress": "🟢", "Low": "🟢", "Moderate": "🟡", "High": "🟠", "Severe": "🔴" };
  const urgency = (f.stress === "Severe" || f.stress === "High")
    ? `🚨 **Action needed:** Irrigate within 24–48 hours. Recommended depth ${irrigationData.depth}.`
    : f.stress === "Moderate"
    ? `⚠️ Monitor closely over the next 2–3 days. No immediate action required.`
    : `✅ Field is in good condition. No irrigation needed right now.`;

  return `🛰️ **Field ${f.id} Analysis**\n\n` +
    `🌾 Crop: **${f.crop}** (92% confidence)\n` +
    `🌱 Growth stage: **${f.stage}**\n` +
    `${stressEmoji[f.stress]} Stress level: **${f.stress}**\n` +
    `💧 Soil moisture: **${f.moisture}%**\n` +
    `📐 Area: ${f.area} ha\n\n${urgency}`;
};

const irrigationAnswer = () => {
  return `🚜 **Irrigation Recommendation**\n\n` +
    `${irrigationData.recommendedAction}\n\n` +
    `- Reason: ${irrigationData.reason}\n` +
    `- Depth: **${irrigationData.depth}**\n` +
    `- Duration: ${irrigationData.duration}\n` +
    `- Volume: ${irrigationData.totalVolume}\n` +
    `- Best window: ${irrigationData.window}\n` +
    `- Water balance: **${irrigationData.waterBalance}mm** (deficit)\n\n` +
    `Priority fields: ${irrigationData.priorityFields.map(id => `Field ${id}`).join(", ")}`;
};

const ndviAnswer = () => {
  const first = ndviTimeline[0].ndvi;
  const last = ndviTimeline[ndviTimeline.length - 1].ndvi;
  const change = (((last - first) / first) * 100).toFixed(0);
  return `📈 **NDVI Trend Analysis**\n\n` +
    `Vegetation index has moved from **${first}** (${ndviTimeline[0].date}) to **${last}** (${ndviTimeline[ndviTimeline.length - 1].date}).\n\n` +
    `That's a **${change}%** ${change < 0 ? "decline" : "increase"} over the monitoring period.\n\n` +
    `${last < 0.5 ? "🚨 This decline correlates with the moisture stress detected in Fields 1, 3, and 6 — vegetation vigor is dropping as water deficit increases." : "✅ Vegetation health remains stable across most fields."}`;
};

const droughtRiskAnswer = () => {
  const severeCount = fields.filter(f => f.stress === "Severe" || f.stress === "High").length;
  const riskLevel = severeCount >= 3 ? "High" : severeCount >= 1 ? "Moderate" : "Low";
  return `📊 **Drought Risk Forecast**\n\n` +
    `Current risk level: **${riskLevel}**\n\n` +
    `- ${severeCount} of ${fields.length} fields showing High/Severe stress\n` +
    `- Water balance trending negative (${irrigationData.waterBalance}mm)\n` +
    `- NDVI declining over 4-week window\n` +
    `- SAR backscatter indicates falling soil moisture in zones A and C\n\n` +
    `**Recommendation:** ${riskLevel === "High" ? "Immediate irrigation intervention required to prevent yield loss, particularly for Maize (Field 3) currently in Flowering stage — the most water-sensitive phenological period." : "Continue routine monitoring."}`;
};

const cropSummaryAnswer = () => {
  const top = [...cropDistribution].sort((a, b) => b.value - a.value)[0];
  return `🌾 **Crop Distribution Summary**\n\n` +
    cropDistribution.map(c => `- ${c.name}: **${c.value}%** (${c.area})`).join("\n") +
    `\n\nDominant crop is **${top.name}** covering ${top.value}% of monitored area (${top.area}).`;
};

const farmOverviewAnswer = () => {
  const stressed = fields.filter(f => f.stress === "Severe" || f.stress === "High");
  return `🛰️ **${farmData.id} Overview**\n\n` +
    `📍 ${farmData.location}\n` +
    `📐 Total area: ${farmData.area} across ${farmData.fields} fields\n` +
    `🎯 Classification accuracy: ${farmData.overallAccuracy}%\n\n` +
    `🚨 **${stressed.length} fields need attention:** ${stressed.map(f => `Field ${f.id} (${f.crop})`).join(", ")}\n\n` +
    `Ask me about a specific field, irrigation, NDVI trends, or drought risk.`;
};

const explainAnswer = () => {
  return `🧠 **Explainable AI**\n\n` +
    `Crop classification is driven primarily by:\n` +
    `- NIR reflectance (34% contribution) — vegetation canopy structure\n` +
    `- Red Edge band (28%) — chlorophyll content\n` +
    `- SAR VV polarization (22%) — crop structure, cloud-independent\n` +
    `- SWIR band (16%) — moisture content\n\n` +
    `Moisture stress detection cross-validates optical NDVI against SAR backscatter, which lets us flag stress even under cloud cover — a key advantage of multi-source fusion. Check the **AI Analysis** tab for the visual heatmap.`;
};

const helpAnswer = () => {
  return `👋 I can help you with:\n\n` +
    `- **Field analysis** — "Analyze field 3"\n` +
    `- **Irrigation** — "Should I irrigate today?"\n` +
    `- **NDVI trends** — "Show NDVI trend"\n` +
    `- **Drought risk** — "What's the drought risk?"\n` +
    `- **Crop breakdown** — "What crops are growing?"\n` +
    `- **Farm overview** — "Give me a summary"\n` +
    `- **Model explainability** — "Why did you classify it this way?"\n\n` +
    `Try one of the quick-prompt buttons below, or ask in your own words.`;
};

const fallbackAnswer = (input) => {
  return `🤔 I don't have a specific answer for that in offline mode, but here's what I can tell you about FARM_0127:\n\n` +
    `- ${fields.filter(f => f.stress === "Severe" || f.stress === "High").length} fields need irrigation attention\n` +
    `- Water balance: ${irrigationData.waterBalance}mm\n` +
    `- NDVI trending down (0.71 → 0.54)\n\n` +
    `Try asking about a specific field number, irrigation, NDVI, or drought risk — or type "help" to see what I can do.`;
};

export function getCopilotResponse(input) {
  const q = input.toLowerCase().trim();

  const fieldMatch = q.match(/field\s*(\d+)/);
  if (fieldMatch) {
    const f = fieldById(Number(fieldMatch[1]));
    if (f) return fieldAnalysis(f);
    return `I couldn't find Field ${fieldMatch[1]} — this farm has fields 1 through ${fields.length}. Try "Analyze field 3".`;
  }

  if (/irrigat|water.*today|should i water/.test(q)) return irrigationAnswer();
  if (/ndvi|vegetation index|vegetation health/.test(q)) return ndviAnswer();
  if (/drought|risk|forecast/.test(q)) return droughtRiskAnswer();
  if (/crop|distribution|what.*grow/.test(q)) return cropSummaryAnswer();
  if (/explain|why|confidence|spectral|grad-cam|how.*work/.test(q)) return explainAnswer();
  if (/summary|overview|analyze.*farm|status/.test(q)) return farmOverviewAnswer();
  if (/help|what can you|commands/.test(q)) return helpAnswer();

  return fallbackAnswer(q);
}