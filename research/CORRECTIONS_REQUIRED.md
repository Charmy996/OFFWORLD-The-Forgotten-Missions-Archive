# OFFWORLD: Corrections & Adjustments Required

**Subject:** Actionable Correction Directives for OFFWORLD Research Corpus  
**Based on:** Formal Primary Source Verification Audit (`AUDIT_REPORT.md`)  
**Status:** Pre-Hackathon Modification Guide  
**Document Classification:** Primary Correction Directives  

---

## 1. Summary of Required Modifications

The audit verified 75% of claims directly, but identified 6 non-functional map layers, 1 3D asset location error, 1 commercial copyright violation, and necessary qualifications regarding team sizes and sonified audio. 

The following directives must be applied when finalizing the documentation and prior to hackathon development.

---

## 2. Document-by-Document Correction Directives

### 2.1 Modifications to `PLANETARY_MAPPING_RESEARCH.md`

#### A. Removal of Assumed / 404 Map Layer Identifiers
* **Issue:** 6 layer identifiers in the Mars and Moon Trek tables returned `HTTP 404 Not Found` during live endpoint testing.
* **Remove the following entries:**
  - `Mars_Viking_MDIM21_ClrMerge_global_232m` (HTTP 404)
  - `Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2` (HTTP 404)
  - `Mars_MRO_CTX_Mosaic_Global_5m` (HTTP 404)
  - `Mars_MGS_MOLA_DEM_mosaic_global_463m` (HTTP 404)
  - `Lola_ClrShade_Global_128ppd` (HTTP 404)
  - `LRO_NAC_Surveyor_3_Apollo_12_Mosaic` (HTTP 404)

#### B. Substitution with Verified Active Layers (HTTP 200 OK)
* **Insert the following verified working layer identifiers:**
  - `Mars_MGS_MOLA_ClrShade_merge_global_463m` — *MOLA Color Hillshade Global ($463\text{ m/px}$, JPEG, verified 200 OK)*
  - `Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw` — *MOLA / Mars Express HRSC High-Resolution Color Hillshade ($200\text{ m/px}$, JPEG, verified 200 OK)*
  - `mola_roughness` — *MGS MOLA Surface Roughness Overlay (PNG, verified 200 OK)*
  - `TES_Dust` — *Mars Global Surveyor Thermal Emission Spectrometer Dust Map (PNG, verified 200 OK)*
  - `LRO_WAC_Mosaic_Global_303ppd_v02` — *LRO Wide Angle Camera Global Lunar Basemap ($100\text{ m/px}$, JPEG, verified 200 OK)*

---

### 2.2 Modifications to `NASA_MEDIA_AND_3D_RESOURCES.md`

