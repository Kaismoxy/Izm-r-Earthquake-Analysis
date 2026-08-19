-- Create or update the view for assembly point capacity analysis
CREATE OR REPLACE VIEW "DepremAnalizi"."Capacity_Analyse" AS

-- Define a Common Table Expression (CTE) to calculate the safe capacity per district
WITH capacityTable AS (

SELECT "district",
-- Calculate the total capacity by dividing the area by 2.5 (standard square meters per person)
SUM(area)/2.5 AS totalCapacity 
FROM "DepremAnalizi"."assemblyPoints"
-- Exclude any assembly points that are too close to active fault lines
WHERE NOT EXISTS (
SELECT 1
FROM "DepremAnalizi"."GemActiveFaults" WHERE
-- Check if the assembly point is within 500 meters of an active fault line
ST_DWithin("assemblyPoints".geom,"GemActiveFaults".geom,500)
)
-- Group the safe capacity results by district
GROUP BY "district"

)

-- Main query to calculate the population and find the capacity deficit
SELECT
"district_name", 
-- Calculate the total population by adding male and female populations
SUM("total_male_population"::integer+"total_female_population"::integer) AS totalPopulation,

-- Calculate the excess number of people by subtracting the safe capacity from the total population
SUM("total_male_population"::integer+"total_female_population"::integer) - MAX(totalCapacity) AS excessNumPeople


FROM "DepremAnalizi"."Population"
-- Join the calculated safe capacities with the population data using the district name
LEFT JOIN capacityTable ON "district"="district_name"
-- Group the final results by district name
GROUP BY "district_name";
;