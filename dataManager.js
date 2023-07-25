var users;
var allPrenotations;
var allClients;
var access;
var user;
var clients;
var prenotations;

var pendingPrenotations = [];
var expiredPrenotations = [];

const usersUrl = "data/Users.json";
const prenotationsUrl = "data/Prenotations.json";
const clientsUrl = "data/Clients.json";
const accessUrl = "data/Access.json";

var usersJson = "";
var prenotationsJson = "";
var clientsJson = "";

populate();

async function populate() {

    await fetch(usersUrl)
    .then((res) => res.text())
    .then((text) => {usersJson = text;})

    await fetch(prenotationsUrl)
    .then((res) => res.text())
    .then((text) => {prenotationsJson = text;})

    await fetch(clientsUrl)
    .then((res) => res.text())
    .then((text) => {clientsJson = text;})

    users = JSON.parse(usersJson);
    allClients = JSON.parse(clientsJson);
    allPrenotations = JSON.parse(prenotationsJson);
}

function updateData(){
    usersJson = JSON.stringify(users);
    prenotationsJson = JSON.stringify(allPrenotations); 
    clientsJson = JSON.stringify(allClients);

}

function findUser(email, password){
    for(x = 0; x < users.length; x++){
        if(users[x].Email == email &&
           users[x].Password == password){
                user = changeUser(users[x]);
                return true;
        }
    }
    return false;
}

function changeUser(u){
    user = u;
    filterByUserId();
}

function filterByUserId(){
    filterClientsByUserId();
    filterPrenotationsByUserId();
}

function filterClientsByUserId(){
    clients = allClients.filter(x => x.IdUser == user.Id);
}

function filterPrenotationsByUserId(){
    prenotations = [];
    prenotations = allPrenotations.filter(x => getClientById(x.IdClient) != null);
    separatePrenotations();
    expiredPrenotations = expiredPrenotations.sort((x, y) => (x.Date > y.Date)? 1 : (x.Date < y.Date) ? -1 : 0);
    pendingPrenotations = pendingPrenotations.sort((x, y) => (x.Date > y.Date)? 1 : (x.Date < y.Date) ? -1 : 0);
}

function getTodayDate(){
    return dateToString(new Date());
}

function separatePrenotations(){
    expiredPrenotations = [];
    pendingPrenotations = [];
    var todayDate = getTodayDate();
    for(x = 0; x < prenotations.length; x++){
        if(prenotations[x].Date < todayDate)
            expiredPrenotations.push(prenotations[x]);
        else
            pendingPrenotations.push(prenotations[x]);
    }
}
function dateToString(date){
    return date.getFullYear() + "-" + 
    ((date.getMonth() < 10)?"0":"") + (date.getMonth() + 1) + "-" + 
    ((date.getDate() < 10)?"0":"") + date.getDate() + " " + 
    ((date.getHours() < 10)?"0":"") + date.getHours() + ":" + 
    ((date.getMinutes() < 10)?"0":"") + date.getMinutes();
}

function getClientById(id){
    for(x = 0; x < clients.length; x++){
        if(clients[x].Id == id)
            return clients[x];
    }
    return null;
}

function deletePrenotationById(id){
    var workingPrenotations = [];
    for(x = 0; x < allPrenotations.length; x++){
        if(allPrenotations[x].Id != id){
            workingPrenotations.push(allPrenotations[x]);
        }
    }
    allPrenotations = workingPrenotations;
    filterPrenotationsByUserId();
    updateData();
}

function addPrenotation(date, workDescription, clientId){
    const newPrenotation = {
        Id: newGuid(),
        IdClient: clientId,
        Date: date,
        WorkDescription: workDescription
    }
    allPrenotations.push(newPrenotation);
    filterPrenotationsByUserId();
    updateData();
}

function addClient(){
    
}

function newGuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}