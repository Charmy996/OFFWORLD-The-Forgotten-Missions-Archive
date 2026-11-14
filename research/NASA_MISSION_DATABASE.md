# OFFWORLD: NASA Mission Database Dossier

**Archive Subject:** Forgotten Mechanical Explorers of the Moon and Mars  
**Mission Scope:** Opportunity (MER-B), Spirit (MER-A), InSight, and Surveyor 3  
**Status:** Complete Field Dossier for Hackathon Technical & Narrative Pipeline  
**Document Classification:** Primary Technical Reference  

---

## 1. Mission Specification Matrix

| Mission Parameter | Opportunity (MER-B) | Spirit (MER-A) | InSight (SEIS/HP3) | Surveyor 3 |
| :--- | :--- | :--- | :--- | :--- |
| **Target Body** | Mars (*Meridiani Planum*) | Mars (*Gusev Crater*) | Mars (*Elysium Planitia*) | Moon (*Oceanus Procellarum*) |
| **Launch Vehicle** | Delta II 7925H-9.5 | Delta II 7925 | Atlas V 401 | Atlas-Centaur AC-12 |
| **Launch Date (UTC)** | July 8, 2003 (03:18) | June 10, 2003 (17:58) | May 5, 2018 (11:05) | April 17, 1967 (07:05) |
| **Landing Date (UTC)** | Jan 25, 2004 (05:05) | Jan 4, 2004 (04:35) | Nov 26, 2018 (19:52) | April 20, 1967 (00:04) |
| **Landing Site Name** | Challenger Memorial Station | Columbia Memorial Station | InSight Landing Site | Surveyor Crater |
| **Landing Coordinates** | 1.9462° S, 354.4734° E | 14.5684° S, 175.4726° E | 4.5024° N, 135.6234° E | 3.015° S, 23.418° W (336.582° E) |
| **Final Resting Site** | Perseverance Valley (Endeavour) | "Troy" (West of Home Plate) | Elysium Planitia | Surveyor Crater slope (12°) |
| **Resting Coordinates**| 2.24° S, 354.78° E | 14.6016° S, 175.525° E | 4.5024° N, 135.6234° E | 3.015° S, 23.418° W (336.582° E) |
| **Mission Type** | Mobile Rover (6 wheels) | Mobile Rover (6 wheels) | Stationary Geophysical Lander | Stationary Soft Lander |
| **Design Lifespan** | 90 Sols (~92.5 Earth days) | 90 Sols (~92.5 Earth days) | 708 Sols (~1 Martian Year) | 1 Lunar Day (~14 Earth days) |
| **Actual Operational Lifespan** | 5,111 Sols (5,250 Earth days) | 2,210 Sols (2,269 Earth days) | 1,445 Sols (1,480 Earth days) | 14 Earth days active operational |
| **Total Traverse Distance** | 45.16 km (28.06 miles) | 7.73 km (4.80 miles) | 0.00 km (Stationary) | 0.00 km (Stationary) |
| **Last Downlink Sol / Date**| Sol 5111 / June 10, 2018 | Sol 2210 / March 22, 2010 | Sol 1445 / Dec 15, 2022 | May 4, 1967 (00:04 UTC) |
| **Mission Declared Ended** | February 13, 2019 | May 25, 2011 | December 21, 2022 | Late May 1967 (Recovered 1969) |
| **Human Re-contact** | None | None | None | **Apollo 12 (Nov 19, 1969)** |

---

## 2. Deep-Dive Mission Dossiers

### 2.1 Opportunity (MER-B) — "The Marathoner of Meridiani"

#### A. Mission Trajectory & Geographic Journey
- **Landing (Sol 1):** Bounced in its airbag cocoon and scored an interplanetary hole-in-one, rolling into **Eagle Crater** (22-meter diameter), exposing layered bedrock outcrops.
- **Traverse Milestones:**
  - *Eagle Crater (Sol 1–57):* Initial exploration and discovery of hematite spherules.
  - *Fram Crater (Sol 84):* Small impact crater inspection.
  - *Endurance Crater (Sol 95–315):* Drove down into the 130-meter crater to study deep rock stratigraphy.
  - *Erebus Crater (Sol 550–750):* Negotiated hazardous sand dunes; temporarily trapped in "Purgatory Dune" for 5 weeks.
  - *Victoria Crater (Sol 951–1630):* 750-meter-wide crater; explored duck-billed promontories (Duck Bay, Cape Verde).
  - *Endeavour Crater (Sol 2680–5111):* 22-km diameter ancient crater. Explored Cape York, Solander Point, Wdowiak Ridge, and finally drove down **Perseverance Valley** on the western rim.
