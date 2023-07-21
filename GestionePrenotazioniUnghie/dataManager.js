var users;
var prenotations;
var clients;
var access;
var user;

const usersUrl = "data/Users.json";
const prenotationsUrl = "data/Prenotations.json";
const clientsUrl = "data/Clients.json";
const accessUrl = "data/Access.json";

populate();

async function populate() {

    var usersJson = "";
    var prenotationsJson = "";
    var clientsJson = "";

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
    clients = JSON.parse(clientsJson);
    prenotations = JSON.parse(prenotationsJson);
}

function findUser(email, password){
    for(x = 0; x < users.length; x++){
        if(users[x].Email == email &&
           users[x].Password == password){
                user = users[x];
                return true;
        }
    }
    return false;
}

function filterByUserId(){
    clients = clients.filter(x => x.IdUser == user.Id);
    prenotations = prenotations.filter(x => getClientById(x.IdClient) != null);
}

function getClientById(id){
    for(x = 0; x < clients.length; x++){
        if(clients[x].Id == id)
            return clients[x];
    }
    return null;
}