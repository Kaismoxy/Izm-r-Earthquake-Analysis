import osmnx as ox
from sqlalchemy import create_engine
import geopandas as gpd

target_area="Bornova,Izmir,Turkey"

RoadNetwork=ox.graph_from_place(target_area,network_type='drive')
intersections,streets = ox.graph_to_gdfs(RoadNetwork)

streets.columns= [str(c) for c in streets.columns]
streets=streets.reset_index()
motor = create_engine('postgresql://postgres:1234@localhost:5432/postgres')

streets.to_postgis(name='BornovaStreets', 
con=motor,
schema='DepremAnalizi',
if_exists='replace',
index=False)
print("Compeleted.")