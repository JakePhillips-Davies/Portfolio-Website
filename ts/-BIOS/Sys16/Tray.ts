export class Tray {
    //
    //░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    //░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    //░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private static trayList : Array<Tray> = [];//==

        private static AddToTrayList(tray_ : Tray) : void { Tray.trayList.push(tray_); }
        
        public static SearchByID(id_ : string) : Tray {
            let result : Tray = null;

            Tray.trayList.forEach(tray_ => {
                if(tray_.GetTrayID() == id_){
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
    private trayID : string;
        public GetTrayID() : string {return this.trayID;}

    private trayElement : Element;
        public GetTrayElement() : Element {return this.trayElement;}



    //
    //░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    //░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    //░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    //
    constructor(id_ : string, parent_ : Element) {
        
        // Catch duplicates
        if (document.getElementById(id_) != null) { 
            console.log("Error: " + id_ + " already exits");
            return;
        }

        this.trayID = id_;
        Tray.AddToTrayList(this);

        // Add to dom
        let trayElementTemp : Element = document.createElement("tray");
        trayElementTemp.id = id_;
        this.trayElement = parent_.appendChild(trayElementTemp);
    }
}
