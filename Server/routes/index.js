/**
 * http://usejsdoc.org/
 */

var express = require('express');
let app = express();
var router = express.Router();
var cntrMain = require('../controllers/main');

app.use(express.static(__dirname+'/public'));

//MongoDB code
var modelMain = require("../models/modelMain");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/eRecruitDB');

//MongoDB code
app.use(function(req, res, next)
{
    req.db = db;
    next();
});


router.get('/', cntrMain.home)
router.get('/home', cntrMain.home);

/* Routes to add addRecords */
router.get('/addRecords', modelMain.get_addRecords);
/* Routes associated with Talent */

router.get('/talent', modelMain.get_talent);
router.get('/talent/:lname', modelMain.get_searchtalent);
router.get('/addTalent', cntrMain.new_talent);
router.get('/updateTalent/:lname', cntrMain.update_talent);
router.post('/addTalent', modelMain.add_talent);
router.post('/updateTalent/:lname', modelMain.post_update_talent);
router.get('/deleteTalent/:lname', modelMain.post_deletetalent);





/*
 * To get the registration page
 */
router.get('/signUp', cntrMain.signUp);

/*
 * Post registration
 */
router.post('/registration', cntrMain.postRegistration);

/*
 * Post login
 */
router.post('/login',cntrMain.postLogin);


/*
 * post apply Job
 */
router.post('/applyJob', cntrMain.postApplyJob);

/*
 * get logout
 */

router.get('/logout', cntrMain.getLogout);

/*
 * Defining the router
 */

module.exports = router;
