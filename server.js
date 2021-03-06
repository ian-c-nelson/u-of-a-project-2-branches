require("dotenv").config();
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const passport = require("./config/passport");
const path = require("path");
const db = require("./models");
const app = express();
const DataSeeder = require("./data/data-seeder");

// set port
app.listenOnPort = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static folder
app.use("/static", express.static(path.join(__dirname, "./public")));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "{0C6FA658-0E12-4FC7-A1D5-D6BCAD1010E4}", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

let resetDb = process.argv[2] === "reset-db";
let syncOptions = { force: resetDb };

if (resetDb) {
  console.log("Rebuilding Database. Data will be lost.");
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(app.listenOnPort, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser. Environment: " + process.env.NODE_ENV,
      app.listenOnPort,
      app.listenOnPort
    );

    db.Branch.findAll().then(result => {
      if (result.length === 0) {
          console.log("Generating and posting seed data.");
          let dataSeeder = new DataSeeder(app);
          dataSeeder.postBranches(50);
      }
    });
  });
});

module.exports = app;
