import express from 'express';
import tournamentRouter from "./http/routes/tournamentRouter";
import connectToDatabase from "./database/connect";
import bodyParser from "body-parser";
import authRouter from "./http/routes/authRouter";

const app = express();
const port = process.env.EXPRESS_PORT ?? 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/tournaments/', tournamentRouter);

app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);

    await connectToDatabase();
});