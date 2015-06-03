import express from 'express';
import models from './models/';
import bcrypt from 'bcrypt-as-promised';

var router = express.Router();

router.post('/register', (req, res) => {
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    
    if (password !== confirmPassword) {
        if (req.wantsJson()) {
            res.status(400).json({success: false, message: 'Passwords do not match.'});
        } else {
            req.flash('error', 'Passwords do not match.');
            res.redirect('/register');
        }
        return;
    }
    
    bcrypt.genSalt(10).then((salt) => {
       return bcrypt.hash(password, salt);
    }).then((encPassword) => {
        var newUser = {
            email: req.body.email,
            password: encPassword,
            displayName: req.body.displayName
        };
        return models.User.create(newUser);
    }).then((user) => {
        if (req.wantsJson()) {
            res.status(200).json({success: true, message: 'Successfully created your new account!'});
        } else {
            req.flash('success', 'Successfully created your new account!');
            res.redirect('/login');
        }
    }).catch((err) => {
        if (req.wantsJson()) {
            res.status(500).json({success: false, message: 'Failed to create user: ' + err + '.'});
        } else {
            req.flash('error', 'Failed to create user: ' + err + '.');
            res.redirect('/register');
        }
    });
});

export default router;
