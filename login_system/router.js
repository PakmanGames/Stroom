var express = require('express');
var router = express.Router();

const credentials = {
    email: 'andy.pak.school@gmail.com',
    password: 'password'
};

// Login User
router.post('/route/login', (req, res) => {
    if(req.body.email == credentials.email && req.body.password == credentials.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end('Login Successful');
    } else {
        res.end('Invalid Password');
    }
});

// Route for dashboard
router.get('/route/dashboard', (req, res) => {
    if(req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.send('Unauthorized User');
    }
});

// Route for Logout
router.get('/route/logout', (req, res) => {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.send('Error');
        } else {
            res.render('base', { title: "Express", logout: "Logout Successful"});
        }
    });
});

module.exports = router;