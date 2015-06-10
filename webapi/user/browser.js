import request from 'superagent';
import {navigateAction} from 'fluxible-router';

export default {
    register(actionContext, payload, done) {
        request
            .post('/register')
            .type('form')
            .send(payload)
            .set('Accept', 'application/json')
            .end((err, res) => {
               if (err) {
                   let errorMessage = res.body.message ? res.body.message : err;
                   actionContext.dispatch('SET_NOTIFICATIONS', [{
                       type: 'error',
                       message: errorMessage
                   }]);
               } else {
                   if (res.body.success) {
                       actionContext.dispatch('ADD_FLASH_MESSAGE', [{
                           type: 'success',
                           message: res.body.message
                       }]);
                       actionContext.executeAction(navigateAction, {url: '/login'});
                   } else {
                       actionContext.dispatch('SET_NOTIFICATIONS', [{
                           type: 'error',
                           message: res.body.message
                       }]);
                   }
               }
               done();
            });
    },

    login(actionContext, payload, done) {
        request
            .post('/login')
            .type('form')
            .send(payload)
            .set('Accept', 'application/json')
            .end((err, res) => {
               if (err) {
                   let errorMessage = res.body.message ? res.body.message : err;
                   actionContext.dispatch('SET_NOTIFICATIONS', [{
                       type: 'error',
                       message: errorMessage
                   }]);
               } else {
                   if (res.body.success) {
                       actionContext.dispatch('USER_LOGGED_IN', res.body.data);
                       actionContext.executeAction(navigateAction, {url: '/'});
                   } else {
                       actionContext.dispatch('SET_NOTIFICATIONS', [{
                           type: 'error',
                           message: res.body.message
                       }]);
                   }
               }
            });
    },

    logout(actionContext, payload, done) {
        request
            .post('/logout')
            .send(payload)
            .set('Accept', 'application/json')
            .end((err, res) => {
               if (err) {
                   let errorMessage = res.body.message ? res.body.message : err;
                   actionContext.dispatch('SET_NOTIFICATIONS', [{
                       type: 'error',
                       message: errorMessage
                   }]);
               } else {
                   if (res.body.success) {
                       actionContext.dispatch('USER_LOGGED_OUT', {});
                       actionContext.executeAction(navigateAction, {url: '/'});
                   } else {
                       actionContext.dispatch('SET_NOTIFICATIONS', [{
                           type: 'error',
                           message: res.body.message
                       }]);
                   }
               }
            });
    }
};
