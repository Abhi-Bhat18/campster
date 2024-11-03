import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  async process(job: Job<any, any, string>, token?: string): Promise<any> {
    console.log('Job Name', job.name);
    console.log('Token', token);
    switch (job.name) {
      case 'email': {
        // sending the email
        console.log('Job Data', job.data);

        break;
      }
    }
  }
}
