var navHome = document.getElementById("navHome");
var navHistory = document.getElementById("navHistory");
var navClients = document.getElementById("navClients");

var newPrenotationBtn = document.getElementById("newPrenotationBtn");
var newPrenotationDiv = document.getElementById("newPrenotation")

let date = new Date(Date.now())

function newPrenotation() {
    workSpaceDiv.style.display = "none";
    newPrenotationDiv.style.display = "block";
}

function backNewPrenotation(){
    newPrenotationDiv.style.display = "none";
    workSpaceDiv.style.display = "block";
}