# OFFWORLD: The Forgotten Missions Archive

NASA International Space Apps Challenge 2026 Submission

OFFWORLD is an immersive planetary exploration chronicle dedicated to humanity's longest-operating extraterrestrial surface missions. Built on verified NASA and ESA telemetry and calibrated planetary cartography, OFFWORLD reconstructs the surface expeditions of robotic explorers across Mars, the Moon, Venus, and Titan.

---

## Architecture and Key Capabilities

### 1. 2D Planetary Stage and Rover Catalog
- Interactive 2D planetary views for Mars, The Moon, Venus, and Titan.
- Authentic surface cartography, topographic relief, and landing site beacons.
- Surface locations for Opportunity (Meridiani Planum), Spirit (Gusev Crater), InSight (Elysium Planitia), Viking 1 (Chryse Planitia), Surveyor 3 (Oceanus Procellarum / Apollo 12 site), Lunokhod 1 (Mare Imbrium), Venera 13 & Venera 9 (Venus), and Huygens (Titan).
- In-page aesthetic mission chronicle popups with handwritten field stories and verified metrics.

### 2. Opportunity (MER-B) Surface Traverse Map
- Powered by OpenLayers with NASA's verified Mars Trek MOLA Color Shaded Relief basemap (`Mars_MGS_MOLA_ClrShade_merge_global_463m`), capped at native zoom 7 for smooth upscaling.
- Equirectangular projection using IAU 2000 Mars Planetocentric datums.
- Real-time cursor coordinates in areographic latitude and longitude.
- Complete 45.161-kilometer reconstructed vector trajectory from Eagle Crater to Perseverance Valley.
- Non-overlapping waypoint labels and responsive layout.

### 3. Verified Landing and Resting Coordinates
- **Touchdown (Sol 1):** Challenger Memorial Station in Eagle Crater (`-1.9462° S, 354.4734° E`, Jan 24, 2004 PST / Jan 25, 2004 05:05 UTC) [Exact, PDS RMC Site 000].
- **First Marathon (Sol 3968):** Surpassed 42.195 km on March 24, 2015 along the rim of Endeavour Crater.
- **Final Resting Site (Sol 5111):** Perseverance Valley on the rim of Endeavour Crater (`-2.2400° S, 354.7800° E`) [Approximate, reconstructed].

### 4. Verified NASA Photojournal Imagery
All photographic assets have been audited against NASA Jet Propulsion Laboratory Photojournal archives:
- **PIA18885:** Clues to wet history in texture of Martian rock at Eagle Crater (Pancam and Microscopic Imager).
- **PIA06739:** Opportunity catches its own shadow on Sol 180 during plains traverse.
- **PIA09104:** Panorama from "Cape Verde" promontory rising over the floor of Victoria Crater.
- **PIA16703:** Matijevic Hill panorama at Cape York (Endeavour Crater rim; discovery of ancient smectite clay minerals).
- **PIA19158:** Opportunity's Marathon Journey: traverse map and vista overlooking Marathon Valley.
- **PIA22909:** Opportunity's Legacy Pan (True Color) 360-degree panorama in Perseverance Valley.
- **PIA22930:** Subsequent atmospheric tau thumbnails successfully received via orbiter relay.
- **PIA22929:** "Opportunity's Last Message", the final incomplete Pancam frame cut off before completion.

### 5. Sol 5111 "The Last Signal" Archive
- Reconciled sequential timeline:
  - Mars Pancam exposures at ~9:30 and ~9:33 a.m. PDT (June 10, 2018).
  - Mars Reconnaissance Orbiter (MRO) UHF relay pass at ~9:45 a.m. PDT.
  - Earth ground station reception at ~10:05 a.m. PDT (transmission stopped before the image finished).
- Power state: low-power fault mode / catastrophic power collapse as solar insolation was choked by the planet-encircling dust storm.
- Atmospheric opacity (tau) measured at 10.8 (one NASA graphic cites 10.5).
- Operating temperature near -29 °C.
- Documented team assumption: by June 12, 2018, battery levels depleted, triggering low-power sleep mode with mission clock.
- NASA Fact-Check Matrix: side-by-side verification debunking popular online myths regarding Opportunity, Spirit, InSight, and Surveyor 3.
- Clarification that science journalist Jacob Margolis coined the poetic summary on Twitter on June 13, 2018, while Opportunity transmitted raw binary engineering packets.

