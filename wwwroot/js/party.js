var congress = document.getElementById("congress");
var bjp = document.getElementById("bjp");
var aap = document.getElementById("aap");

var subscribeCongress = document.getElementById("subscribe-congress");
var subscribeBjp = document.getElementById("subscribe-bjp");
var subscribeAap = document.getElementById("subscribe-aap");

var unsubscribeCongress = document.getElementById("unsubscribe-congress");
var unsubscribeBjp = document.getElementById("unsubscribe-bjp");
var unsubscribeAap = document.getElementById("unsubscribe-aap");

var notifyCongress = document.getElementById("notify-congress");
var notifyBjp = document.getElementById("notify-bjp");
var notifyAap = document.getElementById("notify-aap");

congress.style.display = "none";
bjp.style.display = "none";
aap.style.display = "none";
congress.style.cursor = "not-allowed";
bjp.style.cursor = "not-allowed";
aap.style.cursor = "not-allowed";

unsubscribeCongress.style.display = "none";
unsubscribeBjp.style.display = "none";
unsubscribeAap.style.display = "none";

var connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl("hubs/party", signalR.HttpTransportType).build();


connection.start().then(onfulfilled, onrejected);

function onfulfilled() {
    console.log("Party connection establised");
}
function onrejected() {
    console.log("rejected");
}

connection.onclose((error) => {
    document.body.style.background = "red";
});


connection.onreconnected((connectionId) => {
    document.body.style.background = "green";
});

connection.onreconnecting((error) => {
    document.body.style.background = "orange";
});

connection.on("status", (partyName,isSubscribed) => {
    if (isSubscribed) {
        if (partyName == "Congress") {
            subscribeCongress.style.display = "none";
            congress.style.display = "inline-block";
            unsubscribeCongress.style.display = "inline-block";
        }
        else if (partyName == "Bjp") {
            subscribeBjp.style.display = "none";
            bjp.style.display = "inline-block";
            unsubscribeBjp.style.display = "inline-block";
        }

        else if (partyName == "Aap") {
            subscribeAap.style.display = "none";
            aap.style.display = "inline-block";
            unsubscribeAap.style.display = "inline-block";
        }
        toastr.success("Subscribed Successfully");
    }
    else {
        if (partyName == "Congress") {
            unsubscribeCongress.style.display = "none";
            congress.style.display = "none";
            subscribeCongress.style.display = "inline-block";
        }
        else if (partyName == "Bjp") {
            unsubscribeBjp.style.display = "none";
            bjp.style.display = "none";
            subscribeBjp.style.display = "inline-block";
        }

        else if (partyName == "Aap") {
            unsubscribeAap.style.display = "none";
            aap.style.display = "none";
            subscribeAap.style.display = "inline-block";
        }
        toastr.info("Unsubscribed Successfully");
    }
});

subscribeCongress.onclick = function () {
    connection.send("JoinParty", "Congress"); 
};

subscribeBjp.onclick = function () {
    connection.send("JoinParty", "Bjp");
};

subscribeAap.onclick = function () {
    connection.send("JoinParty", "Aap");
};
unsubscribeAap.onclick = function () {
    connection.send("LeaveParty", "Aap");
};

unsubscribeBjp.onclick = function () {
    connection.send("LeaveParty", "Bjp");
};
unsubscribeCongress.onclick = function () {
    connection.send("LeaveParty", "Congress");
};

notifyCongress.onclick = function () {
    connection.send("NotifyParty", "Congress");
};

notifyBjp.onclick = function () {
    connection.send("NotifyParty", "Bjp");
};

notifyAap.onclick = function () {
    connection.send("NotifyParty", "Aap");
};


connection.on("newMemberAdded", (party) => {
    toastr.info("New member added to party " + party);
});
connection.on("memberLeft", (party) => {
    toastr.info("Member left party " + party);
});

connection.on("notify", (info) => {
    toastr.info(info);
});