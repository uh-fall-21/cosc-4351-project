const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

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

app.listen(3001, () => {
    console.log("Running server");
});