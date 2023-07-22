var startingDiv = document.getElementById("starting");
var workSpaceDiv = document.getElementById("workSpace");
var newPrenotationDiv = document.getElementById("newPrenotation");
var navBar = document.getElementById("navBar");

var alertLogin = document.getElementById("alertLogin");

function signIn(){
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var found = findUser(email, password);
    if(found){
        dismissAlertLogin();
        showWorkSpaceDivAndNavBar();
        uploadDataView();
    }
    else{
        userNotFound();
    }
}

function showWorkSpaceDivAndNavBar(){
    workSpaceDiv.style.display = "block";
    navBar.style.display = "block";
    newPrenotationDiv.style.display = "none";
    startingDiv.style.display = "none";
}

function dismissAlertLogin(){
    alertLogin.style.display = "none";
}

function userNotFound(){
    alertLogin.style.display = "block";
}

function createAnAccount(){

}