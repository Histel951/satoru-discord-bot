import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import getTokenSecretKey from "../../utils/getTokenSecretKey";
import { AuthenticatedRequest } from "../../interfaces/http/AuthenticatedRequest";
import { JwtPayload } from "../../interfaces/http/JwtPayload";
import client from "../../database/redis";

export default async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Отсутствует токен доступа' });
    }

    console.log(await client.exists(token))
    if (await client.exists(token)) {
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
