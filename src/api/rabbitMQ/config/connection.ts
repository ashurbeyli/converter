import amqp from 'amqplib';

const RABBITMQ_URL = process.env['RABBITMQ_URL'] || 'amqp://guest:guest@localhost:5672';
console.log(RABBITMQ_URL);

export async function createRabbitChannel() {
    const connection = await amqp.connect(RABBITMQ_URL);
    return await connection.createChannel();
}