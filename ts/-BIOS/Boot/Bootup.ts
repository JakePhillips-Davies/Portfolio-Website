import { Kernel } from "./Kernel.js";

// ███████████████████████████████████████████████████████████
// █▌                                                       ▐█
// █▌                                                       ▐█
// █▌   ██████   ██████   █████████   █████ ██████   █████  ▐█
// █▌  ░░██████ ██████   ███░░░░░███ ░░███ ░░██████ ░░███   ▐█
// █▌   ░███░█████░███  ░███    ░███  ░███  ░███░███ ░███   ▐█
// █▌   ░███░░███ ░███  ░███████████  ░███  ░███░░███░███   ▐█
// █▌   ░███ ░░░  ░███  ░███░░░░░███  ░███  ░███ ░░██████   ▐█
// █▌   ░███      ░███  ░███    ░███  ░███  ░███  ░░█████   ▐█
// █▌   █████     █████ █████   █████ █████ █████  ░░█████  ▐█
// █▌  ░░░░░     ░░░░░ ░░░░░   ░░░░░ ░░░░░ ░░░░░    ░░░░░   ▐█
// █▌                                                       ▐█
// █▌                                                       ▐█
// ███████████████████████████████████████████████████████████

const HTMLHead : Element = document.getElementById("mainHead")
let BIOS : any;
let C_DRIVE : any;

let BIOS_DONE_LOADING = false;
fetch("dirJSONs/Bios.json").then(function (result) {
    result.json().then(function (json) {
        BIOS = json;

        BIOS_DONE_LOADING = true;
    });
});
let C_DONE_LOADING = false;
fetch("dirJSONs/C-Drive.json").then(function (result) {
    result.json().then(function (json) {
        C_DRIVE = json;

        C_DONE_LOADING = true;
    });
});



new Promise((resolve) => {

    let interval = setInterval(() => {
        if(BIOS_DONE_LOADING && C_DONE_LOADING) resolve(interval);
    }, 100);

}).
// Then do the following...
then(() => {

    SetupCSS(C_DRIVE);
    SetupCSS(BIOS);

    Kernel.AddDrive(C_DRIVE);
    Kernel.AddDrive(BIOS);
    
    Kernel.Startup();

});













// ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// █▌                                                                                                                    ▐█
// █▌                                                                                                                    ▐█
// █▌   ███████████ █████  █████ ██████   █████   █████████  ███████████ █████    ███████    ██████   █████  █████████   ▐█
// █▌  ░░███░░░░░░█░░███  ░░███ ░░██████ ░░███   ███░░░░░███░█░░░███░░░█░░███   ███░░░░░███ ░░██████ ░░███  ███░░░░░███  ▐█
// █▌   ░███   █ ░  ░███   ░███  ░███░███ ░███  ███     ░░░ ░   ░███  ░  ░███  ███     ░░███ ░███░███ ░███ ░███    ░░░   ▐█
// █▌   ░███████    ░███   ░███  ░███░░███░███ ░███             ░███     ░███ ░███      ░███ ░███░░███░███ ░░█████████   ▐█
// █▌   ░███░░░█    ░███   ░███  ░███ ░░██████ ░███             ░███     ░███ ░███      ░███ ░███ ░░██████  ░░░░░░░░███  ▐█
// █▌   ░███  ░     ░███   ░███  ░███  ░░█████ ░░███     ███    ░███     ░███ ░░███     ███  ░███  ░░█████  ███    ░███  ▐█
// █▌   █████       ░░████████   █████  ░░█████ ░░█████████     █████    █████ ░░░███████░   █████  ░░█████░░█████████   ▐█
// █▌  ░░░░░         ░░░░░░░░   ░░░░░    ░░░░░   ░░░░░░░░░     ░░░░░    ░░░░░    ░░░░░░░    ░░░░░    ░░░░░  ░░░░░░░░░    ▐█
// █▌                                                                                                                    ▐█
// █▌                                                                                                                    ▐█
// ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
function SetupCSS(directory_ : any) {
    directory_.children.forEach(directory => {
        if (directory.children != null) {
            SetupCSS(directory);
        }else{
            if (directory.type == ".css") {
                let styleElement = document.createElement("link");

                styleElement.setAttribute("href", directory.path);
                styleElement.setAttribute("rel", "stylesheet");
                
                HTMLHead.appendChild(styleElement);
            }
        }
    });
}