- **Total Drive:** 45.16 km (28.06 miles), establishing the off-world driving record.

#### B. Scientific Payload & Breakthrough Discoveries
1. **Pancam (Panoramic Camera) & Microscopic Imager:** Discovered **"Blueberries"**—sub-centimeter hematite spherules formed inside wet sediment, providing unambiguous proof of liquid water on Mars.
2. **APXS (Alpha Particle X-Ray Spectrometer) & Mössbauer Spectrometer:** Confirmed presence of jarosite, an iron sulfate mineral requiring liquid acidic water.
3. **The "Homestake" Gypsum Vein (Cape York, 2011):** Located a bright, centimeter-wide mineral vein identified as pure gypsum (hydrated calcium sulfate). Unlike jarosite, gypsum precipitates from neutral-pH water, proving a past environment benign enough to support microbial life.
4. **Clay Minerals at Cape Tribulation:** Detected smectite clays predating the acidic period, hailing from Mars' Noachian era.

#### C. Engineering Degradation Milestones
- **Sol 400 (March 2005):** Right front steering actuator jammed at a 7-degree inward angle; rover driving routines updated to steer with rear wheels.
- **Sol 1502 (April 2008):** Robotic arm (IDD) shoulder azimuth joint motor stalled due to electrical resistance; arm heater left on permanently to prevent freeze-locking.
- **Sol 3800+ (2014):** Flash memory failure ("amnesia" cycles) caused automatic reboots; JPL switched Opportunity to operate entirely in RAM mode, transmitting all data daily before sleeping.
- **Power Degradation:** Solar output varied between ~900 Wh/day (after cleaning events) and ~250 Wh/day.

#### D. "The Last Signal" — Sol 5111
- **The Event:** On May 30, 2018, NASA's Mars Reconnaissance Orbiter (MRO) detected an atmospheric dust storm forming over Perseverance Valley. By June 6, the storm encircled the globe.
- **Atmospheric Opacity:** The atmospheric tau ($\tau$) rose from a normal 0.5 to exceeding 10.8—the highest ever measured on Mars. The sky was entirely blacked out at midday.
- **Power Plunge:** Solar panel generation dropped from 645 Wh on Sol 5090 to an estimated **22 Wh** on Sol 5111.
- **Final Transmission:** Received at 10:19 a.m. PDT (17:19 UTC) on June 10, 2018. It contained raw telemetry, battery charge status showing extreme depletion, and an incomplete, corrupted 8-line Pancam image of a pitch-black sky.
- **Myth vs. Reality:**
  - *The Myth:* Opportunity spoke the words: *"My battery is low and it's getting dark."*
  - *The Verified Fact:* The phrase was composed by science reporter Jacob Margolis on Twitter (@JacobMargolis) on June 13, 2018, summarizing what JPL project scientists John Callas and Bill Nelson told him regarding the telemetry. Opportunity's actual transmission was binary ASCII/hex packets reporting low bus voltage, high clock drift, and high atmospheric opacity.
- **The Recovery Campaign:** Over 8 months, JPL engineers sent >1,000 sweep-and-beep recovery commands through the Deep Space Network (DSN).
- **The Final Transmission to Mars:** On the night of February 12, 2019, JPL beamed Billie Holiday's *"I'll Be Seeing You"* through the Goldstone 70-meter dish. Opportunity never replied.
- **Official Retirement:** February 13, 2019, 11:00 PST, NASA Headquarters and JPL.

---

### 2.2 Spirit (MER-A) — "The Pioneer of Gusev"

