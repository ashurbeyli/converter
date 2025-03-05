
// Config
import { createRabbitChannel } from '../rabbitMQ/config/connection';
import redis from '../redis/config/connection';
// Jobs
import { processConversionJob } from '../jobs/convertJob';

const CONVERSION_QUEUE_NAME = 'conversion_job';

export async function conversionConsumer() {
    const channel = await createRabbitChannel();
    await channel.assertQueue(CONVERSION_QUEUE_NAME, { durable: true });
    
    console.log(`[*] Worker listening for messages in queue: ${CONVERSION_QUEUE_NAME}`);
    
    channel.consume(CONVERSION_QUEUE_NAME, async (msg) => {
        if (msg) {
            const job = JSON.parse(msg.content.toString());
            console.log(`[x] Received job:`, job);

            // TODO: refactor these and extract into store methods
            await redis.set(`conversionJob:${job.id}`, JSON.stringify({ ...job, status: 'processing' }));
            await redis.publish(`conversionJob:${job.id}`, JSON.stringify({ ...job, status: 'processing' }));
            try {
                const outputFilename = await processConversionJob(job.fileName);
                // TODO: refactor these and extract into store methods
                await redis.set(`conversionJob:${job.id}`, JSON.stringify({ ...job, status: 'completed', outputFilename }));
                await redis.publish(`conversionJob:${job.id}`, JSON.stringify({ ...job, status: 'completed', outputFilename }));
            } catch(error: any) {
                // TODO: refactor these and extract into store methods
                await redis.set(`conversionJob:${job.id}`, JSON.stringify({ ...job, status: 'failed' }));
                await redis.publish(`conversionJob:${job.id}`, JSON.stringify({ ...job, status: 'failed' }));
            }
            
            channel.ack(msg);
            console.log(`[✓] Job completed: ${job.fileName}`);
        }
    });
}
