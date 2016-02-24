import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// define the schema for our user model
var documentSchema = mongoose.Schema({
		token: String,
		partsIds: [String],
		md5: String,
		size: Number,
		checkIdCardNeeded:Boolean,
		fileType: String,
		createdAt: Date
	}
);

export default mongoose.model('Document', documentSchema);
