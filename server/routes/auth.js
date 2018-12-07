const express = require('express');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const exjwt = require('express-jwt');

const User = require('../models/userModel');
const Log = require('../models/logModel');

// Register
auth.route('/register').post((req, res) => {
  	const newUser = {
	    username: req.body.username,
	    password: req.body.password
  	};

  	User.findOne(newUser, (err, user) => {
  		if (err) {
  			res.json({errorMessage: err});
  			console.log(err);  			
  		} else if (user) {
  			res.json({
	           	error: true,
	           	errorMessage: 'User already exists! Please login or register a new user.'
        	});	
  		} else {
		  	User.create(newUser, (err, user) => {
		  		if (err) {
		  			res.json({errorMessage: err});
		  			console.log(err);
		  		} else {
			    	const token = generateToken(user);
			   		res.json({
				    	user: user,
			    	});
		  			console.log('POST to /auth/register');
			    	console.log(`New user has been created: ${user}`);
		  		}
		  	});	
		}
  	});

});

// Login
auth.route('/login').post((req, res) => {
  	const loginUser = {
	    username: req.body.username.trim(),
	    password: req.body.password.trim()
  	};
  	User.findOne(loginUser, (err, user) => {
  		if (err) {
  			res.json({errorMessage: err});
  			console.log(err);  			
  		} else if (!user) {
  			return res.status(404).json({
	           	error: true,
	           	errorMessage: 'Username or password is wrong'
        	});	
  		} else {
			const token = generateToken(user);
			res.json({
				user: user,
				token: token
			});

			const newLog = {
				userId: user._id,
				username: user.username,
				event: 'login'
			};
			Log.create(newLog, (err, log) => {
		  		if (err) {
		  			console.log(err);
		  		} else {
		  			console.log('POST to /auth/login');
			    	console.log(`User has logged in: ${log}`);
		  		}
		  	});
		}
  	});
});

auth.route('/logout').post((req, res) => {
	const newLog = {
		userId: req.body._id,
		username: req.body.username,
		event: 'logout'
	};
	Log.create(newLog, (err, log) => {
  		if (err) {
  			res.json({errorMessage: err});
  			console.log(err);
  		} else {
  			res.json({token: ''});

  			console.log('POST to /auth/logout');
	    	console.log(`User has logged out: ${log}`);
  		}
  	});
});

//Generate Token using secret
function generateToken(user) {
  	var u = {
	    _id: user._id.toString(),
	    username: user.username,
	    password: user.password
  	};
  	return token = jwt.sign(u, 'top-secret', {
		expiresIn: 60 * 60 * 3
  	});
}

const authenticateUser = (req, res, next) => {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
		jwt.verify(req.headers.authorization.split(' ')[1], 'top-secret', (err,decode) => {
			if (err) {
				req.user = undefined;
			} else {
				req.user = decode;
			}
		})
	} else {
		req.user = undefined;
		res.json({ authenticateUser: decode }); //TEST
	}
	if (req.user) {
		next();	
	} else {
		return res.status(401).json({ message: 'Unauthorized user'});
	}
}

module.exports = auth;
module.exports.authenticateUser = authenticateUser;
