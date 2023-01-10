import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_connect = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI environment variable is not set');
    }

    const timeStart = Date.now();
    await mongoose.connect(mongoUri, {});
    console.log(`Connected to DB for ${Date.now() - timeStart}ms`);
};

export default DB_connect;