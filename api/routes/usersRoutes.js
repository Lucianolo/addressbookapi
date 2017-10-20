const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
	let newUser = new User({
		email: req.body.email,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if(err){
			res.json({
				success: false,
				msg: err
			});
		} else {
			res.json({
				success: true,
				msg: 'You have successfully registered!',
				user: user
			});
		}
	});
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsernameOrEmail(username, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({
				success: false, 
				msg: 'User not found'
			});
		} 
		
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(user, config.secret, {
					expiresIn: 86400 // 1 day
				});
				console.log(jwt);
				res.json({
					success: true,
					token: 'JWT '+token,
					user: user
				});
			} else {
				return res.json({
					success: false, 
					msg: 'Password Errata'
				});
			}

		});
	})
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = router;