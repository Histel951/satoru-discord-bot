import { createClient } from 'redis';

const client = createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@redis:${process.env.REDIS_PORT}`
});

client.on('connect', () => {
    console.log('Успешное подключение к Redis');
});

client.on('error', (err) => {
    console.error('Ошибка подключения к Redis:', err);
});

export default client;
