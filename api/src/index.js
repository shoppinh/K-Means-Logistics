const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;
const route = require("./routes");
const db = require("./config/db");


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, lang');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})
//Connect db
db.connect();


app.use(express.static(path.join(__dirname, "public")));

//Body middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//HTTP logger

app.use(morgan("combined"));

//route init
route(app);
app.listen(port, () => console.log(`Example app listen on ${port}`));