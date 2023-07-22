var navHome = document.getElementById("navHome");
var navHistory = document.getElementById("navHistory");
var navClients = document.getElementById("navClients");

var homeDiv = document.getElementById("home");
var historyDiv = document.getElementById("history");
var clientsDiv = document.getElementById("clients");


var newPrenotationBtn = document.getElementById("newPrenotationBtn");

var alertDateDanger = document.getElementById("alertDateDanger");
var alertDateWarning = document.getElementById("alertDateWarning");
var alertWorkDescription = document.getElementById("alertWorkDescription");
var alertClient = document.getElementById("alertClient");

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
    dismissAllAlerts();
    clearSetInput();
    showWorkSpaceDivAndNavBar();
}

function setNewPrenotation(){
    dismissAllAlerts();
    var okDate = true;
    var okWorkDescription = true;
    var okClient = true;

    var date = document.getElementById("inputDate").value;
    if(date == ""){
        showAlertDateDanger();
        okDate = false;
    }
    else{
        date = date.replace("T", " ");
        if(date < getTodayDate()){
            showAlertDateWarning();
            okDate = false;
        }
    }
    var workDescription = document.getElementById("inputWorkDescription").value;
    if(workDescription == ""){
        showAlertWorkDescription();
        okWorkDescription = false;
    }
    var clientId = document.getElementById("inputClient").value;
    if(clientId == ""){
        showAlertClient();
        okClient = false;
    }
    if(okDate && okWorkDescription && okClient){
        dismissAllAlerts();
        addNewPrenotation(date, workDescription, clientId);
        uploadDataView();
        showWorkSpaceDivAndNavBar();
        clearSetInput();
    }
}

function dismissAlertDateDanger(){
    alertDateDanger.style.display = "none";
}
function showAlertDateDanger(){
    alertDateDanger.style.display = "block";
}
function dismissAlertDateWarning(){
    alertDateWarning.style.display = "none";
}
function showAlertDateWarning(){
    alertDateWarning.style.display = "block";
}
function dismissAlertWorkDescription(){
    alertWorkDescription.style.display = "none";
}
function showAlertWorkDescription(){
    alertWorkDescription.style.display = "block";
}
function dismissAlertClient(){
    alertClient.style.display = "none";
}
function showAlertClient(){
    alertClient.style.display = "block";
}
function dismissAllAlerts(){
    dismissAlertDateDanger();
    dismissAlertDateWarning();
    dismissAlertWorkDescription();
    dismissAlertClient();
}

function clearSetInput(){
    document.getElementById("inputDate").value = "";
    document.getElementById("inputWorkDescription").value = "";
    uploadSelectClients();
}

function performedService(id){
    
}

function editPrenotation(id){

}

function deletePrenotation(id){
    if(window.confirm("Do you really want to delete this prenotation?")){
        deletePrenotationById(id);
        uploadDataView();
    }
}