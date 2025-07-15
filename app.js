const path = require('path');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute.js');
const app = express();

// connect Mongo
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

//Globel middleware 
app.use(express.json());

//Mount the routers here
app.use('/user',userRoute);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//start the server on port 3000
app.listen(3000,()=> console.log('Server running on http://localhost:3000'));