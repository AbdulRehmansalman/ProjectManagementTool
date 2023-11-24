// require('dotenv').config();
const mongoose = require('mongoose');
const DbUri = process.env.MONGO_URI;

const dbConnection = mongoose
  .connect(DbUri)
  .then(() => console.log('Connection SucessFull'))
  .catch((err) => console.log(err));

module.exports = dbConnection;
