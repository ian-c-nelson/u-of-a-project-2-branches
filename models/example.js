module.exports = function (sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  });
  return Example;
};
