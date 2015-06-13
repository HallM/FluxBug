import passport from 'passport';

export default function(server, options) {
  server.use(passport.initialize());
  server.use(passport.session());

  if (options.serializeUser && typeof(options.serializeUser) === 'function') {
    passport.serializeUser(options.serializeUser);
  }
  if (options.deserializeUser && typeof(options.deserializeUser) === 'function') {
    passport.deserializeUser(options.deserializeUser);
  }
  if (options.strategy) {
    if (typeof(options.strategy) === 'array') {
      options.strategy.forEach(function(item) {
        passport.use(item);
      });
    } else if (typeof(options.strategy) === 'object') {
      passport.use(options.strategy);
    }
  }

  return {
    name: 'PassportPlugin',

    plugContext: function (contextOptions) {
      let req = contextOptions.req;
      let res = contextOptions.res;
      let next = contextOptions.next;

      return {
        plugActionContext: function (actionContext) {
          actionContext.authenticate = function (strategy, callback) {
            return passport.authenticate(strategy, callback)(req, res, next);
          };
          actionContext.logIn = function (user, callback) {
            return req.logIn(user, callback);
          };
          actionContext.logout = function () {
            return req.logout();
          };
        }
      };
    }
  };
};
