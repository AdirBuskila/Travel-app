import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'



window.app = {
    onSearch
}

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.renderLocationList = renderLocationList;
window.onRemoveLocation = onRemoveLocation;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    renderLocationList();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onSearch(ev) {
    if (ev) ev.preventDefault();
    const elInputSearch = document.querySelector('input[name=search]');
    console.log(elInputSearch);
}

function renderLocationList() {
    const locations = locService.getLocationsForDisplay();
    if (!locations) return;
    console.log('locations:', locations);
    // console.log(locations);
    const strHtmls = locations.map((location) => {
        console.log(location);
        return `<li onclick="onRemoveLocation(${location.id})">${location.name}<br /> Location:${location.lat}, ${location.lng}<br /> Created At:${location.createdAt} Updated At:${location.updatedAt}</li>`
    })
    document.querySelector('.locations-container').innerHTML = strHtmls.join('');

}

function onRemoveLocation(locId) {
    locService.removeLocation(locId);

}