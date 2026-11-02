import { projects } from "./todo.js";

function pushToStorage(prop, value) {
    if (checkStorageAvailability()) {
        localStorage.setItem(prop, JSON.stringify(value));
    }
}

function checkStorageAvailability() {
    try {
        const experiment = 't minus one';
        window.localStorage.setItem(experiment, experiment);
        window.localStorage.removeItem(experiment);
        return true;
    } catch (error) {
        return false;
    }
}

export { pushToStorage }