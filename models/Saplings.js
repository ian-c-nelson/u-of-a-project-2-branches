module.exports = function(sequelize, DataTypes) {
    var Saplings = sequelize.define("Saplings", {
      status: {
          type: DataTypes.STRING
      } // ok, muted, blocked
    });
    return Saplings;
  };
  