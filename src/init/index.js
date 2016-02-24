var babel = require('babel-core/register')({
    retainLines: true
});

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}

///////////////////////////////////////////////////////////////////////////// GLOBAL VARS

import conf from '../conf';

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'flash';

import methodOverride from 'method-override';
import passport from 'passport';

import controllers from '../controllers';

require('./globals');

const currentConf = conf[process.env.NODE_ENV];
mongoose.connect(currentConf.mongodb);

const server = express();

server.set('port', currentConf.port);
server.set('debug', true);

server.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(methodOverride());

/*server.use(session({secret: currentConf.secretJWT})); // session secret
 server.use(passport.initialize());
 server.use(passport.session()); // persistent login sessions
 server.use(flash()); // use connect-flash for flash messages stored in session*/

server.use(controllers);

server.start = function () {
    return Promise.fromNode(function (callback) {
            http.createServer(server).listen(server.get('port'), callback);
        })
        .tap(() => {
            console.log(`Running on ${process.env.NODE_ENV} on ${server.get('port')}`);
        });
};

export default server;
