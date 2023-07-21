var navHome = document.getElementById("navHome");
var navHistory = document.getElementById("navHistory");
var navClients = document.getElementById("navClients");

var newPrenotationBtn = document.getElementById("newPrenotationBtn");
var newPrenotationDiv = document.getElementById("newPrenotation")

let date = new Date(Date.now())

navHome.onmouseover = () => {navHome.classList.add('shadow')} ;
navHome.onmouseout = () => {navHome.classList.remove('shadow')};
navHistory.onmouseover = () => {navHistory.classList.add('shadow')};
navHistory.onmouseleave = () => {navHistory.classList.remove('shadow')};
navClients.onmouseover = () => {navClients.classList.add('shadow')};
navClients.onmouseleave = () => {navClients.classList.remove('shadow')};

function showHome(){
    navHome.classList.remove('deselected-nav');
    navHome.classList.add('selected-nav');
    navHistory.classList.remove('selected-nav');
    navHistory.classList.add('deselected-nav');
    navClients.classList.remove('selected-nav');
    navClients.classList.add('deselected-nav');
}

function showHistory(){
    navHistory.classList.remove('deselected-nav');
    navHistory.classList.add('selected-nav');
    navHome.classList.remove('selected-nav');
    navHome.classList.add('deselected-nav');
    navClients.classList.remove('selected-nav');
    navClients.classList.add('deselected-nav');
}

function showClients(){
    navClients.classList.remove('deselected-nav');
    navClients.classList.add('selected-nav');
    navHome.classList.remove('selected-nav');
    navHome.classList.add('deselected-nav');
    navHistory.classList.remove('selected-nav');
    navHistory.classList.add('deselected-nav');
}


function newPrenotation() {
    workSpaceDiv.style.display = "none";
    newPrenotationDiv.style.display = "block";
}

function backNewPrenotation(){
    newPrenotationDiv.style.display = "none";
    workSpaceDiv.style.display = "block";
}