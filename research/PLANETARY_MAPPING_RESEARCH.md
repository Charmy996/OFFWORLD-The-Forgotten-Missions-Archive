# OFFWORLD: Planetary Mapping & Tile Architecture Research

**Archive Subject:** Web-GIS & Planetary Surface Cartography for Mars and the Moon  
**Target Missions:** Opportunity, Spirit, InSight, Surveyor 3  
**Status:** Complete Technical Specification & API Reference  
**Document Classification:** Primary Technical Reference  

---

## 1. Executive Summary & Mapping Paradigm

Building a "Google Maps-like" explorer for planetary bodies (Mars and the Moon) requires departing from standard web cartography conventions. Standard web mapping engines (Google Maps, Leaflet default, Mapbox) assume **EPSG:3857 (WGS 84 / Pseudo-Mercator)**, which presumes an Earth ellipsoidal radius ($a = 6,378,137\text{ m}$) and a $-180^\circ$ to $+180^\circ$ longitude domain.

In contrast, planetary cartography uses:
1. **Mars Geodetic Standards:** IAU 2000 / IAU 2015 Mars Sphere ($R = 3,396,190\text{ m}$) or Bi-axial Spheroid ($a = 3,396,190\text{ m}, b = 3,376,200\text{ m}$), with **positive East longitude ($0^\circ$ to $360^\circ$)** and **Planetocentric latitude**.
2. **Moon Geodetic Standards:** IAU Mean Earth/Polar Axis system ($R = 1,737,400\text{ m}$).
3. **NASA Tile Systems:** OGC-compliant **WMTS (Web Map Tile Service)** and **XYZ Tile REST APIs** served directly by NASA's Solar System Treks infrastructure.

---

## 2. NASA Solar System Treks: Endpoints & Tile Service Architecture

NASA Jet Propulsion Laboratory (JPL) operates the **Solar System Treks Project** (SSTP), hosting petabytes of calibrated orbital mosaics for the Moon, Mars, Vesta, Titan, and other celestial bodies.

### 2.1 Mars Trek Tile Service Endpoint
NASA Mars Trek exposes an OGC-compliant RESTful WMTS endpoint with the following template:

```text
https://trek.nasa.gov/tiles/Mars/{Projection}/{LayerName}/1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.{ext}
```

#### Parameter Specifications:
- `{Projection}`:
  - `EQ` — Equirectangular (Global, cylindrical: $-180^\circ$ to $+180^\circ$ or $0^\circ$ to $360^\circ$, Lat $-90^\circ$ to $+90^\circ$)
  - `NP` — North Polar Stereographic
  - `SP` — South Polar Stereographic
- `{LayerName}`: Unique layer catalog ID from the Solar System Treks capabilities registry.
- `{Style}`: `default`
- `{TileMatrixSet}`: Standardized grid resolution identifier, universally **`default028mm`** on Trek servers (assuming a standardized 0.28 mm pixel display pitch).
- `{TileMatrix}`: Zoom level integer ($Z = 0, 1, 2, \dots$). At $Z = 0$, Mars is represented by two $256 \times 256$ tiles or a single tile depending on aspect ratio.
- `{TileRow}` / `{TileCol}`: Vertical ($Y$) and horizontal ($X$) tile matrix index.
- `{ext}`: `.jpg` (for photographic basemaps) or `.png` (for transparent overlays and elevation color ramps).

### 2.2 Verified Mars Trek Base Layers
The following layers are verified active on `trek.nasa.gov`:

| Layer Identifier | Description | Native Resolution | File Format |
| :--- | :--- | :--- | :--- |
| `Mars_MGS_MOLA_ClrShade_merge_global_463m` | MOLA Color Shaded Relief (Mars Global Surveyor) | 463 m/pixel | `.jpg` |
| `Mars_Viking_MDIM21_ClrMerge_global_232m` | Viking Orbiter Color Mosaic (MDIM 2.1) | 232 m/pixel | `.jpg` |
| `Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2` | Mars Odyssey THEMIS Daytime Infrared Global Mosaic | 100 m/pixel | `.jpg` |
| `Mars_MRO_CTX_Mosaic_Global_5m` | Mars Reconnaissance Orbiter Context Camera (selected regions) | 5 to 6 m/pixel | `.jpg` |
| `Mars_MGS_MOLA_DEM_mosaic_global_463m` | Digital Elevation Model (grayscale heights) | 463 m/pixel | `.png` / `.tif` |

**Direct Test URL (MOLA Zoom 0 Tile):**
```text
https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/0/0/0.jpg
```

---

### 2.3 Moon Trek Tile Service Endpoint
NASA Moon Trek uses the identical RESTful schema structured under the `Moon` directory:

```text
https://trek.nasa.gov/tiles/Moon/{Projection}/{LayerName}/1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.{ext}
```

