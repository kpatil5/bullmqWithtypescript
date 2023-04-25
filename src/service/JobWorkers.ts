import { Job, Worker } from "bullmq";
import { JobData, JobReturnData } from "./JobData";

export class JobWorker{
    private static configuration = {
        connection: {
            host: "localhost",
            port: 49153,
            username: "default",
            password: "redispw"
        },
        autorun: true
    }
    private worker = new Worker<JobData, JobReturnData>('billingEventScheuler', async ():Promise<JobReturnData> => {/** Function call */ return }, JobWorker.configuration);
    
    constructor(){
        this.worker.on('completed', (job: Job, returnvalue: any) => {
            // Mark job as completed in datastore
        });
        this.worker.on('failed', (job: Job, error: Error) => {
            // Mark job as failed in datastore. and we can add back in Q
        });
        this.worker.on('error', err => {
            // log the error
            console.error(err);
        });
    }
}

export async function ProcessBillingEvent (job: Job, done):Promise<JobReturnData> {
    try {
        console.log(job.data);
      done(null, 'succes')
      return {status: 'success'};
    } catch (error) {
      done(null, error)
      return {status: 'failuer'};
    } 
  }