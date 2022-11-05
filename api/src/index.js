const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;
const route = require("./routes");
const db = require("./config/db");

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