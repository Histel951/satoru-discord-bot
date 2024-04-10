import express from 'express';
import tournamentRoute from "./http/routes/tournamentRoute";
import connectToDatabase from "./database/connect";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/tournaments/', tournamentRoute);

app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);

    await connectToDatabase();
});