### 6. Interactive Rover Story Chronicles & Narration Audio Engine
- **3-Act Narrative Structure:** Deep documentary-grade story arcs (Act I: Landing & First Footprints, Act II: The Odyssey & Science, Act III: The Silent Farewell / Monument) covering robotic surface explorers across Mars, Moon, Venus, and Titan.
- **Documentary Voice Narration:** Integrated browser text-to-speech (not a recorded voice) configured with measured cadence (pitch: 0.82, speed: 0.88), real-time word tracking, speech multiplier, and animated sound waveform.
- **Dynamic Thematic Modes:** Live switchable styling themes (`Amber CRT`, `Cyan Telemetry`, `Stealth Dark`, `Archival Gold`) adjusting glowing borders, telemetry scanlines, and buttons.
- **Hardware Failure Anatomy:** Deep engineering diagnostic dossiers detailing historical component failures and remote recovery workarounds (Spirit's jammed wheel motor, Opportunity's steering actuator jam and flash memory wear-out, Curiosity's punctured aluminum wheels, Venera 13's 89-atm pressure limits).
- **Acoustic Telemetry Synthesizer:** Real-time Web Audio API frequency generator. Telemetry chirps and ambient soundbeds are synthesized in your browser (Web Audio), not a NASA recording.
- **Mission Switcher & Citation Exporter:** Explorer switching with automated academic citation copying.

### 7. Audio Architecture and Compliance
- Procedural Web Audio API synthesizer: telemetry chirps, Martian wind textures, and carrier drones are synthesized in your browser (Web Audio), not a NASA recording. Spoken narration uses browser text-to-speech (not a recorded voice).
- 100% royalty-free and copyright compliant. Commercial recordings (including Billie Holiday's master recording of "I'll Be Seeing You") are strictly excluded. Press accounts reported Billie Holiday's song was transmitted or played during final attempts, but NASA's official release does not mention the song; final recovery commands went out Feb 12, 2019 via the 70-meter Goldstone antenna.
- Conforms to NASA Regulation 14 CFR Part 1221 (no unauthorized NASA logos or implied endorsements).

---

## Data Sources and Credits

- **NASA Solar System Treks:** Mars Orbiter Laser Altimeter (MOLA) Color Shaded Relief global equirectangular tile service (`Mars_MGS_MOLA_ClrShade_merge_global_463m`), NASA Jet Propulsion Laboratory / Goddard Space Flight Center ([trek.nasa.gov](https://trek.nasa.gov/)).
- **NASA Planetary Data System (PDS) Analyst's Notebook:** Mars Exploration Rover Opportunity (MER-B) rover motion counter (RMC) archives, sol-by-sol traverse telemetry, and science instrumentation records, Washington University in St. Louis ([an.rsl.wustl.edu/mer/merb/](https://an.rsl.wustl.edu/mer/merb/)).
- **NASA Jet Propulsion Laboratory Photojournal:** Calibrated imaging products including `PIA18885` (Eagle Crater Rock Texture), `PIA06739` (Sol 180 Shadow), `PIA09104` (Victoria Crater Cape Verde), `PIA16703` (Matijevic Hill Clay Minerals), `PIA19158` (Marathon Journey), `PIA22909` (Legacy Panorama), `PIA22930` (Atmospheric Tau Thumbnails), and `PIA22929` (Opportunity's Last Message) ([photojournal.jpl.nasa.gov](https://photojournal.jpl.nasa.gov/)).
- **14 CFR Part 1221 Compliance Note:** OFFWORLD is an independent educational hackathon submission developed for the NASA International Space Apps Challenge 2026. Pursuant to 14 CFR Part 1221 (*The NASA Seal and Other Devices*), official NASA insignias, seals, and logotypes are not utilized as application branding or to imply agency endorsement.

---

## AI Tools Used

In full compliance with NASA Space Apps Challenge AI disclosure rules:
- **Antigravity** (Google DeepMind agentic coding assistant): Autonomous research synthesis, primary source auditing, code implementation, and build verification.
- **Claude** (Anthropic): Pre-hackathon research ideation, narrative structuring, and technical design review.

---

## Local Development and Build Verification

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run TypeScript and production build verification
npm run build
```
