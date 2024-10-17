const themeSelectButton = document.getElementById(`themeSelectButton`);
const themeSheetLink = document.getElementById(`themeSheet`);
const themeButtonText = document.getElementById(`themeButtonText`);
var currentTheme = localStorage.getItem("theme") || "Dark";

function setTheme(themeName) {
    themeSheetLink.setAttribute("href", `css/themes/${themeName}.css`);
    themeButtonText.innerText = themeName + " mode";
}

themeSelectButton.addEventListener("click", function() {

    currentTheme = localStorage.getItem("theme") || "dark";

    if(currentTheme == "Dark") {
        setTheme("Light");
        localStorage.setItem("theme", "Light");
    }
    else {
        setTheme("Dark");
        localStorage.setItem("theme", "Dark");
    }

});

setTheme(currentTheme);