var expiredBookingsContainer = document.getElementById("expiredBookings");
var pendingBookingsContainer = document.getElementById("pendingBookings");
var performedServicesContainer = document.getElementById("performedServices");
var clientsContainer = document.getElementById("clientsContainer");
var expiredTitle = document.getElementById("expiredTitle");
var pendingTitle = document.getElementById("pendingTitle");

var selectClients = document.getElementById("inputClient");
var selectClientsPerformedService = document.getElementById("inputClientPerformedService");

function uploadDataView() {
    uploadExpiredBookings();
    uploadPendingBookings();
    uploadClients();
    uploadSelectClients();
    uploadSelectClientsPerformedService()
}

function uploadExpiredBookings(){
    expiredBookingsContainer.innerHTML = "";
    if(expiredBookings.length == 0){
        expiredTitle.style.display = "none";
    }
    else{
        expiredTitle.style.display = "block";
        expiredBookings.forEach(el => {
            var client = getClientById(el.IdClient);
            expiredBookingsContainer.innerHTML += 
            "<div id='" + el.Id + "' class='row border rounded m-2 mb-3 p-1 expiredPrenotationItem'>" +
                "<div class='col'>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><h3>" + el.WorkDescription + "</h3></div>" +
                    "</div>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><label>" + el.Date + " · " + client.Name + " " + client.Surname + "</label></div>" +
                    "</div>" +
                "</div>" +
                "<div class='col d-flex justify-content-end'>" +
                    "<div class='row'>" +
                        "<div class='col d-flex align-items-center'>" +
                            "<div class='m-2' onclick='(performedService(\"" + el.Id + "\"))' title='Performed service'>" +
                                "<img src='img/symbol_addPerformed.svg' width='25' height='30'>" +
                            "</div>" +
                            "<div class='m-2' onclick='(editBooking(\"" + el.Id + "\"))' title='Edit'>" +
                                "<img src='img/symbol_edit.svg' width='25' height='30'>" +
                            "</div>" +
                            "<div class='m-2' onclick='(deleteBooking(\"" + el.Id + "\"))' title='Delete'>" +
                                "<img src='img/symbol_delete.svg' width='25' height='30'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
        });
    }
}

function uploadPendingBookings(){
    pendingBookingsContainer.innerHTML = "";
    if(pendingBookings.length == 0){
        pendingTitle.style.display = "none";
    }
    else{
        pendingTitle.style.display = "block";
        pendingBookings.forEach(el => {
            var client = getClientById(el.IdClient);
            pendingBookingsContainer.innerHTML += 
            "<div id='" + el.Id + "' class='row border rounded m-2 mb-3 p-1 pendingPrenotationItem'>" +
                "<div class='col'>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><h3>" + el.WorkDescription + "</h3></div>" +
                    "</div>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><label>" + el.Date + "</label> · <label>" + client.Name + " " + client.Surname + "</label></div>" +
                    "</div>" +
                "</div>" +
                "<div class='col d-flex justify-content-end'>" +
                    "<div class='row'>" +
                        "<div class='col d-flex align-items-center'>" +
                            "<div class='m-1' onclick='(editBooking(\"" + el.Id + "\"))' title='Edit'>" +
                                "<img src='img/symbol_edit.svg' width='25' height='30'>" +
                            "</div>" +
                            "<div class='m-2' onclick='(deleteBooking(\"" + el.Id + "\"))' title='Delete'>" +
                                "<img src='img/symbol_delete.svg' width='25' height='30'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
        });
    }
    
}

function uploadPerformedServices (){
    performedServicesContainer.innerHTML = "";
    performedServices.forEach(el => {
        performedServicesContainer.innerHTML +=
        "<div class='row'>" +
            "<div class='col'>" +
                el.Price +
            "</div>" +
        "</div>";
    })
}

function uploadClients(){
    clientsContainer.innerHTML = "";
    clients.forEach(el =>{
        clientsContainer.innerHTML +=
        "<div id='" + el.Id + "' class='row border rounded p-2 m-2'>" + 
            "<div class='col d-flex align-items-center p-1'>" +
                "<div class='d-inline-flex justify-content-start'>" +
                    "<h3>" + el.Name + " " + el.Surname + "</h3>" +
                "</div>" +
                "<div class='col d-inline-flex justify-content-end' onclick='(uploadSelectClientsById(\"" + el.Id +"\"))' title='New booking'>" +
                    "<img src='img/symbol_newBooking.svg' width='30' height='30'>" +
                "</div>" +
            "</div>" +
        "</div>";
    })
}

function uploadSelectClients(){
    selectClients.innerHTML = "<option value='' selected></option>";
    clients.forEach(el => {
        selectClients.innerHTML += 
        "<option value='" + el.Id +"'>" + el.Name + " " + el.Surname + "</option>";
    });
}

function uploadSelectClientsById(id){
    selectClients.innerHTML = "<option value=''></option>";
    clients.forEach(el => {
        selected = "";
        if(el.Id == id)
            selected = "selected";
        selectClients.innerHTML += 
        "<option value='" + el.Id +"' " + selected + ">" + el.Name + " " + el.Surname + "</option>";
    });
    newBooking();
}

function uploadSelectClientsPerformedService(){
    selectClientsPerformedService.innerHTML = "<option value=''></option>";
    clients.forEach(el => {
        selectClientsPerformedService.innerHTML += 
        "<option value='" + el.Id +"'>" + el.Name + " " + el.Surname + "</option>";
    });
}
