var peenee = "hi";
var HTMLHead = document.getElementById("mainHead");
var BIOS;
var C_DRIVE;
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
function BootupFolderSetup(directory_) {
    directory_.children.forEach(function (directory) {
        if (directory.children != null) {
            BootupFolderSetup(directory);
        }
        else {
            BootupFileSetup(directory);
        }
    });
}
function BootupFileSetup(directory_) {
    switch (directory_.type) {
        case ".js":
            var scriptEle = document.createElement("script");
            scriptEle.setAttribute("src", directory_.path);
            scriptEle.setAttribute("type", "text/javascript");
            scriptEle.setAttribute("async", "false");
            HTMLHead.appendChild(scriptEle);
            break;
        default:
            break;
    }
}
