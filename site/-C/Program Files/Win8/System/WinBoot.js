import { Kernel } from "../../../../-BIOS/Boot/Kernel.js";
import { Time } from "./Time.js";
import { WinDesktop } from "./WinDesktop.js";
export class WinBoot {
    static windowsInstance = null;
    static Boot() {
        Time.StartTime();
        this.windowsInstance = new WinDesktop(Kernel.Tray().GetTrayElement());
    }
}
