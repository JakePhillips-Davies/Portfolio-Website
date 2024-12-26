import { Kernel } from "../../../../-BIOS/Boot/Kernel.js";
import { Terminal } from "./Terminal.js";

export class DOSBoot {

    public static DOSTerminal : Terminal = null;

    public static Boot() {
        
        this.DOSTerminal = new Terminal(Kernel.Tray().GetTrayElement());

    }

}