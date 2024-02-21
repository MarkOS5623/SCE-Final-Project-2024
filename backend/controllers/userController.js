// Import necessary modules and dependencies
const { User } = require('../models'); // Assuming you have a User model defined

// Define the signup function
exports.signup = async (req, res, next) => {
  try {
    // Extract user data from request body
    const { username, password, email, fname, lname, id, department, worker, admin } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        $or: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user record in the database
    const newUser = await User.create({
      username,
      password,
      email,
      fname,
      lname,
      id,
      department,
      worker,
      admin,
    });

    // Return the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors
    console.error('Error in signup:', error);
    next(error); // Pass the error to the error handling middleware
  }
};
