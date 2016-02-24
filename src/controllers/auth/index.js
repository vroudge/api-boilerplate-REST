import express from 'express';
import * as middlewares from '../middlewares';
import passport from 'passport';
import userService from '../../services/user';
import error from '../../utils/error';

const router = new express.Router();

/* ROUTES */

router.route('/user', middlewares.checkToken)
    .put(addEmailToUser);

/* METHODS */

function addEmailToUser(req, res, next) {
    if (!req.body.uid) {
        next(new error.ForbiddenError('No UID provided'));
    }

    if (!req.body.email) {
        next(new error.ForbiddenError('No email provided'));
    }

    return userService.update(req.body.uid, req.body.token, req.body.email)
        .then((updatedUser) => {
            res.shoot(updatedUser);
        });
}

export default router;