var express = require('express');
var app = express();
var path = require('path');
var port = process.env.port || 8080;

app.use(express.static("."));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/aed84_hw3.html'));
});

app.get('/fact/:userint', function(req,res) {
    function fact(n) {
        if (n == 1) {
            return n
        } else {
            return n*fact(n-1)
        }
    }

    var n = req.params.n;

    res.send(String(fact(n)));
});

app.get('/sum/:userint', function(req,res) {
    function sum(n) {
        var total = 0;
        for (var i = 0; i == n; i++) {
            total += i;
        }
        return total
    }

    var n = req.params.n;

    res.send(String(sum(n)));
});

app.listen(port, function() {
    console.log(`Server started on .... ${port}`)
});

function check() {
    var calc = '';
    var selection = $("#selection").val();
    var n = $("#userint").val();

    if (n == "" || isNaN(n) || n < 0){
        calc = "Invalid Input: Positive Integer Required";
        $("#output").html(calc);
    } else if (selection == "sum") {
        var url = "http://localhost:8080/sum";
    } else {
        var url = "http://localhost:8080/fact"
        compute(n, url, selection)
    }
}

function compute(n, url, selection) {
    var calc = '';

    $.ajax({
        type: "GET",
        dataType: "html",
        url: url + n,
        data: n,

        success: function(msg) {
            calc = "The " + selection + " for " + n + " is " + msg;
            $("#output").html(calc);
        },

        error: function() {
            calc = "Error Fetching " + url;
            $("#option").html(calc);
        }
    });
}
