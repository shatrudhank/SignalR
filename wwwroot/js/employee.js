var connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl("hubs/employee", signalR.HttpTransportType).build();


connection.on("employeeUpdate", (permanentCount, contractCount) => {
    document.getElementById("permanentEmployee").innerText = permanentCount;
    document.getElementById("contactEmployee").innerText = contractCount;
});

connection.start().then(onFulfilled, rejected);

function onFulfilled() {
    console.log("Connection to Employee Hub SuccessfulS");
    connection.invoke("GetEmployeeStatus").then((data) => {
        document.getElementById("permanentEmployee").innerText = data.Permanent;
        document.getElementById("contactEmployee").innerText = data.Contract;
    });
}
function rejected() {
    console.log("Connection Rejected");
}

connection.onclose((error) => {
    document.body.style.backgroundColor = "red";
});
connectionUserCount.onreconnected((connectionId) => {
    document.body.style.background = "green";
});

connectionUserCount.onreconnecting((error) => {
    document.body.style.background = "orange";
});
