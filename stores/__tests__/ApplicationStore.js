jest.dontMock('../ApplicationStore');

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

var routesConfig = {
  home: {
    get: function(prop) {
      return 'home';
    }
  },
  about: {
    get: function(prop) {
      return 'about';
    }
  }
};
var currentRoute = routesConfig.home;
jest.setMock('../../configs/routes', routesConfig);

var RouteStore = {};
jest.setMock('../RouteStore', RouteStore);

describe('Stores : ApplicationStore', function() {
  beforeEach(function() {
    Dispatcher.waitFor.mockClear();
    BaseStore.prototype.emitChange.mockClear();
  });

  describe('general', function() {

    it('should have storeName = ApplicationStore', function() {
      var ApplicationStore = require('../ApplicationStore');
      expect(ApplicationStore).toBeDefined();
      expect(ApplicationStore.storeName).toBeDefined();
      expect(ApplicationStore.storeName).toBe('ApplicationStore');
    });

    it('should have NAVIGATE_SUCCESS handler set to valid function', function() {
      var ApplicationStore = require('../ApplicationStore');
      expect(ApplicationStore).toBeDefined();
      expect(ApplicationStore.handlers).toBeDefined();
      expect(ApplicationStore.handlers['NAVIGATE_SUCCESS']).toBeDefined();

      var handler = ApplicationStore.handlers['NAVIGATE_SUCCESS'];
      expect(ApplicationStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('handlePageTitle');
      expect(typeof(ApplicationStore.prototype[handler])).toBe('function');
    });

    it('should have SETCSRF_TOKEN handler set to valid function', function() {
      var ApplicationStore = require('../ApplicationStore');
      expect(ApplicationStore).toBeDefined();
      expect(ApplicationStore.handlers).toBeDefined();
      expect(ApplicationStore.handlers['SETCSRF_TOKEN']).toBeDefined();

      var handler = ApplicationStore.handlers['SETCSRF_TOKEN'];
      expect(ApplicationStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('setCsrfToken');
      expect(typeof(ApplicationStore.prototype[handler])).toBe('function');
    });

  });

  describe('constructor', function() {

    it('should call super with dispatcher', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      expect(store.dispatcher).toBe(Dispatcher);
    });

    it('should set currentPageName to null', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      expect(store.currentPageName).toBe(null);
    });

    it('should set currentPage to null', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      expect(store.currentPage).toBe(null);
    });

    it('should set pages to the contents of routesConfig', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      expect(store.pages).toBe(routesConfig);
    });

    it('should set pageTitle to empty string', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      expect(store.pageTitle).toBe('');
    });

    it('should set csrf to empty string', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      expect(store.csrf).toBe('');
    });

  });

  describe('.handlePageTitle', function() {

    it('should wait for RouteStore', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      store.handlePageTitle(false);

      expect(Dispatcher.waitFor.mock.calls[0][0]).toBe(RouteStore);
    });

    it('should do nothing if currentRoute is falsy', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      store.handlePageTitle(false);

      expect(store.currentPageName).toBe(null);
      expect(store.pageTitle).toBe('');
      expect(store.emitChange).not.toBeCalled();
    });

    it('should do nothing if currentRoute.get(title) is falsy', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      store.handlePageTitle({
        get: function() {
          return false;
        }
      });

      expect(store.currentPageName).toBe(null);
      expect(store.pageTitle).toBe('');
      expect(store.emitChange).not.toBeCalled();
    });

    it('should set page title to currentRoute.get(title)', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      store.handlePageTitle(currentRoute);

      expect(store.pageTitle).toBe(currentRoute.get('title'));
    });

    it('should set current page name to currentRoute.get(page)', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      store.handlePageTitle(currentRoute);

      expect(store.currentPageName).toBe(currentRoute.get('page'));
    });

    it('should emit change if page is changed', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      store.handlePageTitle(currentRoute);

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.setCsrfToken', function() {

    it('should set csrf to passed token', function() {
      var ApplicationStore = require('../ApplicationStore');
      var token = 'TESTTOKEN';
      var store = new ApplicationStore(Dispatcher);
      store.setCsrfToken(token);

      expect(store.csrf).toBe(token);
    });

    it('should never emit change', function() {
      var ApplicationStore = require('../ApplicationStore');
      var token = 'TESTTOKEN';
      var store = new ApplicationStore(Dispatcher);
      store.setCsrfToken(token);

      expect(store.emitChange).not.toBeCalled();
    });

  });

  describe('.getCurrentPageName', function() {

    it('should return the current page name', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      var pageName = 'TESTPAGENAME';
      store.currentPageName = pageName;
      var test = store.getCurrentPageName();

      expect(test).toBe(pageName);
    });

  });

  describe('.getPageTitle', function() {

    it('should return the current page title', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      var pageTitle = 'TESTPAGETITLE';
      store.pageTitle = pageTitle;
      var test = store.getPageTitle();

      expect(test).toBe(pageTitle);
    });

  });

  describe('.getPages', function() {

    it('should return the pages from route config', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      var test = store.getPages();

      expect(test).toBe(routesConfig);
    });

  });

  describe('.getCsrf', function() {

    it('should return the csrf', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);
      var token = 'TESTTOKEN';
      store.csrf = token;
      var test = store.getCsrf();

      expect(test).toBe(token);
    });

  });

  describe('.dehydrate', function() {

    it('should return an object with all properties', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      var pageName = 'TESTPAGENAME';
      var pageTitle = 'TESTPAGETITLE';
      var token = 'TESTTOKEN';
      store.currentPage = currentRoute;
      store.currentPageName = pageName;
      store.pageTitle = pageTitle;
      store.csrf = token;

      var test = store.dehydrate();
      expect(test).toBeDefined();
      expect(test.currentPage).toBeDefined();
      expect(test.currentPageName).toBeDefined();
      expect(test.pageTitle).toBeDefined();
      expect(test.csrf).toBeDefined();
      expect(test.pages).toBeDefined();

      expect(test.currentPage).toBe(currentRoute);
      expect(test.currentPageName).toBe(pageName);
      expect(test.pageTitle).toBe(pageTitle);
      expect(test.csrf).toBe(token);
      expect(test.pages).toBe(routesConfig);
    });

  });

  describe('.rehydrate', function() {

    it('should load all properties from state', function() {
      var ApplicationStore = require('../ApplicationStore');
      var store = new ApplicationStore(Dispatcher);

      var pageName = 'TESTPAGENAME';
      var pageTitle = 'TESTPAGETITLE';
      var token = 'TESTTOKEN';

      var test = store.rehydrate({
        currentPage: currentRoute,
        currentPageName: pageName,
        pageTitle: pageTitle,
        csrf: token,
        pages: routesConfig
      });
      expect(store.currentPage).toBe(currentRoute);
      expect(store.currentPageName).toBe(pageName);
      expect(store.pageTitle).toBe(pageTitle);
      expect(store.csrf).toBe(token);
      expect(store.pages).toBe(routesConfig);
    });

  });

});
