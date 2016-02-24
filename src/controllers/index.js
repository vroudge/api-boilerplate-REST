import express from 'express';
import error from '../utils/error';
import * as passport from 'passport';
import * as middlewares from './middlewares';
import noAuth from './no-auth';
import auth from './auth';
import conf from '../conf';

var router = new express.Router();

router.use(middlewares.rest);
router.use(middlewares.securityHeaders);

middlewares.useCors(router);

/**********/

//HANDSHAKE
/**********/
router.get('/', (req, res, next) => {
	res.shoot({
		API: 'AmberFS-API',
		Version: '0.0.1',
		Description: 'Encryption manager for AmberFS'
	});
});

//PUBLIC
/*******/
router.use('/', noAuth);

//PRIVATE
/********/
router.use('/auth', auth);

//#############################################
// ERRORS HANDLING
//#############################################

// no route matched so far so
// catch 404 and forward to error handler
router.use((req, res, next) => {
	next(new error.EndpointNotFoundError(req.path));
});

// error generic handler
router.use(middlewares.error);

export default router;
