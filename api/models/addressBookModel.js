'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	
})