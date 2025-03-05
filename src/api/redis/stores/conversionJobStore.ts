import redis from '../config/connection';

export async function addConversionJob(job: any) {
    await redis.set(`conversionJob:${job.id}`, JSON.stringify({ status: 'processing', ...job }));
}

export async function getConversionJob(jobId: string) {
    const job = await redis.get(`conversionJob:${jobId}`);
    return job ? JSON.parse(job) : null;
}