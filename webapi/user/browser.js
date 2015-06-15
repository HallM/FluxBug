import axios from 'axios';
import {navigateAction} from 'fluxible-router';

export default {
  register(actionContext, payload, done) {
    axios.post('/register', {
        email: payload.email,
        password: payload.password,
        displayName: payload.displayName
    }).then((res) => {
      actionContext.dispatch('ADD_FLASH_MESSAGE', [{
        type: 'success',
        message: res.data.message
      }]);
      actionContext.executeAction(navigateAction, {url: '/login'});
      done();
    }).catch((res) => {
      if (res instanceof Error) {
        actionContext.dispatch('SET_NOTIFICATIONS', [{
          type: 'error',
          message: 'Failed to register. Please try again later.'
        }]);
      } else {
        actionContext.dispatch('SET_NOTIFICATIONS', [{
          type: 'error',
          message: res.data.message
        }]);
      }
      done();
    });
  },

  login(actionContext, payload, done) {
    axios.post('/login', {
        email: payload.email,
        password: payload.password
    }).then((res) => {
      actionContext.dispatch('USER_LOGGED_IN', res.data.data);
      actionContext.executeAction(navigateAction, {url: '/'});
      done();
    }).catch((res) => {
      if (res instanceof Error) {
        actionContext.dispatch('SET_NOTIFICATIONS', [{
          type: 'error',
          message: 'Failed to login. Please try again later.'
        }]);
        console.log(res);
      } else {
        actionContext.dispatch('SET_NOTIFICATIONS', [{
          type: 'error',
          message: res.data.message
        }]);
      }
      done();
    });
  },

  logout(actionContext, payload, done) {
    axios.post('/logout', {}).then((res) => {
      actionContext.dispatch('USER_LOGGED_OUT', {});
      actionContext.executeAction(navigateAction, {url: '/'});
      done();
    }).catch((res) => {
      if (res instanceof Error) {
        actionContext.dispatch('SET_NOTIFICATIONS', [{
          type: 'error',
          message: 'Failed to logout. Please try again later.'
        }]);
      } else {
        actionContext.dispatch('SET_NOTIFICATIONS', [{
          type: 'error',
          message: res.data.message
        }]);
      }
      done();
    });
  }
};
