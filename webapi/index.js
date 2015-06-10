import models from '../db/models/';
import bcrypt from 'bcrypt-as-promised';

export default {
    register(actionContext, payload, done) {
        bcrypt.genSalt(10).then((salt) => {
            return bcrypt.hash(actionContext.body.password, salt);
        }).then((encPassword) => {
            var newUser = {
                email: actionContext.body.email,
                password: encPassword,
                displayName: actionContext.body.displayName
            };
            return models.User.create(newUser);
        }).then((user) => {
            actionContext.respondOk('Successfully created your new account!', '/login');
            done();
        }).catch((err) => {
            actionContext.respondError(500, 'Failed to create user: ' + err + '.', '/register');
            done();
        });
    },

    login(actionContext, payload, done) {
        actionContext.authenticate('local', (err, user, info) => {
            if (err) {
                actionContext.respondError(500, 'Failed to login ' + err, '/login');
                return done();
            } else if (!user) {
                actionContext.respondError(401, 'Incorrect username and password.', '/login');
                return done();
            }
            
            actionContext.logIn(user, (err) => {
                if (err) {
                    actionContext.respondError(401, 'Incorrect username and password.', '/login');
                } else {
                    actionContext.respondOk('Successfully logged in.', '/', {
                        email: user.email,
                        displayName: user.displayName
                    });
                }
                return done();
            });
        });
    },

    logout(actionContext, payload, done) {
        actionContext.logout();
        done();
    }
};
