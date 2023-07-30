var clients = [];
var bookings = [];
var performedServices = [];

var pendingBookings = [];
var expiredBookings = [];

async function populate(){
    await window.readClients(window.user.id, clients);
    await window.readBookings(window.user.id, bookings);
    await window.readPerformedServices(window.user.id, performedServices);
    update();
}


function update(){
    separateBookings();

}

function findUser(email, password){
    for(x = 0; x < users.length; x++){
        if(users[x].Email == email &&
           users[x].Password == password){
                changeUser(users[x]);
                return true;
        }
    }
    return false;
}

/*function changeUser(u){
    user = u;
    filterByUserId();
}*/


function getTodayDate(){
    return dateToString(new Date());
}

function separateBookings(){
    var todayDate = getTodayDate();
    expiredBookings = [];
    pendingBookings = [];
    for(x = 0; x < bookings.length; x++){
        if(bookings[x].Date < todayDate)
            expiredBookings.push(bookings[x]);
        else
            pendingBookings.push(bookings[x]);
    }
    sortBookings();
}

function sortBookings(){
    expiredBookings = expiredBookings.sort((x, y) => (x.Date > y.Date)? 1 : (x.Date < y.Date) ? -1 : 0);
    pendingBookings = pendingBookings.sort((x, y) => (x.Date > y.Date)? 1 : (x.Date < y.Date) ? -1 : 0);
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

function getBookingById(id){
    for(x = 0; x < expiredBookings.length; x++){
        if(expiredBookings[x].Id == id)
            return expiredBookings[x];
    }
    return null;
}

function deleteBookingById(id){
    var workingBookings = [];
    for(x = 0; x < bookings.length; x++){
        if(bookings[x].Id != id){
            workingBookings.push(bookings[x]);
        }
    }
    bookings = workingBookings;
    update();
}

function addBooking(date, workDescription, clientId){
    const newBooking = {
        Id: newGuid(),
        IdClient: clientId,
        Date: date,
        WorkDescription: workDescription
    }
    window.writeBooking(newBooking, window.user.id);
    bookings.push(newBooking);
    update();
}

function removeBooking(bookingId){
    deleteBookingById(bookingId);
    window.removeBookingFromDb(window.user.id, bookingId);
    update();
}

function addClient(clientName, clientSurname, clientEmail, clientPhoneNumber, clientBirthYear){
    const newClient = {
        Id: newGuid(),
        Name: clientName,
        Surname: clientSurname,
        Email: clientEmail,
        phoneNumber: clientPhoneNumber,
        BirthYear: clientBirthYear
    }
    window.writeClient(newClient, window.user.id);
    clients.push(newClient);
    update();
}

function addPerformedService(bookingId, price){
    const newPerformedService = {
        Id : newGuid(),
        IdBooking : bookingId,
        Price : price
    }
    window.writePerformedService(newPerformedService, window.user.id);
    removeBooking(bookingId);
    performedServicesDiv.push(newPerformedService);
    update();
}

function newGuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}

function sortClients(value){
    if(value == "Recents"){

    }
    else if(value == "Fidelity"){

    }
    else if(value == "Expense"){
        
    }
}