import { projects } from "./todo.js";

function pushToStorage() {
    if (checkStorageAvailability()) {
        localStorage.setItem('storage', JSON.stringify(projects));
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