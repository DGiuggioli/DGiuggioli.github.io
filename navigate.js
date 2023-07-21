var navHome = document.getElementById("navHome");
var navHistory = document.getElementById("navHistory");
var navClients = document.getElementById("navClients");

var homeDiv = document.getElementById("home");
var historyDiv = document.getElementById("history");
var clientsDiv = document.getElementById("clients");

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
    homeDiv.style.display = "block";
    historyDiv.style.display = "none";
    clientsDiv.style.display = "none";
}
function showHistory(){
    navHome.classList.remove('selected-nav');
    navHome.classList.add('deselected-nav');
    navHistory.classList.remove('deselected-nav');
    navHistory.classList.add('selected-nav');
    navClients.classList.remove('selected-nav');
    navClients.classList.add('deselected-nav');
    homeDiv.style.display = "none";
    historyDiv.style.display = "block";
    clientsDiv.style.display = "none";
}
function showClients(){
    navHome.classList.remove('selected-nav');
    navHome.classList.add('deselected-nav');
    navHistory.classList.remove('selected-nav');
    navHistory.classList.add('deselected-nav');
    navClients.classList.remove('deselected-nav');
    navClients.classList.add('selected-nav');
    homeDiv.style.display = "none";
    historyDiv.style.display = "none";
    clientsDiv.style.display = "block";
}

function newPrenotation() {
    workSpaceDiv.style.display = "none";
    navBar.style.display = "none";
    newPrenotationDiv.style.display = "block";
}

function backNewPrenotation(){
    newPrenotationDiv.style.display = "none";
    workSpaceDiv.style.display = "block";
    navBar.style.display = "block";
}

function editPrenotation(id){

}

function deletePrenotation(id){
    if(window.confirm("Do you really want to delete this prenotation?")){
        deletePrenotationById(id);
        uploadDataView();
    }
}