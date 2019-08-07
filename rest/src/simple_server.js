var express = require('express');
var app = express();
var mysql = require("mysql");
app.use(express.urlencoded());

var connection = mysql.createConnection({
    host : "database.cpsrhxlzqpif.us-east-1.rds.amazonaws.com", 
    user : "AJAY_VAIBHAV",
    password : "password",
    port : "3306",
    database : "db"
});

connection.connect(function(err) {
    if(err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    
    console.log("Connected to Database");
});

app.post('/', function(req, res){

    var user = req.param('username', null);
    var pass = req.param('password', null);
    var valid = 0;
    console.log(user + " " + pass );
    connection.query('Select * from Users', function (error, results, fields) {
        if (error) throw error;
        var length = results.length;
        for(i = 0; i < length; i++)
        {
            if( (results[i].username == user) && (results[i].password == pass) )
            {
                valid = 1;
                console.log("GOOD");
            }
            // console.log(results[i].username + " " + results[i].password );
        }

        if(valid === 1)
            res.send("Successful Login")
        else
            res.send("FAIL");
    });

});

app.listen(8081);