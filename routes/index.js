var express = require('express');
var router = express();
var path = require('path');
var User   = require('./../models/user');
var bCrypt = require('bcrypt-nodejs');


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	// /* GET login page. */
	// router.get('/', function(req, res) {
 //    	// Display the Login page with any flash message, if any
	// 	res.render('index', { message: req.flash('message') });
	// });

	router.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({ 
		// name: 'Nick', 
		// password: 'password',
		// admin: true 
		id: "2333",
		username: "nick",
		password: bCrypt.hashSync('password', bCrypt.genSaltSync(10), null),
		email: "test@123.com",
		firstName: "nick",
		lastName: "cam"	
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
	});

	router.get('/', function (req, res) {
		// res.set('Content-Type', 'text/html');	
     	res.render('Roost - Material Design Real Estate', { req : req, res : res});
	});  

	 /* Handle Login POST */
	 router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
	 	failureRedirect: '/',
	 	failureFlash : true 
  
	 }));

	// /* GET Registration Page */
	// router.get('/signup', function(req, res){
	// 	res.render('register',{message: req.flash('message')});
	// });

	// /* Handle Registration POST */
	// router.post('/signup', passport.authenticate('signup', {
	// 	successRedirect: '/home',
	// 	failureRedirect: '/signup',
	// 	failureFlash : true  
	// }));

	// /* GET Home Page */
	// router.get('/home', isAuthenticated, function(req, res){
	// 	res.render('home', { user: req.user });
	// });

	// /* Handle Logout */
	// router.get('/signout', function(req, res) {
	// 	req.logout();
	// 	res.redirect('/');
	// });

	return router;
}





