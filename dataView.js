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
        "<div id='" + el.Id + "' class='row border rounded m-2 mb-3 p-1 nextPrenotationItem'>" +
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
                        "<div class='m-1'>" +
                            "<button id='btnEdit" + el.Id + "' class='btn btn-outline-warning btn-sm' onclick='(x) => {edit(x);}'><object data='img/symbol_edit.svg' width='25' height='25'></object></button>" +
                        "</div>" +
                        "<div class='m-1'>" +
                            "<button id='btnDelete" + el.Id + "' class='btn btn-outline-danger btn-sm' onclick='edit(" + el.Id + ")'><object data='img/symbol_delete.svg' width='25' height='25'></object></button>" +
                        "</div>" +
                    "</div>" +
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
