import { createClient } from 'redis';

const redisClient = createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@redis:${process.env.REDIS_PORT}`
});

redisClient.on('connect', () => {
    console.log('Успешное подключение к Redis');
});

redisClient.on('error', (err) => {
    console.error('Ошибка подключения к Redis:', err);
});

export default redisClient;
