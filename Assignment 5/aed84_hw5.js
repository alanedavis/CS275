var express = require('express');
var app = express();
var mysql = require('mysql');
var port = process.env.PORT || 8080;
var path = require('path');
app.use(express.static("."));

var con = mysql.createConnection({
  //properties of login for sql
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'password',
  database : 'cs275_hw5'
});

//Check if the database is connecting to nodejs
con.connect(function(err){
    //callback
  if (err){
    console.log(err);
  }
  else{
    console.log("Database Successfully Connected!");
  }
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/aed84_hw5.html'));
});

//pick student table from client side, sends the response
app.get('/student', function(req,res){
  var thead = "<table>";
  var tend = "</table>";
  var tdetail = "<tr><th> Student ID </th> <th> First Name </th> <th> Last Name </th> <th> Birth Date </th> <th> Major </th>";
  var output = "Student(s) Table";
  //about mysql
  con.query('SELECT * FROM STUDENT', function(err, rows, fields){
    if (!err){
      for (var i = 0; i < rows.length; i++){
        var data = "<tr><td>" + rows[i].id + "</td><td>" + rows[i].firstname + "</td><td>" + rows[i].lastname + "</td><td>" + rows[i].birthdate + "</td><td>" + rows[i].major + "</td>";
        output = output + data;
      }
      var table = thead + tdetail + output + tend;
      res.send(table);
    }
    else{
      console.log("Error: Cannot Query the Student Data!");
    }
  });
});

//pick course(s) table from client side, sends the response
app.get('/course', function(req,res){
  var thead = "<table>";
  var tend = "</table>";
  var tdetail = "<tr><th> Course ID </th> <th> Course Description </th>";
  var output = "Course(s) Table";
  //about mysql
  con.query('SELECT * FROM COURSE', function(err, rows, fields){
    if (!err){
      for (var i = 0; i < rows.length; i++){
        var data = "<tr><td>" + rows[i].id + "</td><td>" + rows[i].course_desc + "</td>";
        output = output + data;
      }
      var table = thead + tdetail + output + tend;
      res.send(table);
    }
    else{
      console.log("Error: Cannot Query the Course Data!");
    }
  });
});

//pick grades table from client side, sends the response
app.get('/grades', function(req,res){
  var thead = "<table>";
  var tend = "</table>";
  var tdetail = "<tr><th> Course ID </th> <th> Student ID </th> <th> Quarter </th> <th> Grade </th>";
  var output = "Grade(s) Table";
  //about mysql
  con.query('SELECT * FROM grades', function(err, rows, fields){
    if (!err){
      for (var i = 0; i < rows.length; i++){
        var data = "<tr><td>" + rows[i].courseid + "</td><td>" + rows[i].studentid + "</td><td>" + rows[i].quarter + "</td><td>" + rows[i].grade + "</td>";
        output = output + data;
      }
      var table = thead + tdetail + output + tend;
      res.send(table);
    }
    else{
      console.log("Error: Cannot Query the Grades Data!");
    }
  });
});

//user picking both students and quarter/year from client side, sends specification to pull certain data and send it back as an output for client side
app.get("/table/:input1/:input2",function(req,res){
  var st_id = req.params.input1;
  var qtr = req.params.input2;
  var string = 'SELECT student.id, student.firstname, student.lastname, grades.quarter, course.id, course.course_desc, grades.grade FROM course, grades, student WHERE student.id=grades.studentid && course.id=grades.courseid && student.id=' + "'" + st_id + "'" + " && grades.quarter="+ "'" + qtr + "';";
  var thead = "<table>";
  var tend = "</table>";
  var tdetail = "<tr><th> Student ID </th> <th> First Name </th> <th> Last Name </th> <th> Quarter/Year </th> <th> Course ID </th> <th> Course Description </th> <th> Grade </th></tr>";
  //Changing user ID back into their name
  var name;
    if (st_id == '2'){
      name = "Jennifer Lopez";
    }
    else if (st_id == '3') {
      name = "Minjae Park";
    }
    else if (st_id == '4') {
      name = "Kawhi Leonard";
    }
    else if (st_id == '5') {
      name = "Jhene Aiko";
    }
    else {
      name = "Alan Davis";
    }
    //forloop to query all possible data from the mysql Database
    //getting necessary data to popluate into the table
    var output = name + " Transcript for " + qtr;
    con.query(string, function(err, rows, fields){
      if(!err){
        var table = '';
        for(var i = 0; i < rows.length; i++){
          table += "<tr><td>" + rows[i].studentid + "</td><td> " + rows[i].firstname + "</td><td> " + rows[i].lastname + "</td><td> "
          + rows[i].quarter + "</td><td> " + rows[i].courseid + "</td><td> " + rows[i].course_desc + "</td><td> " + rows[i].grade + "</td></tr>";
        }
        output += thead + tdetail + table + tend;
        res.send(output);
      }
      else{
        console.log("Error: Cannot Query the Data!", string);
      }
    });
  })


//Indicate that the sever is on
app.listen(port, function(){
  console.log(`Server Started on.... ${port}`)
})
