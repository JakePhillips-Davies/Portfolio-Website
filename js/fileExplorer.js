const explorer = document.getElementById('fileExplorer');
const desktopFolder = document.getElementById('desktopFolder');
const imageTab = document.getElementById('imageViewer');
const pdfTab = document.getElementById('pdfReader');
const fileNamespaces = document.querySelectorAll('.fileExpName');
const folderSearchDropdown = document.getElementById('fileSearch');


document.getElementById('welcome').checked = true;
fillExplorer('assets/json/home.json', 'Home');


fetch('assets/json/desktop.json').then(function (result) {
    result.json().then(function (json) {
        actuallyFillExplorer(json, desktopFolder);
    });
});


function fillExplorer(src, folderName) {
    //fetch json
    fetch(src).then(function (result) {
        result.json().then(function (json) {
            actuallyFillExplorer(json, explorer);
        });
    });

    fileNamespaces.forEach(namespace => {
        namespace.innerHTML = folderName;
    });
    
    explorer.innerText = '';
}

//fill out the div with the items in json
function actuallyFillExplorer(json, appendLoc) {
    
    //for each item, create an shortcut
    json.forEach(shortcut_ => {

        var shortcut = document.createElement('div');
        shortcut = generateShortcut(shortcut, shortcut_.url, shortcut_.type, shortcut_.location, shortcut_.other);

        switch (shortcut_.type) {
            case 'png':
                shortcut.addEventListener('click', () => {
                    updateImage(shortcut_.location, shortcut_.url);
                    openWindow(imageTab);
                });
                break;
    
            case 'pdf':
                shortcut.addEventListener('click', () => {
                    updatePdf('assets/pdf/', shortcut_.url);
                    openWindow(pdfTab);
                });
                break;
    
            case 'link':
                shortcut.addEventListener('click', () => {
                    window.open(shortcut_.link, '_blank');
                });
                break;

            case 'folder':
                shortcut.addEventListener('click', () => {
                    openWindow(document.getElementById('fileExplorerWindow'));
                    fillExplorer(shortcut_.location, shortcut_.url);
                });
                break;
        
            default:
                break;
        }

        appendLoc.appendChild(shortcut);

    });
};

function generateShortcut(shortcut_, url, fileType, loc, other) {
    var shortcut = shortcut_;
    shortcut.setAttribute('class', 'shortcut')

    var icon = document.createElement('img');
    switch (fileType) {
        case 'png':
            icon.setAttribute('src', loc + url);
            break;

        case 'pdf':
            icon.setAttribute('src', 'icons/file_lines-0.png');
            break;

        case 'link':
            icon.setAttribute('src', loc + url);
            break;
        
        case 'folder':
            icon.setAttribute('src', "icons/" + other);
            break;
    
        default:
            break;
    }
    shortcut.appendChild(icon);

    var name = document.createElement('span');
    name.innerText = url;
    if (fileType == 'link') {
        name.innerText = other;
    }
    
    shortcut.appendChild(name);

    return shortcut;
    
}


class zoomBar {
    zoomLevel;
    initRemSize;
    zoomee;

    constructor(zoomIn, zoomOut, display, zoomee_) {
        this.zoomLevel = 1;
        this.initRemSize = 50;
        this.zoomee = zoomee_;

        zoomIn.addEventListener('click', () => {
            this.zoomLevel *= 2;

            display.innerText = this.zoomLevel + 'x';

            this.updateZoomLevel();
            
        });
        zoomOut.addEventListener('click', () => {
            this.zoomLevel /= 2;
            
            display.innerText = this.zoomLevel + 'x';

            this.updateZoomLevel();
        });
        
    }

    updateZoomLevel() {
        this.zoomee.querySelector('img').style.width = this.zoomLevel * this.initRemSize + 'rem';
    }

    getZoomLevel() {
        return this.zoomLevel;
    }
}

fetch(`assets/json/folders.json`).then(function (result) {
    result.json().then(function (json) {
        fileSetupSearch(json);
    })
})
function fileSetupSearch(json) {
    json.forEach(jsonFolder => {
        
        var folder = document.createElement('li')
        folder.style.marginLeft = jsonFolder.indent + 'rem';
        folder.innerHTML = '<img src="icons/' + jsonFolder.icon + '" alt=""></img>' + jsonFolder.name;

        folder.addEventListener('click', () => {
            fillExplorer('assets/json/' + jsonFolder.folder + '.json', jsonFolder.name);
            closeSearchBars();
        });

        folderSearchDropdown.appendChild(folder);
        
    });
}