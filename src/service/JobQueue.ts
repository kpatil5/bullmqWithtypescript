import { Queue, Job } from "bullmq";

export class JobQueue {
    private static redisConfiguration = {
        connection: {
            host: "localhost",
            port: 49153,
            username: "default",
            password: "redispw"
        }
    }

    private static DEFAULT_REMOVE_CONFIG = {
        removeOnComplete: {
            age: 3600,
        },
        removeOnFail: {
            age: 24 * 3600,
        },
    };

    private static queue = new Queue('billingEventScheuler', JobQueue.redisConfiguration);


    public static async addJobToQueue<T>(data: T): Promise<Job<T>> {
        return JobQueue.queue.add('job', data, JobQueue.DEFAULT_REMOVE_CONFIG);
    }
}

