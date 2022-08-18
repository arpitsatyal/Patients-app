import { NextFunction } from 'express';
import express, { Express, Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
const morgan  = require('morgan');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use("/api", router);

app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log('error is>>>', error);
  res.status(400).json({ error });
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});