import mongoose from "mongoose";
import 'dotenv/config';

const connection = mongoose.createConnection(`mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)

if (connection) {
    console.log('mongoose database connected!');
}