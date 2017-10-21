const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
	console.log('connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
	console.log('database error'+err);
});



const app = express();

const users = require('./api/routes/usersRoutes');
const addressBooks = require('./api/routes/addressBookRoutes');


const port = process.env.PORT || 3000;




// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);
app.use('/addresses', addressBooks);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
})


// Start Server
app.listen(port , () => {
	console.log("Server started on port : "+port);
});
