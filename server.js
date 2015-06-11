/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */
import express from 'express';

import nconf from 'nconf';
nconf.argv().env();
nconf.defaults({
    PORT: 3000,
    IP: '0.0.0.0',
    SESSION_SECRET: 'keyboard! cat 123'
});

import async from 'async';
import bcrypt from 'bcrypt-as-promised';

import passport from 'passport';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import session from 'express-session';
import csurf from 'csurf';
import flash from 'flash';
import wantsJson from 'wants-json';
import {Strategy as LocalStrategy} from 'passport-local';

import reqBodyPlugin from './fluxible-plugin-reqbody';
import passportPlugin from './fluxible-plugin-passport';
import responsePlugin from './fluxible-plugin-responses';

import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
const htmlComponent = React.createFactory(HtmlComponent);

const debug = debugLib('fluxbug');

var models = require('./db/models/');
models.sequelize.sync({force: false});

const server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/assets', express.static(path.join(__dirname, '/assets')));

server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: false}));
server.use(methodOverride());
server.use(session({
    secret: nconf.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: true
}));
//server.use(csurf({cookie: false}));
server.use(flash());
server.use(wantsJson());

server.use((err, req, res, next) => {
   if (err.code !== 'EBADCSRFTOKEN') {
       return next(err);
   }
   res.status(403).send('Invalid rest sent.');
});

app.plug(reqBodyPlugin());
app.plug(responsePlugin());

app.plug(passportPlugin(server, {
    serializeUser: (user, done) => {
        done(null, {
            email: user.email,
            displayName: user.displayName,
            title: user.title,
            bio: user.bio
        });
    },

    deserializeUser: (user, done) => {
        done(null, user);
    },

    strategy: new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (email, password, done) => {
            models.User.find({where: {email: email}}).then((user) => {
                if (!user) {
                    return done(null, false);
                }
                bcrypt.compare(password, user.password)
                    .then((res) => {
                        if (res) {
                            return done(null, user);
                        } else {
                            return done(null, false)
                        }
                    })
                    .catch((err) => {
                        return done(err);
                    });
            })
        })
}));

server.use((req, res, next) => {
    let context = app.createContext({
        req: req,
        res: res,
        next: next
    });

    var actionContext = context.getActionContext();
    async.series([
        (cb) => {
            if (req.user) {
               actionContext.dispatch('USER_LOGGED_IN', req.user);
            }
            cb();
        },

        async.apply(actionContext.executeAction, navigateAction, {url: req.url, method: req.method}),
        
        (cb) => {
            if (!res.headersSent) {
                let messages = res.locals.flash;
                if (messages && messages.length > 0) {
                   actionContext.dispatch('ADD_NOTIFICATIONS', messages);
                   req.session.flash = [];
                }
            }
            cb();
        }
    ], (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        if (!res.headersSent) {
            debug('Exposing context state');
            const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    
            debug('Rendering Application component into html');
            const html = React.renderToStaticMarkup(htmlComponent({
                context: context.getComponentContext(),
                state: exposed,
                markup: React.renderToString(context.createElement())
            }));
    
            debug('Sending markup');
            res.type('html');
            res.write('<!DOCTYPE html>' + html);
            res.end();
        }
    });
});

const port = nconf.get('PORT');
server.listen(port);
console.log('Listening on port ' + port);

export default server;