#### A. Mission Trajectory & Geographic Journey
- **Landing (Sol 1):** Landed in **Gusev Crater**, a suspected ancient crater lake, but discovered a volcanic basalt plain rather than lakebed sediments.
- **Traverse Milestones:**
  - *Bonneville Crater (Sol 65):* 200-meter crater; floor showed no exposed water-worked bedrock.
  - *Journey to Columbia Hills (Sol 156):* 3-kilometer sprint across the plains toward the Columbia Hills.
  - *Husband Hill Summit (Sol 582, Aug 2005):* Ascended 107 meters to the crest of Husband Hill, offering panoramic views of Gusev.
  - *Home Plate (Sol 744 to 2210):* A layered, horseshoe-shaped plateau of volcanic/hydrothermal origin.
  - *Final Trap at "Troy" (Sol 1892, May 1, 2009):* Trapped in soft sulfate sand on the western edge of Home Plate.
- **Total Drive:** 7.73 km (4.80 miles).

#### B. Scientific Payload & Breakthrough Discoveries
1. **Hydrothermal Silica Beds (Sol 1152):** In March 2006 (Sol 779), Spirit's right-front wheel seized up completely. The team drove the rover backward, dragging the dead wheel. On Sol 1152, the dragging wheel carved a trench through the topsoil near Home Plate, exposing brilliant white soil that contained **90% pure amorphous silica**. On Earth, such deposits only form in hot springs or fumaroles—proving that ancient hydrothermal volcanic vents existed in Gusev, an ideal nursery for prebiotic chemistry.
2. **"Comanche" Outcrop Carbonates:** Found extensive magnesium-iron carbonate deposits, proving ancient non-acidic waters interacted with volcanic rocks.
3. **Dust Devil Cleaning Events:** Sol 420 (March 2005) saw Spirit capture real-time movies of dust devils scouring the plains; one blew clean the dust on Spirit's panels, boosting power from 60% to 93% overnight.

#### C. Engineering Degradation Milestones
- **Sol 18 (Jan 21, 2004):** Flash memory filesystem panic; crashed in continuous reboot cycle until re-formatted by JPL software engineers.
- **Sol 779 (March 13, 2006):** Right front drive wheel locked up permanently due to motor brush wear.
- **Sol 1892 (May 1, 2009):** The rover broke through an innocent-looking brittle crust into a hidden deposit of soft, powdery iron sulfate at "Troy". Repeated drive attempts dug the rover deeper to its axle.
- **Sol 2097 (Nov 21, 2009):** Right rear wheel motor failed, leaving Spirit with only four functional wheels.

#### D. "The Last Signal" — Sol 2210
- **The Event:** Unable to maneuver, Spirit could not be tilted toward the northern winter sun. The solar panel tilt stood at roughly 9 degrees south—away from the sun.
- **Power Collapse:** With southern winter arriving, available power plunged below 134 Wh/day.
- **Final Communication:** March 22, 2010 (Sol 2210). Spirit sent engineering data confirming it was preparing to shut down non-essential electronics and enter deep hibernation sleep.
- **The Silence:** In deep hibernation, Spirit's mission clock and heaters lost power when battery levels fell below threshold. Internal electronics cooled to temperatures below -55°C, likely fracturing solder joints and lithium-ion cells.
- **Recovery Campaign:** Over 1,200 recovery signals sent via DSN.
- **Official Retirement:** May 25, 2011.

---

### 2.3 InSight — "The Stethoscope of Mars"

#### A. Mission Profile & Geographic Location
- **Mission:** Interior Exploration using Seismic Investigations, Geodesy and Heat Transport.
- **Landing (Nov 26, 2018):** Smooth landing in **Elysium Planitia** ("the biggest backyard on Mars"), a flat, rock-free volcanic plain selected to ensure safe placement of surface instruments.
- **Landing & Final Coordinates:** 4.5024° N, 135.6234° E; Elevation: -2.613 km.
- **Nature of Station:** Fixed geophysical observatory; stationary lander.

#### B. Scientific Payload & Breakthrough Discoveries
1. **SEIS (Seismic Experiment for Interior Structure):** Ultra-sensitive French (CNES) seismometer placed directly on the Martian regolith with a protective wind and thermal shield (WTS).
   - Detected **1,318 marsquakes** over its 4-year lifespan.
   - Largest quake: Magnitude **4.7** monster marsquake on May 4, 2022 (Sol 1222), which reverberated through the crust for over 10 hours.
   - Identified meteoroid impacts creating fresh craters, cross-calibrated with MRO HiRISE orbital imagery.
