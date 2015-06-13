import {userapi} from '../webapi/';

var login = function(actionContext, payload, done) {
  userapi.login(actionContext, payload, done);
};

var logout = function(actionContext, payload, done) {
  userapi.logout(actionContext, payload, done);
};

export {login, logout};
