var expiredPrenotationsContainer = document.getElementById("expiredPrenotations");
var pendingPrenotationsContainer = document.getElementById("pendingPrenotations");
var expiredTitle = document.getElementById("expiredTitle");
var pendingTitle = document.getElementById("pendingTitle");

var selectClients = document.getElementById("inputClient");

function uploadDataView() {
    uploadExpiredPrenotations();
    uploadPendingPrenotations();
    uploadSelectClients();
}

function uploadExpiredPrenotations(){
    expiredPrenotationsContainer.innerHTML = "";
    if(expiredPrenotations.length == 0){
        expiredTitle.style.display = "none";
    }
    else{
        expiredTitle.style.display = "block";
        expiredPrenotations.forEach(el => {
            var client = getClientById(el.IdClient);
            expiredPrenotationsContainer.innerHTML += 
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
                            "<div class='m-2' onclick='(editPrenotation(\"" + el.Id + "\"))' title='Edit'>" +
                                "<img src='img/symbol_edit.svg' width='25' height='30'>" +
                            "</div>" +
                            "<div class='m-2' onclick='(deletePrenotation(\"" + el.Id + "\"))' title='Delete'>" +
                                "<img src='img/symbol_delete.svg' width='25' height='30'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
        });
    }
}

function uploadPendingPrenotations(){
    pendingPrenotationsContainer.innerHTML = "";
    if(pendingPrenotations.length == 0){
        pendingTitle.style.display = "none";
    }
    else{
        pendingTitle.style.display = "block";
        pendingPrenotations.forEach(el => {
            var client = getClientById(el.IdClient);
            pendingPrenotationsContainer.innerHTML += 
            "<div id='" + el.Id + "' class='row border rounded m-2 mb-3 p-1 pendingPrenotationItem'>" +
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
                            "<div class='m-1' onclick='(editPrenotation(\"" + el.Id + "\"))' title='Edit'>" +
                                "<img src='img/symbol_edit.svg' width='25' height='30'>" +
                            "</div>" +
                            "<div class='m-2' onclick='(deletePrenotation(\"" + el.Id + "\"))' title='Delete'>" +
                                "<img src='img/symbol_delete.svg' width='25' height='30'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
        });
    }
    
}

function uploadSelectClients(){
    selectClients.innerHTML = "<option value='' selected></option>";
    clients.forEach(el => {
        selectClients.innerHTML += 
        "<option value='" + el.Id +"'>" + el.Name + " " + el.Surname + "</option>";
    })
}
