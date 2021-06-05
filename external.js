function helloWorld() {
    console.log("Here we go again! Reporting from external file, Captain!");
}
helloWorld();

function printStuff() {
    console.log(window.navigator.appName + "\n" + window.navigator.appVersion + "\n" + window.navigator.vendor);
    
}
printStuff();

function isOnline() {

    return window.navigator.isOnline ? "Offline" : "Online";
};
var onlineStatus = isOnline();
console.log(onlineStatus);

function printScreenSize() {
    console.log("Available Height: " + window.screen.availHeight + " Available Width: " + window.screen.availWidth);
    console.log("Total Height: " + window.screen.height + " Total Width: "+ window.screen.width);
}
printScreenSize();

function printLocation() {
    console.log(window.location.origin);
    console.log(window.location.pathname);
    console.log(window.location.protocol);
    console.log(window.location.hostname);
    console.log(window.location.host);
    console.log(window.location.port);
    console.log(window.location.search);
}
printLocation();

function reload() {
    location.reload();
}
function assign() {
    location.assign("https://youtube.com");
}

function storeData() {
    localStorage.setItem("name", "Dijana");
    localStorage.setItem("surname", "Radojevic");
    localStorage.setItem("age", "25");
}


function readData() {
    var id = localStorage.getItem("name");
    if(!id) {
        console.log("There is no data.");
    }
    else {
        console.log(id);
    }
}

function removeData() {
    localStorage.removeItem("age")
}

function navigation() {
    window.history.go(-2);
}

function greetings() {
    window.alert("Hello there!")
}

function ask() {
    window.prompt("What is your answer?", "We will submit this answer now.")
    
}


ask();
//greetings();
//storeData();
//readData();
//navigation();

//Random

Math.floor(Math.random() * 50 + 1); 

//Round

Math.round(2.5);

//Floor:

Math.floor(1.6);

// Max

Math.max(5, 10);

//date object

var d = new Date();
console.log(Date);

//current time
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log(time);

//current date
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log(date);