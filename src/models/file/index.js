import mongoose from 'mongoose';

// define the schema for our user model
const fileSchema = mongoose.Schema({
        pid: String,
        originalName: String,
        encoding: String,
        mimetype: String,
        size: Number,
        binary: Buffer,
        createdAt: Date
    }
);

export default mongoose.model('file', fileSchema);
