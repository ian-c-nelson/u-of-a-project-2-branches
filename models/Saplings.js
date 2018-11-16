module.exports = function(sequelize, DataTypes) {
    var Saplings = sequelize.define("Saplings", {
      status: {
          type: DataTypes.STRING,
          defaultValue: "ok"
      } // ok, muted, blocked
    });
    return Saplings;
  };
  