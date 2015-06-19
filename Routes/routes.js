module.exports = function(app, passport) {
     
     var mongoose = require('mongoose');
	 require('../Schema/user.js')
     require('../Schema/form.js')
     
	 var User = mongoose.model('User');
     var Form = mongoose.model('Form');
	
	 app.get('/', function(req, res) {
         res.render('index.ejs'); //load the index.ejs file
         });
		 
	
	
	//Get and post request for login
	 app.get('/login', function(req, res) {
         //render the page and pass in any flash data if it exists
         res.render('login.ejs', { message: req.flash('loginMessage')});
     });
		
    //Post request for our login, on success and failure		
	app.post('/login', passport.authenticate('local-login',  {
		
		
         successRedirect : '/profile', //redirect to the secure profile section
         failureRedirect : '/login', //redirect back to the signup page
         failureFlash : true //allow flash messages
		
	 }) 
	 );
	 
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {user : req.user}); 
	 });
		
	
	 //getting our signup page
	 app.get('/signup', function(req, res) {
     //render the page and pass inany flash data
     res.render('signup.ejs', { message: req.flash('signupMessage')});
   });
  app.get('/users', isLoggedIn, function(req, res) {
		res.render('users.ejs', {user : req.user}); 
	 });
	
	app.get('/forms', isLoggedIn, function(req, res) {
		res.render('forms.ejs', {user : req.user}); 
	 });
	 app.get('/formsToComplete', isLoggedIn, function(req, res) {
		res.render('formsToComplete.ejs', {user : req.user}); 
	 });
	 app.get('/formsCompleted', isLoggedIn, function(req, res) {
		res.render('formsCompleted.ejs', {user : req.user}); 
	 });
	 app.get('/about', isLoggedIn, function(req, res) {
		res.render('about.ejs', {user : req.user}); 
	 });
	 app.get('/rules', isLoggedIn, function(req, res) {
		res.render('rules.ejs', {user : req.user}); 
	 });
	 
	 app.get('/addform', isLoggedIn, function(req, res) {
		res.render('addform.ejs', {user : req.user}); 
	 });
	 
	 app.get('/updateProfile', isLoggedIn, function(req, res) {
		res.render('updateProfile.ejs', {user : req.user}); 
	 });
   //process the signup form
   //app.post('/signup', do all our passport stuff here')
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', //redirect to profile
        failureRedirect : '/signup' , //redirect back to the signup page
        failureFlash : true //allow flash messages
   }));
   
   
  
   //Logout
   app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
   });

	app.get('/user', isLoggedIn, function(req, res) {
		var id = req.user._id;
		User.findById(id, function(err, user) {
			res.json(user);
		});
	});

	app.post('/updateProfile', isLoggedIn, function(req, res) {
		var id = req.user._id;
		if (req.body.firstName === "") {
			req.body.firstName = req.user.local.firstName;
		}
		if (req.body.lastName === "") {
			req.body.lastName = req.user.local.lastName;
		}
		if (req.body.dob === "") {
			req.body.dob = req.user.local.dob;
		}
		if (req.body.department === "") {
			req.body.department = req.user.local.department;
		}
		if (req.body.position === "") {
			req.body.position = req.user.local.position;
		}
		User.findById(id, function(err, user) {
        user.local.firstName = req.body.firstName;
		user.local.lastName = req.body.lastName;
		user.local.dob = req.body.dob;
		user.local.department = req.body.department;
		user.local.position = req.body.position;
		user.save();
		
		});
		res.json(req.body);
	});

app.get('/allUsers', isLoggedIn, function(req, res) {
	
	
	User.find({}, function(err, users)  {
		res.json(users);
	});
	
});

app.get('/allForms', isLoggedIn, function(req, res) {
	
	
	Form.find({}, function(err, form) {
		res.json(form);
	});
});

app.get('/addform', isLoggedIn, function(req, res) {
	res.render("addform.ejs", {user : req.user});
});

app.get('/lackeys', isLoggedIn, function(req, res) {
	res.render('lackeys.ejs');
});

app.post('/addLackey/:id', isLoggedIn, function(req, res) {
	var id = req.params.id;
	User.findById(req.user._id, function(err, user) {
		User.findById(id, function(err, usey) {
			if (err) throw err;
			user.local.lackeys.push(usey);
			user.save();
		});
	});
	res.json(req.body);
});

app.post('/removeLackey/:id', isLoggedIn, function(req, res) {
	var id = req.params.id;
	User.findById(req.user._id, function(err, user) {
		for (var i = 0; i < user.local.lackeys.length; i++) {
			
			if(id == user.local.lackeys[i]) {
				console.log("hit");
				console.log(user.local.lackeys[i]);
				user.local.lackeys.splice(i,1);
				user.save();
			}
		}
	});
	res.json(req.body);
});
app.get('/allLackeys', isLoggedIn, function(req, res) {
	var id = req.user._id;
	var array = [];
	var num_procced = 0;
	User.findById(id, function (err, user) {
		if (!err) {
		var total = user.local.lackeys.length;
		for(var i = 0; i  < total; i++) {
			User.findById(user.local.lackeys[i], function(err, usey) {
				array.push(usey);
				num_procced = num_procced + 1;
				console.log(num_procced);
				
				if (total === num_procced) {
			console.log("Hit");
			res.json(array);
		}
			});
		}
		
		}
	});
	
});

app.post('/addForm', isLoggedIn, function(req, res) {
	var newForm = new Form(req.body);
	newForm.author = req.user;
	newForm.save();
	User.findById(req.user._id, function (err, user) {
		user.local.forms_created.push(newForm);
		user.save();
	});
	res.json(req.body);
});
//middleware to check if we are logged in 
   function isLoggedIn(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated())
      return next(); //cuz we want to move on incase we're stuck here

   //if they arent redirect them to the home page
   res.redirect('/');
 }
 
 //middleware to check if we are loggedin as a admin
 function isAdmin(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated() && req.user.local.email === "admin")
      return next(); //cuz we want to move on incase we're stuck here

   //if they arent redirect them to the home page
   res.redirect('/');
 }
 
function isLadmin(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated() && req.user.local.email === "admin"){
	  
      res.redirect('/dashboard'); //cuz we want to move on incase we're stuck here
	   
   }
   else if (req.isAuthenticated()) {
   //if they arent redirect them to the home page
      
      return next();
	  
   }
   else{ 
	  res.redirect('/');
	  
   }
 }
 
 
 
 
}

// Fisher-Yates (aka Knuth) Shuffle/

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }