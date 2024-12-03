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
    private static trayList : Array<tray> = [];

    private static AddToTrayList(tray_ : tray){
        tray.trayList.push(tray_);
    }

    public static SearchByID(id_ : string){
        let result : tray = null;

        tray.trayList.forEach(tray_ => {
            if(tray_.GetTrayID() == id_){
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
    private trayID : string;
    public GetTrayID() : string {return this.trayID;}

    private trayElement : Element;
    public GetTrayElement() : Element {return this.trayElement;}



    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    */
    constructor(id_ : string, parent_ : Element) {
        
        // Catch duplicates
        if (document.getElementById(id_) != null) { 
            console.log("Error: " + id_ + " already exits");
            return;
        }

        this.trayID = id_;
        tray.AddToTrayList(this);

        // Add to dom
        let trayElementTemp : Element = document.createElement("tray");
        trayElementTemp.id = id_;
        this.trayElement = parent_.appendChild(trayElementTemp);
    }



    /**
    * ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    * ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    * ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    */
    


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
const masterTray : tray = new tray("masterTray", document.getElementById("ROOT"));
let masterTrayLoaded : boolean = true;















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