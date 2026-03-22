var infoPanel = document.getElementById("info-panel");
var infoTitle = document.getElementById("info-title");
var infoContent = document.getElementById("info-content");
var map = L.map('map').setView([36.495299, 138.561512], 5);

var prefectures = {
    "Hokkaidō (北海道)": [],
    "Aomori (青森県)": [],
    "Iwate (岩手県)": [],
    "Miyagi (宮城県)": [],
    "Akita (秋田県)": [],
    "Yamagata (山形県)": [],
    "Fukushima (福島県)": [],
}

function addNote() {
    const ul = document.getElementById("notes");

    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "+";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type here...";

    // Each button gets its own behavior
    button.onclick = function () {
        if (button.textContent === "+") {
            // Save the note
            const text = input.value.trim();
            if (text === "") return;

            input.value = text;
            input.disabled = true;

            button.textContent = "-";
            addNote();
        } else {
            // Delete the note
            li.remove();
        }
    };

    li.appendChild(button);
    li.appendChild(input);

    ul.appendChild(li);
}

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
                infoTitle.innerHTML = feature.properties.P;
            },

            mouseout: function(e){
                resetHighlight(e);
                infoTitle.innerHTML = "Hover over a prefecture";
            },

            click: function(e){
                infoPanel.classList.add("active");
                console.log(feature.properties.P);

                infoContent.innerHTML = "<ul id='notes'></ul>";
                addNote();
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