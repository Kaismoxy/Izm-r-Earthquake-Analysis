-- =====================================================================
-- Safest Routing Analysis using pgRouting (Dijkstra Algorithm)
-- =====================================================================
-- This query calculates the shortest path between a starting point 
-- (e.g., user's current location) and a target point (e.g., safe assembly area).

SELECT * FROM pgr_dijkstra(
    -- 1. Define the network topology (edges/streets) for the routing engine
    'SELECT 
        ROW_NUMBER() OVER()::integer AS id, -- Generate a unique ID for pgRouting to process edges
        "u"::bigint AS source,              -- Starting node of the street segment
        "v"::bigint AS target,              -- Ending node of the street segment
        length AS cost                      -- Traversal cost (street length in meters)
     FROM "DepremAnalizi"."BornovaStreets"',
     
    -- 2. Define Start and End Points
    -- Note: These IDs (26835722 and 678937380) are placeholder examples. 
    -- In the web application, they will be dynamically provided by the user via Leaflet map.
    26835722,  -- Source Node ID (Example: User's location node)
    678937380, -- Target Node ID (Example: Nearest safe assembly point node)
    
    -- 3. Directionality setting
    false      -- Set to false assuming streets are bi-directional for pedestrian evacuation during an earthquake
);