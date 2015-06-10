import webapi from '../webapi/';

var login = function(actionContext, payload, done) {
    webapi.login(actionContext, payload, done);
};

var logout = function(actionContext, payload, done) {
    webapi.logout(actionContext, payload, done);
};

export {login, logout};
