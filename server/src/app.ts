import express, {
  Express,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import router from "./routes";
import { errorInterface } from "./types/errorInterface";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

/** MIDDLEWARES */

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);
app.use(
  (error: errorInterface, req: Request, res: Response, next: NextFunction) => {
    console.log("error is>>>", error);
    const { statusCode, msg } = error;
    res.status(statusCode ?? 400).json({ error: msg });
  }
);

app.listen(port, () => {
  console.log(`⚡️ server: is running at https://localhost:${port}`);
});
