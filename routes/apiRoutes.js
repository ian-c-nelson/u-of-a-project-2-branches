var db = require("../models");

module.exports = function (app) {
  // =========== Leaves (Posts) ===================================================================
  // Get all leaves
  app.get("/api/leaves", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new leaf
  app.post("/api/leaves", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Update a leaf
  app.put("/api/leaves", function (req, res) {
    db.Example.update(req.body, {
      where: { id: req.body.id }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a leaf by id
  app.delete("/api/leaves/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  // =========== Leaves (Posts) ===================================================================

  // =========== Branches (Users) =================================================================
  // Get all branches
  app.get("/api/branches", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new branch
  app.post("/api/branches", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Update a branch
  app.put("/api/branches", function (req, res) {
    db.Example.update(req.body, {
      where: { id: req.body.id }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a branch by id
  app.delete("/api/branches/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  // =========== Branches (Users) =================================================================

  // =========== Saplings (Followers) =================================================================
  // Get all saplings
  app.get("/api/saplings", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new sapling
  app.post("/api/saplings", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Update a sapling
  app.put("/api/saplings", function (req, res) {
    db.Example.update(req.body, { where: { id: req.body.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a sapling by id
  app.delete("/api/saplings/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  // =========== Branches (Users) =================================================================

  // =========== Seeds (Hashtags) =================================================================
  // Get all seeds
  app.get("/api/seeds", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new seed
  app.post("/api/seeds", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Update a new branch
  app.put("/api/branches", function (req, res) {
    db.Example.update(req.body, {
      where: { id: req.body.id }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a seed by id
  app.delete("/api/seeds/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  // =========== Seeds (Hashtags) =================================================================

};
