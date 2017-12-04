const mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
const connection = mysql.createConnection({
    host: 'sys.cvn9fuidbrvd.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'systest'
});


app.use(bodyParser.json());
// use it before all route definitions
app.use(cors({ origin: '*' }));
connection.connect(function(err) {
    if (err) { console.log("Error Connecting DB"); }
    else {
        console.log('Connected now!');
    }

});

app.get("/loginDetails", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    connection.query('SELECT * FROM details', function(err, rows)  {
        console.log('Data received from Db:\n from Extract');
        console.log(rows);
        res.send(rows);
    });
});

app.post("/addDetails", function (req, res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    var SQL = "INSERT INTO details(fullname,username,email,address,targetcalories,phonenumber,age,weight,appcalorieintake,passwordname) VALUES ?";
    var values = [
      [req.body.fname, req.body.uname,req.body.email,req.body.address,req.body.targetcalories,req.body.phonenumber,req.body.age,req.body.weight,req.body.calorieintake,req.body.pswd],
    ];
    connection.query(SQL, [values], function(err, rows)  {
       console.log(req.body.uname);
    });
    
    connection.query('SELECT * FROM details', function(err, rows) {
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);

    });
});

app.listen(8080);
console.log("Listening on Port 8080")

