# Izmir Earthquake Assembly Point Capacity Analysis

## 📌 Project Overview
This project focuses on the spatial analysis of emergency earthquake assembly points in Izmir, Turkey. The goal is to evaluate whether the existing assembly areas have sufficient capacity to accommodate the local population and to identify critical zones that fall outside the 350-meter safe walking distance. 

By combining geographic data with population statistics, this analysis aims to highlight areas that require additional emergency planning.

## 🛠️ Tools & Technologies Used
* **QGIS:** Visualizing spatial data, generating buffer zones, and mapping risk areas.
* **PostgreSQL & PostGIS:** Managing the spatial database and executing complex queries.
* **SQL:** Calculating demographic capacities and spatial relationships.

## 📊 Key Features & Analysis
* **Capacity Calculation:** Estimated the capacity of each assembly point using the standard metric of `2.5 square meters per person`.
* **Population Comparison:** Joined demographic data with assembly point capacities at the district level to calculate deficits or surpluses.
* **Buffer Analysis:** Created 350-meter accessibility buffers around assembly points to identify neighborhoods lacking immediate access.
* **Risk Zone Exclusion:** Identified assembly points intersecting with high-risk zones (e.g., fault lines) to ensure the analysis reflects truly safe areas.

## 📂 Repository Structure
* `sorgular.sql`: Contains the PostgreSQL/PostGIS scripts and Views (e.g., `Capacity_Analyse`) used for the database calculations.
* `README.md`: Project documentation.
* `image_4d1aa6.jpg`: Visual output of the QGIS spatial analysis showing safe zones and fault lines.

## 🚀 How to Use
1. Set up a local PostgreSQL database with the PostGIS extension enabled.
2. Run the queries inside `sorgular.sql` to generate the capacity analysis views.
3. Import your local spatial data (e.g., population layers, assembly points) into the database.
4. Connect QGIS to your PostgreSQL database to visualize the resulting tables.

---
*Created as part of a spatial data analysis and geographic information systems (GIS) portfolio.*
