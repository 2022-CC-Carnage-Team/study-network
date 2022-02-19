require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true});
var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('Connected to database successfully');
});
conn.on('disconnected',function(){
    console.log('Disconnected from database successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
