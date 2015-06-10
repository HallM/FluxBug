import webapi from '../webapi/';

var register = function(actionContext, payload, done) {
    webapi.register(actionContext, payload, done);
};

export {register};
