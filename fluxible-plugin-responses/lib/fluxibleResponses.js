import passport from 'passport';
import ApplicationStore from '../stores/ApplicationStore';

export default function() {
  return {
    name: 'ResponsesPlugin',

    plugContext: function (contextOptions) {
      let req = contextOptions.req;
      let res = contextOptions.res;

      return {
        plugActionContext: function (actionContext) {
          actionContext.respondOk = function (message, redirectUrl, data) {
            if (req.wantsJson()) {
              let csrf = this.getStore(ApplicationStore).getCsrf();

              let ret = {success: true, csrf: csrf};
              if (data) {
                ret.data = data;
              }
              if (message) {
                ret.message = message;
              }

              res.status(200).send(ret);
            } else {
              if (message) {
                req.flash('success', message);
              }
              res.redirect(redirectUrl);
            }
          };
          actionContext.respondError = function (errorCode, message, redirectUrl) {
            if (req.wantsJson()) {
              let csrf = this.getStore(ApplicationStore).getCsrf();

              let ret = {success: false, csrf: csrf};
              if (message) {
                ret.message = message;
              }

              res.status(errorCode).send(ret);
            } else {
              if (message) {
                req.flash('error', message);
              }
              res.redirect(redirectUrl);
            }
          };
        }
      };
    }
  };
};
