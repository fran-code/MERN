import mongoose from 'mongoose';

const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : 'mongodb://localhost/merndb';

export async function connect() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('>>> DB is connected');
    }
    catch {
        console.log('Somethign goes wrong!');
    }
}