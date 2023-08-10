var expiredBookingsContainer = document.getElementById("expiredBookings");
var pendingBookingsContainer = document.getElementById("pendingBookings");
var noBookingsDiv = document.getElementById("noBookings");
var performedServicesContainer = document.getElementById("performedServicesContainer");
var clientsContainer = document.getElementById("clientsContainer");
var expiredTitle = document.getElementById("expiredTitle");
var pendingTitle = document.getElementById("pendingTitle");

var selectSortClients = document.getElementById("selectSortClients");
var selectClients = document.getElementById("inputClient");
var selectClientsPerformedService = document.getElementById("inputClientPerformedService");

function uploadDataView() {
    uploadBookings()
    uploadExpiredBookings();
    uploadPendingBookings();
    uploadPerformedServices();
    uploadClients();
    uploadSelectClients();
    uploadSelectClientsPerformedService();
}

function uploadBookings(){
    uploadExpiredBookings();
    uploadPendingBookings();
    if(expiredTitle.style.display == "none" &&
        pendingTitle.style.display == "none")
            noBookingsDiv.style.display = "block";
    else
        noBookingsDiv.style.display = "none";
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
            "<div id='" + el.Id + "' class='row border rounded m-2 mb-3 p-1 expiredBookingItem'>" +
                "<div class='col'>" +
                    "<div class='row mt-1 mb-1'>" +
                    "<div class='col'><h3 id='h3" + el.Id + "' onclick='detailClient(\"" + el.Id + "\")' onmouseover='setUnderline(\"h3" + el.Id + "\")' onmouseleave='removeUnderline(\"h3" + el.Id + "\")'>" + client.Name + " " + client.Surname + "</h3></div>" +
                    "</div>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><label>" + el.Date + "</label></div>" +
                    "</div>" +
                    "<div id='desc" + el.Id + "' class='row'>" +
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
            if(el.WorkDescription != ""){
                document.getElementById("desc" + el.Id).innerHTML =
                "<div class='col mb-1'><label>" + el.WorkDescription + "</label></div>";
            }
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
            "<div id='" + el.Id + "' class='row border rounded m-2 mb-3 p-1 pendingBookingItem'>" +
                "<div class='col'>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><h3 id='h3" + el.Id + "' onclick='detailClient(\"" + el.IdClient + "\")' onmouseover='setUnderline(\"h3" + el.Id + "\")' onmouseleave='removeUnderline(\"h3" + el.Id + "\")'>" + client.Name + " " + client.Surname + "</h3></div>" +
                    "</div>" +
                    "<div class='row mt-1 mb-1'>" +
                        "<div class='col'><label>" + el.Date + "</label></div>" +
                    "</div>" +
                    "<div id='desc" + el.Id + "' class='row'>" +
                    "</div>" +
                "</div>" +
                "<div class='col d-flex justify-content-end'>" +
                    "<div class='row'>" +
                        "<div class='col d-flex align-items-center'>" +
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
        if(el.WorkDescription != ""){
            document.getElementById("desc" + el.Id).innerHTML =
            "<div class='col mb-1'><label>" + el.WorkDescription + "</label></div>";
        }
        });
    }
    
}

function uploadPerformedServices (){
    performedServicesContainer.innerHTML = "";
    performedServices.forEach(el => {
        var client = getClientById(el.IdClient);
        performedServicesContainer.innerHTML +=
            "<div class='row border rounded pt-1 pb-1 m-2'>" +
                "<div class='col-4 d-flex justify-content-start'>" +
                    "<label>" + el.Date.split(" ")[0] + "</label>" +
                "</div>" +
                "<div class='col-5 tableItemPerformedService d-flex justify-content-start'>" +
                    "<label id='label" + client.Id + el.Date + "' onclick='detailClient(\"" + client.Id + "\")' onmouseover='setUnderline(\"label" + client.Id + el.Date + "\")' onmouseleave='removeUnderline(\"label" + client.Id + el.Date + "\")'>" + client.Name + " " + client.Surname + "</label>" +
                "</div>" +
                "<div class='col-2 d-flex justify-content-center'>" +
                        "<label>" + el.Price + "</label>" +
                "</div>" +
                "<div class='col-1 d-flex justify-content-end'>" +
                    "<img src='img/symbol_info.svg' width='25' height='25' onclick='moreInfoPerformed(\'" + el.Id + "\')' title='More info'>" +
                "</div>" +
            "</div>";
    })
}

function uploadClients(){
    clientsContainer.innerHTML = "";
    clients.forEach(el =>{
        clientsContainer.innerHTML +=
        "<div id='" + el.Id + "' class='row border rounded p-2 m-2'>" + 
            "<div class='col-10 p-1'>" +
                "<div class='row'>" +
                    "<div class='col d-inline-flex justify-content-start'>" +
                        "<h3 id='h" + el.Id + "' onclick='detailClient(\"" + el.Id + "\")' onmouseover='setUnderline(\"h" + el.Id + "\")' onmouseleave='removeUnderline(\"h" + el.Id + "\")'>" + el.Name + " " + el.Surname + "</h3>" +
                    "</div>" +
                "</div> " +
                "<div class='row'>" +
                    "<div class='col d-inline-flex justify-content-start'>" +
                        "<label>" + getClientPerformedServices(el.Id) + " services</label>" +
                    "</div>" +
                "</div> " +
            "</div>" +
            "<div class='col d-flex align-items-center'>" +
                "<div class='row'>" +
                    "<div class='col d-inline-flex align-items-center justify-content-end' onclick='(uploadSelectClientsById(\"" + el.Id +"\"))' title='New booking'>" +
                        "<img src='img/symbol_newBooking.svg' width='30' height='30'>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";
    })
}

function uploadSelectSortClients(){
    selectSortClients.innerHTML = "";
    clientOrders.forEach(el => {
        var selected = "";
        if(el == settings.ClientOrder)
            selected = "selected";
        selectSortClients.innerHTML += 
            "<option value='" + el + "' " + selected + ">" + el + "</option>";
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

function showClientDetail(client){
    document.getElementById("detailCustomerTitle").innerHTML = client.Name + " " + client.Surname;

    email = document.getElementById("detailCustomerEmail");
    if(client.Email == null || client.Email == "")
        email.innerHTML = "---";
    else
        email.innerHTML = client.Email;

    phone = document.getElementById("detailCustomerPhone");
    if(client.phoneNumber == null || client.phoneNumber == "")
        phone.innerHTML = "---";
    else
        phone.innerHTML = client.phoneNumber;

    birthYear = document.getElementById("detailCustomerBirthYear");
    if(client.BirthYear == null || client.BirthYear == "")
        birthYear.innerHTML = "---";
    else
        birthYear.innerHTML = client.BirthYear;

    document.getElementById("detailCustomerExpense").innerHTML = "total expense: € " + getClientTotalExpense(client.Id);
    document.getElementById("detailCustomerPerformedServices").innerHTML = "performed services: " + getClientPerformedServices(client.Id);
    document.getElementById("detailCustomerAvgExpense").innerHTML = "average expense: € " + getClientAvgExpense(client.Id);
    document.getElementById("detailCustomerPercent").innerHTML = "gain's percentage: " + getClientGainPercentage(client.Id) + " %";
    document.getElementById("detailCustomerLastService").innerHTML = "last service: " + getClientLastPerformedServiceString(client.Id);
    document.getElementById("detailCustomerFirstService").innerHTML = "first service: " + getClientFirstPerformedServiceString(client.Id);
}
