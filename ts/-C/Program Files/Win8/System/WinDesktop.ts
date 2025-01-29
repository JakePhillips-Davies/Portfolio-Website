import { Taskbar } from "./Taskbar.js";

export class WinDesktop {

    //
    // ░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    // ░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    // ░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //


    //
    // ░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀
    // ░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█
    // ░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private windowsElement : Element;

    private desktopElement : Element;

    private taskbar : Taskbar;


    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀ 
    */
    constructor(parent : Element) {
        // Create the windows element
        let windows = document.createElement("windows");
        this.windowsElement = parent.appendChild(windows);

        //create the desktop element
        let desktop = document.createElement("desktop");
        desktop.innerHTML = `
                    <div class="iconTray">
                        
                    </div>
                    `
        this.desktopElement = this.windowsElement.appendChild(desktop);

        //create the taskbar
        this.taskbar = new Taskbar(this.windowsElement);

    }


    //
    // ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    // ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    // ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    //


}