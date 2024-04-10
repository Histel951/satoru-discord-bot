import express from "express";
import authValidator from "../validators/authValidator";
import { User } from "../../database/models";
import jwt from 'jsonwebtoken';
import getTokenSecretKey from "../../utils/getTokenSecretKey";
import bcrypt from 'bcrypt';
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post('/login',async (req, res) => {
    const { error, value } = authValidator.validate(req.body)

    if (error) {
        return res.status(422).send({ error: error.message });
    }

    const { login, password } = value;

    const authUser = await User.findOne({
        login,
    }).exec();

    if (!authUser) {
        return res.status(422).send({ error: 'Неправильный логин или пароль.' });
    }

    if (!await bcrypt.compare(password, authUser.password)) {
        return res.status(422).send({ error: 'Неправильный логин или пароль.' });
    }

    const token = jwt.sign(
        {
            id: authUser._id,
            login
        },
        getTokenSecretKey(),
        { expiresIn: '1h' }
    );

    return res.json({
        user: {
            id: authUser._id,
            login,
        },
        token,
    });
});

router.post(
    '/user',
    verifyToken,
    async (req, res) => {
    const { error, value } = authValidator.validate(req.body)

    if (error) {
        return res.status(422).send({ error: error.message });
    }

    const { login, password } = value;

    if (!await User.findOne({
        login
    }).exec()) {
        return res.status(422).send({ error: 'Пользователь с таким логином уже существует.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        login,
        password: passwordHash,
    });

    await user.save();

    return res.json({
        user: {
            id: user._id,
            login,
        }
    });
});

export default router;