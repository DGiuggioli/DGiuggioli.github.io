var clients = [];
var bookings = [];
var PerformedServices = [];
var performedServices = [];
var settings;

var pendingBookings = [];
var expiredBookings = [];

const pages = ["Home", "PerformedServices", "Clients"];
const clientOrders = ["Alphabetical", "Recents", "First service", "Expense"];

async function populate(){
    createDefaultSettings();
    await window.readClients(window.user.id, clients);
    await window.readBookings(window.user.id, bookings);
    await window.readPerformedServices(window.user.id, PerformedServices);
    await window.readSettings(window.user.id, settings);

    update();
    sortClients(settings.ClientOrder);
}

function update(){
    separateBookings();
    sortPerformedServices();
    filterPerformedServices();
}

function createDefaultSettings(){
    settings = {
        Page : pages[0],
        ClientOrder : clientOrders[0]
    }
}

function updateSettingsPage(page){
    if(checkValue(pages, page))
        settings.Page = page;
}
function updateSettingsClientOrder(clientOrder){
    if(checkValue(clientOrders))
        settings.ClientOrder = clientOrder;
}

function checkValue(arr, value){
    var x = 0;
    while(x < arr.length){
        if(arr[x] == value)
            return true;
        x++;
    }
    return false;
}

document.onclose = updateSettingsOnDb();
function updateSettingsOnDb(){
    if(window.user != null && window.user != undefined)
        window.writeSettings(settings, window.user.id);
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
        if(bookings[x].IdPerformedService == ""){
            if(bookings[x].Date < todayDate)
            expiredBookings.push(bookings[x]);
        else
            pendingBookings.push(bookings[x]);
        }
    }
    sortBookings();
}

function sortBookings(){
    expiredBookings = expiredBookings.sort((x, y) => (x.Date > y.Date)? 1 : (x.Date < y.Date) ? -1 : 0);
    pendingBookings = pendingBookings.sort((x, y) => (x.Date > y.Date)? 1 : (x.Date < y.Date) ? -1 : 0);
}

function sortPerformedServices(){
    PerformedServices = PerformedServices.sort((x, y) => (x.Date < y.Date)? 1 : (x.Date > y.Date) ? -1 : 0)
}

function filterPerformedServices(id){
    if(id == null || id == "")
        performedServices = PerformedServices;
    else{
        performedServices = [];
        for(x = 0; x < PerformedServices.length; x++){
            if(PerformedServices[x].IdClient == id)
                performedServices.push(PerformedServices[x]);
        }
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
        WorkDescription: workDescription,
        IdPerformedService: ""
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
    return newClient;
}

function addPerformedService(clientId, date, workDescription, price, bookingId){
    const newPerformedService = {
        Id : newGuid(),
        IdClient : clientId,
        Date : date,
        WorkDescription : workDescription,
        Price : price
    }

    var booking = getBookingById(bookingId);
    if(booking != null){
        booking.IdPerformedService = newPerformedService.Id;
        window.writeBooking(booking, window.user.id);
    }
    window.writePerformedService(newPerformedService, window.user.id);
    PerformedServices.push(newPerformedService);
    update();
}

function newGuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}

function getNextBooking(id){
    let x = 0;
    while(x < pendingBookings.length){
        if(pendingBookings[x].IdClient == id)
            return pendingBookings[x].Date;
        x++;
    }
    return null;
}

function getClietsToFilterPerformedServices(){
    var list = [];
    clients.forEach(el => {
        if(clientHasPerformedServices(el.Id))
            list.push(el);
    })
    return list;
}

function clientHasPerformedServices(id){
    var x = 0;
    while(x < PerformedServices.length){
        if(PerformedServices[x].IdClient == id)
            return true;
        x++;
    }
    return false;
}

function getTotalClientExpense(){
    var expense = 0;
    performedServices.forEach(el =>{
        expense += parseFloat(el.Price);
    })
    return expense;
}

function getClientPerformedServices(id){
    var count = 0;
    performedServices.forEach((el) => {
        if(el.IdClient == id)
            count++;
    })
    return count;
}

function getClientTotalExpense(id){
    var expense = 0;
    performedServices.forEach((el) => {
        if(el.IdClient == id)
            expense += parseFloat(el.Price);
    })
    return expense;
}

function getClientAvgExpense(id){
    var expense = parseFloat(getClientTotalExpense(id));
    var services = parseInt(getClientPerformedServices(id));
    if(services != 0)
        return parseFloat(expense / services).toFixed(2);
    else 
        return 0;
}

function getClientGainPercentage(id){
    var expense = parseFloat(getClientTotalExpense(id));
    var totalExpense = getTotalClientExpense();
    if(totalExpense != 0)
        return parseFloat(parseFloat(expense / totalExpense) * 100).toFixed(2);
    else
        return 0;
}

function getClientFirstPerformedService(id){
    var x = PerformedServices.length - 1;
    while(x >= 0){
        if(PerformedServices[x].IdClient == id)
            return PerformedServices[x].Date;
        x--;
    }
    if(x < 0)
        return dateToString(new Date(8640000000000000));
}

function getClientLastPerformedService(id){
    var x = 0;
    while(x < PerformedServices.length){
        if(PerformedServices[x].IdClient == id)
            return PerformedServices[x].Date;
        x++;
    }
    if(x == PerformedServices.length)
        return dateToString(new Date(-8640000000000000));
}

function getClientFirstPerformedServiceString(id){
    var date = getClientFirstPerformedService(id);
    if(date == dateToString(new Date(8640000000000000)))
        return " - ";
    else
        return date;
}
function getClientLastPerformedServiceString(id){
    var date = getClientLastPerformedService(id);
    if(date == dateToString(new Date(-8640000000000000)))
        return " - ";
    else
        return date;
}



function sortClients(value){
    if(value == clientOrders[0]){
        clients = clients.sort((x, y) => (x.Name > y.Name)? 1 : (x.Name < y.Name) ? -1 : 0);
    }
    else if(value == clientOrders[1]){
        clients = clients.sort((x, y) => (getClientLastPerformedService(x.Id) < getClientLastPerformedService(y.Id))? 1 : 
        (getClientLastPerformedService(x.Id) > getClientLastPerformedService(y.Id)) ? -1 : 0);
    }
    else if(value == clientOrders[2]){
        clients = clients.sort((x, y) => (getClientFirstPerformedService(x.Id) > getClientFirstPerformedService(y.Id))? 1 : 
        (getClientFirstPerformedService(x.Id) < getClientFirstPerformedService(y.Id)) ? -1 : 0);
    }
    else if(value == clientOrders[3]){
        clients = clients.sort((x, y) => (getClientTotalExpense(x.Id) < getClientTotalExpense(y.Id))? 1 : 
        (getClientTotalExpense(x.Id) > getClientTotalExpense(y.Id)) ? -1 : 0);
    }
}
