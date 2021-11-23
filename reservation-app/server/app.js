const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "admin",
    host: "localhost",
    password: "password",
    database: "restaurant",
});

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM Login", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO Login (username, password) VALUES (?,?)", 
    [username, password],
    (err, result) => {
        console.log(err);
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM Login WHERE username = ? AND password = ?", 
    [username, password],
    (err, result) => {
        if (err) {
            res.send({err: err});
        } 
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Wrong username/password combination!"});
        }
    });
})

app.listen(3001, () => {
    console.log("Running server");
});