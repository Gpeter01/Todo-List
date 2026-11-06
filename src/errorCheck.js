import {isValid, isFuture} from 'date-fns'

function dateCheck(value) {
    const date = value;
    const currentDate = new Date(date.year, Number(date.month) - 1, Number(date.day), date.hour, date.minute);
    if (!isValid(currentDate)) {
        return;
    }
    if (!isFuture(currentDate)) {
        return;
    }
}

export { dateCheck }