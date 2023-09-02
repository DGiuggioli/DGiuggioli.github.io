var cookieString = "";
var cookiesArr = [];

readCookies();
function readCookies(){
    cookieString = document.cookie;
    cookiesArr = cookieString.split(';');
}

function getCookie(cookie){
    var x = 0;
    while(x < cookiesArr.length){
        var s = cookiesArr[x];
        var arr = s.split("=");
        if(arr[0] == cookie)
            return arr[1];
        x++;
    }
}

function getCookieUser(){
    var u = {
        id : getCookieUserId(),
        displayName : getCookie(" userDisplayName"),
        email : getCookie(" userEmail"),
        phoneNumber : getCookie(" userPhoneNumber"),
        photoURL : getCookie(" userPhotoURL")
    }
    return u;
}

function getCookieUserId(){
    var l = getCookie(" userId");
    return l;
}

function writeCookieUser(user){
    document.cookie = "userId=" + user.id + ";";
    document.cookie = "userDisplayName=" + user.displayName + ";";
    document.cookie = "userEmail=" + user.email + ";";
    document.cookie = "userPhoneNumber=" + user.phoneNumber + ";";
    document.cookie = "userPhotoURL=" + user.photoURL + ";";
    readCookies();
}