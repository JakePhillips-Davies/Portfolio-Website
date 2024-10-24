const windows = document.querySelectorAll("#window");
const taskbarTabs = document.getElementById("taskbarTabs").querySelectorAll(".taskbarButton");
const mins = document.querySelectorAll("#min");
const max = document.querySelectorAll("#max");
const closes = document.querySelectorAll("#close");
const searchBars = document.querySelectorAll(".searchDropdown")

z = 100;

document.addEventListener('mousedown', function(e) {
    if(!startMenu.contains(e.target))
        closeStartMenu();

    windows.forEach(window => {
        if(window.classList.contains("selectedWindow"))
            window.classList.remove("selectedWindow");
    });

    searchBars.forEach(searchBar => {
        if(!searchBar.contains(e.target))
            searchBar.previousElementSibling.checked = false;
    });
});

function closeSearchBars() {
    searchBars.forEach(searchBar => {
        searchBar.previousElementSibling.checked = false;
    });
}

taskbarTabs.forEach(tab => {

    tab.checked = false;
    
    if(tab.tagName == "INPUT")
        tab.addEventListener('click', (e) => {
            if(window.getComputedStyle(tab.nextElementSibling, null).display == 'none')
                e.preventDefault();
            bringTabForward(tab.nextElementSibling);
        });

});

function bringTabForward(window_) {
    windows.forEach(window => {
        if(window.classList.contains("selectedWindow"))
            window.classList.remove("selectedWindow");
    });
    window_.classList.add("selectedWindow");
    z++;
    window_.style.zIndex = z;
}

