import express from "express";
import authValidator from "../validators/authValidator";
import { User } from "../../database/models";
import jwt from 'jsonwebtoken';
import getTokenSecretKey from "../../utils/getTokenSecretKey";
import bcrypt from 'bcrypt';
import verifyToken from "../middlewares/verifyToken";
import { JwtPayload } from "../../interfaces/http/JwtPayload";
import { AuthenticatedRequest } from "../../interfaces/http/AuthenticatedRequest";
import redisClient from "../../database/redisClient";

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

    const payload: JwtPayload = {
        _id: authUser._id,
        login,
    };

    const token = jwt.sign(payload, getTokenSecretKey(), { expiresIn: '1h' });

    return res.json({
        user: payload,
        token,
    });
});

router.post('/logout', verifyToken, async (req: AuthenticatedRequest, res) => {
    try {
        await redisClient.set(req.token as string, 'invalid', {
            EX: 3600
        });

        return res.status(200).json({ message: 'Вы вышли из аккаунта.' });
    } catch (err) {
        console.error(err)

        return res.status(500).json({ error: err });
    }
})

router.post('/user', verifyToken, async (req, res) => {
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
            _id: user._id,
            login,
        }
    });
});

export default router;