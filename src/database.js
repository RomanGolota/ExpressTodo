import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DB_connect = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export default DB_connect