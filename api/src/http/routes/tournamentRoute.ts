import express from "express";
import { Tournament } from "../../database/models";
import tournamentValidator from "../validators/tournamentValidator";

const router = express.Router();

router.get('/', async (_, res) => {

    return res.send(await Tournament.find().exec());
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    return res.send(await Tournament.findOne({
        _id: id,
    }).exec());
});

router.post('/', async (req, res) => {
    const { error, value } = tournamentValidator.validate(req.body)

    if (error) {
        return res.status(422).send({ error: error.message })
    }

    const tournament = new Tournament(value);

    return res.send(await tournament.save());
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const { error, value } = tournamentValidator.validate(req.body)

    if (error) {
        return res.status(422).send({ error: error.message })
    }
    
    return res.send(await Tournament.updateOne({
        _id: id,
    }, value).exec());
});

export default router;