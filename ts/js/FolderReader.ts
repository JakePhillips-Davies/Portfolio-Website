const peenee: String = "hi";

const HTMLHead : Element = document.getElementById("mainHead")

let BIOS : any;
let C_DRIVE : any;

fetch("dirJSONs/Bios.json").then(function (result) {
    result.json().then(function (json) {
        BIOS = json;

        BootupFolderSetup(BIOS);
    });
});

fetch("dirJSONs/C-Drive.json").then(function (result) {
    result.json().then(function (json) {
        C_DRIVE = json;
    });
});

function BootupFolderSetup(directory_ : any) {
    directory_.children.forEach(directory => {
        if (directory.children != null) {
            BootupFolderSetup(directory);
        }else{
            BootupFileSetup(directory);
        }
    });
}

function BootupFileSetup(directory_ : any) {
    switch (directory_.type) {
        case ".js":
            let scriptEle = document.createElement("script");

            scriptEle.setAttribute("src", directory_.path);
            scriptEle.setAttribute("type", "text/javascript");
            scriptEle.setAttribute("async", "false");
          
            HTMLHead.appendChild(scriptEle);
          
            break;
    
        default:
            break;
    }
}