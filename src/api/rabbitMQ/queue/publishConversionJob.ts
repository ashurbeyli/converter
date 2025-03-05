// Libraries
import { v4 as uuidv4 } from 'uuid';
// Redis
import { addConversionJob } from '../../redis/stores/conversionJobStore';
// Rabbit
import { createRabbitChannel } from '../config/connection';

const CONVERSION_QUEUE_NAME = 'conversion_job';

export async function publishConversionJob(fileName: string) {
    const channel = await createRabbitChannel();
    await channel.assertQueue(CONVERSION_QUEUE_NAME, { durable: true });
    
    const id = uuidv4();
    const job = { id, fileName, status: "processing" };
    await addConversionJob(job);
    
    channel.sendToQueue(CONVERSION_QUEUE_NAME, Buffer.from(JSON.stringify(job)), { persistent: true }); // The persistan flag ensures messages persist even if RabbitMQ restarts.
    
    console.log(`[>] Job published: ${job.fileName}`);
    
    return job;
}
