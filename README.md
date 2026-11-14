# OFFWORLD — The Forgotten Missions Archive
> **"Every mission ends. Its discoveries remain."**  
> *NASA International Space Apps Challenge 2026 Submission*

OFFWORLD is an immersive, cinematic planetary exploration archive dedicated to the abandoned mechanical pioneers of the Moon and Mars.

---

## Opportunity (MER-B) Working MVP

This initial release centers on the Mars Exploration Rover **Opportunity** (MER-B) and features:

1. **Interactive Mars Surface Map:**
   - Powered by OpenLayers with NASA's verified Mars Trek MOLA Color Shaded Relief basemap (`Mars_MGS_MOLA_ClrShade_merge_global_463m`).
   - Equirectangular projection using IAU 2000 Mars Planetocentric datums.
   - Real-time cursor coordinates in Martian areographic latitude and longitude.

2. **Verified Landing & Final Resting Beacons:**
   - **Touchdown (Sol 1):** Challenger Memorial Station in Eagle Crater (`-1.9462° S, 354.4734° E`).
   - **Final Rest (Sol 5111):** Perseverance Valley on the rim of Endeavour Crater (`-2.2400° S, 354.7800° E`).

3. **Reconstructed 45.161-km Traverse:**
   - Complete vector trajectory tracing the 15-year drive from Eagle Crater to Perseverance Valley.
   - 8 interactive waypoints featuring authentic PDS photographs, odometry counters, elevations, and scientific discoveries.

4. **Documentary Narrative Engine:**
   - Three-act chronicle (*"The Hole-in-One at Meridiani"*, *"The Great Marathon"*, and *"The Last Signal"*).
   - One-click camera navigation to landmarks along the route.

5. **"The Last Signal" Experience (Sol 5111):**
   - Record atmospheric opacity gauge ($\tau > 10.8$).
   - Critical power collapse status.
   - Side-by-side comparison of the final interrupted full-frame image (`PIA22929`) vs. subsequent thumbnails (`PIA22930`).
   - Reconciled sequential timestamps (Mars camera acquisition vs. Earth DSN carrier loss).
   - Historical fact-check debunking the viral Margolis quote vs. binary engineering telemetry.
   - Live DSN Goldstone terminal telemetry stream.

6. **Web Audio Atmospheric Uplink:**
   - Procedural Web Audio API synthesizer generating authentic Martian wind and sub-bass carrier hum (100% royalty-free and copyright compliant).

7. **Data Provenance & 14 CFR Part 1221 Compliance:**
   - Distinct provenance badges on all media cards.
   - Comprehensive source register drawer linking directly to NASA PDS, USGS, and Photojournal.

---

## Local Development & Execution

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
