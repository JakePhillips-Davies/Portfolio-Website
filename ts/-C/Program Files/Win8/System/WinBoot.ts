import { Kernel } from "../../../../-BIOS/Boot/Kernel.js";
import { Time } from "./Time.js";
import { WinDesktop } from "./WinDesktop.js";

export class WinBoot {

    private static windowsInstance : WinDesktop = null;
    
    public static Boot() {

        Time.StartTime();
        
        this.windowsInstance = new WinDesktop(Kernel.Tray().GetTrayElement());

    }

}