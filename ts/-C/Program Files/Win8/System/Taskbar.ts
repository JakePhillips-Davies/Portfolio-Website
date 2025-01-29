import { Tray } from "../../../../-BIOS/Sys16/Tray.js";

export class Taskbar {
    //
    // ░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀
    // ░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█
    // ░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private taskbarElement : Element;

    private startbutton : Element;

    private tray : Tray;

    private clock : Element;


    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀ 
    */
    constructor(parent_ : Element) {
        // Create the element
        let taskbar = document.createElement("taskbar");
        this.taskbarElement = parent_.appendChild(taskbar);

        // Create start button
        this.taskbarElement.innerHTML += `
                    <taskbarButton id="startButton" class="">
                        <img src="-C/Program Files/Win8/Icons/windows-0.png" alt="">
                        <span>Start</span>
                    </taskbarButton>
                    `;
        
        // Divider
        this.taskbarElement.innerHTML += "<taskbarSpacer></taskbarSpacer>";

        // Create the tray
        this.tray = new Tray("taskbarTray", this.taskbarElement);

        // Divider
        this.taskbarElement.innerHTML += "<taskbarSpacer></taskbarSpacer>";

        // Create the clock
        this.taskbarElement.innerHTML += `
                    <taskbarClock>
                        <span class="win_clock_element"></span>
                    </taskbarClock>`;
    }

}