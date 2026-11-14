# OFFWORLD: Final Implementation Reference

**Target Event:** NASA International Space Apps Challenge 2026 (November 14–15, 2026)  
**Project:** OFFWORLD — The Forgotten Missions Archive  
**Tagline:** *"Every mission ends. Its discoveries remain."*  
**Document Purpose:** Definitive, audited technical specification and reference manual for use during the 48-hour development window.  
**Document Status:** Grounded Exclusively in Verified Primary Sources  

---

## 1. Verified Core Mission Data: Opportunity (MER-B)

The primary anchor mission for OFFWORLD is the Mars Exploration Rover *Opportunity* (MER-B). All values below are verified against NASA Planetary Data System (PDS) Geosciences Node records and official JPL mission status bulletins.

```text
========================================================================================
OPPORTUNITY (MER-B) VERIFIED MISSION RECORD
========================================================================================
Touchdown Date (UTC):         January 25, 2004 at 05:05 UTC (Sol 1)
Landing Site Name:            Challenger Memorial Station (Eagle Crater)
Landing Coordinates:          1.9462° S, 354.4734° E (IAU 2000 Mars Planetocentric)
                              [-1.9462° Lat, 354.4734° Lon (or 5.5266° W)]
Final Resting Site Name:      Perseverance Valley (Western Rim, Endeavour Crater)
Final Resting Coordinates:    2.2400° S, 354.7800° E (IAU 2000 Mars Planetocentric)
                              [-2.2400° Lat, 354.7800° Lon (or 5.2200° W)]
Planned Design Mission:       90 Sols (~92.5 Earth days)
Total Operational Lifespan:   5,111 Sols (5,250 Earth days / 14 years, 138 Earth days)
Final Odometry Traverse:      45.161 kilometers (28.062 miles)
Mission Declared Ended:       February 13, 2019 (NASA Headquarters / JPL)
========================================================================================
```

### 1.1 Sol 5111 "The Last Signal" Verified Chronology & Timestamps

> [!IMPORTANT]
> Do not combine different mission transmission events into a single invented timestamp. Camera exposure acquisition and final ground station carrier loss were separate, sequential events.

- **Event 1 — Pancam Exposure Acquisition on Mars (~09:30 a.m. PDT / 16:30 UTC, June 10, 2018 / Sol 5111):**  
  Opportunity pointed its Panoramic Camera (Pancam) toward the sun to measure atmospheric opacity in Perseverance Valley.
- **Event 2 — Final Downlink & Carrier Reception on Earth (10:19 a.m. PDT / 17:19 UTC, June 10, 2018):**  
  Deep Space Network (DSN) Goldstone Station 14 logged the final telemetry transmission packets and carrier lock before the signal was permanently lost.

#### A. Final Full-Frame Image vs. Subsequent Thumbnails (NASA Photojournal PIA22929 vs. PIA22930)
- **NASA Photojournal `PIA22929` (The Final Incomplete Full-Frame Image):**  
  Officially titled *"Opportunity's Last Message."* Captured using the left eye of the Pancam with its solar filter pointed toward the darkened Sun around ~09:30 a.m. PDT on Sol 5111. The image is nearly pitch black and heavily speckled with camera sensor noise. The transmission was abruptly interrupted when the rover lost power mid-downlink, leaving a solid black bar of missing scan lines across the bottom. This partial frame represents the final full-resolution image data ever received from Opportunity.
- **NASA Photojournal `PIA22930` (Subsequent Thumbnail Images):**  
  Captured a few minutes after PIA22929 by both the left and right Pancam eyes to gauge atmospheric tau. These smaller, highly compressed thumbnail frames **were successfully received on Earth**, showing a faint, ghostly blur of the blotted-out Sun. However, their corresponding full-resolution full-frame images were never transmitted because Opportunity lost power permanently.
- **Atmospheric Context (Verified):** The planet-encircling dust storm reduced atmospheric clarity to a record opacity ($\tau$, tau) exceeding **$10.8$** (nominal is $\approx 0.5$).

