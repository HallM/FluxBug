jest.dontMock('../UserActions');

var userapi = {
  register: jest.genMockFunction()
};
var webapi = {
  userapi: userapi
};
jest.setMock('../../webapi', webapi);

describe('Actions : User Actions', function() {
  beforeEach(function() {
    userapi.register.mockClear();
  });

  describe('.register()', function() {

    it('should call userApi.register with actionContext, payload, and done', function() {
      var UserActions = require('../UserActions');

      var actionContext = jest.genMockFunction();
      var payload = {};
      var done = jest.genMockFunction();

      UserActions.register(actionContext, payload, done);

      expect(userapi.register).toBeCalled();
      expect(userapi.register).toBeCalledWith(actionContext, payload, done);
    });

  });

});
