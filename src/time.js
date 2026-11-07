import { formatDistanceToNowStrict } from "date-fns";
function getDateOfThisMoment() {
    const dateInstance = new Date();
    const thisYear = String(dateInstance.getFullYear());
    const thisMonth = String(dateInstance.getMonth() + 1);
    const thisDay = String(dateInstance.getDay() + 1);

    const currentDate = `${thisYear}-${thisMonth}-${thisDay}`;
    return currentDate;
}

function getTimeOfThisMoment() {
    const dateInstance = new Date();
    const thisHour = String(dateInstance.getHours());
    const thisMinute = String(dateInstance.getMinutes());

    const currentTime = `${thisHour}:${thisMinute}`;
    return currentTime;
}

function getCurrentDate(dateString, timeString, spliceDateValue, spliceTimeString) {
    const currentDate = dateString.trim().split(spliceDateValue);
    const year = currentDate[0];
    const month = currentDate[1];
    const day = currentDate[2];

    // TIME
    const currentTime = timeString.trim().split(spliceTimeString);
    const hour = currentTime[0];
    const minute = currentTime[1];

    return {year, month, day, hour, minute};
}

function formatDate(date) {
    const currentDate = new Date(date.year, Number(date.month) - 1, Number(date.day), date.hour, date.minute);
    const mainDate = currentDate.toLocaleDateString('en-US', {dateStyle: 'full'});
    const mainTime = currentDate.toLocaleTimeString('en-US', {timeStyle: 'short'});
    const actualDate = `${mainDate} at ${mainTime}`;
    return actualDate;
}

function approximate(date) {
    const currentDate = new Date(date.year, Number(date.month) - 1, Number(date.day), date.hour, date.minute);
    const approximation = formatDistanceToNowStrict(currentDate);
    return `appoximately ${approximation}`;
}

export { getDateOfThisMoment, getTimeOfThisMoment, getCurrentDate, formatDate, approximate};