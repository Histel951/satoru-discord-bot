import mongoose from "mongoose";

mongoose.connect(
    `mongodb://mongodb:${process.env.MONGO_PORT}`,
    {
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
        dbName: process.env.MONGO_DB,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
    }
);

export const satoroBotDb = mongoose.connection;

satoroBotDb.on('error', console.error.bind(console, 'Connection error:'));
satoroBotDb.once('open', () => {
    console.log('Connected to the database');
});