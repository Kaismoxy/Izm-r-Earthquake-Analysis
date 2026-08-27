# Izmir Earthquake Assembly Point Capacity Analysis & Web Dashboard

## 📌 Project Overview
This project is a comprehensive spatial analysis and interactive web mapping tool for emergency earthquake assembly points in Izmir, Turkey. The primary goal is to evaluate whether the existing assembly areas have sufficient capacity for the local population and to identify critical zones outside the safe walking distances. 

Starting from raw spatial data processing in QGIS and PostgreSQL, the project culminates in a **fully interactive, dark-themed Location Intelligence Web Dashboard**. This dashboard allows users to dynamically explore safe zones, active fault lines, and neighborhood-level capacities.

## 🛠️ Tools & Technologies Used
* **Frontend / WebGIS:** HTML5, CSS3, JavaScript, Leaflet.js
* **Plugins:** Leaflet Control Geocoder (for address search)
* **Spatial Database:** PostgreSQL & PostGIS
* **Desktop GIS:** QGIS (for data preparation, spatial joins, and GeoJSON exports)
* **Version Control:** Git & GitHub

## 📊 Key Features & Analysis
* **Interactive Web Dashboard:** A premium dark-mode interface built with custom CSS filtering, providing a distraction-free, professional spatial analysis experience.
* **Smart Location Search:** Integrated Geocoder allowing users to instantly search for specific neighborhoods or districts and navigate the map.
* **Dynamic Pop-ups:** Assembly points feature dynamic information cards that pull real-time attribute data (District, Neighborhood) directly from the GeoJSON properties.
* **Layer Control System:** A custom-styled toggle menu allowing users to isolate specific layers (e.g., hiding/showing Active Faults, Assembly Areas, or Danger Zones).
* **Capacity & Buffer Analysis (Backend):** 
  * Calculated the capacity of each assembly point using the standard metric of `2.5 square meters per person`.
  * Created visual accessibility buffers (transparent green zones with fade effects) to identify neighborhoods lacking immediate access.
* **Risk Zone Exclusion:** Highlighted active fault lines (GEM data) and danger areas to ensure safe zones are accurately represented.

## 📂 Repository Structure
* `index.html` (or `IzmirMap.html`): The main frontend application containing the Leaflet map, geocoder, and UI design.
* `*.geojson`: Spatial data layers used in the web map (e.g., `assemblyPoints.geojson`, `BufferOfAssemblyPoints.geojson`, `GemActiveFaults.geojson`, `DangerAreas.geojson`).
* `sorgular.sql`: Contains the PostgreSQL/PostGIS scripts and Views (e.g., `Capacity_Analyse`) used for the backend database calculations.
* `README.md`: Project documentation.

## 🚀 How to Use
**To view the Web Dashboard:**
1. Clone this repository to your local machine.
2. Ensure all `.geojson` files are in the same directory as the HTML file.
3. Open  `IzmirMap.html` in any modern web browser. 
*(Note: You can also host this directly via GitHub Pages for public access).*

**To replicate the Database Analysis:**
1. Set up a local PostgreSQL database with the PostGIS extension enabled.
2. Run the queries inside `sorgular.sql` to generate the capacity analysis views.
3. Import your local spatial data into the database and connect via QGIS to visualize the raw tables.

---
*Created as part of a Location Intelligence and Geographic Information Systems (GIS) portfolio.*
