const place = ol.proj.fromLonLat([113.39415707497179, -1.6915560033914807]);

const riauLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'assets/data/Buffer5kmApi.geojson'
    })
})


const pointLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'assets/data/apiKaltengFixx_FeaturesToJSO1.json'
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraticon',
            anchorYUnits: 'pixels',
            src: 'assets/icon/fire.png'
        })
    })
})



const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }), riauLayer, pointLayer
    ],
    view: new ol.View({
        center: place,
        zoom: 10,
    }),
});

//Menampilkan Checkbox
$("#titikApi").change(function () {
    if ($("#titikApi").is(':checked'))
        map.addLayer(pointLayer);
    else
        map.removeLayer(pointLayer);
})



//menampilkan popup 
var container = document.getElementById('popup'),
    content_element = document.getElementById('popup-content'),
    closer = document.getElementById('popup-closer');

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
}
//memunculkan popup overlay
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    offset: [0, -10]
});
map.addOverlay(overlay);
var fullscreen = new ol.control.FullScreen();
map.addControl(fullscreen);

//menjalankan event
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
    if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();

        var content = 'Kecamatan : <b>' + feature.get('Kecamatan') + '</b> <br>';
        content += 'Kabupaten : <b>' + feature.get('Kabupaten') + '</b>';

        content_element.innerHTML = content;
        overlay.setPosition(coord);

        console.info(feature.getProperties());
    }
});


