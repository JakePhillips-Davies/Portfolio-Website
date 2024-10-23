const textBox = document.getElementById('textBox');
const txtNamesNeeded = document.querySelectorAll('.txtNameNeeded')

function openTxtFile(txtFile, txtName) {

    fetch('/assets/txts/' + txtFile).then(function (result) {
        result.text().then(function (text) {
            textBox.innerHTML = text;
        })
    })

    txtNamesNeeded.forEach(namespace => {
        namespace.innerHTML = txtName;
    });
}

openTxtFile('welcome.txt', 'Welcome');