import { locService } from "./loc.service.js";
export const mapService = {
    initMap,
    addMarker,
    panTo
}


var gMap;

function initMap() {
    return _connectGoogleApi()
        .then(() => {
            const myLatlng = { lat: -25.363, lng: 131.044 };
            gMap = new google.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: myLatlng,
            });
            // Create the initial InfoWindow.
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map add location!",
                position: myLatlng,
            });
            infoWindow.open(gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                infoWindow.close();
                var locationName = prompt('enter location name') || 'Location'
                var location = mapsMouseEvent.latLng.toJSON()
                var selectedLocation = {
                    id: Math.floor(Math.random() * 1000),
                    name: locationName,
                    location,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                }
                locService.updateLocs(selectedLocation);
                infoWindow = new google.maps.InfoWindow({
                    content: locationName,
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.open(gMap);
            });
        });
}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAqe-6FU4OLx0_pZCETur191dCTuZIcC64';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}