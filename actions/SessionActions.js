import request from 'superagent';

var login = function(actionContext, payload, done) {
    request
        .post('/login')
        .send(payload)
        .set('Accept', 'application/json')
        .end((err, res) => {
           if (err) {
               // TODO: how should I show the errors?
           } else if (!res) {
               // TODO: how should I show the errors?
           } else {
               // TODO: setting up session?
               executeAction(navigateAction, {url: '/'});
           }
        });
};

var logout = function(actionContext, payload, done) {
    request
        .post('/logout')
        .send(payload)
        .set('Accept', 'application/json')
        .end((err, res) => {
           if (err) {
               // TODO: how should I show the errors?
           } else if (!res) {
               // TODO: how should I show the errors?
           } else {
               // TODO: remove session
               executeAction(navigateAction, {url: '/'});
           }
        });
};

export {login, logout};
