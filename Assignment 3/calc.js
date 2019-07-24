const express = require('express');
const app = express();
var path = require('path');
var port = 8080;

function sum(n) {
    var total = 0;
    for (var i = 0; i < n; i++) {
        total += i;
    }
    return total
}

function fact(n) {
    if (n == 1) {
        return n
    } else {
        return n * fact(n-1)
    }
}

app.use(express.static("."));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/aed84_hw3.html'));
});

app.get('/factorial/:userint', function(req,res) {
    res.send(String(fact(req.params.userint)));
});

app.get('/summation/:userint', function(req,res) {
    res.send(String(sum(req.params.userint)));
});

app.listen(port, function() {
    console.log(`Server started on .... ${port}`)
});

function check() {
    var calc = '';
    var selection = $("#selection").val();
    var n = parseInt($("#userint").val());

    if (n == "" || isNaN(n) || n < 0){
        calc = "Invalid Input: Positive Integer Required";
        $("#output").html(calc);
    } else if (selection == "sum") {
        var url = "http://localhost:8080/summation";
        compute(n, url, selection)
    } else {
        var url = "http://localhost:8080/factorial"
        compute(n, url, selection)
    }
}

function compute(n, url, selection) {
    var calc = '';

    $.ajax({
        type: "GET",
        dataType: "html",
        url: url + "/" + n,
        data: n,

        success: function(msg) {
            calc = "The " + selection + " for " + n + " is " + msg;
            $("#output").html(calc);
        },

        error: function(thrownError) {
            $("#option").html(calc);
        }
    });
}