#### Verified Moon Trek Base Layers:
| Layer Identifier | Description | Native Resolution | File Format |
| :--- | :--- | :--- | :--- |
| `LRO_WAC_Mosaic_Global_303ppd_v02` | Lunar Reconnaissance Orbiter Wide Angle Camera Global | ~100 m/pixel (303 pixels/deg) | `.jpg` |
| `Lola_ClrShade_Global_128ppd` | Lunar Orbiter Laser Altimeter (LOLA) Color Hillshade | ~237 m/pixel | `.jpg` |
| `LRO_NAC_Surveyor_3_Apollo_12_Mosaic` | LRO Narrow Angle Camera target mosaic over Surveyor 3 site | ~0.5 m/pixel | `.png` / `.jpg` |

**Direct Test URL (LRO WAC Zoom 0 Tile):**
```text
https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/0/0/0.jpg
```

---

## 3. USGS Astrogeology Science Center WMS Services

The USGS Astrogeology Science Center provides OGC Web Map Service (WMS) layers through its MapServer instance, providing an essential backup or alternative projection server:

- **Base WMS Service URL:**  
  `https://planetarymaps.usgs.gov/cgi-bin/mapserv`
- **Mars Equirectangular Mosaic Mapfile:**  
  `map=/maps/mars/mars_simp_cyl.map`
- **Mars WMS GetCapabilities Query:**  
  `https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map&service=WMS&request=GetCapabilities`
- **Moon WMS Mapfile:**  
  `map=/maps/earth/moon_simp_cyl.map`

---

## 4. Ultra-High Resolution Surface Imagery: HiRISE & LRO NAC

To enable seamless zooming from a planetary orbit view directly down to the landing site, high-resolution orbital imaging must be nested over the global basemaps.

### 4.1 MRO HiRISE (Mars Reconnaissance Orbiter)
- **Instrument:** High Resolution Imaging Science Experiment (University of Arizona / NASA JPL).
- **Resolution:** Up to **$25\text{ to }30\text{ cm/pixel}$** from 300 km orbital altitude.
- **Surface Coverage for OFFWORLD Sites:**
  - **Opportunity (Perseverance Valley / Endeavour Rim):**  
    Observation ID `ESP_058097_1775` (acquired Dec 2018 searching for Opportunity) and `ESP_018649_1775` (Cape Tribulation). Opportunity's rover deck and solar panels are visible as an elongated bright metallic signature casting a small shadow.
  - **Spirit (Home Plate / Troy):**  
    Observation ID `PSP_001513_1655` and `ESP_016335_1655`. Spirit is clearly resolved as a distinct pixel cluster stuck in the soft sulfate sand west of Home Plate.
  - **InSight (Elysium Planitia):**  
    Observation ID `ESP_058042_1845` (taken Dec 6, 2018). Clearly identifies the InSight lander, the heat shield, and the backshell with parachute on the smooth plain.
