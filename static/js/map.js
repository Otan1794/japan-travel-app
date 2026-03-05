var infoPanel = document.getElementById("info-panel");
var map = L.map('map').setView([36.495299, 138.561512], 5);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap contributors &copy; Stadia Maps'
}).addTo(map);

fetch("/static/prefectures.geojson")
.then(response => response.json())
.then(data => {

function highlightFeature(e) {
    e.target.setStyle({
        weight: 3,
        color: '#000',
        fillColor: '#00bfff',
        fillOpacity: 0.7
    });
}

function resetHighlight(e) {
    japanLayer.resetStyle(e.target);
}

function onEachFeature(feature, layer) {

    layer.on({
        mouseover: function(e){
            highlightFeature(e);
            infoPanel.innerHTML = feature.properties.P;
        },

        mouseout: function(e){
            resetHighlight(e);
            infoPanel.innerHTML = "Hover over a prefecture";
        },

        click: function(e){
            infoPanel.classList.add("active");
        }
    });

}

    // Add GeoJSON layer
    var japanLayer = L.geoJSON(data, {
        style: {
            color: "#333",
            weight: 1,
            fillColor: "#ff4d4d",
            fillOpacity: 0.5
        },
        onEachFeature: onEachFeature
        
    }).addTo(map);

    // Fit map to Japan bounds
    map.fitBounds(japanLayer.getBounds());
    map.setMaxBounds(japanLayer.getBounds());
});