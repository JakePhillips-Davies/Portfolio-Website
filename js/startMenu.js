const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const listButtons = document.getElementById('startList').querySelectorAll('button');

function closeStartMenu() {
    startButton.checked = false;
}

document.addEventListener('click', function(e) {
    if(!startMenu.contains(e.target) && !startButton.contains(e.target) && !(window.getComputedStyle(startMenu, null).display == 'none'))
        closeStartMenu();
});

listButtons.forEach(button_ => {
    button_.addEventListener('click', () => {
        openWindow(document.getElementById(button_.getAttribute("target")), '_blank');
    });
});