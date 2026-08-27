// Initialize the map centered on Izmir with a zoom level of 11
        var map = L.map('map').setView([38.4237, 27.1428], 11);

// Setup Leaflet Geocoder for location search
var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false, 
    suggestMinLength: 99,
    placeholder: "Search place..." 
})

// Event listener to zoom to the searched location's bounding box
geocoder.on('markgeocode', function(e) {
    var bbox = e.geocode.bbox; 
    map.fitBounds(bbox);       
});

// Append the geocoder to the custom header container
document.getElementById('geocoder-container').appendChild(geocoder.onAdd(map));

        
                // Add the CARTO Voyager basemap tile layer
                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_25b1_1_70c1bfa0155504a7fd8efec1', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
           

        }).addTo(map);

        // Object to store overlay layers for the layer control panel
        var overlayMap = {};

        // Fetch and render Assembly Points data from GeoJSON
        fetch('assemblyPoints.geojson')
        .then(answer=>answer.json())
        .then(AssemblyData=>{
         L.geoJSON(AssemblyData, {
            style: function (feature) {
              return {
                fillColor:"#28a745",
                color:"#1e7e34",
                weight:0.1,
                opacity:1,
                fillOpacity:0.7

              };
            
            },
            // Bind popups to each assembly point with district and neighborhood info
            onEachFeature: function (feature, layer) {

              var district = feature.properties.ILCE;
              var neighbourhood = feature.properties.MAHALLE;


                 var cardDesign = `
                    <div style="font-family: Arial; text-align: center;">
                        <h4 style="color: #2c3e50; margin-bottom: 5px;">Assembly Area</h4>
                        <p style="margin: 4px  0; color: #7f8c8d;"><b>District:</b> ${district}</p>
                        <p style="margin:4px  0; color: #7f8c8d;"><b>Neighborhood:</b> ${neighbourhood}</p>

                    </div>
                `;

                layer.bindPopup(cardDesign);
            }
         }).addTo(map);   
        });
        
        // Commented out: Fetch and render Boundary of Izmir data
       // fetch('BoundaryOfIzmir.geojson')
        //.then(answer=>answer.json())
     //   .then(BoundaryData=>{
       //  L.geoJSON(BoundaryData, {
         //   style: function (feature) {
           //     return {
             //       weight: 1,
               //     fillOpacity:0,
                 //   color:"#3388ff"
          //      }
           // }
        // }).addTo(map);   
       // });
        
        // Fetch and render buffer zones for Assembly Points
        fetch('BufferOfAssemblyPoints.geojson')
        .then(answer=>answer.json())
        .then(BufferData=>{
         var assemblyLayer= L.geoJSON(BufferData, { 
          style: function (feature) {
          return {
            fillColor:"#2ecc71",
            weight: 0,
            fillOpacity: 0.4
          }
        }
         }).addTo(map); 
         
         // Add the loaded layer to overlayMap for the layer control
         overlayMap["Assembly Areas"]= assemblyLayer;  
        });
        
        // Fetch and render Danger Areas data
        fetch('DangerAreas.geojson')
        .then(answer=>answer.json())
        .then(DangerAreaData=>{
        var dangerAreaLayer = L.geoJSON(DangerAreaData, {
          style: function (feature) {
            return {
              fillColor:"#EE4B2B",
              color:"#2c3e50",
              fillOpacity: 0.2,
              weight:0
            }
          }
         }).addTo(map); 
         
         // Add the loaded layer to overlayMap for the layer control
         overlayMap["Danger Areas"]= dangerAreaLayer;  
        });
        
        // Fetch and render Active Fault Lines data (GEM)
        fetch('GemActiveFaults.geojson')
        .then(answer=>answer.json())
        .then(FaultData=>{
         var faultLayer= L.geoJSON(FaultData, {
            style: function (feature) {
                return {
                    color:"#880808",
                    weight:1.5,
                    opacity:0.7,
                    dashArray:"10.10"
                };
            }
         }).addTo(map); 
         
         // Add the loaded layer to overlayMap for the layer control
         overlayMap["Active Faults"]= faultLayer;  
        });
        
        // Commented out: Fetch and render Province Borders data
        //fetch('ProvinceBorders.geojson')
        //.then(answer=>answer.json())
        //.then(ProvinceData=>{
         //L.geoJSON(ProvinceData, {
           // style:function(feature) {
             //   return {
               //     color:"#000000",
                 //   weight: 1,
                   // opacity: 0.7
                //} 
            //}
         //}).addTo(map);   
        //});
    
        

         // Initialize Leaflet layer control after a 1-second delay to ensure layers are populated
          setTimeout(function() {
    L.control.layers(null, overlayMap, { collapsed: true }).addTo(map);
}, 1000);
