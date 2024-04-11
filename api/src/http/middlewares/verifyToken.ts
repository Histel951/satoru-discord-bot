import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import getTokenSecretKey from "../../utils/getTokenSecretKey";
import { AuthenticatedRequest } from "../../interfaces/http/AuthenticatedRequest";

export default (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Отсутствует токен доступа' });
    }

    try {
        req.user = jwt.verify(token, getTokenSecretKey());

        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Недействительный токен' });
    }
}