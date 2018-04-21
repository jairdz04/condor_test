const mongoose = require('mongoose');
const url_connection = process.env.URL_CONNECTION;

mongoose.connect(url_connection, function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});

module.exports = mongoose;