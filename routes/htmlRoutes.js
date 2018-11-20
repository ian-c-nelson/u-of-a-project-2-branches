var db = require("../models");
var axios = require("axios");
const os = require("os");
const connection = require("../config/connection");
require("../public/js/utils");


module.exports = function (app) {
  const apiDomain = "http://localhost:" + app.listenOnPort + "/api/";

  // Load index page
  app.get("/", function (req, res) {

    var data = {};
    var topArr = []
    var connectionQuery = `SELECT BranchId, count(*) as BranchCount
                              from Leafs
                              group by Leafs.BranchId
                              order by BranchCount DESC
                              limit 10;`

    fetchData(apiDomain + "leaves?includeBranch=true", function (response) {
      data.leafData = response;

      data.topBranchers = [];

      connection.query(connectionQuery, function (err, resualt) {
        if (err) throw err;

        console.log("SOME DATA HERE LOOK HERE *&@^#$@#&^$%&@^*!", resualt[0]);
        let idList = "";
        for (var i = 0; i < resualt.length; i++) {
          idList += resualt[i].BranchId;
          if (i < resualt.length - 1) {
            idList += "|";
          }
        }
        fetchData(apiDomain + "branches/?idList=" + idList, function (moreData) {
          data.topBranchers = moreData;
          console.log(data.topBranchers);
          res.render("index", data);
        })

      });
    });

    // we need to determin user id add where clause
    // db.Branch.findOne({}).then(function (branchData) {
    //   data.branchData = branchData;

    //   db.Leaf.findAll({
    //   }).then(function (leafData) {
    //     data.leafData = leafData;


    //     db.Seed.findAll().then(function (seedData) {
    //       data.seedData = seedData;

    //       db.Branch.findAll().then(function (topBranches) {

    //         data.topBranches = topBranches;
    //         console.log(data.leafData);
    //         res.render("index", data);
    //       })
    //     })
    //   })
    // });


  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

function fetchData(url, cb) {
  let options = {
    url: url,
    callback: content => {
      if (typeof cb === "function") {
        cb(content);
      }
    }
  }
  console.log(options);
  options.method = "GET";
  axios
    .request(options)
    .then(({ data }) => {
      if (typeof options.callback === "function") {
        options.callback(data);
      }
    })
    .catch((response) => console.log(response));
}
