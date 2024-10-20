const explorer = document.getElementById('fileExplorer');
const imageTab = document.getElementById('imageViewer');
const pdfTab = document.getElementById('pdfReader');

function fillExplorer(src) {
    //fetch json
    fetch(src).then(function (result) {
        result.json().then(function (json) {
            actuallyFillExplorer(json);
        });
    });

    explorer.innerText = '';
}

//fill out the div with the items in json
function actuallyFillExplorer(json) {
    
    //for each item, create an shortcut
    json.forEach(shortcut_ => {

        var shortcut = document.createElement('div');
        shortcut = generateShortcut(shortcut, shortcut_.url, shortcut_.type, explorer.getAttribute('lib'), shortcut_.other);

        switch (shortcut_.type) {
            case 'png':
                shortcut.addEventListener('click', () => {
                    updateImage(explorer.getAttribute('lib'), shortcut_.url);
                    openWindow(imageTab);
                });
                break;
    
            case 'pdf':
                shortcut.addEventListener('click', () => {
                    updatePdf(explorer.getAttribute('lib'), shortcut_.url);
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
                    fillExplorer(shortcut_.other);
                });
                break;
        
            default:
                break;
        }

        explorer.appendChild(shortcut);

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
            icon.setAttribute('src', "icons/directory_open_file_mydocs-5.png");
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

    constructor(zoomIn, zoomOut, display, zoomee) {
        this.zoomLevel = 1;
        this.initRemSize = 50;
        

        zoomIn.addEventListener('click', () => {
            this.zoomLevel *= 2;

            display.innerText = this.zoomLevel + 'x';

            zoomee.querySelector('img').style.width = this.zoomLevel * this.initRemSize + 'rem';
            
        });
        zoomOut.addEventListener('click', () => {
            this.zoomLevel /= 2;
            
            display.innerText = this.zoomLevel + 'x';

            zoomee.querySelector('img').style.width = this.zoomLevel * this.initRemSize + 'rem';
        });
        
    }

    getZoomLevel() {
        return this.zoomLevel;
    }

}


document.getElementById('welcome').checked = true;