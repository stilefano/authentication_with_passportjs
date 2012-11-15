var mongoose = require('mongoose'),
	hash = require('./public/javascripts/lib/node-pwd.js').hash;

var db = mongoose.createConnection('localhost','authentication');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connessi!")
});

var userSchema = new mongoose.Schema({
	username: String,
	email: {type: String,lowercase: true},
	password: String,
	salt: String,
	hash: String,
	created_at: { type: Date, default: Date.now}
})

var user = db.model('User', userSchema)

exports.registration = function(req,res){
	res.render('registration', { title: 'Express' });
}

exports.authenticate = function(req,res) {
	
	var pageParam = req.body;
	
	function store(pageParam){
		var singleUser = new user({ 
			username: pageParam.username,
			email: pageParam.email,
			password: pageParam.password,
			salt: pageParam.salt,
			hash: pageParam.hash
			 });
		
		singleUser.save(function (err) {
		  if (err) console.log(err)
		});		
	}

		hash(req.body.password, function(err, salt, hash) {
			pageParam.salt = salt;
			pageParam.hash = hash;
			store(pageParam);
		})	

	

		res.redirect('/');
}
