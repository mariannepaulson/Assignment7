/**
 * http://usejsdoc.org/
 */

/*
 * Declaring line reader
 */
var lineReader = require('line-reader');

var eRecruiteUsers = [];

/*
 * Send the content of HTML page to the client
 * @Param fileName - The name of the file containing the html file
 * @param result - The HTTP result
 */

function sendPage(fileName, result)
{
    var html = '';

    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last)
        {
            html += line + '\n';

            if (last)
            {
                result.send(html);
                return false;
            }
            else
            {
                return true;
            }
        });
}


/*
 * Get the job list page
 */

module.exports.getJoblistPage = function(request, response){

	sendPage('jobList.html', response)
}

/*
 * Post apply job
 */

module.exports.postApplyJob = function(request, response){

	response.cookie('companyName', 'google', { expires: new Date() + 9999, maxAge:9999 });
	response.redirect('/home');

}

/*
 * Get login page
 */
module.exports.home = function(request, result)
{
    sendPage('login-page.html', result);
};


/*
 * Get the Registration form on clicking the signUp link
 */
module.exports.signUp = function(request, result){

	sendPage('register-page.html', result);
};

/*
 * post registration page
 */

module.exports.postRegistration = function(req, res)
{
    // Create an array of users with matching usernames.
    var matches = eRecruiteUsers.filter(function(user)
    {
    	return user.email === req.body.email;
    });

    // If there is a match, the user has already registered.
    if (matches.length > 0)
    {
    	res.render('displayText.hbs',{
			displayContent: 'User is already exists!!!',
			status: 'login failed'
})
    }

    // Register a new user.
    else
    {
    	var newUser = { firstName: req.body.firstName,
    					lastName: req.body.lastName,
    					email: req.body.email,
    					userName: req.body.userName,
    					password: req.body.password,
                      };
    	eRecruiteUsers.push(newUser);
        /*console.log("New user:"); console.log(newUser);
        console.log("Registered users:"); console.log(eRecruiteUsers);
        */

    	res.redirect('/home');
    }
};

/*
 * post login page
 */
module.exports.postLogin = function(req, res){
	console.log("Registered users:"); console.log(eRecruiteUsers);
    console.log("Logging in: " + req.body.email + "/" + req.body.password);

    // Create an array of users with matching credentials.
    var matches = eRecruiteUsers.filter(function(user)
                  {
                      return    (((user.email === req.body.email) || (user.userName === req.body.email))
                             && (user.password === req.body.password));
                  });

    /*console.log("Matching credentials: "); console.log(matches);*/

    if (matches.length === 0)
    {
    	res.render('displayText.hbs',{
    				displayContent: 'Invalid credential!!!',
    				status: 'login failed'
    	})
    }
    else
    {
        // The user is logged in for this session.
        req.session.user = matches[0];
/*        console.log("Sucessfully logged in:");
        console.log(req.session.user.userName);
        console.log(req);*/
        var name = req.session.user.firstName+ ' '+req.session.user.lastName;
        res.render('sucessful.hbs',{
			userName: name,
			titleHere: 'sucessful login',
        	status: 'loggedin',
        	route: '/logout',
        	nextStatus: 'logout'
        })
    }

};

/*
 * Logout session
 */

module.exports.getLogout = function(req, res){

	if (req.session.user)
	{
		var name = req.session.user.firstName;
		name = name + ' ' +req.session.user.lastName;
	    req.session.destroy();
	    console.log(name+" sucessfully logged out");
	    res.render('sucessful.hbs',{
			userName: name,
			titleHere: 'sucessful login',
        	status: 'loggedout',
        	route: '/logout',
        	nextStatus: 'login again'
        })
	}
	else{
		res.redirect('/home');
	}

};

module.exports.new_talent = function(req,res){
  res.render('newTalent.hbs', {currentYear: new Date().getFullYear()});
}

module.exports.update_talent = function(req, res) {
    var db = req.db;
    var lname = req.params.lname;

    var collection = db.get('talent');

    collection.find({lname: lname},
        function(err, docs)
        {
            res.render('updateTalent.hbs', {
                pageTitle: "Update Talent:",
                lname: lname,
                talent: docs[0],
                currentYear: new Date().getFullYear()
            });

        });
}

module.exports.get_deletetalent = function(req, res)
{
    var db = req.db;
    var lname = req.params.lname;

    var collection = db.get('talent');



    collection.find({lname: lname},
        function(err, docs)
        {
            res.render('deleteTalent.hbs', {
                pageTitle: 'Talent to delete:' + lname,
                lname: lname,
                talent: docs,
                currentYear: new Date().getFullYear()
            })

        });
};

