import express from 'express';
import { JobQueue } from './service/JobQueue';
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const job = await JobQueue.addJobToQueue(req.body);
  res.json({ jobId: job.id });
  return res;
});
  

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

