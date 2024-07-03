import amqplib from 'amqplib';

export default async (queue: string, message: any) => {
    const connection = await amqplib.connect('amqp://rabbit-mq');
    const channel = await connection.createChannel();

    const { queue: replyQueue } = await channel.assertQueue('', { exclusive: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        correlationId: 'registerMember',
        replyTo: replyQueue
    });

    return new Promise((resolve, reject) => {
        channel.consume(replyQueue, (msg) => {
            if (msg?.properties.correlationId) {
                if (!msg) {
                    return;
                }

                resolve(JSON.parse(msg.content.toString()));
                setTimeout(() => {
                    connection.close();
                }, 500);
            }
        }, { noAck: true });
    });
}
