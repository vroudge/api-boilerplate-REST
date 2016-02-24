import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiProps from 'chai-properties';
import express from 'express';
import supertest from 'supertest';
import controllers from '../controllers/index';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import conf from '../conf';
require('./globals');

//defines that we're running tests
process.env.NODE_ENV = 'test';

chai.use(chaiAsPromised);
chai.use(chaiProps);

global.chai = chai;
global.expect = chai.expect;
global.Promise = require('bluebird');

const currentConf = conf[process.env.NODE_ENV];
mongoose.connect(currentConf.mongodb);

const router = require('../controllers').default;
const server = express();

server.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(methodOverride());
server.use(router);

global.request = function(method, path, body = null, token = null) {


    return supertest(server)[method](path);
    //if (token) {
    /*if (_.isString(token)) {
     req = req.set('Authorization', 'JWT ' + token);
     } else if (token instanceof models.Token.Instance) {
     let jwt = token.getEncryptedJwt(conf.jwtSecret);
     req = req.set('Authorization', 'JWT ' + jwt);
     } else {
     throw new Error('Token not supported', token);
     }*/
    //}

};