#### B. Telemetry Values & Verification Status
- **Atmospheric Opacity ($\tau > 10.8$):** **VERIFIED** via official NASA JPL mission status reports (June 10/13, 2018).
- **Solar Energy Generation ($\approx 645\text{ Wh/day}$ dropping to $\approx 22\text{ Wh/day}$):** **UNVERIFIED (Engineering Estimate).** Widely quoted by JPL team spokespersons in briefings, but not published as a validated primary PDS table record. **Exclude exact watt-hour figures from the Essential MVP interface.** Present the status qualitatively as *critical power collapse triggering low-power fault mode*.
- **System Bus Voltage:** **UNVERIFIED.** Exact numerical operating voltage at loss of signal was not released in NASA summary bulletins. Documented officially only as *system bus voltage dropped below low-power fault threshold*. **Exclude specific voltage numbers from the Essential MVP.**

#### C. Debunking the "Spoken Quote" Legend
- *The Legend:* Opportunity transmitted the spoken sentence: *"My battery is low and it's getting dark."*
- *Verified Fact:* Opportunity transmitted binary telemetry packets, not spoken words or text. Science journalist Jacob Margolis coined that poetic phrase on Twitter (@JacobMargolis, June 13, 2018) summarizing what JPL engineers explained. OFFWORLD must present the raw engineering reality alongside Margolis's poetic cultural paraphrase.

### 1.2 Key Scientific Discoveries (Verified Provenance)
1. **Eagle Crater "Blueberries" (Sol 1–57):** Hematite-rich mineral spherules that formed in standing, acidic liquid water.
2. **"Homestake" Gypsum Vein (Sol 2740):** A bright calcium sulfate mineral vein on the rim of Endeavour Crater precipitated from neutral-pH liquid water, proving an ancient environment hospitable to microbial chemistry.
3. **Noachian Clay Outcrops (Cape Tribulation, Sol 3800+):** Detection of ancient smectite clays predating the acidic sulfate era.

---

## 2. Tested & Verified NASA Planetary Map Tile Endpoints

Only two global equirectangular tile layers were verified via automated network requests to return `HTTP 200 OK` with valid MIME headers and `Access-Control-Allow-Origin: *` CORS access.

### 2.1 Mars Global Basemap (Tested 200 OK)
- **Base Service Template:**
  ```text
  https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{TileMatrix}/{TileRow}/{TileCol}.jpg
  ```
- **Exact Layer Identifier:** `Mars_MGS_MOLA_ClrShade_merge_global_463m`
- **Source Instrument:** Mars Global Surveyor (MGS) Mars Orbiter Laser Altimeter (MOLA)
- **Native Resolution:** $463\text{ meters/pixel}$ global shaded relief
- **Tile Format:** JPEG (`image/jpeg`)
- **Tile Matrix Set:** `default028mm`
- **Projection Extent:** Equirectangular (`EQ`), Simple Cylindrical ($-180^\circ$ to $+180^\circ$ Lon, $-90^\circ$ to $+90^\circ$ Lat)

### 2.2 Moon Global Basemap (Tested 200 OK)
- **Base Service Template:**
  ```text
  https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{TileMatrix}/{TileRow}/{TileCol}.jpg
  ```
- **Exact Layer Identifier:** `LRO_WAC_Mosaic_Global_303ppd_v02`
- **Source Instrument:** Lunar Reconnaissance Orbiter (LRO) Wide Angle Camera (WAC)
- **Native Resolution:** ~100 meters/pixel ($303\text{ pixels/degree}$) global photographic mosaic
- **Tile Format:** JPEG (`image/jpeg`)
- **Tile Matrix Set:** `default028mm`
- **Projection Extent:** Equirectangular (`EQ`), Simple Cylindrical ($-180^\circ$ to $+180^\circ$ Lon, $-90^\circ$ to $+90^\circ$ Lat)

> [!WARNING]
> All other layer identifiers previously tested (including `Mars_Viking_MDIM21`, `Mars_MRO_CTX_Mosaic_Global_5m`, and `Lola_ClrShade_Global_128ppd`) returned `HTTP 404 Not Found`. Do not query them during the hackathon.

### 2.3 OpenLayers WMTS Integration Rule (Coordinate Mapping)
NASA Solar System Treks WMTS REST endpoints follow the OGC WMTS schema:
`.../{TileMatrix}/{TileRow}/{TileCol}.jpg`
- `{TileMatrix}` = Zoom Level ($0, 1, 2, \dots$)
- `{TileRow}` = Vertical Tile Row Index ($Y$)
- `{TileCol}` = Horizontal Tile Column Index ($X$)

