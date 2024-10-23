const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const listButtons = document.getElementById('startList').querySelectorAll('button');

function closeStartMenu() {
    startButton.checked = false;
}

listButtons.forEach(button_ => {
    button_.addEventListener('click', () => {
        if (button_.getAttribute("opens") == "folder") {
            openWindow(document.getElementById('fileExplorerWindow'));
            fillExplorer(button_.getAttribute("target"), button_.getAttribute('targetName'));
        }
        else if (button_.getAttribute("opens") == "txt") {
            openTxtFile(button_.getAttribute("target"), button_.getAttribute('targetName'));
            openWindow(txtTab);
        }
        else openWindow(document.getElementById(button_.getAttribute("target")));
    });
});