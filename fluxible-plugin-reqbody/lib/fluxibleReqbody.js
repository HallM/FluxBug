export default function() {
  return {
    name: 'ReqBodyPlugin',

    plugContext: function (contextOptions) {
      let req = contextOptions.req;

      return {
        plugActionContext: function (actionContext) {
          actionContext.body = req.body;
        }
      };
    }
  };
};
