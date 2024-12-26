export class Tray {
    //
    //░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    //░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    //░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    static trayList = []; //==
    static AddToTrayList(tray_) { Tray.trayList.push(tray_); }
    static SearchByID(id_) {
        let result = null;
        Tray.trayList.forEach(tray_ => {
            if (tray_.GetTrayID() == id_) {
                result = tray_;
            }
        });
        return result;
    }
    //==
    //
    // ░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀
    // ░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█
    // ░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀
    //
    trayID;
    GetTrayID() { return this.trayID; }
    trayElement;
    GetTrayElement() { return this.trayElement; }
    //
    //░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    //░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    //░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    //
    constructor(id_, parent_) {
        // Catch duplicates
        if (document.getElementById(id_) != null) {
            console.log("Error: " + id_ + " already exits");
            return;
        }
        this.trayID = id_;
        Tray.AddToTrayList(this);
        // Add to dom
        let trayElementTemp = document.createElement("tray");
        trayElementTemp.id = id_;
        this.trayElement = parent_.appendChild(trayElementTemp);
    }
}
