const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
// route POST /api/auth/register
// register a new user
// access public

router.post('/register', authController.registerUser);
  /**login route
   * 
   * */
router.post('/login', authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @desc clear  token from user cookies and add the token to blacklist
 * @access Public
 */

router.get('/logout', authController.logoutUser);

/**
 * @route GET /api/auth/get-me
 * @desc Get the current logged-in user's information
 * @access Private
 */
router.get('/get-me', authMiddleware, authController.getMe);


module.exports = router;