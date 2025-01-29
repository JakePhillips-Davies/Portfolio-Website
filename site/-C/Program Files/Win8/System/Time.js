export class Time {
    static time;
    static GetTime() { return Time.time; }
    static timeoutID;
    static endTime() {
        clearInterval(this.timeoutID);
    }
    static StartTime() {
        Time.timeoutID = setInterval(Time.startTime, 1000);
    }
    static am = true;
    static today = new Date();
    static startTime() {
        Time.today = new Date();
        var h = Time.today.getHours();
        var m = Time.today.getMinutes();
        h = Time.chechHour(h);
        m = Time.checkTime(m);
        this.time = h + ":" + m + " " + Time.amPm();
        document.querySelectorAll(".win_clock_element").forEach(element => {
            element.innerHTML = this.time;
        });
    }
    static amPm() {
        if (Time.am)
            return "AM";
        else
            return "PM";
    }
    static chechHour(i) {
        if (i > 12) {
            Time.am = false;
            return i - 12;
        }
        else if (i == 12) {
            Time.am = false;
            return i;
        }
        else {
            Time.am = true;
            return i;
        }
    }
    static checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        ; // add zero in front of numbers < 10
        return i;
    }
}
