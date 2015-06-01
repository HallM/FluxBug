import express from 'express';
import models from './models/';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

var bcryptPromise Promise.promisifyAll(bcrypt);

var router = express.Router();

router.post('/register', (req, res) => {
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    
    if (password !== confirmPassword) {
        if (req.xhr) {
            res.status(400).json({success: false, message: 'Passwords do not match.'});
        } else {
            req.flash('error', 'Passwords do not match.');
            res.redirect('/user/register');
        }
    }
    
    bcryptPromise.genSalt(10).then((salt) => {
       return bcryptPromise.hash(password, salt);
    }).then((encPassword) => {
        var newUser = {
            email: req.body.email,
            password: encPassword,
            displayName: req.body.displayName
        };
        return models.User.create(newUser);
    }).then((user) => {
        if (req.xhr) {
            res.status(500).json({success: false, message: 'Failed to create user: ' + err + '.'});
        } else {
            req.flash('error', 'Failed to create user: ' + err + '.');
            res.redirect('/login');
        }
    }).catch((err) => {
        if (req.xhr) {
            res.status(500).json({success: false, message: 'Failed to create user: ' + err + '.'});
        } else {
            req.flash('error', 'Failed to create user: ' + err + '.');
            res.redirect('/user/register');
        }
    });
});

export default router;
