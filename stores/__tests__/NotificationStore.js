jest.dontMock('../NotificationStore');

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

describe('Stores : NotificationStore', function() {
  beforeEach(function() {
    Dispatcher.waitFor.mockClear();
    BaseStore.prototype.emitChange.mockClear();
  });

  describe('general', function() {

    it('should have storeName = NotificationStore', function() {
      var NotificationStore = require('../NotificationStore');
      expect(NotificationStore).toBeDefined();
      expect(NotificationStore.storeName).toBeDefined();
      expect(NotificationStore.storeName).toBe('NotificationStore');
    });

    it('should have ADD_NOTIFICATIONS handler set to valid function', function() {
      var NotificationStore = require('../NotificationStore');
      expect(NotificationStore).toBeDefined();
      expect(NotificationStore.handlers).toBeDefined();
      expect(NotificationStore.handlers['ADD_NOTIFICATIONS']).toBeDefined();

      var handler = NotificationStore.handlers['ADD_NOTIFICATIONS'];
      expect(NotificationStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('handleAddMessages');
      expect(typeof(NotificationStore.prototype[handler])).toBe('function');
    });

    it('should have SET_NOTIFICATIONS handler set to valid function', function() {
      var NotificationStore = require('../NotificationStore');
      expect(NotificationStore).toBeDefined();
      expect(NotificationStore.handlers).toBeDefined();
      expect(NotificationStore.handlers['SET_NOTIFICATIONS']).toBeDefined();

      var handler = NotificationStore.handlers['SET_NOTIFICATIONS'];
      expect(NotificationStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('handleSetMessages');
      expect(typeof(NotificationStore.prototype[handler])).toBe('function');
    });

    it('should have ADD_FLASH_MESSAGE handler set to valid function', function() {
      var NotificationStore = require('../NotificationStore');
      expect(NotificationStore).toBeDefined();
      expect(NotificationStore.handlers).toBeDefined();
      expect(NotificationStore.handlers['ADD_FLASH_MESSAGE']).toBeDefined();

      var handler = NotificationStore.handlers['ADD_FLASH_MESSAGE'];
      expect(NotificationStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('handleAddFlashMessage');
      expect(typeof(NotificationStore.prototype[handler])).toBe('function');
    });

    it('should have NAVIGATE_SUCCESS handler set to valid function', function() {
      var NotificationStore = require('../NotificationStore');
      expect(NotificationStore).toBeDefined();
      expect(NotificationStore.handlers).toBeDefined();
      expect(NotificationStore.handlers['NAVIGATE_SUCCESS']).toBeDefined();

      var handler = NotificationStore.handlers['NAVIGATE_SUCCESS'];
      expect(NotificationStore.prototype[handler]).toBeDefined();
      expect(handler).toBe('postNavigation');
      expect(typeof(NotificationStore.prototype[handler])).toBe('function');
    });

  });

  describe('constructor', function() {

    it('should call super with dispatcher', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      expect(store.dispatcher).toBe(Dispatcher);
    });

    it('should set messages to empty array', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      expect(store.messages).toBeDefined();
      expect(store.messages instanceof Array).toBeTruthy();
      expect(store.messages.length).toBeDefined();
      expect(store.messages.length).toBe(0);
    });

    it('should set flashMessages to empty array', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      expect(store.flashMessages).toBeDefined();
      expect(store.flashMessages instanceof Array).toBeTruthy();
      expect(store.flashMessages.length).toBeDefined();
      expect(store.flashMessages.length).toBe(0);
    });

  });

  describe('.handleAddMessages', function() {

    it('should concat the new messages to this messages', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      store.messages = [{}];
      var newMessages = [{}];

      expect(store.messages.length).toBe(1);
      expect(newMessages.length).toBe(1);
      store.handleAddMessages(newMessages);
      expect(store.messages.length).toBe(2);
    });

    it('should emit change', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      store.handleAddMessages([{}]);

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.handleSetMessages', function() {

    it('should set messages to passed parameter', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      var newMessages = [{}];
      store.handleSetMessages(newMessages);

      expect(store.messages).toBe(newMessages);
    });

    it('should emit change', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      store.handleSetMessages([{}]);

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.handleAddFlashMessage', function() {

    it('should concat the new messages to this messages', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      store.flashMessages = [{}];
      var newMessages = [{}];

      expect(store.flashMessages.length).toBe(1);
      expect(newMessages.length).toBe(1);
      store.handleAddFlashMessage(newMessages);
      expect(store.flashMessages.length).toBe(2);
    });

    it('should emit change', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      store.handleAddFlashMessage([{}]);

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.postNavigation', function() {

    it('should move flashMessages to messages', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      var oldMessages = [{}];
      var oldFlash = [{}];
      store.messages = oldMessages;
      store.flashMessages = oldFlash;

      store.postNavigation();

      expect(store.messages).toBe(oldFlash);
    });

    it('should set flashMessages to a fresh array', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      var oldMessages = [{}];
      var oldFlash = [{}];
      store.messages = oldMessages;
      store.flashMessages = oldFlash;

      store.postNavigation();

      expect(store.flashMessages).toBeDefined();
      expect(store.flashMessages instanceof Array).toBeTruthy();
      expect(store.flashMessages.length).toBeDefined();
      expect(store.flashMessages.length).toBe(0);
    });

    it('should emit change', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      store.postNavigation();

      expect(store.emitChange).toBeCalled();
    });

  });

  describe('.getCurrentMessages', function() {

    it('should return the user', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);
      var messages = [{}];
      store.messages = messages;
      var test = store.getCurrentMessages();

      expect(test).toBe(messages);
    });

  });

  describe('.dehydrate', function() {

    it('should return an object with all properties', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      var messages = [{}];
      var flashMessages = [{}];
      store.messages = messages;
      store.flashMessages = flashMessages;

      var test = store.dehydrate();
      expect(messages).toBeDefined();
      expect(test.messages).toBeDefined();
      expect(test.flashMessages).toBeDefined();

      expect(test.messages).toBe(messages);
      expect(test.flashMessages).toBe(flashMessages);
    });

  });

  describe('.rehydrate', function() {

    it('should load all properties from state', function() {
      var NotificationStore = require('../NotificationStore');
      var store = new NotificationStore(Dispatcher);

      var messages = [{}];
      var flashMessages = [{}];

      var test = store.rehydrate({
        messages: messages,
        flashMessages: flashMessages
      });
      expect(store.messages).toBe(messages);
      expect(store.flashMessages).toBe(flashMessages);
    });

  });

});
