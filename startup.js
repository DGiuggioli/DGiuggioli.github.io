var startingDiv = document.getElementById("starting");
var workSpaceDiv = document.getElementById("workSpace");
var alert = document.getElementById("alert");

function signIn(){
    //var email = document.getElementById("inputEmail").value;
    //var password = document.getElementById("inputPassword").value;
    var email = "daniel.giuggioli@gmail.com";
    var password = "a";
    var found = findUser(email, password);
    if(found){
        dismissAlert();
        startingDiv.style.display = "none";
        workSpaceDiv.style.display = "block";
        filterByUserId();
        uploadDataView();
    }
    else{
        userNotFound();
    }
}

function dismissAlert(){
    alert.style.display = "none";
}

function userNotFound(){
    alert.style.display = "block";
}

function createAnAccount(){

}