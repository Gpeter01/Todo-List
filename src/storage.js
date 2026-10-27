import { projects } from "./todo.js";

function pushToStorage() {
    if (checkStorageAvailability()) {
        localStorage.setItem('storage', JSON.stringify(projects));
    }
}

function checkStorageAvailability() {
    try {
        console.log('I came down here');
        const experiment = 't minus one';
        window.localStorage.setItem(experiment, experiment);
        window.localStorage.removeItem(experiment);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export { pushToStorage }