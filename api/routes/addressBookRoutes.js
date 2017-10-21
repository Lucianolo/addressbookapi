const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const serviceAccount = require("../../config/addressbookapifirebase.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://addressbookapi-7603f.firebaseio.com"
});


const db = admin.database();

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {

	const {user_id, first_name, last_name, address } = req.body;
  
	db.ref(`addresses/${user_id}`).push({ first_name, last_name, address}, (error, data) => {
    	if (error) {
      		res.status(500).json({
            success: false,
            msg: error.errMsg
          });
      		
    	} else {
      		res.status(201).json({
            success: true
          })
    	}
  	});

});

module.exports = router;