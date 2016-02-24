import mongoose from 'mongoose';

// define the schema for our user model
const partSchema = mongoose.Schema({
		partNumber: Number,
		AESSalt: String,
		AESPepper: String,
		md5: String,
		pathURL: String,
		size: Number,
		createdAt: Date
	}
);

export default mongoose.model('part', partSchema);
