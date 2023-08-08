var navHome = document.getElementById("navHome");
var navPerformedServices = document.getElementById("navPerformedServices");
var navClients = document.getElementById("navClients");

var homeDiv = document.getElementById("home");
var performedServicesDiv = document.getElementById("performedServices");
var clientsDiv = document.getElementById("clients");

var workSpaceUpperContainerTitle = document.getElementById("workSpaceUpperContainerTitle");
var workSpaceUpperContainerMenu = document.getElementById("workSpaceUpperContainerMenu");

var newPrenotationBtn = document.getElementById("newPrenotationBtn");

// alerts booking
var alertDateDanger = document.getElementById("alertDateDanger");
var alertDateWarning = document.getElementById("alertDateWarning");
var alertClient = document.getElementById("alertClient");

// alert client
var alertClientName = document.getElementById("alertClientName");

// alert performed service
var alertClientPerformedService = document.getElementById("alertClientPerformedService");
var alertDatePerformedServiceDanger = document.getElementById("alertDatePerformedServiceDanger");
var alertDatePerformedServiceWarning = document.getElementById("alertDatePerformedServiceWarning");

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
        "<div class='col m-1'onclick='newPerformedService()' title='New performed service'>" +
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
    var okClient = true;
    var okDate = true;

    var clientId = document.getElementById("inputClient").value;
    if(clientId == ""){
        showAlertClient();
        okClient = false;
    }
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
    if(okClient && okDate){
        addBooking(date, workDescription, clientId);
        uploadBookings()
        uploadExpiredBookings();
        uploadPendingBookings();
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
function dismissAlertClient(){
    alertClient.style.display = "none";
}
function showAlertClient(){
    alertClient.style.display = "block";
}
function dismissAllAlertsNewBooking(){
    dismissAlertDateDanger();
    dismissAlertDateWarning();
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

var fromNewBooking = false;
function newClientFromNewBooking(){
    fromNewBooking = true;
    newClientDiv.style.display = "block";
    newBookingDiv.style.display = "none";
}

function backNewClient(){
    dismissAllAlertsNewClient();
    clearSetInputNewClient();
    if(fromNewBooking)
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
        changeSortClients();
        backNewClient();
    }
}

function hideNewClientFromNewBooking(){
    newClientDiv.style.display = "none";
    newBookingDiv.style.display = "block";
    fromNewBooking = false;
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
    document.getElementById("inputClientName").value = "";
    document.getElementById("inputClientSurname").value = "";
    document.getElementById("inputClientEmail").value = "";
    document.getElementById("inputClientPhoneNumber").value = "";
    document.getElementById("inputClientBirthYear").value = "";
}

function loadInputClientBirthYearOptions(){
    var x = document.getElementById("inputClientBirthYear");
    var year = new Date().getFullYear();
    x.innerHTML = "<option value=''></option>";
    for(y = year - 100; y <= year; y++)
        x.innerHTML += "<option value='" + y + "'>" + y + "</option>";
}

function newPerformedService(){
    hideWorkSpaceAndNavBar();
    newPerformedServiceDiv.style.display = "block";
}

function performedService(id){
    var booking = getBookingById(id);
    newPerformedService();
    setNewPerformedServiceBookingData(booking);
    bookingId = booking.Id;
}

function setNewPerformedServiceBookingData(booking){
    document.getElementById("inputDatePerformedService").value = booking.Date;
    document.getElementById("inputWorkDescriptionPerformedService").value = booking.WorkDescription;
    document.getElementById("inputClientPerformedService").disabled = true;
    var client = getClientById(booking.IdClient);
    document.getElementById("inputClientPerformedService").innerHTML = 
        "<option value='" + client.Id + "'>" + client.Name + " " + client.Surname + "</option>";
}

function backNewPerformedService(){
    dismissAllAlertsNewPerformedService();
    clearSetInputNewPerformedService();
    showWorkSpaceDivAndNavBar();
}

var bookingId = null;
function addNewPerformedService(){
    dismissAllAlertsNewPerformedService();
    var okClient = true;
    var okDate = true;
    var client = document.getElementById("inputClientPerformedService").value;
    if(client == ""){
        showAlertClientPerformedService();
        okClient = false;
    }
    var date = document.getElementById("inputDatePerformedService").value;
    if(date == ""){
        showAlertDatePerformedServiceDanger()
        okDate = false;
    }
    else{
        date = date.replace("T", " ");
        if(date > getTodayDate()){
            showAlertDatePerformedServiceWarning()
            okDate = false;
        }
    }
    var workDescription = document.getElementById("inputWorkDescriptionPerformedService").value;
    var price = document.getElementById("inputPricePerformedService").value;
    if(price == "")
        price = 0;
    if(okClient && okDate){
        addPerformedService(client, date, workDescription, price, bookingId);
        uploadPerformedServices();
        uploadClients();
        backNewPerformedService();
    }
}

function dismissAllAlertsNewPerformedService(){
    dismissAlertClientPerformedService();
    dismissAlertDatePerformedServiceDanger();
    dismissAlertDatePerformedServiceWarning();
}

function dismissAlertClientPerformedService(){
    alertClientPerformedService.style.display = "none";
}
function showAlertClientPerformedService(){
    alertClientPerformedService.style.display = "block";
}
function dismissAlertDatePerformedServiceDanger(){
    alertDatePerformedServiceDanger.style.display = "none";
}
function showAlertDatePerformedServiceDanger(){
    alertDatePerformedServiceDanger.style.display = "block";
}
function dismissAlertDatePerformedServiceWarning(){
    alertDatePerformedServiceWarning.style.display = "none";
}
function showAlertDatePerformedServiceWarning(){
    alertDatePerformedServiceWarning.style.display = "block";
}

function clearSetInputNewPerformedService(){
    document.getElementById("inputDatePerformedService").value = "";
    document.getElementById("inputWorkDescriptionPerformedService").value = "";
    document.getElementById("inputClientPerformedService").disabled = false;
    document.getElementById("inputPricePerformedService").value = "";
    uploadSelectClientsPerformedService();
}

function editBooking(id){

}

function deleteBooking(id){
    if(window.confirm("Are you sure to delete this booking?")){
        removeBooking(id);
        uploadClients();
    }
}

function changeSortClients(){
    var value = selectSortClients.value;
    sortClients(value);
    uploadClients();
    uploadSelectClients();
    uploadSelectClientsPerformedService();
}

function moreInfoPerformed(id){
    
}