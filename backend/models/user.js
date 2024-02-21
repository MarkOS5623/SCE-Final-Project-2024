const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mssql',
  host: 'your-database-server',
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  fname: { type: DataTypes.STRING, allowNull: false },
  lname: { type: DataTypes.STRING, allowNull: false },
  id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      is: /^\d{9}$/ 
    }
  },
  department: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, allowNull: false},
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true } // New field
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
