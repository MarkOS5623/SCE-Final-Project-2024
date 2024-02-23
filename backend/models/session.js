const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('DocProject', 'postgres', 'Xhxnv2903!', {
  dialect: 'postgres',
  host: 'localhost',
});

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  expires: {
    type: DataTypes.DATE
  },
  data: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Sessions' // Make sure this matches the name of your database table
});

// Export the model
module.exports = Session;
