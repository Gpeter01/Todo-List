import { isPast, isValid } from 'date-fns'


// PROJECTS DIALOG CHECK FOR STARTERS
function checkProjectName(value) {
    const string = value.trim();
    if (string.length === 0) {
        const info = document.querySelector('.info');
        info.textContent = 'Enter a project name.';
        return true;
    }
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == ' ') {
            const info = document.querySelector('.info');
            info.textContent = 'Your project name should be short and memorable.';
            return true;
        }
    }
    return false;
    //  YOUR PROJECT NAME SHOULD BE SHORT AND MEMORABLE, PART OF WHAT MAKES A GREAT PROJECT
}

function checkTodo(value, text) {
    const string = value.trim();
    if (string.length === 0) {
        const info = document.querySelector('.info');
        info.textContent = text;
        return true;
    }
    return false;
}

function dropdownCheck(value, text) {
    if (value === 'null') {
        const info = document.querySelector('.info');
        info.textContent = text;
        return true;
    }
    return false;
}

// TODO DIALOG CHECK
function dateCheck(value) {
    const date = value;
    const currentDate = new Date(date.year, Number(date.month) - 1, Number(date.day), date.hour, date.minute);
    if (!isValid(currentDate)) {
        const info = document.querySelector('.info');
        info.textContent = 'Choose a time and date';
        return true;
    }
    if (isPast(currentDate)) {
        const info = document.querySelector('.info');
        info.textContent = 'Choose a time in the future';
        return true;
    }
    return false;
}


export { dateCheck, checkProjectName, dropdownCheck, checkTodo }