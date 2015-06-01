import request from 'superagent';

var register = function(actionContext, payload, done) {
    request
        .post('/register')
        .send(payload)
        .set('Accept', 'application/json')
        .end((err, res) => {
           if (err) {
               // TODO: how should I show the errors?
           } else if (!res) {
               // TODO: how should I show the errors?
           } else {
               executeAction(navigateAction, {url: '/login'});
           }
        });
};

export {register};
