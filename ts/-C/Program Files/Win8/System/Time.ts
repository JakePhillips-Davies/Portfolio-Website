export class Time {
    private static time : string; 
        public static GetTime() : string { return Time.time; }

    private static timeoutID;

    public static endTime() {
        clearInterval(this.timeoutID);
    }

    public static StartTime() {
        Time.timeoutID = setInterval(Time.startTime, 1000);
    }

    private static am = true;
    private static today = new Date();

    private static startTime() {
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
    private static amPm() {
        if (Time.am)
            return "AM";
        else
            return "PM";
    }
    private static chechHour(i) {
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
    private static checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        ; // add zero in front of numbers < 10
        return i;
    }
}