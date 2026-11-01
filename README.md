# Cygnus AI Labs — AI Automation & Intelligence

Cygnus AI Labs builds production-grade AI automation and intelligence systems: software that takes real work off human hands today — with a serious, step-by-step path toward machines that plan, reason, and act over longer horizons.

---

## Project Structure

```
cygnus-intel/
├── frontend/                     # React 19 single-page application & showcase
│   ├── public/
│   │   ├── brand/                # Official Cygnus logos and emblem marks
│   │   └── landing/              # Cohesive static visual landing experience
│   ├── src/
│   │   ├── components/           # UI components (Hero, Nav, SignalAtlas, etc.)
│   │   ├── data/                 # Data single-source-of-truth (projects, careers, services)
│   │   ├── pages/                # Multi-page routes (HomePage, ServicePage, CareersPage)
│   │   ├── index.css             # Tailwind base styles, typography & UI variables
│   │   └── App.js                # App router and layout wrapper
│   ├── craco.config.js           # Webpack alias & Tailwind configuration
│   └── package.json              # Frontend scripts & dependencies
├── backend/                      # FastAPI service template
│   ├── server.py                 # FastAPI application
│   └── requirements.txt          # Python dependencies
└── memory/                       # Architecture documents & PRD
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Yarn** or **npm**
- **Python**: 3.10+ (for backend service)

### 1. Frontend Setup

Navigate into the `frontend` directory and install dependencies:

```bash
cd frontend
yarn install
# or: npm install
```

Start the React development server:

```bash
yarn start
# or: npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
yarn build
# or: npm build
```

The static landing page is accessible directly via [http://localhost:3000/landing/index.html](http://localhost:3000/landing/index.html).

### 2. Backend Setup (Optional)

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Health check endpoint: `http://localhost:8000/api/`

---

## Key Features & Audit Corrections

1. **Signal Atlas (`frontend/src/components/SignalAtlas.js`)**: Interactive project showcase driven by `src/data/projects.js`, providing the anchor target `#work` for seamless in-page navigation. All sample projects are labeled with visible `SAMPLE` badges.
2. **Global Styles (`frontend/src/index.css`)**: Restored Tailwind CSS base, components, utilities, custom typography (`f-display` Archivo and `f-mono` IBM Plex Mono), link underlines, service SVG animations, and return-to-top controls with reduced-motion support.
3. **Cohesive Landing Page (`frontend/public/landing/index.html`)**: Linked directly to the local `style.css` stylesheet, corrected all hash navigation, removed unverified customer claims and client logos in favor of sample pilot tags, and ensured cross-page links cleanly return to the React app.
4. **Environment Security**: Root and frontend `.gitignore` properly ignore `.env`, `.env.*`, credentials, and sensitive artifacts.
5. **Careers Navigation**: Fixed router hash effect dependency to trigger smooth scrolling to `#open-roles` upon navigation.
6. **Telemetry & Script Review**: Removed third-party tracking scripts and external telemetry endpoints.

---

## Placeholders to Fill Before Public Release

- **Company Story**: Update founding team details and story in `PointOfView.js`.
- **Verified Client Case Studies**: Update entries in `src/data/projects.js` and set `sample: false` when approved.
- **Active Job Openings**: Update `src/data/careers.js` when hiring positions are live.
- **Social Media Profiles**: Supply real profile URLs for LinkedIn, Instagram, and X in `ReturnTop.js` (`SOCIALS` array) and `public/landing/index.html`.
- **Cygnus Agent Destination**: Connect the AI Agent button in the floating return-to-top control.

---

## License & Attribution

Copyright © 2026 Cygnus AI Labs. All rights reserved.
Emblem mark and logos are proprietary assets of Cygnus AI Labs.
