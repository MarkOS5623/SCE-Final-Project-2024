const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/userRoutes');

const sequelize = new Sequelize('DocProject', 'postgres', 'Xhxnv2903!', {
  dialect: 'postgres',
  host: 'localhost',
});

// Initialize Express app
const app = express();

app.use(cors());

// Middleware setup
app.use(bodyParser.json());
app.use(morgan('dev'));

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Mount user routes
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
