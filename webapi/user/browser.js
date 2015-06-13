import request from 'superagent';
import {navigateAction} from 'fluxible-router';
import ApplicationStore from '../../stores/ApplicationStore';

export default {
  register(actionContext, payload, done) {
    request
      .post('/register')
      .type('form')
      .send({
        _csrf: actionContext.getStore(ApplicationStore).getCsrf(),
        email: payload.email,
        password: payload.password,
        displayName: payload.displayName
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (res.body.csrf) {
          actionContext.dispatch('SETCSRF_TOKEN', res.body.csrf);
        }

        if (err) {
          let errorMessage = res.body.message ? res.body.message : err;
          actionContext.dispatch('SET_NOTIFICATIONS', [{
            type: 'error',
            message: errorMessage
          }]);
        } else {
          if (res.body.success) {
            actionContext.dispatch('ADD_FLASH_MESSAGE', [{
              type: 'success',
              message: res.body.message
            }]);
            actionContext.executeAction(navigateAction, {url: '/login'});
          } else {
            actionContext.dispatch('SET_NOTIFICATIONS', [{
              type: 'error',
              message: res.body.message
            }]);
          }
        }
        done();
      });
  },

  login(actionContext, payload, done) {
    request
      .post('/login')
      .type('form')
      .send({
        _csrf: actionContext.getStore(ApplicationStore).getCsrf(),
        email: payload.email,
        password: payload.password
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (res.body.csrf) {
          actionContext.dispatch('SETCSRF_TOKEN', res.body.csrf);
        }

        if (err) {
          let errorMessage = res.body.message ? res.body.message : err;
          actionContext.dispatch('SET_NOTIFICATIONS', [{
            type: 'error',
            message: errorMessage
          }]);
        } else {
          if (res.body.success) {
            actionContext.dispatch('USER_LOGGED_IN', res.body.data);
            actionContext.executeAction(navigateAction, {url: '/'});
          } else {
            actionContext.dispatch('SET_NOTIFICATIONS', [{
              type: 'error',
              message: res.body.message
            }]);
          }
        }
      });
  },

  logout(actionContext, payload, done) {
    request
      .post('/logout')
      .type('form')
      .send({
        _csrf: actionContext.getStore(ApplicationStore).getCsrf()
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (res.body.csrf) {
          actionContext.dispatch('SETCSRF_TOKEN', res.body.csrf);
        }

        if (err) {
          let errorMessage = res.body.message ? res.body.message : err;
          actionContext.dispatch('SET_NOTIFICATIONS', [{
            type: 'error',
            message: errorMessage
          }]);
        } else {
          if (res.body.success) {
            actionContext.dispatch('USER_LOGGED_OUT', {});
            actionContext.executeAction(navigateAction, {url: '/'});
          } else {
            actionContext.dispatch('SET_NOTIFICATIONS', [{
              type: 'error',
              message: res.body.message
            }]);
          }
        }
      });
  }
};
