import BaseStore from 'fluxible/addons/BaseStore';

class SessionStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.user = null;
  }
  handleLogin(user) {
    this.user = user;
    this.emitChange();
  }
  handleLogout() {
    this.user = null;
    this.emitChange();
  }
  isCurrentlyLoggedIn() {
    return this.user !== null;
  }
  getLoggedinUser() {
    return this.user;
  }
  dehydrate() {
    return {
      user: this.user
    };
  }
  rehydrate(state) {
    this.user = state.user;
  }
}

SessionStore.storeName = 'SessionStore';
SessionStore.handlers = {
  'USER_LOGGED_IN': 'handleLogin',
  'USER_LOGGED_OUT': 'handleLogout'
};

export default SessionStore;
