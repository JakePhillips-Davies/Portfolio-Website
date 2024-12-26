import { Kernel } from "../../../../-BIOS/Boot/Kernel.js";
import { Terminal } from "./Terminal.js";
export class DOSBoot {
    static DOSTerminal = null;
    static Boot() {
        this.DOSTerminal = new Terminal(Kernel.Tray().GetTrayElement());
    }
}
