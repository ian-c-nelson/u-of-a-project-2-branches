// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
  var Branch = sequelize.define("Branch", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImgUrl: {
      type: DataTypes.STRING(512),
      field: "profile_img_url",
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
      as: "leaves",
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });

    Branch.belongsToMany(models.Branch, {
      as: "saplings",
      through: "Saplings"
    });
  };

  // Creating a custom method for our Branch model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Branch.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the Branch Model lifecycle
  // In this case, before a Branch is created, we will automatically hash their password
  Branch.hook("beforeCreate", function (branch) {
    branch.password = bcrypt.hashSync(branch.password, bcrypt.genSaltSync(10), null);
  });

  return Branch;
};
