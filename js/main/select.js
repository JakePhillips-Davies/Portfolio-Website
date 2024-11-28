function Select(selecter, toggle) {
    if (toggle) {
        selecter.classList.toggle('selected');
    }
    else {
        selecter.classList.add('selected');
    }
}
