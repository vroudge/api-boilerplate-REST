import BaseService from '../BaseService';
import models from '../../models';
import errors from '../../utils/error';
import mongoose from 'mongoose';
import conf from '../../conf';
import crypto from 'crypto';
import Puid from 'puid';

class FileService extends BaseService {
    getFile(pid) {
        return models.FileModel.findOne({pid:pid});
    }

    /*
     getFile(pid, infos) {

     //Check infos

     //var arrayPart = [];
     //get all part files
     //for each
     //DECRYPT AES
     //Save in arrayPart

     //join all part files

     //Return
     }
     */

    saveFile(file) {
        var puid = new Puid();
        file.pid = puid.generate();

        //Check MD5

        //Split file
        //for each
        //CRYPT AES
        //Save Part document in database

        return new models.FileModel(file).save()
            .then((savedFile) => {
                return savedFile;
            });
    }
}

//singleton
var instance = new FileService();
export { FileService };
export { instance as FileService };
export default instance;
