jest.dontMock('../RouteStore');

describe('Stores : RouteStore', function() {

  it('should export fluxible-router RouteStore.withStaticRoutes', function() {
    var ret = {};
    var fluxibleRouter = {
      RouteStore: {
        withStaticRoutes: jest.genMockFunction().mockReturnValue(ret)
      }
    };
    jest.setMock('fluxible-router', fluxibleRouter);

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
    jest.setMock('../../configs/routes', routesConfig);

    var store = require('../RouteStore');
    expect(fluxibleRouter.RouteStore.withStaticRoutes).toBeCalled();
    expect(fluxibleRouter.RouteStore.withStaticRoutes).toBeCalledWith(routesConfig);
    expect(store).toBe(ret);
  });

});
