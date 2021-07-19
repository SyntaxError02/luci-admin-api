module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The admin already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Admin.associate = (models) => {
    // associations can be defined here
  };
  return Admin;
};
