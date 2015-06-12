jest.dontMock('../SessionStore');

var Dispatcher = {
  waitFor: jest.genMockFunction().mockImplementation(function(store, cb) {
    cb();
  })
};

var BaseStore = function(dispatcher) {
  this.dispatcher = dispatcher;
};
BaseStore.prototype.emitChange = jest.genMockFunction();
jest.setMock('fluxible/addons/BaseStore', BaseStore);

describe('Stores : SessionStore', function() {
  beforeEach(function() {
    Dispatcher.waitFor.mockClear();
    BaseStore.prototype.emitChange.mockClear();
  });

  describe('general', function() {

    it('should have storeName = SessionStore', function() {
      var SessionStore = require('../SessionStore');
      expect(SessionStore).toBeDefined();
      expect(SessionStore.storeName).toBeDefined();
      expect(SessionStore.storeName).toBe('SessionStore');
    });

    it('should have USER_LOGGED_IN handler set to valid function', function() {
      var SessionStore = require('../SessionStore');
      expect(SessionStore).toBeDefined();
      expect(SessionStore.handlers).toBeDefined();
      expect(SessionStore.handlers['USER_LOGGED_IN']).toBeDefined();

      var handler = SessionStore.handlers['USER_LOGGED_IN'];
      expect(SessionStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('handleLogin');
      expect(typeof(SessionStore.prototype[handler])).toBe('function');
    });

    it('should have USER_LOGGED_OUT handler set to valid function', function() {
      var SessionStore = require('../SessionStore');
      expect(SessionStore).toBeDefined();
      expect(SessionStore.handlers).toBeDefined();
      expect(SessionStore.handlers['USER_LOGGED_OUT']).toBeDefined();

      var handler = SessionStore.handlers['USER_LOGGED_OUT'];
      expect(SessionStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('handleLogout');
      expect(typeof(SessionStore.prototype[handler])).toBe('function');
    });

  });

  describe('constructor', function() {

    it('should call super with dispatcher', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);

      expect(store.dispatcher).toBe(Dispatcher);
    });

    it('should set user to null', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);

      expect(store.user).toBe(null);
    });

  });

  describe('.handleLogin', function() {

    it('should set user to parameter passed', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      var user = {};
      store.handleLogin(user);

      expect(store.user).toBe(user);
    });

    it('should emit change', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      var user = {};
      store.handleLogin(user);

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.handleLogout', function() {

    it('should set user to null', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      var user = {};
      store.handleLogout();

      expect(store.user).toBe(null);
    });

    it('should emit change', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      var user = {};
      store.handleLogout();

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.isCurrentlyLoggedIn', function() {

    it('should return true if user is non-null', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      store.user = {email: 'test@test'};
      var test = store.isCurrentlyLoggedIn();

      expect(test).toBeTruthy();
    });

    it('should return true if user is null', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      store.user = null;
      var test = store.isCurrentlyLoggedIn();

      expect(test).toBeFalsy();
    });

  });

  describe('.getLoggedinUser', function() {

    it('should return the user', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);
      var user = {email: 'test@test'};
      store.user = user;
      var test = store.getLoggedinUser();

      expect(test).toBe(user);
    });

  });

  describe('.dehydrate', function() {

    it('should return an object with all properties', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);

      var user = {email: 'test@test'};
      store.user = user;

      var test = store.dehydrate();
      expect(test).toBeDefined();
      expect(test.user).toBeDefined();

      expect(test.user).toBe(user);
    });

  });

  describe('.rehydrate', function() {

    it('should load all properties from state', function() {
      var SessionStore = require('../SessionStore');
      var store = new SessionStore(Dispatcher);

      var user = {email: 'test@test'};

      var test = store.rehydrate({
        user: user
      });
      expect(store.user).toBe(user);
    });

  });

});
