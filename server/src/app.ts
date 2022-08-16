import { NextFunction } from 'express';
import express, { Express, Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log('error is>>>', error);
  res.status(400).json({ error });
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});