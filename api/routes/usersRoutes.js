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

	if(!(newUser.email) || !(newUser.password)){
		res.status(403).json({
			success: false,
			msg: "Invalid data"
		});
		return;
	}
	User.addUser(newUser, (err, user) => {
		if(err){
			res.status(500).json({
				success: false,
				msg: err
			});
		} else {
			res.status(201).json({
				success: true,
				msg: 'You have successfully registered!',
				user: user
			});
		}
	});
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if(!(email) || !(password)){
		return res.status(403).json({
			success: false,
			msg: "Invalid data"
		});
	}

	User.getUserByEmail(email, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({
				success: false, 
				msg: 'User not found'
			});
		} 
		
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err){
				return res.status(500).json({
					success: false,
					msg: err
				});
			} else {
				if(isMatch){
					const token = jwt.sign(user, config.secret, {
						expiresIn: 86400 // 1 day
					});
					res.json({
						success: true,
						token: 'JWT '+token,
						user: user
					});
				} else {
					return res.status(401).json({
						success: false, 
						msg: 'Wrong Password'
					});
				}
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