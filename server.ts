import * as express from "express";
import * as dotenv from "dotenv";
import { router } from "./routes/indexRouter";
dotenv.config();

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
const PORT: number = (process.env.PORT) ? parseInt(process.env.PORT) : 3002;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});