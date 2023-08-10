var startingDiv = document.getElementById("starting");
var workSpaceDiv = document.getElementById("workSpace");
var newBookingDiv = document.getElementById("newBooking");
var newPerformedServiceDiv = document.getElementById("newPerformedService");
var newClientDiv = document.getElementById("newClient");
var navBar = document.getElementById("navBar");
var workSpaceUpperContainer = document.getElementById("workSpaceUpperContainer");
var detailClientDiv = document.getElementById("detailClient");
var detailPerformedServiceDiv = document.getElementById("detailPerformedService");

var alertLogin = document.getElementById("alertLogin");

var googleSignInDiv = document.getElementById("googleSignIn");

googleSignInDiv.onmouseover = function(){
    googleSignInDiv.classList.add("shadow");
}
googleSignInDiv.onmouseleave = function(){
    googleSignInDiv.classList.remove("shadow");
}

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

async function trySetUser(googleUser){
    if(googleUser != null){
        window.user = {
            id : googleUser.uid,
            displayName : googleUser.displayName,
            email : googleUser.email,
            phoneNumber : googleUser.phoneNumber,
            photoURL : googleUser.photoURL
        }
        await populate();
        showWorkSpaceDivAndNavBar();
        showHome();
        uploadDataView();
        uploadSelectSortClients();
    }
    else
        startingDiv.style.display = "block";
}


function showWorkSpaceDivAndNavBar(){
    workSpaceDiv.style.display = "block";
    navBar.style.display = "block";
    workSpaceUpperContainer.style.display = "block";
    newBookingDiv.style.display = "none";
    newPerformedServiceDiv.style.display = "none";
    newClientDiv.style.display = "none";
    startingDiv.style.display = "none";
    detailClientDiv.style.display = "none";
    detailPerformedServiceDiv.style.display = "none";
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