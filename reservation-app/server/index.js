const express = require("express");
const app = express();
const mysql = require("mysql");//
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

app.get("/employees", (req, res) => {
  db.sequelize.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const usersRouter = require("./routes/Users");
const { sequelize } = require("./models");
app.use("/auth", usersRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
