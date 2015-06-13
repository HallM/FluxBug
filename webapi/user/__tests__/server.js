jest.dontMock('../server');

describe('Web API : User : Server side', function() {

  describe('.register()', function() {

    it('should generate salt with 10 rounds', function() {
      var salt = 1;
      var encPassword = 'asdf';

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            resolve(salt);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            resolve(encPassword);
          });
          return promise;
        }),
      });
      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              resolve({});
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(bcrypt.genSalt).toBeCalledWith(10);
      expect(done).toBeCalled();
    });

    it('should create encrypted password', function() {
      var salt = 1;
      var encPassword = 'asdf';
      var user = {
        email: 'test@test',
        password: encPassword,
        displayName: 'test'
      };

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            resolve(salt);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            resolve(encPassword);
          });
          return promise;
        }),
      });

      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              resolve(user);
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(bcrypt.hash).toBeCalledWith('test', salt);
      expect(models.User.create.mock.calls[0][0].password).toBe(encPassword);
      expect(done).toBeCalled();
    });

    it('should create new user', function() {
      var salt = 1;
      var encPassword = 'asdf';
      var user = {
        email: 'test@test',
        password: encPassword,
        displayName: 'test'
      };

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            resolve(salt);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            resolve(encPassword);
          });
          return promise;
        }),
      });

      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              resolve(user);
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(models.User.create).toBeCalledWith(user);
      expect(done).toBeCalled();
    });

    it('should respond OK if no errors occur', function() {
      var salt = 1;
      var encPassword = 'asdf';
      var user = {
        email: 'test@test',
        password: encPassword,
        displayName: 'test'
      };

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            resolve(salt);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            resolve(encPassword);
          });
          return promise;
        }),
      });

      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              resolve(user);
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(actionContext.respondOk).toBeCalled();
      expect(actionContext.respondOk.mock.calls[0][1]).toBe('/login');
      expect(actionContext.respondError).not.toBeCalled();
      expect(done).toBeCalled();
    });

    it('should respond error if salt fails', function() {
      var testError = 'THIS IS A TEST ERROR';
      var salt = 1;
      var encPassword = 'asdf';
      var user = {
        email: 'test@test',
        password: encPassword,
        displayName: 'test'
      };

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            reject(testError);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            resolve(encPassword);
          });
          return promise;
        }),
      });

      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              resolve(user);
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(bcrypt.genSalt).toBeCalled();
      expect(bcrypt.hash).not.toBeCalled();
      expect(models.User.create).not.toBeCalled();
      expect(actionContext.respondOk).not.toBeCalled();
      expect(actionContext.respondError).toBeCalled();
      expect(actionContext.respondError.mock.calls[0][0]).toBe(500);
      expect(actionContext.respondError.mock.calls[0][2]).toBe('/register');
      expect(done).toBeCalled();
    });

    it('should respond error if hash fails', function() {
      var testError = 'THIS IS A TEST ERROR';
      var salt = 1;
      var encPassword = 'asdf';
      var user = {
        email: 'test@test',
        password: encPassword,
        displayName: 'test'
      };

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            resolve(salt);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            reject(testError);
          });
          return promise;
        }),
      });

      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              resolve(user);
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(bcrypt.genSalt).toBeCalled();
      expect(bcrypt.hash).toBeCalled();
      expect(models.User.create).not.toBeCalled();
      expect(actionContext.respondOk).not.toBeCalled();
      expect(actionContext.respondError).toBeCalled();
      expect(actionContext.respondError.mock.calls[0][0]).toBe(500);
      expect(actionContext.respondError.mock.calls[0][2]).toBe('/register');
      expect(done).toBeCalled();
    });

    it('should respond error if user create fails', function() {
      var testError = 'THIS IS A TEST ERROR';
      var salt = 1;
      var encPassword = 'asdf';
      var user = {
        email: 'test@test',
        password: encPassword,
        displayName: 'test'
      };

      var Promise = require('bluebird');
      var bcryptMock = jest.setMock('bcrypt-as-promised', {
        genSalt: jest.genMockFunction().mockImplementation(function(rounds) {
          var promise = new Promise(function(resolve, reject) {
            resolve(salt);
          });
          return promise;
        }),
        hash: jest.genMockFunction().mockImplementation(function(pwd, salt) {
          var promise = new Promise(function(resolve, reject) {
            resolve(encPassword);
          });
          return promise;
        }),
      });

      var modelsMock = jest.setMock('../../../db/models/', {
        User: {
          create: jest.genMockFunction().mockImplementation(function(newUser) {
            var promise = new Promise(function(resolve, reject) {
              reject(testError);
            });
            return promise;
          })
        }
      });

      var bcrypt = require('bcrypt-as-promised');
      var models = require('../../../db/models/');
      var userApi = require('../server');

      var actionContext = {
        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.register(actionContext, payload, done);

      expect(bcrypt.genSalt).toBeCalled();
      expect(bcrypt.hash).toBeCalled();
      expect(models.User.create).toBeCalled();
      expect(actionContext.respondOk).not.toBeCalled();
      expect(actionContext.respondError).toBeCalled();
      expect(actionContext.respondError.mock.calls[0][0]).toBe(500);
      expect(actionContext.respondError.mock.calls[0][2]).toBe('/register');
      expect(done).toBeCalled();
    });

  });

  describe('.login()', function() {

    it('should call authenticate with local passport', function() {
      var user = {email: 'test@test', password: 'test', displayName: 'test'};
      var userApi = require('../server');

      var actionContext = {
        authenticate: jest.genMockFunction().mockImplementation(function(passport, cb) {
          cb(null, user, null);
        }),
        logIn: jest.genMockFunction().mockImplementation(function(record, cb) {
          cb(null);
        }),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.login(actionContext, payload, done);

      expect(actionContext.authenticate).toBeCalled();
      expect(actionContext.authenticate.mock.calls[0][0]).toBe('local');
      expect(typeof(actionContext.authenticate.mock.calls[0][1])).toBe('function');
      expect(done).toBeCalled();
    });

    it('should respond error 500 if authenticate returns err', function() {
      var testError = 'THIS IS A TEST ERROR';
      var userApi = require('../server');

      var actionContext = {
        authenticate: jest.genMockFunction().mockImplementation(function(passport, cb) {
          cb(testError, null, null);
        }),
        logIn: jest.genMockFunction().mockImplementation(function(record, cb) {
          cb(null);
        }),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.login(actionContext, payload, done);

      expect(actionContext.authenticate).toBeCalled();
      expect(actionContext.logIn).not.toBeCalled();
      expect(actionContext.respondOk).not.toBeCalled();
      expect(actionContext.respondError).toBeCalled();
      expect(actionContext.respondError.mock.calls[0][0]).toBe(500);
      expect(actionContext.respondError.mock.calls[0][2]).toBe('/login');
      expect(done).toBeCalled();
    });

    it('should respond error 401 if authenticate returns no err and no user', function() {
      var userApi = require('../server');

      var actionContext = {
        authenticate: jest.genMockFunction().mockImplementation(function(passport, cb) {
          cb(null, null, null);
        }),
        logIn: jest.genMockFunction().mockImplementation(function(record, cb) {
          cb(null);
        }),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.login(actionContext, payload, done);

      expect(actionContext.authenticate).toBeCalled();
      expect(actionContext.logIn).not.toBeCalled();
      expect(actionContext.respondOk).not.toBeCalled();
      expect(actionContext.respondError).toBeCalled();
      expect(actionContext.respondError.mock.calls[0][0]).toBe(401);
      expect(actionContext.respondError.mock.calls[0][2]).toBe('/login');
      expect(done).toBeCalled();
    });

    it('should call login with authenticate-returned user', function() {
      var user = {email: 'test@test', password: 'test', displayName: 'test'};
      var userApi = require('../server');

      var actionContext = {
        authenticate: jest.genMockFunction().mockImplementation(function(passport, cb) {
          cb(null, user, null);
        }),
        logIn: jest.genMockFunction().mockImplementation(function(record, cb) {
          cb(null);
        }),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.login(actionContext, payload, done);

      expect(actionContext.authenticate).toBeCalled();
      expect(actionContext.logIn).toBeCalled();
      expect(done).toBeCalled();
    });

    it('should respond error 401 if login returns err', function() {
      var testError = 'THIS IS A TEST ERROR';
      var user = {email: 'test@test', password: 'test', displayName: 'test'};
      var userApi = require('../server');

      var actionContext = {
        authenticate: jest.genMockFunction().mockImplementation(function(passport, cb) {
          cb(null, user, null);
        }),
        logIn: jest.genMockFunction().mockImplementation(function(record, cb) {
          cb(testError);
        }),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.login(actionContext, payload, done);

      expect(actionContext.authenticate).toBeCalled();
      expect(actionContext.logIn).toBeCalled();
      expect(actionContext.respondOk).not.toBeCalled();
      expect(actionContext.respondError).toBeCalled();
      expect(actionContext.respondError.mock.calls[0][0]).toBe(401);
      expect(actionContext.respondError.mock.calls[0][2]).toBe('/login');
      expect(done).toBeCalled();
    });

    it('should respond ok with user if login returns no err', function() {
      var user = {email: 'test@test', password: 'test', displayName: 'test'};
      var userApi = require('../server');

      var actionContext = {
        authenticate: jest.genMockFunction().mockImplementation(function(passport, cb) {
          cb(null, user, null);
        }),
        logIn: jest.genMockFunction().mockImplementation(function(record, cb) {
          cb(null);
        }),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.login(actionContext, payload, done);

      expect(actionContext.authenticate).toBeCalled();
      expect(actionContext.logIn).toBeCalled();
      expect(actionContext.respondOk).toBeCalled();
      expect(actionContext.respondOk.mock.calls[0][1]).toBe('/');
      expect(actionContext.respondOk.mock.calls[0][2]).toBeDefined();
      expect(actionContext.respondOk.mock.calls[0][2].email).toBeDefined();
      expect(actionContext.respondOk.mock.calls[0][2].displayName).toBeDefined();
      expect(actionContext.respondError).not.toBeCalled();
      expect(done).toBeCalled();
    });

  });

  describe('.logout()', function() {

    it('should call logout', function() {
      var userApi = require('../server');

      var actionContext = {
        logout: jest.genMockFunction(),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.logout(actionContext, payload, done);

      expect(actionContext.logout).toBeCalled();
      expect(done).toBeCalled();
    });

    it('should respond ok', function() {
      var userApi = require('../server');

      var actionContext = {
        logout: jest.genMockFunction(),

        respondOk: jest.genMockFunction(),
        respondError: jest.genMockFunction(),
        body: {email: 'test@test', password: 'test', displayName: 'test'}
      };
      var payload = {};
      var done = jest.genMockFunction();

      userApi.logout(actionContext, payload, done);

      expect(actionContext.logout).toBeCalled();
      expect(actionContext.respondOk).toBeCalled();
      expect(actionContext.respondOk.mock.calls[0][1]).toBe('/');
      expect(actionContext.respondError).not.toBeCalled();
      expect(done).toBeCalled();
    });

  });

});
