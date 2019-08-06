// Adding express module
const express = require('express');
const app = express();
// Adding the path to the basepage & defining the port
var path = require('path');
var port = 8080;


// The following lines define that my HTML file is the basepage
// It also defines which HTML endings hold which functions
// Also shows which port the server started on in the console
app.use(express.static("."));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/aed84_practicum.html'));
});

app.get('/part2', function(req,res) {
    var msg = req.query.message;
    var count = req.query.count;
    output = "";
    intcount = parseInt(count);

    for (var i = 0; i < intcount; i++) {
        output = output + msg
    }

    res.end(output);
});

app.listen(port, function() {
    console.log(`Server started on .... ${port}`);
});


// This function checks the input amd makes sure its valid
// ALso says what function to use based on the user dropdown option
function check() {
    var selection = $("#selection").val();

    if (selection == 6) {
        var url = "http://www3.septa.org/hackathon/TransitView/?route=6";
        schedule(url, selection);
    } else if (selection == 14) {
        var url = "http://www3.septa.org/hackathon/TransitView/?route=14";
        schedule(url, selection);
    } else if (selection == 17) {
        var url = "http://www3.septa.org/hackathon/TransitView/?route=17";
        schedule(url, selection);
    } else if (selection == 20) {
        var url = "http://www3.septa.org/hackathon/TransitView/?route=20";
        schedule(url, selection);
    } else if (selection == 23) {
        var url = "http://www3.septa.org/hackathon/TransitView/?route=23";
        schedule(url, selection);
    }
}


// This ajax shows the proper display message
// Will show error or success message
function schedule(url, selection) {
    var route = selection + " : ";
    var thehtml = '';
    // var header = "<b>Route Vehicle Number Block ID Direction Destination</b>"

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: "[]",

        success: function(msg) {
            var json = msg;
            thehtml += "<table style='width:100%'><col align='left'><tr align='left'><th>Route</th><th>Vehicle Number</th><th>Block ID</th><th>Direction</th><th>Destination</th></tr>"


            $.each(json.bus, function(i, obj) {
                var vehID = obj.VehicleID;
                var blkID = obj.BlockID;
                var direction = obj.Direction;
                var destinantion = obj.destination;

                thehtml += "<tr><td>" + route + "</td><td>" + vehID + "</td><td>" + blkID + "</td><td>" + direction + "</td><td>" + destinantion + "</td></tr>";
            })

            thehtml += "</table>"

            $("#output").html(thehtml);
        },

        error: function(thrownError) {
            $("#option").html(thehtml);
        }
    });
}