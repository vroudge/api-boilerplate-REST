import BaseService from '../BaseService';
import models from '../../models';
import errors from '../../utils/error';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import conf from '../../conf';

class UserService extends BaseService {

    create(uid) {
        const token = jwt.sign(uid, conf[process.env.NODE_ENV].secretJWT);
        return new models.UserModel({ uid, token }).save();
    }

    update(uid, token, email) {
        return models.UserModel.findOne({ uid: uid, token: token })
            .then((user) => {
                user.email = email;
                return user.save();
            });
    }
}

//singleton
var instance = new UserService();
export { UserService };
export { instance as UserService };
export default instance;