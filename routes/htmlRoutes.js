var db = require("../models");

module.exports = function (app) {
  // Load index page

  app.get("/", function (req, res) {
    // GET ALL INFO OF EVERYTHING!!!!!
    var data = {
      anything: "I WOULD LIKE SOME PIES PLEASE"
    };
    var arrPromis = [];
    // res.render("index",data)


    // we need to determin user id add where clause
    db.Branch.findOne({}).then(function (branchData) {
      data.branchData = branchData;

      db.Leaf.findAll({
      }).then(function (leafData) {
        data.leafData = leafData;


        db.Seed.findAll().then(function (seedData) {
          data.seedData = seedData;

          db.Branch.findAll().then(function (topBranches) {

            data.topBranches = topBranches;
            console.log(data);
            res.render("index", data);
          })
        })
      })
    });


  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Leaf.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
