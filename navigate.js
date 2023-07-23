var navHome = document.getElementById("navHome");
var navPerformedServices = document.getElementById("navPerformedServices");
var navClients = document.getElementById("navClients");

var homeDiv = document.getElementById("home");
var performedServicesDiv = document.getElementById("performedServices");
var clientsDiv = document.getElementById("clients");


var newPrenotationBtn = document.getElementById("newPrenotationBtn");

var alertDateDanger = document.getElementById("alertDateDanger");
var alertDateWarning = document.getElementById("alertDateWarning");
var alertWorkDescription = document.getElementById("alertWorkDescription");
var alertClient = document.getElementById("alertClient");

let date = new Date(Date.now())

showHome();

function showHome(){
    selectNavHome();
    deselectNavPerformedServices();
    deselectNavClients();
    homeDiv.style.display = "block";
    performedServicesDiv.style.display = "none";
    clientsDiv.style.display = "none";
}
function showPerformedServices(){
    deselectNavHome();
    selectNavPerformedServices();
    deselectNavClients();
    homeDiv.style.display = "none";
    performedServicesDiv.style.display = "block";
    clientsDiv.style.display = "none";
}
function showClients(){
    deselectNavHome();
    deselectNavPerformedServices();
    selectNavClients();
    homeDiv.style.display = "none";
    performedServicesDiv.style.display = "none";
    clientsDiv.style.display = "block";
}

function selectNavHome(){
    navHome.innerHTML = "<img src='img/symbol_home_fill.svg' width='40' height='40'>";
}
function deselectNavHome(){
    navHome.innerHTML = "<img src='img/symbol_home.svg' width='40' height='40'>";
}
function selectNavPerformedServices(){
    navPerformedServices.innerHTML = "<img src='img/symbol_performedServices_fill.svg' width='40' height='40'>";
}
function deselectNavPerformedServices(){
    navPerformedServices.innerHTML = "<img src='img/symbol_performedServices.svg' width='40' height='40'>";
}
function selectNavClients(){
    navClients.innerHTML = "<img src='img/symbol_group_fill.svg' width='40' height='40'>";
}
function deselectNavClients(){
    navClients.innerHTML = "<img src='img/symbol_group.svg' width='40' height='40'>";
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