#### A. Correction of Surveyor 3 3D Model Source
* **Issue:** Surveyor 3's 3D model was incorrectly reported as residing in `github.com/nasa/NASA-3D-Resources`. Audit confirmed that repository only contains "Mars Global Surveyor".
* **Correction Directive:**
  - Update Surveyor 3 primary source from NASA-3D-Resources to the **Smithsonian 3D Digitization Program**:  
    *Model Source:* Smithsonian Institution, National Air and Space Museum (`3d.si.edu`)  
    *Catalog Item:* Hughes Aircraft Company Surveyor Lunar Lander 1/5 Scale Model (Item #A19720760000).  
    *Secondary Source:* NASA Scientific Visualization Studio (SVS ID 13072 Apollo 12 / Surveyor 3 terrain and lander reconstruction).

#### B. Exact GitHub Folder Names for NASA 3D Models
* **Issue:** Model paths were listed with simplified shorthand IDs (`mer-b-opportunity`, `insight_lander_deployed`).
* **Correction Directive:** Update with exact folder and file names as confirmed via GitHub API:
  - Opportunity: `3D Models/Mars Exploration Rover - Opportunity (MER-B)/Mars Exploration Rover - Opportunity (MER-B).glb` (8.4 MB)
  - Spirit & Opportunity Twin: `3D Models/Mars Exploration Rover - Spirit and Opportunity/`
  - InSight: `3D Models/InSight Cruise Lander/InSight Cruise Lander (arm deployed).glb` and `InSight Cruise Lander (panels deployed).glb`
  - Apollo Lunar Module: `3D Models/Apollo Lunar Module/Apollo Lunar Module.glb` (7.9 MB)

#### C. Qualification of InSight "Sound" Recordings
* **Issue:** Research described InSight audio as "humanity's first actual acoustic sound recordings of Martian wind."
* **Correction Directive:**
  - Clarify that InSight did **not** carry an electro-acoustic microphone (unlike Perseverance Rover, which arrived in 2021).
  - Explicitly label InSight's audio tracks as **sonified scientific data**: physical micro-vibrations recorded by the SEIS seismometer ($1\text{--}5\text{ Hz}$ infrasound) and APSS atmospheric pressure sensor, pitch-shifted up 2 octaves (or accelerated $100\times$) by JPL to make them audible to human ears.

#### D. Elimination of Commercial Copyright Track ("I'll Be Seeing You")
* **Issue:** Proposing to embed or stream Billie Holiday's 1944 recording of *"I'll Be Seeing You"* violates master recording copyright owned by Universal Music Group / Decca Records.
* **Correction Directive:**
  - Strictly prohibit bundling or playing the commercial sound recording in the application.
  - Retain the historical event in the narrative script (narrating that JPL beamed the song on Feb 12, 2019), but replace any background musical playback with an original royalty-free ambient drone or a public domain instrumental composition.

#### E. NASA Logo Usage Restriction
* **Correction Directive:** Explicitly state in the media section that the NASA "meatball" and "worm" logos cannot be used as an application icon or embedded in the UI header, per 14 CFR 1212.302, to prevent false implications of official NASA sponsorship.

---

### 2.3 Modifications to `COMPETITION_RULES_AND_SUBMISSION.md`

#### A. Team Size Qualification for Virtual "Universal Event"
* **Issue:** Document stated team size is "1 to 6 members" without noting event mode restrictions.
* **Correction Directive:**
  - Add specific governance clause: While local in-person events permit 1-person teams, the virtual **Universal Event** requires a minimum of **two (2) team members** to be eligible for global awards and global judging. Solo participants in the Universal Event will be ineligible for global advancement.

#### B. Mandatory Citation Warning
* **Correction Directive:** Elevate the prominence of the citation requirement: The official 2026 Space Apps terms state that failing to list every NASA open-source dataset, tile feed, and third-party code library in the submission form can result in immediate disqualification or stripping of awards.

---

### 2.4 Modifications to `CINEMATIC_STORYTELLING_RESOURCES.md`

#### A. Audio Playback Safety in Opportunity Script
* **Correction Directive:** Update Opportunity Sol 5111 audio design cue from:  
  *`[AUDIO: Billie Holiday's 'I'll Be Seeing You' plays]`*  
  to:  
  *`[AUDIO: Sub-bass drone rises. High-frequency DSN radio sweep tone beeps three times into silence]`*.

#### B. Provenance Tagging on User Interface
* **Correction Directive:** Add requirement to display clear UI status chips on media cards:
  - `[AUTHENTIC PHOTOGRAPH: PDS EDR]`
  - `[AUTHENTIC TELEMETRY: JPL RMC]`
  - `[SONIFIED SENSOR DATA: SEIS INFRASOUND]`
  - `[HISTORICAL RECONSTRUCTION: NASA SVS]`

---

### 2.5 Modifications to `SOURCE_REGISTER.md`

#### A. URL Updates & Replacements
* **Update Entry #13:** Change description from generic CAD models to exact verified GitHub file paths.
* **Add Entry for Smithsonian 3D:** Insert direct link to `3d.si.edu` for the Surveyor 1/5 engineering model (#A19720760000).
* **Update Entry #03 and #04:** Mark `Mars_MGS_MOLA_ClrShade_merge_global_463m` and `LRO_WAC_Mosaic_Global_303ppd_v02` as verified live with CORS headers.
* **Add Entry for Mars Express HRSC Blend:** Insert verified layer `Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw`.
