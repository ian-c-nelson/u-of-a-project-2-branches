module.exports = function(sequelize, DataTypes) {
    var Leaf = sequelize.define("Leaf", {
      text: {
          type: DataTypes.STRING(140),
          allowNull: false,
          validate: {
            len: [1, 140]
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

    }

    return Leaf;
  };
  