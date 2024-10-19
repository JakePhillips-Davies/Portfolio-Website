const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');

function closeStartMenu() {
    startButton.checked = false;
}

document.addEventListener('click', function(e) {
    if(!startMenu.contains(e.target) && !startButton.contains(e.target) && !(window.getComputedStyle(startMenu, null).display == 'none'))
        closeStartMenu();
});