module.exports = function (app, passport) {
    
    var mongoose = require('mongoose');
    var Promise = require('bluebird');
    Promise.promisifyAll(mongoose);
    
    require('../Schema/user.js')
    require('../Schema/form.js')
    
    var User = mongoose.model('User');
    var Form = mongoose.model('Form');
    var array = [];
    app.get('/', function (req, res) {
        res.render('index.ejs'); //load the index.ejs file
    });
    
    
    
    //Get and post request for login
    app.get('/login', function (req, res) {
        //render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    
    //Post request for our login, on success and failure		
    app.post('/login', passport.authenticate('local-login', {
        
        
        successRedirect : '/profile', //redirect to the secure profile section
        failureRedirect : '/login', //redirect back to the signup page
        failureFlash : true //allow flash messages
		
    }) 
    );
    
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', { user : req.user });
    });
    
    
    //getting our signup page
    app.get('/signup', function (req, res) {
        //render the page and pass inany flash data
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.get('/users', isLoggedIn, function (req, res) {
        res.render('users.ejs', { user : req.user });
    });
    
    app.get('/forms', isLadmin, function (req, res) {
        res.render('forms.ejs', { user : req.user });
    });
    
    app.get('/forms/:form', isLoggedIn, function (req, res) {
        res.render('iForm.ejs');
	
    });
    
    app.get('/form/:form', isLoggedIn, function (req, res) {
        var id = req.params.form;
        var array = [];
        Form.findById(id, function (err, form) {
            User.findById(form.author, function (err, author) {
                
                form.author[0] = author.local.firstName + " " + author.local.lastName;
                
                array.push(form);
                console.log(array);
                if (form.subform.length == 0) {
                    res.json(array);
                }
                if (form.subform.length != 0) {
                    var total = form.subform.length;
                    var numproc = 0;
                    form.subform.forEach(function (sub) {
                        Form.findById(sub, function (err, subs) {
                            array.push(subs);
                            numproc = numproc + 1;
                            
                            if (numproc == total) {
                                res.json(array);
                            }
                        });
                    });
                }
			
				
            });
			
        });
		
		
			
    });
    
    
    
    
    
    app.param('formy', function (req, res, next, id) {
        
        Form.findById(id, function (err, subform) {
            if (err) return next(err);
            req.subform = subform;
            return next();
        });
    });
    
    app.get('/formed/:formy', function (req, res) {
        req.subform.populate('subform', function (err, subform) {
            if (err) {
                return next(err);
            }
            res.json(req.subform);
        });
    });
    
    app.get('/forms/:form/sub', isLoggedIn, function (req, res) {
        res.render('addSubform.ejs');
    });
    
    app.get('/formsToComplete', isLoggedIn, function (req, res) {
        res.render('formsToComplete.ejs', { user : req.user });
    });
    app.get('/formsCompleted', isLoggedIn, function (req, res) {
        res.render('formsCompleted.ejs', { user : req.user });
    });
    app.get('/about', isLoggedIn, function (req, res) {
        res.render('about.ejs', { user : req.user });
    });
    app.get('/rules', isLoggedIn, function (req, res) {
        res.render('rules.ejs', { user : req.user });
    });
    
    app.get('/addform', isLoggedIn, function (req, res) {
        res.render('addform.ejs', { user : req.user });
    });
    
    app.get('/updateProfile', isLoggedIn, function (req, res) {
        res.render('updateProfile.ejs', { user : req.user });
    });
    //process the signup form
    //app.post('/signup', do all our passport stuff here')
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', //redirect to profile
        failureRedirect : '/signup' , //redirect back to the signup page
        failureFlash : true //allow flash messages
    }));
    
    
    
    //Logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/user', isLoggedIn, function (req, res) {
        var id = req.user._id;
        User.findById(id, function (err, user) {
            res.json(user);
        });
    });
    
    app.post('/updateProfile', isLoggedIn, function (req, res) {
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
        User.findById(id, function (err, user) {
            user.local.firstName = req.body.firstName;
            user.local.lastName = req.body.lastName;
            user.local.dob = req.body.dob;
            user.local.department = req.body.department;
            user.local.position = req.body.position;
            user.save();
		
        });
        res.json(req.body);
    });
    
    app.get('/allUsers', isLoggedIn, function (req, res) {
        
        
        User.find({}, function (err, users) {
            res.json(users);
        });
	
    });
    
    
    app.get('/allForms', isLoggedIn, function (req, res) {
        
        var totalproc = 0;
        var dupe = [];
        Form.find({"author": req.user._id}, function (err, form) {
            dupe = form;
            
            dupe.forEach(function (person) {
                
                User.findById(person.author, function (err, user) {
                    if (!err) {
                        
                        console.log("Author: " + person.author[0]);
                        person.author[0] = user.local.firstName + " " + user.local.lastName;
                        
                        totalproc = totalproc + 1;
			
                    }
                    if (totalproc == dupe.length) {
                        res.json(dupe);
                    }
                }
			
                );
            });
		
		
        });
    });
    
    app.get('/adminForms', isAdmin, function (req, res) {
        res.render('adminFormsView.ejs');
    });
    app.get('/allAdminForms', isAdmin, function (req, res) {
        
        var totalproc = 0;
        var dupe = [];
        Form.find({}, function (err, form) {
            dupe = form;
            
            dupe.forEach(function (person) {
                
                User.findById(person.author, function (err, user) {
                    if (!err) {
                        
                        console.log("Author: " + person.author[0]);
                        person.author[0] = user.local.firstName + " " + user.local.lastName;
                        
                        totalproc = totalproc + 1;
			
                    }
                    if (totalproc == dupe.length) {
                        res.json(dupe);
                    }
                }
			
                );
            });
		
		
        });
    });
    
    app.get('/allMyForms', isLoggedIn, function (req, res) {
        var totalproc = 0;
        var dupe = [];
        Form.find({}, function (err, form) {
            form.forEach(function (person) {
                console.log("Person : " + person.author[0]);
                console.log("User : " + req.user._id);
                
                if (person.author[0] === req.user._id) {
                    console.log("Hit");
                    dupe.push(person);
					
                }
                console.log(dupe);
            });
        });
        
        if (dupe.length != 0) {
            dupe.forEach(function (person2) {
                
                User.findById(person2.author, function (err, user) {
                    if (!err) {
                        
                        console.log("Author: " + person2.author[0]);
                        person2.author[0] = user.local.firstName + " " + user.local.lastName;
                        
                        totalproc = totalproc + 1;
			
                    }
                    if (totalproc == dupe.length) {
                        res.json(dupe);
                    }
                }
			
                );
            });
        }
        else {
            res.json(dupe);
        }
		
		
		
	
    });
    
    app.get('/addform', isLoggedIn, function (req, res) {
        res.render("addform.ejs", { user : req.user });
    });
    
    app.get('/lackeys', isLoggedIn, function (req, res) {
        res.render('lackeys.ejs');
    });
    
    app.post('/addSubForm', isLoggedIn, function (req, res) {
        var id = req.body.masterform;
        var subform = new Form();
        
        subform.title = req.body.title;
        subform.date = req.body.date;
        subform.body = "<pre>" + req.body.title + "</pre>";
        subform.save();
        Form.findById(id, function (err, report) {
            report.subform.push(subform);
            report.save();
        });
        User.findById(req.body.id, function (err, user) {
            user.local.forms_created.push(subform);
            subform.author = user;
            subform.save();
        });
        
        res.json(req.body);
    });
    app.post('/addLackey/:id', isLoggedIn, function (req, res) {
        var id = req.params.id;
        User.findById(req.user._id, function (err, user) {
            User.findById(id, function (err, usey) {
                if (err) throw err;
                user.local.lackeys.push(usey);
                user.save();
            });
        });
        res.json(req.body);
    });
    
    
    
    app.post('/removeLackey/:id', isLoggedIn, function (req, res) {
        var id = req.params.id;
        User.findById(req.user._id, function (err, user) {
            for (var i = 0; i < user.local.lackeys.length; i++) {
                
                if (id == user.local.lackeys[i]) {
                    console.log("hit");
                    console.log(user.local.lackeys[i]);
                    user.local.lackeys.splice(i, 1);
                    user.save();
                }
            }
        });
        res.json(req.body);
    });
    app.get('/allLackeys', isLoggedIn, function (req, res) {
        var id = req.user._id;
        var array = [];
        var num_procced = 0;
        User.findById(id, function (err, user) {
            if (!err) {
                var total = user.local.lackeys.length;
                for (var i = 0; i < total; i++) {
                    User.findById(user.local.lackeys[i], function (err, usey) {
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
    
    
    app.get('/forms/:form/edit', isLoggedIn, function (req, res) {
        var id = req.params.form;
        res.render('editForm.ejs');
    });
    
    app.post('/addForm', isLoggedIn, function (req, res) {
        var newForm = new Form(req.body);
        newForm.author = req.user;
        newForm.save();
        User.findById(req.user._id, function (err, user) {
            user.local.forms_created.push(newForm);
            user.save();
        });
        res.json(req.body);
    });
    //is probably not done in O(1) time since we are searching by name
    app.get('/Userforms', isLoggedIn, function (req, res) {
        var id = req.user._id;
        var totalproc = 0;
        var dupe = [];
        Form.find({"author" : id}, function (err, form) {
            dupe = form;
            
            dupe.forEach(function (person) {
                
                User.findById(person.author, function (err, user) {
                    if (!err) {
                        
                        console.log("Author: " + person.author[0]);
                        person.author[0] = user.local.firstName + " " + user.local.lastName;
                        
                        totalproc = totalproc + 1;
			
                    }
                    if (totalproc == dupe.length) {
                        res.json(dupe);
                    }
                }
			
                );
            });
		
		
        });
    });
    
    /*
app.get('/form/:form/subFormTree', function(req, res) {
	var id = req.params.form;
	var num_proc = 0;
	console.log(id);
	Form.findById(id, function(err, form) {
		console.log(form);
		for (var x = 0; x < form.subform.length; x++) {
			Form.findById(form.subform[x], function(err, subform) {
				console.log("/=================Forms===================/")
			
			//console.log(subform);
			console.log("/=================Forms===================/")
			populate(subform);
			});
		}
		num_proc = num_proc + 1;
		if (num_proc == form.subform.length) {
			res.json(array);
			array.length = 0;
		}
	});
});
*/

app.get('/formed/:form/tree', function (req, res) {
        var id = req.params.form; //we get our id from our route/link
        Form.findById(id).deepPopulate('subform.subform.subform.subform.subform.subform').execAsync() //i am looking for a form, using deeppopulate funct we fill out subforms to the 6th level, because I don't think there will be more than 6 levels, and if so we can just add in more..
        .then(function (doc) { //for the doc that the async call gets
            
            res.json(doc); //we send that doc with the populated fields  
        }).catch(function (err) { //if there is a error than tell us
            res.send('Something is wrong..' + err.message) //err.message holds true error, might be vague
        });

    });
  
    app.post('/forms/:form/complete', isLoggedIn, function (req, res) {
        var id = req.params.form;
        Form.findById(id, function (err, form) {
            form.isCompleted = true;
            form.save();
        });
        res.json(req.body);
    });
    
    
    /*
    app.post('/forms/:form/complete', isLoggedIn, function (req, res) {
    var id = req.params.form; //we get our id from our route/link
    Form.findById(id).deepPopulate('subform.subform.subform.subform.subform.subform').execAsync()//i am looking for a form, using deeppopulate funct we fill out subforms to the 6th level, because I don't think there will be more than 6 levels, and if so we can just add in more..
        .then(function (doc) { //for the doc that the async call gets
            doc.isCompleted = true;
            doc.save();     
        res.json(doc); //we send that doc with the populated fields  
    }).catch(function (err) { //if there is a error than tell us
        res.send('Something is wrong..' + err.message) //err.message holds true error, might be vague
    });

});
    */


    app.post('/forms/:form/incomplete', isLoggedIn, function (req, res) {
        var id = req.params.form;
        Form.findById(id, function (err, form) {
            form.isCompleted = false;
            form.save();
        });
        res.json(req.body);
    });

app.post('/form/:form/editForm', isLoggedIn, function(req, res) {
	var id = req.params.form;
	console.log(id);
	Form.findById(id, function(err, form) {
		
		if( req.body.title == "") {
			req.body.title = form.title;
		}
		
		if( req.body.body == "") {
			req.body.body = form.body;
            }
            
            if (req.body.date == "") {
                req.body.date = form.date;
            }
		form.backupBody = form.body;
            form.title = req.body.title;
            form.date = req.body.date;
		
            form.body = req.body.body;
            
		form.save();
		console.log(form);
		res.json(req.body);
	});
	
});

function populate(forms) {
		//console.log("This is : " + forms);
		var num_proc = 0;
		Form.findById(forms, function (err, form) {
			console.log(form);
		if(form.subform.length != 0) {
			//console.log(form);
			var total = form.subform.length;
			for (var i = 0; i < total; i++) {
				array.push(form.subform[x]);
				num_proc = num_proc + 1;
				
					populate(subform[x]);
				
			}
		}
		});
	}
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
	  
      res.redirect('/adminForms'); //cuz we want to move on incase we're stuck here
	   
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
	
	
	