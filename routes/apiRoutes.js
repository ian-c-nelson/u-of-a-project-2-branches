var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // =========== Authentication ===================================================================

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the index page.
  // Otherwise the user will be sent an error
  app.post("/login",
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      successFlash: 'Welcome!',
      failureFlash: true
    })
  );

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
    }).catch(function ({ data }) {
      console.log(data);
      res.redirect(500, "/500");
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
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Create a new leaf
  app.post("/api/leaves", function (req, res) {
    db.Leaf
      .create(req.body)
      .then(function (resData) {
        res.json(resData);
      })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Update a leaf
  app.put("/api/leaves", function (req, res) {
    db.Leaf.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
    ;
  });

  // Delete a leaf by id
  app.delete("/api/leaves/:id", function (req, res) {
    db.Leaf.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
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
      options.include = [db.Leaf]
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
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Create a new branch
  app.post("/api/branches", function (req, res) {
    db.Branch.create(req.body).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
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
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });
  // =========== Branches (Users) =================================================================

  // =========== Saplings (Followers) =================================================================
  // Get all saplings
  app.get("/api/saplings", function (req, res) {
    db.Saplings.findAll({}).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Create a new sapling
  app.post("/api/saplings", function (req, res) {
    db.Saplings.create(req.body).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Update a sapling
  app.put("/api/saplings", function (req, res) {
    db.Saplings.update(req.body, { where: { id: req.body.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Delete a sapling by id
  app.delete("/api/saplings/:id", function (req, res) {
    db.Saplings.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });
  // =========== Branches (Users) =================================================================

  // =========== Seeds (Hashtags) =================================================================
  // Get all seeds
  app.get("/api/seeds", function (req, res) {
    db.Seed.findAll({}).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Create a new seed
  app.post("/api/seeds", function (req, res) {
    db.Seed.create(req.body).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Update a seed
  app.put("/api/seeds", function (req, res) {
    db.Seed.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });

  // Delete a seed by id
  app.delete("/api/seeds/:id", function (req, res) {
    db.Seed.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    })
      .catch(function ({ data }) {
        console.log(data);
        res.redirect(500, "/500");
      });
  });
  // =========== Seeds (Hashtags) =================================================================

};
