am = true;

function startTime() {
    const today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    h = chechHour(h);
    m = checkTime(m);
    document.getElementById('clock').innerHTML =  h + ":" + m + " " + amPm();
    setTimeout(startTime, 1000);
}

function amPm() {
    if (am) return "AM";
    else return "PM";
}

function chechHour(i) {
    if (i > 12) {
        am = false;
        return i - 12;
    }
    else if ( i == 12) {
        am = false;
        return i;
    }
    else {
        am = true;
        return i;
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

startTime();