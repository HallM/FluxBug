import passport from 'passport';

export default function() {
    return {
        name: 'ResponsesPlugin',

        plugContext: function (contextOptions) {
            let req = contextOptions.req;
            let res = contextOptions.res;

            return {
                // Method called to allow modification of the component context
                plugActionContext: function (actionContext) {
                    actionContext.respondOk = function (message, redirectUrl, data) {
                        if (req.wantsJson()) {
                            let ret = {success: true};
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
                            let ret = {success: false};
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
