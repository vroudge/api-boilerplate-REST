import express from 'express';
import multer from 'multer';
import error from '../../utils/error';
import userService from '../../services/user';
import fileService from '../../services/file';
var upload = multer({ dest: 'uploads/' });
import conf from '../../conf';
import serializers from '../serializers';
const router = new express.Router();

/* ROUTES */

router.route('/user')
    .post(requestToken);

router.route('/file')
    .get(getFile)
    .post(upload.single('file'), sendFile);

/* METHODS */

function requestToken(req, res, next) {
    if (!req.body.uid) {
        throw new error.BadRequestError('No uid provided for creation');
    }

    userService.create(req.body.uid)
        .then((createdToken) => {
            return res.shoot(createdToken, serializers.userCreation);
        });
}

function sendFile(req, res) {
    /*if (!req.body.uid) {
     throw new error.BadRequestError('No uid provided for creation');
     }*/

    return fileService.saveFile(req.file)
        .then((pidDocument) => {
            return res.shoot(pidDocument, ['pid']);
        });
}

function getFile(req, res) {
    /*if (!req.body.uid) {
     throw new error.BadRequestError('No uid provided for creation');
     }*/

    console.log('getFile');

    if (!req.query.pid) {
        throw new error.BadRequestError('No PID provided for file');
    }

    return fileService.getFile(req.query.pid)
        .then((file) => {
            console.log(file);
            res.shoot(file);
        });
}

export default router;
