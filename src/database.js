// src/database.js

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = connection;
