import { Tray } from "../Sys16/Tray.js";
import { DOSBoot } from "../../-C/Program Files/Win8/MS-DOS/DOSBoot.js";
import { WinBoot } from "../../-C/Program Files/Win8/System/WinBoot.js";

export class Kernel {
    //
    //░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    //░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    //░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private static drives : Array<any> = []; //==

        public static Drives() : Array<any> { return this.drives; }

        public static AddDrive(drive_ : any) : void { this.drives.push(drive_); }

        public static GetDrive(desiredDriveName : string) :void { 
            let returnDrive : any = null;

            this.drives.forEach(drive => {
                if(drive.name == desiredDriveName) returnDrive = drive;
            });

            return returnDrive;
        }

    //==

    private static masterTray : Tray = null;
        public static Tray() : Tray { return this.masterTray }


    public static ShutDown() {
        this.masterTray.GetTrayElement().innerHTML = "";
    }



    // 
    // ░█▄█░█▀█░▀█▀░█▀█
    // ░█░█░█▀█░░█░░█░█
    // ░▀░▀░▀░▀░▀▀▀░▀░▀
    //
    public static Startup() {

        this.masterTray = new Tray("masterTray", document.getElementById("ROOT"));

        //DOSBoot.Boot();

        WinBoot.Boot();

    }
}
