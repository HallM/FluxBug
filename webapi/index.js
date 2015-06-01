import bcrypt from 'bcrypt';
import Promise from 'bluebird';
var bcryptPromise = Promise.promisifyAll(bcrypt);

export default {
    register(actionContext, email, password, displayName) {
        return bcryptPromise.genSalt(10).then((salt) => {
           return bcryptPromise.hash(password, salt);
        }).then((encPassword) => {
            var newUser = {
                email: req.body.email,
                password: encPassword,
                displayName: req.body.displayName
            };
            return models.User.create(newUser);
        });
    },
    login(actionContext, email, password) {
        var req = actionContext.getReq;
        var res = actionContext.getRes;
        var next = actionContext.getNext;

        passport.authenticate('local', (err, user, info) => {
            if (req.xhr) {
                if (err) {
                    res.status(500).json({success: false, message: 'Failed to login.'});
                    return;
                } else if (!user) {
                    res.status(400).json({success: false, message: 'Failed to login.'});
                    return;
                }
            } else {
                if (err || !user) {
                    req.flash('error', 'Failed to login.');
                    res.redirect('/login');
                    return;
                }
            }
            req.logIn(user, (err) => {
                if (req.xhr) {
                    if (err) {
                        res.status(401).json({success: false, message: 'Failed to login.'});
                        return;
                    } else {
                        res.status(200).json({success: true, message: 'Successfully logged in.'});
                        return;
                    }
                } else {
                    if (err) {
                        req.flash('error', 'Failed to login.');
                        res.redirect('/login');
                        return;
                    } else {
                        req.flash('success', 'Successfully logged in.');
                        res.redirect('/');
                        return;
                    }
                }
            });
        })(req, res, next);
    },
    logout(actionContext) {
        var req = actionContext.getReq;
        var res = actionContext.getRes;

        req.logout();
        if (req.xhr) {
            res.status(200).send({success: true, message: 'You have been logged out.'});
        } else {
            req.flash('success', 'You have been logged out.');
            res.redirect('/');
        }
    }
};
