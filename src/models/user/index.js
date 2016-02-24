import mongoose from 'mongoose';

// define the schema for our user model
const userSchema = mongoose.Schema(
	{
		token: String,
		uid: String,
		email: String,
		ipAdress: String,
		firstName: String,
		lastName: String,
		idCard: Buffer,
		phone: String,
		pgpPrivate: String,
		pgpPublic: String,
		createdAt: Date
	}
);

export default mongoose.model('User', userSchema);
