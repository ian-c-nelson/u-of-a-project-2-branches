module.exports = function (sequelize, DataTypes) {
    var Seed = sequelize.define("Seed", {
        text: {
            type: DataTypes.STRING
        }
    });

    Seed.associate = (models) => {
        Seed.belongsToMany(models.Leaf, {
            as: "leaves",
            through: "LeafSeeds"
        });
    }

    return Seed;
};
