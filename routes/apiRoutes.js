var db = require("../models");

module.exports = function (app) {
  // =========== Leaves (Posts) ===================================================================
  // Get all leaves
  app.get("/api/leaves/:id?", function (req, res) {
    let options = {};

    if(req.params.id) {
      options.where = {
        id: req.params.id
      }
    };

    if(req.query.includeBranch === "true") {
      options.include = [db.Branch]
    }

    db.Leaf.findAll(options).then(function (resData) {
      res.json(resData);
    });
  });

  // Create a new leaf
  app.post("/api/leaves", function (req, res) {
    db.Leaf
      .create(req.body)
      .then(function (resData) {
        res.json(resData);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Update a leaf
  app.put("/api/leaves", function (req, res) {
    db.Leaf.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    });
  });

  // Delete a leaf by id
  app.delete("/api/leaves/:id", function (req, res) {
    db.Leaf.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    });
  });
  // =========== Leaves (Posts) ===================================================================

  // =========== Branches (Users) =================================================================
  // Get all branches
  app.get("/api/branches", function (req, res) {
    db.Branch.findAll({}).then(function (resData) {
      res.json(resData);
    });
  });

  // Create a new branch
  app.post("/api/branches", function (req, res) {
    db.Branch.create(req.body).then(function (resData) {
      res.json(resData);
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
    });
  });
  // =========== Branches (Users) =================================================================

  // =========== Saplings (Followers) =================================================================
  // Get all saplings
  app.get("/api/saplings", function (req, res) {
    db.Saplings.findAll({}).then(function (resData) {
      res.json(resData);
    });
  });

  // Create a new sapling
  app.post("/api/saplings", function (req, res) {
    db.Saplings.create(req.body).then(function (resData) {
      res.json(resData);
    });
  });

  // Update a sapling
  app.put("/api/saplings", function (req, res) {
    db.Saplings.update(req.body, { where: { id: req.body.id } }).then(function (resData) {
      res.json(resData);
    });
  });

  // Delete a sapling by id
  app.delete("/api/saplings/:id", function (req, res) {
    db.Saplings.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    });
  });
  // =========== Branches (Users) =================================================================

  // =========== Seeds (Hashtags) =================================================================
  // Get all seeds
  app.get("/api/seeds", function (req, res) {
    db.Seed.findAll({}).then(function (resData) {
      res.json(resData);
    });
  });

  // Create a new seed
  app.post("/api/seeds", function (req, res) {
    db.Seed.create(req.body).then(function (resData) {
      res.json(resData);
    });
  });

  // Update a new branch
  app.put("/api/branches", function (req, res) {
    db.Seed.update(req.body, {
      where: { id: req.body.id }
    }).then(function (resData) {
      res.json(resData);
    });
  });

  // Delete a seed by id
  app.delete("/api/seeds/:id", function (req, res) {
    db.Seed.destroy({ where: { id: req.params.id } }).then(function (resData) {
      res.json(resData);
    });
  });
  // =========== Seeds (Hashtags) =================================================================

};
