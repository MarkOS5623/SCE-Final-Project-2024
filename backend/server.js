const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/docsRoutes');
const utilsRoutes = require('./routes/utilsRoutes');

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
app.use('/api/documents', documentRoutes);
app.use('/api/utils', utilsRoutes);

//global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
