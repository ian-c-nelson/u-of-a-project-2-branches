module.exports = function (sequelize, DataTypes) {
  var Branch = sequelize.define("Branch", {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      }
    },
    handle: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        isEmail: true
      }
    },
    profileImgUrl: {
      type: DataTypes.STRING(512),
      field:"profile_img_url",
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Branch.associate = (models) => {
    Branch.hasMany(models.Leaf, {
      as: "leaf",
      onDelete: "cascade"
    });

    Branch.belongsToMany(models.Branch, {
      as: "saplings",
      through: "Saplings"
    })
  };

  return Branch;
};
