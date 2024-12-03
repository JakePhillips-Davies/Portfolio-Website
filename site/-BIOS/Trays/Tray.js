/**
*    █████████  █████         █████████    █████████   █████████  ██████████  █████████
*   ███░░░░░███░░███         ███░░░░░███  ███░░░░░███ ███░░░░░███░░███░░░░░█ ███░░░░░███
*  ███     ░░░  ░███        ░███    ░███ ░███    ░░░ ░███    ░░░  ░███  █ ░ ░███    ░░░
* ░███          ░███        ░███████████ ░░█████████ ░░█████████  ░██████   ░░█████████
* ░███          ░███        ░███░░░░░███  ░░░░░░░░███ ░░░░░░░░███ ░███░░█    ░░░░░░░░███
* ░░███     ███ ░███      █ ░███    ░███  ███    ░███ ███    ░███ ░███ ░   █ ███    ░███
*  ░░█████████  ███████████ █████   █████░░█████████ ░░█████████  ██████████░░█████████
*   ░░░░░░░░░  ░░░░░░░░░░░ ░░░░░   ░░░░░  ░░░░░░░░░   ░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░
*/
/**
 *
 */
class tray {
    /**
    * ░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    * ░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    * ░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    */
    static trayList = [];
    static AddToTrayList(tray_) {
        tray.trayList.push(tray_);
    }
    static SearchByID(id_) {
        let result = null;
        tray.trayList.forEach(tray_ => {
            if (tray_.GetTrayID() == id_) {
                result = tray_;
            }
        });
        return result;
    }
    /**
    * ░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀
    * ░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█
    * ░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀
    */
    trayID;
    GetTrayID() { return this.trayID; }
    trayElement;
    GetTrayElement() { return this.trayElement; }
    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    */
    constructor(id_, parent_) {
        // Catch duplicates
        if (document.getElementById(id_) != null) {
            console.log("Error: " + id_ + " already exits");
            return;
        }
        this.trayID = id_;
        tray.AddToTrayList(this);
        // Add to dom
        let trayElementTemp = document.createElement("tray");
        trayElementTemp.id = id_;
        this.trayElement = parent_.appendChild(trayElementTemp);
    }
}
/**
*  ██████   ██████   █████████   █████ ██████   █████
* ░░██████ ██████   ███░░░░░███ ░░███ ░░██████ ░░███
*  ░███░█████░███  ░███    ░███  ░███  ░███░███ ░███
*  ░███░░███ ░███  ░███████████  ░███  ░███░░███░███
*  ░███ ░░░  ░███  ░███░░░░░███  ░███  ░███ ░░██████
*  ░███      ░███  ░███    ░███  ░███  ░███  ░░█████
*  █████     █████ █████   █████ █████ █████  ░░█████
* ░░░░░     ░░░░░ ░░░░░   ░░░░░ ░░░░░ ░░░░░    ░░░░░
*/
const masterTray = new tray("masterTray", document.getElementById("ROOT"));
let masterTrayLoaded = true;
/**
*  ███████████ ██████████  █████████  ███████████ ██████████ ███████████
* ░█░░░███░░░█░░███░░░░░█ ███░░░░░███░█░░░███░░░█░░███░░░░░█░░███░░░░░███
* ░   ░███  ░  ░███  █ ░ ░███    ░░░ ░   ░███  ░  ░███  █ ░  ░███    ░███
*     ░███     ░██████   ░░█████████     ░███     ░██████    ░██████████
*     ░███     ░███░░█    ░░░░░░░░███    ░███     ░███░░█    ░███░░░░░███
*     ░███     ░███ ░   █ ███    ░███    ░███     ░███ ░   █ ░███    ░███
*     █████    ██████████░░█████████     █████    ██████████ █████   █████
*    ░░░░░    ░░░░░░░░░░  ░░░░░░░░░     ░░░░░    ░░░░░░░░░░ ░░░░░   ░░░░░
*/
/*------------------------------------------------------*/
/*                        TESTER                        */
if (false) {
    let testTray1 = new tray("test1", document.getElementById("ROOT"));
    let testTray2 = new tray("test2", document.getElementById("ROOT"));
    let testTray2Dupe = new tray("test2", document.getElementById("ROOT"));
    console.log("Testing search for test1");
    console.log(tray.SearchByID("test1"));
    console.log(tray.SearchByID("test1").GetTrayElement());
}
/*------------------------------------------------------*/ 
