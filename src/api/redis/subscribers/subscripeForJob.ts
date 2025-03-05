import { subscriber } from "../config/connection";

/**
 * Waits for job status update via Redis subscription.
 */
export const subscribeForJob = (job: any): Promise<any> => {
    return new Promise((resolve) => {
        const unsubscribeAndResolve = (updatedJob: any) => {
            subscriber.unsubscribe(`conversionJob:${job.id}`);
            resolve(updatedJob);
            console.log(`Unsubscribed from conversionJob:${job.id}`);
        };

        // Subscribe to Redis for status update
        subscriber.subscribe(`conversionJob:${job.id}`).then(() => {
            console.log(`Subscribed to conversionJob:${job.id}`);
            subscriber.once('message', (_, message) => {
                console.log(`Received message for job ${job.id}: ${message}`);
                unsubscribeAndResolve(JSON.parse(message));
            });
        });

        // Fallback timeout (10 sec) to prevent hanging requests
        setTimeout(() => {
            console.log(`Timeout reached for job ${job.id}, returning last known status.`);
            unsubscribeAndResolve(job);
        }, 10000);
    });
};