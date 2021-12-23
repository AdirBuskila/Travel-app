import { storageService } from "./storage.service.js";
import { utilService } from "./utils.service.js";


export const locService = {
    getLocs,
    getLocationsForDisplay,
    removeLocation,
    updateLocs,
    getLocationWeather
}

const LOCATIONS_KEY = 'locationsDB'


const locs = [
    createLoc('Greatplace', 32.047104, 34.832384),
    createLoc('Neveragain', 32.047201, 34.832581)
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function createLoc(name, lat, lng) {
    return {
        id: utilService.getRandomId(),
        name,
        lat,
        lng,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
}


function updateLocs(obj) {
    locs.push(obj);
    storageService.save(LOCATIONS_KEY, obj)
}


function getLocationsForDisplay() {
    const locsFromStorage = storageService.load(LOCATIONS_KEY);
    if (!locsFromStorage) {
        storageService.save(LOCATIONS_KEY, locs)
        return locs;
    } else return locsFromStorage;
}

function removeLocation(locId) {
    console.log(locId);
    const getLocIdx = locs.findIndex((location) => {
        return location.id === locId;
    })
    const remove = locs.splice(getLocIdx, 1)
    storageService.save(LOCATIONS_KEY, locs)
}

function getLocationWeather(lng = 34.832384, lat = 32.047104) {
    const WEATHER_KEY = '677ccbb3d27a12747fb3d8b7e784cab6'
    axios.get(`api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lng}}&units={metric}&appid={${WEATHER_KEY}}`);
}