**Crucial OpenLayers Implementation Warning:**  
Standard slippy map / XYZ tile templates use `{z}/{x}/{y}`. **Do not pass `{z}/{x}/{y}` directly to NASA Trek endpoints.** Passing `{z}/{x}/{y}` swaps the $X$ and $Y$ coordinates, causing all tile requests to fail with HTTP 404 or return distorted coordinates.

In OpenLayers, configure an explicit `ol/source/WMTS` with an `ol/tilegrid/WMTS`, or supply an explicit `tileUrlFunction` mapping:
```typescript
// OpenLayers URL Coordinate Mapping Rule
// tileCoord[0] = Zoom (TileMatrix)
// tileCoord[1] = Column (TileCol / X)
// tileCoord[2] = Row (TileRow / Y)
tileUrlFunction: (tileCoord) => {
  const z = tileCoord[0];
  const col = tileCoord[1];
  const row = tileCoord[2];
  return `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/${z}/${row}/${col}.jpg`;
}
```

---

## 3. Verified NASA 3D Model Assets & Paths

Verified directly against the official NASA 3D repository (`https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models`):

| Hardware / Subject | Verified Repository Directory & File Path | Format | Native Size |
| :--- | :--- | :---: | :---: |
| **Opportunity (MER-B)** | `3D Models/Mars Exploration Rover - Opportunity (MER-B)/Mars Exploration Rover - Opportunity (MER-B).glb` | Binary glTF (`.glb`) | 8.4 MB |
| **Spirit & Opportunity Twin**| `3D Models/Mars Exploration Rover - Spirit and Opportunity/` | `.blend`, `.glb` | 9.1 MB |
| **InSight Mars Lander** | `3D Models/InSight Cruise Lander/InSight Cruise Lander (arm deployed).glb` | Binary glTF (`.glb`) | 12.1 MB |
| **Apollo Lunar Module** | `3D Models/Apollo Lunar Module/Apollo Lunar Module.glb` | Binary glTF (`.glb`) | 7.9 MB |

