import {userapi} from '../webapi/';

var register = function(actionContext, payload, done) {
    userapi.register(actionContext, payload, done);
};

export {register};
