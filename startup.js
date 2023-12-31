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

async function start(){
    await populate();
    showWorkSpaceDivAndNavBar();
    showHome();
    uploadDataView();
    uploadSelectSortClients();
}

function signIn(){
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
}

function googleSignIn(){
    window.GoogleAuth();
}

async function trySetUser(googleUser){
    var cookieUserId = getCookieUserId();
    if(googleUser != null){
        window.user = {
            id : googleUser.uid,
            displayName : googleUser.displayName,
            email : googleUser.email,
            phoneNumber : googleUser.phoneNumber,
            photoURL : googleUser.photoURL
        }
        writeCookieUser(window.user);
        start();
    }
    else if(cookieUserId != null && cookieUserId != undefined){
        window.user = getCookieUser();
        start();
    }
    else
        googleSignIn();
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

pushState(0);

function pushState(x){
    if(window.history.state == null || window.history.state.id != x){
        window.history.pushState({id: x}, x, null);
        console.log(window.history.state);
    }
}

window.onpopstate = () => {
    console.log(window.history.state);
    if(window.history.state == null){
        var exit = window.confirm("Do you really want to leave MyClients?");
        if(!exit)
            pushState(0);
        else
            window.history.back();
    }
}