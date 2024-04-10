import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb://mongodb:${process.env.MONGO_PORT}`,
            {
                user: process.env.MONGO_USERNAME,
                pass: process.env.MONGO_PASSWORD,
                dbName: process.env.MONGO_DB,
                family: 4,
                maxPoolSize: 10,
                autoIndex: false,
            }
        );
        console.log('mongoose connect.');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});

export default connectToDatabase;