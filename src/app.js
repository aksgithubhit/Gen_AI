const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
 
// Import and use routes
const authRoutes = require('./routes/auth.routes.js');
// using all the routes from auth.routes.js with the prefix /api/auth
app.use('/api/auth', authRoutes);



module.exports = app;