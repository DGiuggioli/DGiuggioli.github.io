var startingDiv = document.getElementById("starting");
var workSpaceDiv = document.getElementById("workSpace");
var newBookingDiv = document.getElementById("newBooking");
var newClientDiv = document.getElementById("newClient");
var navBar = document.getElementById("navBar");
var workSpaceUpperContainer = document.getElementById("workSpaceUpperContainer");

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

function googleSignIn(){
    window.GoogleAuth();
}

function setUser(googleUser){
    window.user = {
            id : googleUser.uid,
            displayName : googleUser.displayName,
            email : googleUser.email,
            phoneNumber : googleUser.phoneNumber,
            photoURL : googleUser.photoURL
        }
    checkLoggedUser();
}

function checkLoggedUser(){
    console.log(window.user);
    if(window.user != null){
        showWorkSpaceDivAndNavBar();
        populate();
        uploadDataView();
    }  
}

function showWorkSpaceDivAndNavBar(){
    workSpaceDiv.style.display = "block";
    navBar.style.display = "block";
    workSpaceUpperContainer.style.display = "block";
    newBookingDiv.style.display = "none";
    newClientDiv.style.display = "none";
    startingDiv.style.display = "none";
}

function hideWorkSpaceAndNavBar(){
    workSpaceDiv.style.display = "none";
    navBar.style.display = "none";
    workSpaceUpperContainer.style.display = "none";
}

function dismissAlertLogin(){
    alertLogin.style.display = "none";
}

function userNotFound(){
    alertLogin.style.display = "block";
}

function createAnAccount(){

}