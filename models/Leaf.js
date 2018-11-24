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
    Leaf.hasMany(models.Leaf, {
      as: "replies",
      onDelete: "cascade",
      foreignKey: "reply_to_id",
      constraints: false
    });

    // tags
    Leaf.belongsToMany(models.Seed, {
      as: { singular: "seed", plural: "seeds" },
      through: {
        model: "LeafSeed",
        unique: false
      },
      foreignKey: "leaf_id",
      otherKey: "seed_id",
      constraints: false
    });

  }

  return Leaf;
};
