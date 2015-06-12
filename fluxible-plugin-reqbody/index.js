export default function() {
    return {
        name: 'ReqBodyPlugin',

        plugContext: function (contextOptions) {
            let req = contextOptions.req;

            return {
                // Method called to allow modification of the component context
                plugActionContext: function (actionContext) {
                    actionContext.body = req.body;
                }
            };
        }
    };
};
