import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import getTokenSecretKey from "../../utils/getTokenSecretKey";
import { AuthenticatedRequest } from "../../interfaces/http/AuthenticatedRequest";
import { JwtPayload } from "../../interfaces/http/JwtPayload";
import redisClient from "../../database/redisClient";

export default async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Отсутствует токен доступа' });
    }

    console.log(await redisClient.exists(token))
    if (await redisClient.exists(token)) {
        return res.status(401).json({ message: 'Недействительный токен' });
    }

    try {
        req.user = jwt.verify(token, getTokenSecretKey()) as JwtPayload;
        req.token = token;

        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Недействительный токен' });
    }
}