- **Data Access:** High-resolution JP2 files and orthorectified GeoTIFFs available via the [HiRISE University of Arizona PDS Catalog](https://hirise.lpl.arizona.edu/).

### 4.2 LRO NAC (Lunar Reconnaissance Orbiter Narrow Angle Camera)
- **Instrument:** LROC Narrow Angle Camera (Arizona State University / NASA Goddard).
- **Resolution:** **$0.5\text{ m/pixel}$**.
- **Surveyor 3 & Apollo 12 Coverage:**  
  Observation ID `M104662862R` and `M114607705R`. Shows Surveyor 3 resting inside Surveyor Crater, the Apollo 12 Lunar Module *Intrepid*, and the dark footprints/disturbed regolith paths walked by Pete Conrad and Alan Bean between the two spacecraft.

---

## 5. Rover Traverse Datasets: Formats & PDS Sources

### 5.1 Washington University in St. Louis (WUSTL) Analyst's Notebook
The NASA PDS Geosciences Node publishes the complete engineering telemetry and reconstructed ground traverses for Mars Exploration Rovers:
- **Opportunity Traverse Portal:** `https://an.rsl.wustl.edu/mer/merb/`
- **Spirit Traverse Portal:** `https://an.rsl.wustl.edu/mer/mera/`
- **Data Products:**
  - **Rover Motion Counter (RMC):** Records Site, Drive, and Sol index.
  - **Traverse Shapefiles (.shp, .dbf, .shx):** Coordinate polylines mapped to Mars IAU 2000 planetocentric coordinates.
  - **Sol-by-Sol Waypoint CSVs:** Includes Sol, Longitude ($0\text{--}360^\circ$), Latitude ($-90\text{ to }+90^\circ$), Elevation (m relative to Mars MOLA areoid), Site Number, Drive Number, and Cumulative Distance (m).

### 5.2 Opportunity Waypoint Trajectory (Sample Schema)
```json
{
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "sol": 0,
        "date_earth": "2004-01-25T05:05:00Z",
        "site_name": "Eagle Crater (Challenger Memorial Station)",
        "elevation_mola_m": -1440.2,
        "odometry_total_m": 0.0,
        "event_highlight": "Airbag touchdown inside crater"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-5.5266, -1.9462]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "sol": 5111,
        "date_earth": "2018-06-10T17:19:00Z",
        "site_name": "Perseverance Valley (Endeavour Rim)",
        "elevation_mola_m": -1218.4,
        "odometry_total_m": 45161.0,
        "event_highlight": "Final communication received during global dust storm"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-5.2200, -2.2400]
      }
    }
  ]
}
```

---

## 6. Client-Side GIS Architecture Evaluation

We evaluate four front-end mapping frameworks to determine which best serves OFFWORLD’s requirements:

| Framework | Planetary Projection Support | 3D Globe Mode | WMTS / Tile Performance | Learning Curve / 48-Hour Feasibility | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenLayers 10+** | **Outstanding** (custom `ol/proj/Projection` allows arbitrary planetary radii and $0\text{--}360^\circ$ bounds) | 2D primary; requires ol-cesium for 3D | Extremely high; native OGC WMTS & tilegrid support | **Very High** (Reliable, stable, zero CORS bugs with local tiles) | **Primary 2D Map Explorer Engine** |
| **Three.js (r160+)** | Spherical UV mapping (`THREE.SphereGeometry`) | **Native 3D** (Cinematic camera, custom shaders, atmosphere glow) | High for single spherical textures; complex for multi-resolution quadtree tiles | **High** (Standard WebGL; perfect for interactive landing sites & 3D rover models) | **Primary 3D Cinematic & Rover Model Engine** |
| **CesiumJS** | Outstanding (native support for custom Ellipsoid via `Ellipsoid.fromCartesian3`) | Native 3D photorealistic globe | Excellent terrain tile streaming (Quantized Mesh) | **Moderate to Low in 48 hrs** (Heavy bundle >4MB, complex token setup, steep debugging overhead) | **Secondary / Fallback** |
| **Leaflet 1.9** | Poor (heavily hardcoded to EPSG:3857 and Web Mercator; requires complex Proj4Leaflet patching) | None | Good | Moderate | **Not Recommended for Mars** |

### 6.1 Recommended Dual-Engine Architecture
For the 48-hour hackathon, we recommend a **hybrid two-stage architecture**:
1. **Macro Planetary Stage (Three.js):**  
   A photorealistic rotating Mars/Moon 3D sphere rendered with custom PBR surface shaders, dynamic sun lighting, atmospheric haze, and clickable landing site pins.
2. **Micro Surface Explorer Stage (OpenLayers or Three.js Detailed Site Scene):**  
   Clicking a pin triggers a cinematic camera zoom that transitions smoothly into an OpenLayers high-resolution HiRISE/MOLA canvas featuring the interactive rover route, or down into a localized Three.js 3D terrain viewer with the interactive rover model.

---

## 7. Practical OpenLayers Planetary Integration Specification

To correctly display NASA Mars Trek tiles in OpenLayers without distortion or projection clipping, the projection must be explicitly declared:

```typescript
// OpenLayers Mars Equirectangular Projection Definition
import Projection from 'ol/proj/Projection';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { getWidth } from 'ol/extent';

// Mars semi-major radius = 3,396,190 meters
// Extent: -180 to 180 degrees Longitude, -90 to 90 degrees Latitude
export const MarsEquirectangularProjection = new Projection({
  code: 'IAU2000:Mars_EQ',
  units: 'degrees',
  extent: [-180, -90, 180, 90],
  worldExtent: [-180, -90, 180, 90],
  global: true
});

// NASA Mars Trek WMTS URL Pattern
export const MARS_TREK_MOLA_WMTS_URL = 
  'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{TileMatrix}/{TileRow}/{TileCol}.jpg';
```

---

## 8. Network Resiliency & Hackathon Pre-Caching Strategy

> [!WARNING]
> Relying on live remote tile servers during a live hackathon demonstration carries severe risks:
> 1. NASA Trek servers occasionally implement aggressive rate limits or CORS header changes.
> 2. High-latency conference or home Wi-Fi can cause blank map tiles during judging.

### Recommended Hackathon Mitigation Strategy:
1. **Pre-cache Low-Resolution Global Mosaics:** Pre-download Zoom levels 0 through 3 (a total of under 64 tiles, $\approx 5\text{ MB}$) directly into the project's `/public/tiles/` folder.
2. **Targeted Micro-Cutouts:** Clip small $1024 \times 1024$ HiRISE GeoTIFFs/PNGs centered specifically on:
   - Eagle Crater and Perseverance Valley (Opportunity)
   - Home Plate (Spirit)
   - Elysium Station (InSight)
   - Surveyor Crater (Surveyor 3)
3. **Local Tile Fallback Logic:** Configure tile source loaders with fallback handlers that serve local cached tiles if the remote NASA endpoint returns HTTP 429, 503, or network timeout.
