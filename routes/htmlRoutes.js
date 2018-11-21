require("../public/js/utils");
const db = require("../models");
const axios = require("axios");
const connection = require("../config/connection");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  const apiDomain = "http://localhost:" + app.listenOnPort + "/api/";

  // Load index page
  app.get("/", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {
      res.redirect("/index");
    }
    res.redirect("/login");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {
      res.redirect("/index");
    }

    res.render("login", { layout: "anon" });
  });

  app.get("/signup", function (req, res) {
    res.render("signup", { layout: "anon" });
  });

  app.get("/index", isAuthenticated, function (req, res) {
    var data = {
      user: {
        id: req.user.id,
        name: req.user.name,
        handle: req.user.handle,
        profileImgUrl: req.user.profileImgUrl,
        bio: req.user.bio,
        joined: req.user.createdAt
      }
    };

    var branchIdFilter;
    if (req.query.filterById) {
      branchIdFilter = req.query.filterById;
    }
    var connectionQuery = `SELECT BranchId, count(*) as BranchCount
                              from Leafs
                              group by Leafs.BranchId
                              order by BranchCount DESC
                              limit 10;` ;

    var connectionQueryHashtags = `SELECT text, count(*) as textCount
    from Seeds
    group by Seeds.text
    order by textCount DESC
    limit 10;` ;


    var path = branchIdFilter ? "branches/" + branchIdFilter + "?includeLeaves=true" : "leaves?includeBranch=true";
    fetchData(apiDomain + path, function (response) {

      data.leafData = branchIdFilter ? response[0].leaves : response;

      data.topBranchers = [];


      connection.query(connectionQuery, function (err, resualt) {
        if (err) throw err;

        // console.log("SOME DATA HERE LOOK HERE *&@^#$@#&^$%&@^*!", resualt[0]);

        let idList = "";

        for (var i = 0; i < resualt.length; i++) {
          idList += resualt[i].BranchId;
          if (i < resualt.length - 1) {
            idList += "|";
          }
        }

        fetchData(apiDomain + "branches/?idList=" + idList, function (moreData) {
          data.topBranchers = moreData;

          connection.query(connectionQueryHashtags, function (err, hashtags) {
            if (err) throw err;
            data.topHashTags = hashtags;
            // console.log(hashtags);

            res.render("index", data);
          })
        })

      });
    });
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

  options.method = "GET";
  axios
    .request(options)
    .then(({ data }) => {
      if (typeof options.callback === "function") {
        options.callback(data);
      }
    })
    .catch(({ data }) => console.log(data));
}
