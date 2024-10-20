const imageCont = document.getElementById('imageCont');
const namespaces = document.querySelectorAll('.imgNameNeeded');

function updateImage(loc, url_) {
    imageCont.innerHTML = '';
    
    var image = document.createElement('img');
    image.setAttribute('src', loc + url_);

    imageCont.appendChild(image);

    namespaces.forEach(name => {
        name.innerHTML = url_;
    });
}


const imgZoom = document.getElementById('imgZoom')
var imgZoomBar = new zoomBar(imgZoom.querySelector('.zoomIn'), imgZoom.querySelector('.zoomOut'), imgZoom.querySelector('span'), imageCont);
