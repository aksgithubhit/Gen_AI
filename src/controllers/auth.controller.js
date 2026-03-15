const userModel = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.models.js');
/**
 * 
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 *  
 */
 async function registerUser(req, res) {
  // Extract user details from request body
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }

  // Check if user already exists
  const existingUser = await userModel.findOne({
    $or: [{ email: email }, { username: username }]
  });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }
// Hash the password before saving
  const hash = await bcrypt.hash(password, 10);
// Create a new user instance with the hashed password
  const newUser = new userModel({
     username,
    email,
    password: hash
  });

  // create token for the user
   const token = jwt.sign(
    { userId: newUser._id , username: newUser.username },
     process.env.JWT_SECRET, 
     { expiresIn: '1h' });
     // Set the token in cookies and make it HTTP-only for security
     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  // Save the user to the database
  await newUser.save();
   res.status(201).json({ message: 'User registered successfully', user: newUser, token: token });
 }

 /**
  * @route POST /api/auth/login
  * @desc Login a user
  * @access Public
  */
async function loginUser(req, res) {
    // Extract email and password from request body
  const { email, password } = req.body;
  // Find user by email
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  // Compare password with hashed password in database, user.password is the hashed password stored in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  // Set the token in cookies and make it HTTP-only for security
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  // Return success response with token and user details
  res.status(200).json({ message: 'Login successful', token: token, user: { id: user._id, username: user.username } });
}

/**
 * token blacklisting is a technique used to invalidate JWT tokens before their expiration time.
 *  When a user logs out or when a token is compromised, the token can be added to a blacklist,
 *  which is a list of tokens that are no longer valid. This way, even if the token has not expired, 
 * it cannot be used for authentication. The blacklist can be implemented using an in-memory data structure,
 *  a database, or a caching system like Redis. When a request is made with a token, the server checks if the
 *  token is in the blacklist before allowing access to protected resources.
 * 
 * 
 */
async function logoutUser(req, res) {
  // Get the token from cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
  // Add the token to the blacklist
  await blacklistModel.create({ token: token });
  // Clear the token from cookies
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
}


/**
 * @name getMeContoller
 * @description get the current logged in user details
 * @access private
 * 
 */
async function getMe(req,res){
  const user=await userModel.findById(req.user.id)

  res.status(200).json({
message:"user deatils fetched successfully",
    user:{
    id:user._id,
    username:user.username,
    email:user.email,
    }
  })
     



}

 module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
 }