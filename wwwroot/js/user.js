
//create connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .withUrl("/hubs/usercount", signalR.HttpTransportType.WebSockets).build();

//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("displayTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViews");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("displayTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsers");
    newCountSpan.innerText = value.toString();
});

//invoke hub methods aka send notification to hub
function incrementViewCount() {
    connectionUserCount.send("IncrementTotalViews");
}

//start connection
function initiated() {
    //do something on start
    console.log("Connection to User Hub Successful");
    incrementViewCount();
}
function rejected() {
    //rejected logs
}


connectionUserCount.start().then(initiated, rejected);


connectionUserCount.onclose((error) => {
    document.body.style.background = "red";
});

connectionUserCount.onreconnected((connectionId) => {
    document.body.style.background = "green";
});

connectionUserCount.onreconnecting((error) => {
    document.body.style.background = "orange";
});
