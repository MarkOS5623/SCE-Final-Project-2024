const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const utilsRoutes = require('./routes/utilsRoutes');
const documentRoutes = require('./routes/documentRoutes');
const statusRoutes = require('./routes/statusRoutes');

mongoose.connect('mongodb+srv://Admin:iCEye8tLh4ehBUgY@sce-project.zywbimp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Initialize Express app
const app = express();

app.use(cors());

// Middleware setup
app.use(bodyParser.json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/status', statusRoutes);

module.exports = app;