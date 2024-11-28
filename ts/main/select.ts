function Select(selecter : Element, toggle : boolean) : void {

    if (toggle) {
        selecter.classList.toggle('selected');
    }else{
        selecter.classList.add('selected');
    }
    
}