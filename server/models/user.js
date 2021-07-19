module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groups: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  }, {});

  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