2. **Core, Mantle, and Crust Discovery:**
   - Crust thickness: 20 to 39 km (divided into 2 or 3 distinct layers).
   - Mantle: Extends down to ~1,560 km.
   - Core: Discovered Mars' liquid metallic core is surprisingly large (radius ~1,830 km) and less dense than previously thought, containing a high percentage of light elements (sulfur, carbon, oxygen, hydrogen).
3. **Sounds of Mars:** InSight's APSS (Auxiliary Payload Sensor Suite) air pressure sensor and SEIS seismometer recorded the acoustic vibrations of Martian wind whistling over its solar panels on December 1, 2018, and recorded hundreds of dust devils passing overhead.
4. **HP3 ("The Mole"):** German (DLR) heat probe designed to burrow 5 meters underground. Stalled due to lack of soil friction in unexpectedly cemented "duricrust" and ended operations in January 2021.

#### C. Engineering Degradation Milestones
- **Dust Accumulation:** Elysium Planitia lacked cleaning dust devils. Sol 1 power generation: **~5,000 Watt-hours**.
- **Sol 900+:** Power dropped below 1,000 Wh.
- **The Regolith Trick (Sol 1050):** Engineers commanded InSight's robotic arm to scoop coarse sand and trickle it next to a solar panel on a windy day; bouncing sand grains knocked fine dust off, generating a 5% power bump and extending operations by months.
- **Sol 1300+:** Atmospheric dust storms in late 2022 coated the remaining panel area.

#### D. "The Last Signal" — Sol 1445
- **Power Plunge:** Power generation dropped below **285 Watt-hours/day**.
- **Final Communication:** December 15, 2022 (Sol 1445). Transmitted raw seismic data packets and engineering diagnostic logs via NASA's Mars Odyssey orbiter.
- **The Farewell Transmission:** On December 19, 2022, NASA shared the final image sent by InSight (taken Dec 11, 2022, showing the dust-choked seismometer and solar panel) with the message:
  > *"My power’s really low, so this may be the last image I can send. Don’t worry about me though: my time here has been both productive and serene. If I can keep talking to my mission team, I will — but I’ll be signing off here soon. Thanks for staying with me."*
- **Missed Passes:** Odyssey relays on Dec 18 and Dec 20 received no signal.
- **Official Retirement:** December 21, 2022.

---

### 2.4 Surveyor 3 — "The Ghost Visited by Apollo 12"

#### A. Mission Profile & Lunar Context
- **Program:** NASA Surveyor Lunar Soft Lander Program (precursor to Apollo).
- **Landing (April 20, 1967):** Landed in **Oceanus Procellarum** (*Mare Cognitum*).
- **Landing & Final Coordinates:** 3.015° S, 23.418° W (336.582° E); Crater diameter ~200 m, slope 12°.
- **Active Operational Life:** 14 Earth days (April 20 to May 4, 1967).
- **Landing Drama:** Highly reflective rocks confused the landing radar; the vernier thrusters failed to cut off at the scheduled 4.3-meter altitude. Surveyor 3 **bounced twice** on the Moon—first bounce 10 meters high, second bounce 3 meters high—before settling gently on the 12-degree crater wall.

#### B. Scientific Achievements
1. **First Soil Mechanics Surface Sampler:** Deployed an electric scoop on an pantograph arm, digging four trenches up to 18 cm deep. Verified the bearing strength of lunar soil was ~5 to 10 N/cm², proving that Apollo's Lunar Module would not sink into deep lunar dust.
2. **TV Camera System:** Transmitted **6,315 high-resolution television frames** to Earth, including views of Earth during a solar eclipse and color filter mosaics of the lunar landscape.

#### C. The First "Last Signal" — May 4, 1967
- As the Sun set over Oceanus Procellarum on May 3, 1967, lunar night temperatures dropped to -150°C.
- At 00:04 UTC on May 4, battery voltage collapsed below critical thresholds. The final TV frame faded into noise. Spacecraft systems froze and never recovered when sunlight returned on May 23.