windows.forEach(window => {
    const handle = window.querySelector(".handle");

    if (window.getAttribute('posT') != '') {
        window.style.top = window.getAttribute('posT');
    }
    if (window.getAttribute('posL') != '') {
        window.style.left = window.getAttribute('posL');
    }

    //Bring forward
    window.addEventListener('mousedown', () => { setTimeout(() => {
        bringTabForward(window);
    }, 1);});

    //move whole window
    handle.addEventListener('mousedown', (e) => {

        l = window.offsetLeft;
        t = window.offsetTop;

        startX = e.pageX;
        startY = e.pageY;
        
        //drag window
        document.addEventListener('mousemove', drag = (e) => {
            e.preventDefault();
            window.style.left = l + (e.pageX - startX) + "px";
            window.style.top = t + (e.pageY - startY) + "px";
        });
        //stop dragging
        document.addEventListener('mouseup', letGo = () => {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', letGo);
        });

    });
    
    const resizers = window.querySelectorAll(".resizer");

    //Handle resizing windows
    resizers.forEach(resizer => {

        switch (resizer.id) {
            case 'tl':
                resizer.addEventListener('mousedown', (e) => {
                    e.preventDefault();

                    le = window.offsetLeft;
                    to = window.offsetTop;
                    wi = window.clientWidth;
                    hi = window.clientHeight;
            
                    startX = e.pageX;
                    startY = e.pageY;
                    
                    //drag window
                    document.addEventListener('mousemove', drag = (e) => {
                        e.preventDefault();
                        if (e.pageX <= (le + wi - 200)) {
                            window.style.left = le + (e.pageX - startX) + "px";
                            window.style.width = wi - (e.pageX - startX) + "px";
                        }
                        if (e.pageY <= (to + hi - 200)) {
                            window.style.top = to + (e.pageY - startY) + "px";
                            window.style.height = hi - (e.pageY - startY) + "px";
                        }
                        
                    });
                    //stop dragging
                    document.addEventListener('mouseup', letGo = () => {
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('mouseup', letGo);
                    });
                });
                break;
            
                case 't':
                    resizer.addEventListener('mousedown', (e) => {
                        e.preventDefault();
    
                        le = window.offsetLeft;
                        to = window.offsetTop;
                        wi = window.clientWidth;
                        hi = window.clientHeight;
                
                        startX = e.pageX;
                        startY = e.pageY;
                        
                        //drag window
                        document.addEventListener('mousemove', drag = (e) => {
                            e.preventDefault();
                            if (e.pageY <= (to + hi - 200)) {
                                window.style.top = to + (e.pageY - startY) + "px";
                                window.style.height = hi - (e.pageY - startY) + "px";
                            }
                            
                        });
                        //stop dragging
                        document.addEventListener('mouseup', letGo = () => {
                            document.removeEventListener('mousemove', drag);
                            document.removeEventListener('mouseup', letGo);
                        });
                    });
                    break;
                
            case 'tr':
                resizer.addEventListener('mousedown', (e) => {
                    e.preventDefault();

                    le = window.offsetLeft;
                    to = window.offsetTop;
                    wi = window.clientWidth;
                    hi = window.clientHeight;
            
                    startX = e.pageX;
                    startY = e.pageY;
                    
                    //drag window
                    document.addEventListener('mousemove', drag = (e) => {
                        e.preventDefault();
                        if (e.pageX >= (le + 200)) {
                            window.style.width = wi + (e.pageX - startX) + "px";
                        }
                        if (e.pageY <= (to + hi - 200)) {
                            window.style.top = to + (e.pageY - startY) + "px";
                            window.style.height = hi - (e.pageY - startY) + "px";
                        }
                        
                    });
                    //stop dragging
                    document.addEventListener('mouseup', letGo = () => {
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('mouseup', letGo);
                    });
                });
                break;
            
                case 'r':
                    resizer.addEventListener('mousedown', (e) => {
                        e.preventDefault();
    
                        le = window.offsetLeft;
                        to = window.offsetTop;
                        wi = window.clientWidth;
                        hi = window.clientHeight;
                
                        startX = e.pageX;
                        startY = e.pageY;
                        
                        //drag window
                        document.addEventListener('mousemove', drag = (e) => {
                            e.preventDefault();
                            if (e.pageX >= (le + 200)) {
                                window.style.width = wi + (e.pageX - startX) + "px";
                            }
                            
                        });
                        //stop dragging
                        document.addEventListener('mouseup', letGo = () => {
                            document.removeEventListener('mousemove', drag);
                            document.removeEventListener('mouseup', letGo);
                        });
                    });
                    break;
                
            case 'br':
                resizer.addEventListener('mousedown', (e) => {
                    e.preventDefault();

                    le = window.offsetLeft;
                    to = window.offsetTop;
                    wi = window.clientWidth;
                    hi = window.clientHeight;
            
                    startX = e.pageX;
                    startY = e.pageY;
                    
                    //drag window
                    document.addEventListener('mousemove', drag = (e) => {
                        e.preventDefault();
                        if (e.pageX >= (le + 200)) {
                            window.style.width = wi + (e.pageX - startX) + "px";
                        }
                        if (e.pageY >= (to + 200)) {
                            window.style.height = hi + (e.pageY - startY) + "px";
                        }
                        
                    });
                    //stop dragging
                    document.addEventListener('mouseup', letGo = () => {
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('mouseup', letGo);
                    });
                });
                break;
            
                case 'b':
                    resizer.addEventListener('mousedown', (e) => {
                        e.preventDefault();
    
                        le = window.offsetLeft;
                        to = window.offsetTop;
                        wi = window.clientWidth;
                        hi = window.clientHeight;
                
                        startX = e.pageX;
                        startY = e.pageY;
                        
                        //drag window
                        document.addEventListener('mousemove', drag = (e) => {
                            e.preventDefault();
                            if (e.pageY >= (to + 200)) {
                                window.style.height = hi + (e.pageY - startY) + "px";
                            }
                            
                        });
                        //stop dragging
                        document.addEventListener('mouseup', letGo = () => {
                            document.removeEventListener('mousemove', drag);
                            document.removeEventListener('mouseup', letGo);
                        });
                    });
                    break;
                
            case 'bl':
                resizer.addEventListener('mousedown', (e) => {
                    e.preventDefault();

                    le = window.offsetLeft;
                    to = window.offsetTop;
                    wi = window.clientWidth;
                    hi = window.clientHeight;
            
                    startX = e.pageX;
                    startY = e.pageY;
                    
                    //drag window
                    document.addEventListener('mousemove', drag = (e) => {
                        e.preventDefault();
                        if (e.pageX <= (le + wi - 200)) {
                            window.style.left = le + (e.pageX - startX) + "px";
                            window.style.width = wi - (e.pageX - startX) + "px";
                        }
                        if (e.pageY >= (to + 200)) {
                            window.style.height = hi + (e.pageY - startY) + "px";
                        }
                        
                    });
                    //stop dragging
                    document.addEventListener('mouseup', letGo = () => {
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('mouseup', letGo);
                    });
                });
                break;
            
                case 'l':
                    resizer.addEventListener('mousedown', (e) => {
                        e.preventDefault();
    
                        le = window.offsetLeft;
                        to = window.offsetTop;
                        wi = window.clientWidth;
                        hi = window.clientHeight;
                
                        startX = e.pageX;
                        startY = e.pageY;
                        
                        //drag window
                        document.addEventListener('mousemove', drag = (e) => {
                            e.preventDefault();
                            if (e.pageX <= (le + wi - 200)) {
                                window.style.left = le + (e.pageX - startX) + "px";
                                window.style.width = wi - (e.pageX - startX) + "px";
                            }
                            
                        });
                        //stop dragging
                        document.addEventListener('mouseup', letGo = () => {
                            document.removeEventListener('mousemove', drag);
                            document.removeEventListener('mouseup', letGo);
                        });
                    });
                    break;

            default:
                break;
        }

    });

});

//Handle topbar buttons
mins.forEach(min => {
    min.addEventListener('click', (e) => {
        e.preventDefault();
        min.parentElement.parentElement.previousElementSibling.checked = false;
    })
});
max.forEach(max => {
    max.addEventListener('click', (e) => {
        e.preventDefault();
        max.parentElement.parentElement.style.top = 0;
        max.parentElement.parentElement.style.left = 0;
        max.parentElement.parentElement.style.width = window.innerWidth + "px";
        taskbarHeight = document.getElementById('taskbar').offsetHeight;
        max.parentElement.parentElement.style.height = window.innerHeight - 4 - taskbarHeight + "px";
    })
});
closes.forEach(close => {
    close.addEventListener('click', (e) => {
        e.preventDefault();
        close.parentElement.parentElement.previousElementSibling.checked = false;
        close.parentElement.parentElement.nextElementSibling.classList.add("deactive");
    })
});

function openWindow(target) {
    target.checked = true;
    bringTabForward(target.nextElementSibling);
    target.nextElementSibling.nextElementSibling.classList.remove('deactive');
}

