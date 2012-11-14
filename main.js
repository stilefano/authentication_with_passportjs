var mongoose = require('mongoose')
	hash = require('./public/javascripts/pass.js').hash;

var db = mongoose.createConnection('localhost','authentication');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connessi!")
});

var userSchema = new mongoose.Schema({
	username: String,
	email: {type: String,lowercase: true},
	password: String,
	created_at: { type: Date, default: Date.now}
})

var user = db.model('User', userSchema)

exports.registration = function(req,res){
	res.render('registration', { title: 'Express' });
}

exports.authenticate = function(req,res) {
	var usernameValue = req.body.username;
	var emailValue = req.body.email;
	var passwordValue = req.body.password;
	var singleUser = new user({ 
		username: usernameValue,
		email: emailValue,
		password: passwordValue
		 })
	
	singleUser.save(function (err) {
	  if (err) console.log(err)
	});
		res.redirect('/');
}
