import request from 'superagent';
import {navigateAction} from 'fluxible-router';

var register = function(actionContext, payload, done) {
    request
        .post('/user/register')
        .type('form')
        .send(payload)
        .set('Accept', 'application/json')
        .end((err, res) => {
           if (err) {
               let errorMessage = res.body.message ? res.body.message : err;
               actionContext.dispatch('ADD_NOTIFICATIONS', [{
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
                   actionContext.dispatch('ADD_NOTIFICATIONS', [{
                       type: 'error',
                       message: res.body.message
                   }]);
               }
           }
           done();
        });
};

export {register};
