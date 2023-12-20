import mongoose from "mongoose";
import 'dotenv/config';

export const satoroBotDb = mongoose.createConnection(
    `mongodb://db:${process.env.MONGO_PORT}`,
    {
        user: 'root',
        pass: 'root',
        dbName: process.env.MONGO_DB
    }
);