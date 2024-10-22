const searchDropdown = document.getElementById('pdfSearch');
const pdfNamesNeeded = document.querySelectorAll('.pdfNameNeeded');

var url = '';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var { pdfjsLib } = globalThis;

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';

loadPdf();

function updatePdf(loc, url_) {
    url = loc + url_;

    console.log(url);
    

    loadPdf();

    pdfNamesNeeded.forEach(title => {
        title.innerText = url_;
    });
}

function loadPdf() {
    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
        console.log('PDF loaded');

        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {
            console.log('Page loaded');

            var scale = 1.25;
            var viewport = page.getViewport({scale: scale});

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('pdfRender');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                onsole.log('Page rendered');
            });
        });
    }, function (reason) {
    // PDF loading error
    console.error(reason);
    }); 
}



fetch(`assets/json/pdfs.json`).then(function (result) {
    result.json().then(function (json) {
        setupSearch(json);
    })
})
function setupSearch(json) {
    json.forEach(jsonPDF => {
        
        var pdf = document.createElement('li')
        pdf.innerHTML = '<img src="icons/file_lines-0.png" alt=""></img>' + jsonPDF.url;

        pdf.addEventListener('click', () => {
            updatePdf(jsonPDF.loc, jsonPDF.url);
            closeSearchBars();
        });

        searchDropdown.appendChild(pdf);
        
    });
}