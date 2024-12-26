import { Tray } from "../Sys16/Tray.js";
import { DOSBoot } from "../../-C/Program Files/Win8/MS-DOS/DOSBoot.js";
export class Kernel {
    //
    //░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    //░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    //░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    static drives = []; //==
    static Drives() { return this.drives; }
    static AddDrive(drive_) { this.drives.push(drive_); }
    static GetDrive(desiredDriveName) {
        let returnDrive = null;
        this.drives.forEach(drive => {
            if (drive.name == desiredDriveName)
                returnDrive = drive;
        });
        return returnDrive;
    }
    //==
    static masterTray = null;
    static Tray() { return this.masterTray; }
    // 
    // ░█▄█░█▀█░▀█▀░█▀█
    // ░█░█░█▀█░░█░░█░█
    // ░▀░▀░▀░▀░▀▀▀░▀░▀
    //
    static Startup() {
        this.masterTray = new Tray("masterTray", document.getElementById("ROOT"));
        DOSBoot.Boot();
    }
}
