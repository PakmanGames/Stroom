var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  // Include other properties here as needed
});

const User = mongoose.model('User', UserSchema, 'userInfo');

// Route for handling the login page
router.post('/route/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).send('Invalid email');
        }

        // If the user exists, compare the provided password with the one in the database
        if (req.body.password === user.password) {
            req.session.user = req.body.email;
            return res.redirect('/route/dashboard');
        } else {
            return res.status(401).send('Invalid password');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send();
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