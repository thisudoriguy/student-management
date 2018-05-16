const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const studentController = require('../controllers/studentController');
const transactionsController = require('../controllers/transactionsController');
const multer  = require('multer');
const upload = multer({dest:'./uploads/'});
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/login', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', 
    failureRedirect : '/login', 
    failureFlash : true 
}));

router.get('/signup', (req, res, next) => {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: 'signup',
    failureFlash: true
}));

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', {user: req.user});
});

router.get('/8f21be8570b5854770db9b3926031fb6', (req, res, next) => {
    res.sendFile(path.resolve('./uploads/8f21be8570b5854770db9b3926031fb6'));
});

router.get('/addstudent', loggedIn, (req, res, next) => {
    res.render('newstudent');
}); 

router.post('/addstudent', upload.single('avatar'), studentController.createStudent);

router.get('/students', loggedIn, studentController.listStudents);

router.get('/student/:id',loggedIn, studentController.studentDetail);

router.get('/payments', loggedIn, (req, res, next) => {
    res.render('payments');
});

router.post('/payments', transactionsController.makePayment);

router.get('/payments/records/transactions', transactionsController.recordTransactions);

router.get('/payments/online', transactionsController.payOnline);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
    return next();
    res.redirect('/');
}

function loggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}


module.exports = router;