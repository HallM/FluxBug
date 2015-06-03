import request from 'superagent';
import {navigateAction} from 'fluxible-router';

var login = function(actionContext, payload, done) {
    request
        .post('/login')
        .type('form')
        .send(payload)
        .set('Accept', 'application/json')
        .end((err, res) => {
           if (err) {
               actionContext.dispatch('ADD_NOTIFICATIONS', [{
                   type: 'error',
                   message: 'Failed to login: ' + err
               }]);
           } else {
               if (res.body.success) {
                   actionContext.dispatch('USER_LOGGED_IN', res.body.user);
                   actionContext.executeAction(navigateAction, {url: '/'});
               } else {
                   actionContext.dispatch('ADD_NOTIFICATIONS', [{
                       type: 'error',
                       message: res.body.message
                   }]);
               }
           }
        });
};

var logout = function(actionContext, payload, done) {
    request
        .get('/logout')
        .send(payload)
        .set('Accept', 'application/json')
        .end((err, res) => {
           if (err) {
               actionContext.dispatch('ADD_NOTIFICATIONS', [{
                   type: 'error',
                   message: 'Failed to log out: ' + err
               }]);
           } else {
               if (res.body.success) {
                   actionContext.dispatch('USER_LOGGED_OUT', {});
                   actionContext.executeAction(navigateAction, {url: '/'});
               } else {
                   actionContext.dispatch('ADD_NOTIFICATIONS', [{
                       type: 'error',
                       message: res.body.message
                   }]);
               }
           }
        });
};

export {login, logout};
