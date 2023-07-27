var navHome = document.getElementById("navHome");
var navPerformedServices = document.getElementById("navPerformedServices");
var navClients = document.getElementById("navClients");

var homeDiv = document.getElementById("home");
var performedServicesDiv = document.getElementById("performedServices");
var clientsDiv = document.getElementById("clients");

var workSpaceUpperContainerTitle = document.getElementById("workSpaceUpperContainerTitle");
var workSpaceUpperContainerMenu = document.getElementById("workSpaceUpperContainerMenu");

var newPrenotationBtn = document.getElementById("newPrenotationBtn");

var alertDateDanger = document.getElementById("alertDateDanger");
var alertDateWarning = document.getElementById("alertDateWarning");
var alertWorkDescription = document.getElementById("alertWorkDescription");
var alertClient = document.getElementById("alertClient");
var alertClientName = document.getElementById("alertClientName");

showHome();
loadInputClientBirthYearOptions();

function showHome(){
    selectNavHome();
    deselectNavPerformedServices();
    deselectNavClients();
    upperContainerHome();
    homeDiv.style.display = "block";
    performedServicesDiv.style.display = "none";
    clientsDiv.style.display = "none";
}
function showPerformedServices(){
    deselectNavHome();
    selectNavPerformedServices();
    deselectNavClients();
    upperContainerPerformedServices();
    homeDiv.style.display = "none";
    performedServicesDiv.style.display = "block";
    clientsDiv.style.display = "none";
}
function showClients(){
    deselectNavHome();
    deselectNavPerformedServices();
    selectNavClients();
    upperContainerClients();
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

function upperContainerHome(){
    workSpaceUpperContainerTitle.innerHTML = "<h1>Bookings</h1>";
    workSpaceUpperContainerMenu.innerHTML = 
    "<div class='row'>" +
        "<div class='col m-1' title='Profile'>" +
            "<img src='img/symbol_person.svg' width='35' height='35'>" +
        "</div>" +
        "<div class='col m-1' onclick='newBooking()' title='New booking'>" +
            "<img src='img/symbol_newBooking.svg' width='35' height='35'>" +
        "</div>" +
    "</div>";
}

function upperContainerPerformedServices(){
    workSpaceUpperContainerTitle.innerHTML = "<h1>Performed</h1>";
    workSpaceUpperContainerMenu.innerHTML = 
    "<div class='row'>" +
        "<div class='col m-1' title='View stats'>" +
            "<img src='img/symbol_chart.svg' width='35' height='35'>" +
        "</div>" +
        "<div class='col m-1' title='New performed service'>" +
            "<img src='img/symbol_addPerformed.svg' width='35' height='35'>" +
        "</div>" +
    "</div>";
}

function upperContainerClients(){
    workSpaceUpperContainerTitle.innerHTML = "<h1>Clients</h1>";
    workSpaceUpperContainerMenu.innerHTML = 
    "<div class='row'>" +
        "<div class='col m-1' onclick='newClient()' title='New client'>" +
            "<img src='img/symbol_addPerson.svg' width='35' height='35'>" +
        "</div>" +
    "</div>";
}

function newBooking() {
    hideWorkSpaceAndNavBar();
    newBookingDiv.style.display = "block";
}

function backNewBooking(){
    dismissAllAlertsNewBooking();
    clearSetInputNewBooking();
    showWorkSpaceDivAndNavBar();
}

function addNewBooking(){
    dismissAllAlertsNewBooking();
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
        addBooking(date, workDescription, clientId);
        uploadDataView();
        backNewBooking();
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
function dismissAllAlertsNewBooking(){
    dismissAlertDateDanger();
    dismissAlertDateWarning();
    dismissAlertWorkDescription();
    dismissAlertClient();
}

function clearSetInputNewBooking(){
    document.getElementById("inputDate").value = "";
    document.getElementById("inputWorkDescription").value = "";
    uploadSelectClients();
}

function newClient(){
    hideWorkSpaceAndNavBar();
    newClientDiv.style.display = "block";
}

var fromNewPrenotation = false;
function newClientFromNewPrenotation(){
    fromNewPrenotation = true;
    newClientDiv.style.display = "block";
    newPrenotationDiv.style.display = "none";
}

function backNewClient(){
    dismissAllAlertsNewClient();
    clearSetInputNewClient();
    if(fromNewPrenotation)
        hideNewClientFromNewBooking();
    else
        showWorkSpaceDivAndNavBar();
}

function addNewClient(){
    dismissAllAlertsNewClient();
    var okClientName = true;
    var clientName = document.getElementById("inputClientName").value;
    if(clientName == ""){
        showAlertClientName();
        okClientName = false;
    }
    var clientSurname = document.getElementById("inputClientSurname").value;
    var clientEmail = document.getElementById("inputClientEmail").value;
    var clientPhoneNumber = document.getElementById("inputClientPhoneNumber").value;
    var clientBirthYear = document.getElementById("inputClientBirthYear").value;
    if(okClientName){
        addClient(clientName, clientSurname, clientEmail, clientPhoneNumber, clientBirthYear);
        uploadDataView();
        backNewClient();
    }
}

function hideNewClientFromNewBooking(){
    newClientDiv.style.display = "none";
    newPrenotationDiv.style.display = "block";
    fromNewPrenotation = false;
}

function dismissAlertClientName(){
    alertClientName.style.display = "none";
}

function showAlertClientName(){
    alertClientName.style.display = "block";
}

function dismissAllAlertsNewClient(){
    dismissAlertClientName();
}

function clearSetInputNewClient(){

}

function loadInputClientBirthYearOptions(){
    var x = document.getElementById("inputClientBirthYear");
    var year = new Date().getFullYear();
    x.innerHTML = "<option value=''></option>";
    for(y = year - 100; y <= year; y++)
        x.innerHTML += "<option value='" + y + "'>" + y + "</option>";
}

function performedService(id){
    
}

function editBooking(id){

}

function deleteBooking(id){
    if(window.confirm("Do you really want to delete this prenotation?")){
        deletePrenotationById(id);
        uploadDataView();
    }
}