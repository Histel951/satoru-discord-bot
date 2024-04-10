import express from "express";
import authValidator from "../validators/authValidator";
import { User } from "../../database/models";
import jwt from 'jsonwebtoken';
import getTokenSecretKey from "../../utils/getTokenSecretKey";

const router = express.Router();

router.post('login',async (req, res) => {
    const { error, value } = authValidator.validate(req.body)

    if (error) {
        return res.status(422).send({ error: error.message })
    }

    const { login, password } = value;

    const authUser = await User.findOne({
        login,
        password
    }).exec();

    if (!authUser) {
        return res.status(422).send({ error: 'Неправильный логин или пароль.' })
    }

    const token = jwt.sign(
        {
            id: authUser._id,
            login
        },
        getTokenSecretKey(),
        { expiresIn: '1h' }
    );

    res.json({
        user: {
            id: authUser._id,
            login,
        },
        token,
    });
});

export default router;