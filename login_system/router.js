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
        res.redirect('/dashboard');
        // res.end('Login Successful');
    } else {
        res.end('Invalid Password');
    }
});

module.exports = router;