import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import logger from "morgan";

import { port } from "./consts";
import { errorHandler, unknownEndpoint } from "./utils/errors";
import { setCache } from "./middleware/cache";

import checkAvailability from "./routes/checkAvailability";
import product from "./routes/product";
import publicData from "./routes/publicData";
import workingHours from "./routes/workingHours";

dotenv.config();

const app: Express = express();
app.disable("x-powered-by");

// Middleware
app.use(express.json());
app.use(helmet());
app.use(logger("tiny"));
app.use(setCache);

// Routes
app.use("/checkAvailability", checkAvailability);
app.use("/product", product);
app.use("/public", publicData);
app.use("/workingHours", workingHours);

// Errors
app.use(errorHandler);
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
