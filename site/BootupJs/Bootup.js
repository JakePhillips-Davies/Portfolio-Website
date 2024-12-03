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
const HTMLHead = document.getElementById("mainHead");
let BIOS;
let C_DRIVE;
fetch("dirJSONs/Bios.json").then(function (result) {
    result.json().then(function (json) {
        BIOS = json;
        DirectoryForEachRecursive(BIOS, BootupFileSetup);
    });
});
fetch("dirJSONs/C-Drive.json").then(function (result) {
    result.json().then(function (json) {
        C_DRIVE = json;
    });
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
function DirectoryForEachRecursive(directory_, function_) {
    directory_.children.forEach(directory => {
        if (directory.children != null) {
            function_(directory);
            DirectoryForEachRecursive(directory, function_);
        }
        else {
            function_(directory);
        }
    });
}
function DirectoryForEach(directory_, function_) {
    directory_.children.forEach(directory => {
        function_(directory);
    });
}
function GetDirectoryByExactPath(path_) {
    let resultDir = null;
    let path = path_.toLowerCase();
    function search(directory_) {
        if (path === directory_.path.toLowerCase()) {
            resultDir = directory_;
        }
        else {
            directory_.children.forEach(directory => {
                if (directory.children != null) {
                    search(directory);
                }
                else {
                    if (path === directory_.path.toLowerCase()) {
                        resultDir = directory_;
                    }
                }
            });
        }
    }
    search(C_DRIVE);
    return resultDir;
}
function BootupFileSetup(directory_) {
    switch (directory_.type) {
        case ".js":
            let scriptElement = document.createElement("script");
            scriptElement.setAttribute("src", directory_.path);
            scriptElement.setAttribute("type", "text/javascript");
            scriptElement.setAttribute("async", "false");
            HTMLHead.appendChild(scriptElement);
            break;
        case ".css":
            let styleElement = document.createElement("link");
            styleElement.setAttribute("href", directory_.path);
            styleElement.setAttribute("rel", "stylesheet");
            HTMLHead.appendChild(styleElement);
            break;
        default:
            break;
    }
}
