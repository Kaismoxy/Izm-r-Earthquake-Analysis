CREATE OR REPLACE VIEW "DepremAnalizi"."Capacity_Analyse" AS

WITH capacityTable AS (

SELECT "ILCE",
SUM(area)/2.5 AS totalCapacity 
FROM "DepremAnalizi"."assemblyPoints"
GROUP BY "ILCE"

)

SELECT
"ILCE_ADI", 
SUM("NUFUS_ERKEK_TOPLAM"::integer+"NUFUS_KADIN_TOPLAM"::integer) AS totalPopulation,

SUM("NUFUS_ERKEK_TOPLAM"::integer+"NUFUS_KADIN_TOPLAM"::integer) - MAX(totalCapacity) AS excessNumPeople


FROM "DepremAnalizi"."Population"
LEFT JOIN capacityTable ON "ILCE"="ILCE_ADI"
GROUP BY "ILCE_ADI";
;




