# 🚀 Stellar Spark — AgriSphere AI

An AI-driven satellite-powered precision agriculture platform built for the ISRO Hackathon.

Combines optical (Sentinel-2, LISS-III/IV, AWiFS) and SAR (Sentinel-1, EOS-4) satellite data fusion to deliver:
- 🌾 Crop type classification
- 🌱 Phenological growth-stage mapping
- 💧 Moisture stress detection
- 🚜 Smart irrigation advisory
- 🤖 AI Copilot (powered by Claude)
- 🧠 Explainable AI (Grad-CAM style attention maps)
- 📄 Automated PDF-style report generation
- 🏛️ Government regional dashboard

## 🛠️ Setup Instructions (VS Code)

### 1. Install Node.js
Download and install Node.js 18+ from https://nodejs.org if you don't have it.

### 2. Open the project
Open this folder in VS Code: `File > Open Folder...`

### 3. Install dependencies
Open the integrated terminal (`` Ctrl+` ``) and run:

```bash
npm install
```

### 4. Run the app

```bash
npm start
```

This opens the app at **http://localhost:3000**

## 🤖 AI Copilot Setup

The AI Copilot panel (chat with Claude about your farm) calls the Anthropic API directly from the browser. To make it work outside of this preview environment, you need to:

1. Get an API key from https://console.anthropic.com
2. Open `src/components/AICopilot.jsx`
3. Replace the fetch call's headers to include your key:

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY_HERE",
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true"
},
```

**⚠️ Security note:** Never commit real API keys to GitHub or ship them in a public frontend. For a real deployment, route this request through your own backend (FastAPI is recommended, see below) so the key stays server-side.

If you don't want to use a live API key for your demo, the Copilot still works fully with realistic canned responses — see the fallback note in the code comments.

## 📁 Project Structure

```
agrisphere/
├── public/
│   └── index.html          # HTML shell, fonts, global CSS variables
├── src/
│   ├── components/
│   │   ├── TopBar.jsx           # Header navigation + alerts
│   │   ├── Sidebar.jsx          # Layer controls + farm info
│   │   ├── FieldMap.jsx         # Interactive Leaflet map
│   │   ├── FieldTable.jsx       # Sortable field data table
│   │   ├── StatCard.jsx         # Reusable stat tile
│   │   ├── StressGauge.jsx      # Water balance gauge (SVG)
│   │   ├── Charts.jsx           # NDVI / moisture / crop charts (Recharts)
│   │   ├── AICopilot.jsx        # Claude-powered chat assistant
│   │   ├── IrrigationPanel.jsx  # Irrigation advisory dashboard
│   │   ├── ExplainableAI.jsx    # Grad-CAM style explainability panel
│   │   ├── ReportGenerator.jsx  # Report builder + preview
│   │   └── GovernmentDashboard.jsx
│   ├── data/
│   │   └── mockData.js     # All sample satellite/crop/field data
│   ├── App.jsx              # Main layout + tab routing
│   └── index.js             # React entry point
├── package.json
└── README.md
```

## 🔌 Connecting Real Satellite Data (Backend)

This frontend currently uses realistic mock data (`src/data/mockData.js`) so you can demo immediately. To connect real satellite analysis:

1. Build a **FastAPI** backend that:
   - Pulls imagery from Sentinel Hub / Bhuvan (ISRO) / USGS Earth Explorer APIs
   - Runs your trained models (ViT/EfficientNet for crop classification, U-Net for moisture, CNN for stress) via PyTorch
   - Exposes REST endpoints like `/api/farm/{id}/analyze`, `/api/farm/{id}/fields`, `/api/farm/{id}/irrigation`
2. Replace the imports in `src/data/mockData.js` with `fetch()` calls to your backend
3. Use `rasterio` + `GDAL` server-side for satellite raster processing, and `PostgreSQL + PostGIS` to store field geometries

## 🎨 Customizing

- **Colors:** all defined as CSS variables in `public/index.html` (`:root` block) — change `--accent-green`, `--accent-orange` etc.
- **Farm data:** edit `src/data/mockData.js` to point to your actual demo farm/fields
- **Logo:** swap the 🚀 emoji badge in `TopBar.jsx` for your actual Stellar Spark logo image

## 🏆 Built For

ISRO Hackathon — Team **Stellar Spark**
*"From Space to Smart Farming."*
