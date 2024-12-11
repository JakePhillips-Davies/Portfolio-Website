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
        if (BIOS_DONE_LOADING && C_DONE_LOADING)
            resolve(interval);
    }, 100);
}).
    // Then do the following...
    then(() => {
    DirectoryForEachRecursive(BIOS, BootupFileSetup);
    new Promise((resolve) => {
        let interval = setInterval(() => {
            if (TRAY_DONE_LOADING && CONSOLE_DONE_LOADING)
                resolve(interval);
        }, 100);
    }).
        // Then do the following...
        then(() => {
        let scriptElement = document.createElement("script");
        scriptElement.setAttribute("src", "-BIOS/Kernel/Kernel.js");
        scriptElement.setAttribute("type", "text/javascript");
        scriptElement.setAttribute("async", "false");
        HTMLHead.appendChild(scriptElement);
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
    search(BIOS);
    return resultDir;
}
function BootupFileSetup(directory_) {
    switch (directory_.type) {
        case ".js":
            if (directory_.name == "Kernel.js") {
                break;
            }
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
