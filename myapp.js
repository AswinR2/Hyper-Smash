var express = require('express');
var app = express();

var mysql = require('mysql');
var connection = require('./dbConfig');

app.set('view engine','ejs');

app.use('/public',express.static('public'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.render("index");
})

app.get('/about', function(req, res) {
    res.render("about");
})

app.get('/coach_booking', function(req, res) {
    res.render("Coaching_booking");
})

app.get('/court_booking', function(req, res) {
    res.render("Court_booking");
})

app.get('/members', function(req, res) {
    connection.query("SELECT * FROM users order by name", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('dbRead', {title: 'xyz', userData: result});
    });
});

app.post('/add', function(req, res) {
    var bcde = req.body.name;
    var xyz = req.body.email;
    console.log(req.body);
    var sql = `INSERT INTO users (name, email) VALUES ("${bcde}", "${xyz}")`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    return res.render('index', {errormessage: 'insert data successfully'});
});

app.post('/delete', function(req, res) {
    var abcd = req.body.id;
    console.log(req.body);
    var sql = `DELETE FROM users where id="${abcd}"`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User Deleted");
    });
    res.redirect('/dbRead');
});

app.post('/update', function(req, res) {
    var abcd = req.body.id;
    var bcde = req.body.name;
    var xyz = req.body.email;
    console.log(req.body);
    var sql = `UPDATE users set name="${bcde}", email="${xyz}" where id ="${abcd}"`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User Data Updated");
    });
    res.redirect('/dbRead');
});


app.listen(process.env.port || 3000);
console.log('Running on port 3000');