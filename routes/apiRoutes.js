var db = require("../models");
var passport = require("../config/passport");
const HashTags = require("find-hashtags");

module.exports = function (app) {

  // =========== Authentication ===================================================================

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the index page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/index");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize Branch Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.Branch.create({
      name: req.body.firstName + " " + req.body.lastName,
      handle: req.body.handle,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  // =========== Authentication ===================================================================

  // =========== Leaves (Posts) ===================================================================
  // Get all leaves
  app.get("/api/leaves/:id?", function (req, res) {
    let options = {};

    options.order = [["id", "DESC"]];

    // console.log(req.user);


    if (req.params.id) {
      options.where = {
        id: req.params.id
      }
    };

    if (req.query.includeBranch === "true") {
      options.include = [db.Branch]
    }

    db.Leaf.findAll(options).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Create a new leaf
  app.post("/api/leaves", function (req, res) {
    let hashTags = HashTags(req.body.text);
    var seeds = [];
    hashTags.forEach(function (buritto) {
      seeds.push({ text: buritto });
    });

    req.body.BranchId = req.user.id;
    req.body.seeds = seeds;

    db.Leaf
      .create(req.body)
      .then(function (resData) {


        // db.Seed.bulkCreate(seeds).then(function (resData) {
        //   console.log("Hashtags addes");
        // });

        res.json(resData);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Update a leaf
  app.put("/api/leaves", function (req, res) {

    db.Leaf.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
    ;
  });

  // Delete a leaf by id
  app.delete("/api/leaves/:id", function (req, res) {
    db.Leaf.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });
  // =========== Leaves (Posts) ===================================================================

  // =========== Branches (Users) =================================================================
  // Get all branches
  app.get("/api/branches/:id?", function (req, res) {
    let options = {};

    if (req.params.id) {
      options.where = {
        id: req.params.id
      }
    };

    if (req.query.includeLeaves === "true") {
      options.order = [["id", "DESC"]];
      options.include =
        [
          {
            model: db.Leaf, as: 'leaves', include:
              [
                { model: db.Branch }
              ]
          }
        ]
    }

    if (req.query.filterByName) {
      options.order = [[{ model: db.Leaf, as: 'leaves' }, 'id', 'DESC']];

      options.where = {
        handle: req.query.filterByName
      }
      options.include =
        [
          {
            model: db.Leaf, as: 'leaves',

            include:
              [
                { model: db.Branch }
              ],
          }
        ]
    }

    if (req.query.idList) {
      let idList = req.query.idList.split("|");
      options.where = {
        id: {
          [db.Sequelize.Op.in]: idList
        }
      }
    }

    db.Branch.findAll(options).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Create a new branch
  app.post("/api/branches", function (req, res) {
    db.Branch.create(req.body).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Update a branch
  app.put("/api/branches", function (req, res) {
    db.Branch.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    });
  });

  // Delete a branch by id
  app.delete("/api/branches/:id", function (req, res) {
    db.Branch.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });
  // =========== Branches (Users) =================================================================

  // =========== Saplings (Followers) =================================================================
  // Get all saplings
  app.get("/api/saplings", function (req, res) {
    db.Saplings.findAll({}).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Create a new sapling
  app.post("/api/saplings", function (req, res) {
    db.Saplings.create(req.body).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Update a sapling
  app.put("/api/saplings", function (req, res) {
    db.Saplings.update(req.body, { where: { id: req.body.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Delete a sapling by id
  app.delete("/api/saplings/:id", function (req, res) {
    db.Saplings.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });
  // =========== Branches (Users) =================================================================

  // =========== Seeds (Hashtags) =================================================================
  // Get all seeds
  app.get("/api/seeds", function (req, res) {
    db.Seed.findAll({}).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Create a new seed
  app.post("/api/seeds", function (req, res) {
    db.Seed.create(req.body, {
      include: [db.Leaf]
    }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Update a seed
  app.put("/api/seeds", function (req, res) {
    db.Seed.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Delete a seed by id
  app.delete("/api/seeds/:id", function (req, res) {
    db.Seed.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });
  // =========== Seeds (Hashtags) =================================================================
};