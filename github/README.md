# Hydro Detailing Brisbane — 2-File GitHub Release

A complete, production-ready mobile car detailing website and booking platform in **exactly 2 files**:

1. **`app.py`** (Python Backend & Server)
   - Built with Python Standard Library (0 pip installs needed)
   - Handles web server static file hosting
   - Handles `POST /api/send-instagram-receipt`
   - Formats official receipt proofs and logs dispatches to `instagram_dispatches.json`
   - Integrates Instagram direct messaging to `@hydrodetailing.brisbane`

2. **`index.html`** (All-in-One Frontend: HTML + CSS + JavaScript)
   - High-end mobile detailing website for Greater Brisbane
   - Package pricing engine for Hatchbacks/Sedans, SUVs, and 4WDs
   - Multi-step interactive booking flow
   - Pro-tip screenshot advisory reminder
   - 2x Retina digital photo receipt generator (`<canvas>`) with PNG download
   - Direct Instagram sync and 1-click clipboard copy

---

## 🚀 How to Run

### Option 1: Run with Python Server (Recommended)
Open your terminal in the repository folder and run:
```bash
python3 app.py
```
Then open [http://localhost:8000](http://localhost:8000) in your web browser!

### Option 2: Run Without Any Server
Simply double-click `index.html` or open it in any browser (Chrome, Safari, Firefox, Edge). It works 100% out-of-the-box with client-side receipt generation and direct Instagram deep links.
