import { storage } from "./storage.service.js";

export const locService = {
    getLocs,
    getLocationsForDisplay,
    removeLocation
}

const LOCATIONS_KEY = 'locationsDB'


const locs = [
    { id: 100, name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: Date.now(), updatedAt: Date.now() },
    { id: 101, name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: Date.now(), updatedAt: Date.now() }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getLocationsForDisplay() {
    const locsFromStorage = storage.load(LOCATIONS_KEY);
    if (!locsFromStorage) {
        storage.save(LOCATIONS_KEY, locs)
        return locs;
    } else return locsFromStorage;
}

function removeLocation(locId) {
    console.log(locId);
    const getLocIdx = locs.findIndex((location) => {
        return location.id === locId;
    })
    const remove = locs.splice(getLocIdx, 1)
    storage.save(LOCATIONS_KEY, locs)
}