var nextPrenotationsContainer = document.getElementById("nextPrenotations");
var selectClients = document.getElementById("inputClient");

function uploadDataView() {
    uploadNextPrenotations();
    uploadSelectClients();
}

function uploadNextPrenotations(){
    prenotations.forEach(el => {
        var client = getClientById(el.IdClient);
        nextPrenotationsContainer.innerHTML += 
        "<div id='" + el.Id + "' class='row border rounded m-3 p-1 nextPrenotationItem'>" +
            "<div class='col'>" +
                "<div class='row m-1'>" +
                    "<div class='col'><h3>" + el.WorkDescription + "</h3></div>" +
                "</div>" +
                "<div class='row m-1'>" +
                    "<div class='col'><label>" + el.Date + "</label></div>" +
                    "<div class='col'><label>" + client.Name + " " + client.Surname + "</label></div>" +
                "</div>" +
            "</div>" +
        "</div>";
    });
}

function uploadSelectClients(){
    selectClients.innerHTML = "<option selected></option>";
    clients.forEach(el => {
        selectClients.innerHTML += 
        "<option value='" + el.Id +"'>" + el.Name + " " + el.Surname + "</option>";
    })
}