### 3.1 Crucial Distinction: Surveyor 3 3D Model
- **Repository Finding:** Surveyor 3 **does not exist** in the NASA-3D-Resources repository.
- **Smithsonian 3D Model:** A 3D model is hosted by the Smithsonian National Air and Space Museum (`https://3d.si.edu/object/3d/surveyor-lunar-lander-15-scale-model:a19720760000`, Catalog #A19720760000).
- **Physical Reality:** The Smithsonian asset is a **1/5-scale ground engineering evaluation model** manufactured by Hughes Aircraft Company for laboratory testing, **not the actual lunar flight article**.
- **Implementation Rule:** If used in OFFWORLD, this asset must be explicitly labeled:  
  `[HISTORICAL SCALE ARTIFACT: SMITHSONIAN 1/5-SCALE HUGHES ENGINEERING MODEL]`  
  Never present it as a 3D scan of the hardware currently standing on the Moon.

---

## 4. Media Provenance, Sensor Categorization & Licensing

### 4.1 Strict Mandatory UI Provenance Labels
To maintain scientific credibility and prevent public confusion, every media card in OFFWORLD must feature one of the following provenance chips:

1. `[AUTHENTIC PHOTOGRAPH: PDS EDR]` — For raw, uncalibrated, or calibrated optical frames (e.g., Pancam, Navcam, Hazcam).
2. `[AUTHENTIC TELEMETRY: JPL RMC]` — For coordinates, odometry counts, voltages, and thermal logs.
3. `[SONIFIED SENSOR DATA: SEIS INFRASOUND]` — For InSight "audio" tracks.
4. `[AUTHENTIC VOICE AUDIO: NASA ALSJ]` — For Apollo 12 astronaut communications.
5. `[HISTORICAL RECONSTRUCTION / SCALE ARTIFACT]` — For non-flight CAD models or museum scale replicas.

### 4.2 Distinguishing Acoustic Sensors from Sonifications
- **InSight Had No Acoustic Microphone:** InSight did not carry an audio microphone. What NASA released as "Sounds of Mars" (December 1, 2018) is **sonified physical micro-vibrations** detected by the SEIS seismometer ($1\text{--}5\text{ Hz}$ infrasound) and APSS air pressure sensors. JPL sped up the recording by $100\times$ and shifted it up two octaves into the human audible range.
- **Audio Authenticity Distinction:**
  - *InSight Sounds:* Processed scientific data sonification.
  - *Apollo 12 Audio:* Direct, genuine electro-acoustic analog recordings captured via helmet microphones and VHF transceivers.

### 4.3 Total Exclusion of Commercial Copyrighted Music
- **Billie Holiday Prohibited:** The historical fact that JPL beamed Billie Holiday’s 1944 recording of *"I’ll Be Seeing You"* to Opportunity on February 12, 2019, may be mentioned in narrative text. However, **the master sound recording must never be played or bundled in the application**. The recording is owned by Universal Music Group / Decca Records; unauthorized streaming violates copyright and disqualifies hackathon entries.
- **Approved Audio Beds:**
  - Ambient Space Textures: Incompetech / Kevin MacLeod (*"Deep Space"*, *"Spacial Winds"*), licensed under **Creative Commons Attribution 4.0 (CC-BY 4.0)** with required attribution.
  - Telemetry Clicks & Radio Fuzz: FreeSound.org audio tracks licensed under **CC0 1.0 Universal Public Domain**.
  - Spacecraft Audio: NASA Official SoundCloud (Public Domain).

### 4.4 NASA Branding Regulation: 14 CFR Part 1221
- **Governing Regulation:** **14 CFR Part 1221** (*The NASA Seal and Other Devices, and the Congressional Space Medal of Honor*).
- **Compliance Mandate:** The NASA "meatball" insignia, the NASA "worm" logotype, and the NASA seal **cannot** be incorporated into the OFFWORLD application header, favicon, or logo. 14 CFR § 1221.110 strictly forbids using NASA insignias on non-NASA web products to prevent false impressions of official NASA endorsement or authorship.

---

## 5. Official NASA Space Apps 2026 Competition Governance

All rules below are derived from official Space Apps 2026 governance documents (`spaceappschallenge.org`):

- **Event Window:** November 14–15, 2026.
- **Theme:** *"The Next Frontier"*.
- **Development Boundaries:**
  - All substantive coding, interface building, and component development must occur strictly **during the 48-hour event window**.
  - Pre-hackathon research, dataset compilation, and architectural planning are explicitly permitted.
  - Pre-existing open-source libraries (e.g. `three`, `ol`, `framer-motion`) are permitted, provided they are publicly available and cited.
- **Team Size Requirements:**
  - Teams may consist of **1 to 6 members**.
  - *Critical Universal Event Governance:* For local in-person events, 1-person teams are permitted. However, for participants registered in the virtual **Universal Event**, teams must have a **minimum of two (2) members** to be eligible for global judging.
- **Mandatory Open Data Citation:** All NASA open datasets, tile services, and third-party tools must be explicitly listed in the submission project form. Failure to properly cite data sources can result in disqualification or removal of awards.
- **AI / Machine Learning Usage Policy:**
  - AI tools (e.g., LLMs, Copilot) are permitted as productivity aids during the hackathon.
  - Teams must **fully disclose** all AI tools used in their project submission form.
  - Solutions consisting solely of unedited AI output without human originality and technical effort will be heavily penalized.
- **Judging Criteria (5 Equal Pillars):**
  1. *Impact (20%)* — Quality and importance of the problem solved.
  2. *Creativity (20%)* — Novelty and inventiveness of the approach.
  3. *Validity (20%)* — Scientific accuracy and authentic use of NASA data.
  4. *Relevance (20%)* — Direct alignment with the challenge statement.
  5. *Presentation (20%)* — Clarity of the 2-minute video or 7-slide deck.

---

## 6. Documented Uncertainties & Verified Gaps

To maintain strict scientific integrity, the following parameters remain **UNVERIFIED** and must not be guessed or silently fabricated:

1. **Exact Local Elevation of Opportunity at Sol 5111 Downlink:**  
   *Status:* **UNVERIFIED.** While the general elevation of Perseverance Valley is $-1,218\text{ m}$ relative to the MOLA datum, the exact local micro-topographical elevation at the Sol 5111 endpoint requires a high-resolution HiRISE DTM extraction not yet completed.
2. **Exact Opportunity Energy & Voltage Metrics on Sol 5111:**  
   *Status:* **UNVERIFIED.** Exact $22\text{ Wh/day}$, $645\text{ Wh/day}$, and bus voltage numerical readings are unverified in primary peer-reviewed PDS tables. Excluded from Essential MVP.
3. **Spirit Final Wheel Orientations at "Troy":**  
   *Status:* **UNVERIFIED.** Exact steering actuator angles for Spirit’s functional wheels when bogged down on Sol 1892 are not specified in available summary files; do not attempt to animate precise wheel angles.
4. **Surveyor 3 In-Situ Structural Mesh:**  
   *Status:* **UNVERIFIED.** No official flight-accurate, in-situ 3D mesh of Surveyor 3 resting inside Surveyor Crater exists in NASA's public repositories. Only the Smithsonian 1/5-scale ground test model is available.

---

## 7. Practical Hackathon Priority Matrix

```text
========================================================================================
OFFWORLD 48-HOUR HACKATHON FEATURE PRIORITY
========================================================================================

[ESSENTIAL MVP - MUST SHIP BY HOUR 30]
----------------------------------------------------------------------------------------
1. Opportunity 2D Surface Map (OpenLayers):
   - Configured with the tested MOLA tile endpoint:
     https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/
     1.0.0/default/default028mm/{TileMatrix}/{TileRow}/{TileCol}.jpg
   - Explicit tileUrlFunction mapping tileCoord[0] (Z), tileCoord[2] (Row), tileCoord[1] (Col).
2. Opportunity Reconstructed Traverse:
   - Vector polyline rendering Opportunity's verified 45.161-km route from Eagle Crater 
     to Perseverance Valley.
   - Milestone markers for Eagle Crater, Endurance Crater, Victoria Crater, and Endeavour Rim.
3. Opportunity Mission Documentary & Science Dossier:
   - Verified coordinates, mission lifespan (5,111 Sols), and verified discoveries 
     (hematite blueberries, gypsum vein, Noachian clays).
4. "The Last Signal" Chapter (Sol 5111):
   - Verified atmospheric opacity readout (Tau > 10.8).
   - Display of authentic interrupted final Pancam frame (PIA22929) alongside 
     clarification of subsequent thumbnail frames (PIA22930).
   - Reconciled timestamps: Exposure acquisition (~09:30 PDT) vs. ground carrier loss (10:19 PDT / 17:19 UTC).
   - Clarification of Margolis's poetic summary vs. engineering telemetry reality.
5. Audio Baseline:
   - Web Audio ambient background with explicit user interaction unlock ("Uplink Connect").

[OPTIONAL ENHANCEMENTS - HOURS 30 TO 40]
----------------------------------------------------------------------------------------
1. 3D Planetary Globes (Three.js):
   - Smooth rotating Mars and Moon spheres with clickable landing site pins.
   - (Moved from Essential MVP to Optional to ensure zero blockers for the 2D surface map).
2. Three.js Rover 3D Inspector:
   - Load official Opportunity `.glb` from NASA-3D-Resources using Draco compression.
   - Clickable hotspots on the Pancam mast and solar panels.
3. Secondary Mission Profiles:
   - Add Spirit (Gusev / Home Plate) and InSight (Elysium Planitia) markers and dossiers.
4. InSight Sonified Audio Player:
   - Play authentic pitch-shifted SEIS Martian wind recordings with correct provenance tag.
5. Telemetry HUD Visual FX:
   - Subtle CRT scanline overlay and signal degradation filter on Sol 5111.

[FEATURES TO ABANDON IF TIME IS SHORT - STRICT CUT LIST]
----------------------------------------------------------------------------------------
- Complex user authentication, backend databases, or persistent server infrastructure.
- Surveyor 3 3D visualization (avoid confusion over the Smithsonian 1/5-scale model).
- Dynamic queries to api.nasa.gov during runtime (use local static JSON exclusively).
- Procedural terrain meshes or physics-based rover driving engines.
- Audio sonification synthesizers (stick to pre-rendered CC-BY/CC0 audio files).
========================================================================================
```