#### D. The Apollo 12 Re-contact (November 19, 1969)
- **The Pinpoint Landing:** Astronauts **Pete Conrad** and **Alan Bean** piloted Lunar Module *Intrepid* to touch down just **180 meters (590 feet)** from the silent Surveyor 3 crater.
- **Human Inspection of an Abandoned Probe:** During their second moonwalk (EVA 2) on November 20, 1969, Conrad and Bean walked up to the silent probe. They observed:
  - White thermal paint had turned tan/brown due to solar ultraviolet radiation and solar wind sputtering.
  - The optical TV mirror was coated with a thin layer of lunar dust kicked up by the Apollo 12 landing thrusters.
  - Using cutting shears, they removed the **TV camera assembly, the soil sampler scoop, two lengths of aluminum structural tubing, and electrical wiring**, packing them into the lunar module sample containers.
- **The *Streptococcus mitis* Controversy:**
  - Back on Earth, NASA microbiologists analyzed the Surveyor 3 TV camera in a clean room and cultured 50–100 viable cells of the bacterium *Streptococcus mitis* from foam insulation inside the camera circuit board.
  - *The Scientific Debate:* Did Earth bacteria survive 2.5 years of hard vacuum, cosmic radiation, and temperature swings between -150°C and +120°C? Subsequent investigation by NASA scientist Leonard D. Cardenas in 2011 demonstrated that clean room airflow protocols and sterile gown procedures in 1969 were inadequate, making post-return human laboratory contamination during dissection far more probable than interplanetary survival.

---

## 3. Verified Facts vs. Popular Legends Matrix

| Subject | Popular Internet Myth / Trope | Scientifically Verified NASA Reality |
| :--- | :--- | :--- |
| **Opportunity Sol 5111** | Rover broadcasted the spoken sentence: *"My battery is low and it's getting dark."* | Telemetry data only: Engineering packets indicated bus voltage dropping, clock drift, $\tau > 10.8$, and a severely truncated, noisy Pancam exposure. The poetic sentence was coined on Twitter by reporter Jacob Margolis. |
| **Spirit Home Plate** | Spirit's wheel failure was a mission catastrophe that ended scientific output. | Dragging the seized right-front wheel excavated the top 10 cm of soil, exposing pure silica (90% SiO₂) that resulted in the mission's greatest discovery: ancient volcanic hydrothermal hot springs. |
| **InSight Farewell** | InSight took a selfie and composed its own emotional goodbye message. | The image was taken Sol 1438 (Dec 11, 2022); the text was authored by JPL Social Media and Public Outreach team members summarizing engineering reality. |
| **Surveyor 3 Bacteria** | *Streptococcus mitis* survived 2.5 years on the Moon, proving interplanetary panspermia. | Independent 2011 NASA audits demonstrated that laminar flow hoods and swab techniques during the 1969 MSC examination were contaminated by laboratory personnel during handling. |

---

## 4. Archival Links & Deep Space Coordinates

```text
========================================================================================
OFFWORLD MISSION COORDINATES & ARCHIVE LOCATORS
========================================================================================

OPPORTUNITY (MER-B)
Landing:      -1.9462° Lat,  354.4734° Lon (Planetocentric IAU 2000 Mars Sphere)
Final Rest:   -2.2400° Lat,  354.7800° Lon (Perseverance Valley, Endeavour Crater Rim)
PDS ID:       MER2-M-PANCAM-2-EDR-V1.0
Analyst URL:  https://an.rsl.wustl.edu/mer/merb/

SPIRIT (MER-A)
Landing:      -14.5684° Lat, 175.4726° Lon (Planetocentric IAU 2000 Mars Sphere)
Final Rest:   -14.6016° Lat, 175.5250° Lon ("Troy", Home Plate, Columbia Hills)
PDS ID:       MER1-M-PANCAM-2-EDR-V1.0
Analyst URL:  https://an.rsl.wustl.edu/mer/mera/

INSIGHT
Landing & Rest: +4.5024° Lat, 135.6234° Lon (Elevation -2613 m)
PDS ID:       INSIGHT-SEIS-EDR-V1.0 / APSS-EDR-V1.0
Analyst URL:  https://an.rsl.wustl.edu/insight/

SURVEYOR 3
Landing & Rest: -3.0150° Lat, 336.5820° Lon / 23.4180° W (Lunar Coordinate ME)
Apollo 12 LM:   -3.0124° Lat, 336.5780° Lon (180 meters North-West)
PDS Lunar:    https://pds-geosciences.wustl.edu/missions/surveyor/
========================================================================================
```
