jest.dontMock('../SessionActions');

var userapi = {
  login: jest.genMockFunction(),
  logout: jest.genMockFunction()
};
var webapi = {
  userapi: userapi
};
jest.setMock('../../webapi', webapi);

describe('Actions : Session Actions', function() {
  beforeEach(function() {
    userapi.login.mockClear();
    userapi.logout.mockClear();
  });

  describe('.login()', function() {

    it('should call userApi.login with actionContext, payload, and done', function() {
      var SessionActions = require('../SessionActions');

      var actionContext = jest.genMockFunction();
      var payload = {};
      var done = jest.genMockFunction();

      SessionActions.login(actionContext, payload, done);

      expect(userapi.login).toBeCalled();
      expect(userapi.login).toBeCalledWith(actionContext, payload, done);
    });

  });

  describe('.logout()', function() {

    it('should call userApi.logout with actionContext, payload, and done', function() {
      var SessionActions = require('../SessionActions');

      var actionContext = jest.genMockFunction();
      var payload = {};
      var done = jest.genMockFunction();

      SessionActions.logout(actionContext, payload, done);

      expect(userapi.logout).toBeCalled();
      expect(userapi.logout).toBeCalledWith(actionContext, payload, done);
    });

  });

});
