module.exports = function (sequelize, DataTypes) {
    var Seed = sequelize.define("Seed", {
        text: {
            type: DataTypes.STRING
        }
    });

    Seed.associate = (models) => {
        Seed.belongsToMany(models.Leaf, {
            as: { singular: "leaf", plural: "leaves" },
            through: {
                model: "LeafSeed",
                unique: false
            },
            foreignKey: "seed_id",
            otherKey: "leaf_id",
            constraints: false
        });
    };

    return Seed;
};
