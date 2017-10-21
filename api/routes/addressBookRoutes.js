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

	const user_id = req.body.user_id;
  const first_name = req.body.payload.first_name;
  const last_name = req.body.payload.last_name;
  const address = req.body.payload.address;

  // You can check the value of Payload's fields and send an error if needed 

  
	db.ref(`addresses/${user_id}`).push({ first_name, last_name, address}, (error, data) => {
    	if (error) {
      		res.status(500).json({
            success: false,
            msg: error.errMsg
          });
      		
    	} else {
      		res.status(201).json({
            success: true,
            address: req.body.payload
          })
    	}
  	});


});

module.exports = router;