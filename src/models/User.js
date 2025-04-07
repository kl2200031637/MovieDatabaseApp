const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import DB connection

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Email validation
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = User; // ✅ Export without calling sync()