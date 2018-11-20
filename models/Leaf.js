module.exports = function (sequelize, DataTypes) {
  var Leaf = sequelize.define("Leaf", {
    text: {
      type: DataTypes.STRING(280),
      allowNull: false,
      validate: {
        len: [1, 280]
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0
      }
    }
  });

  Leaf.associate = (models) => {
    Leaf.belongsTo(models.Branch, {
      foreignKey: {
        allowNull: false
      }
    });

    // replies
    Leaf.belongsToMany(models.Leaf, {
        as: "replies",
        through: "LeafReplies"
    });

    // retweets
    Leaf.belongsToMany(models.Branch, {
        as: "grafts",
        through: "BranchGrafts"
    });

    // Leaf.belongsToMany(models.Seed, {
    //   as: "seeds",
    //   through: "LeafSeeds"
    // });

  }

  return Leaf;
};
