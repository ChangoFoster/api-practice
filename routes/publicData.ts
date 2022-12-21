import express, { NextFunction, Request, Response } from "express";
import axios from "axios";

import { api } from "../consts";

const router = express.Router();

const createInstance = (options = {}) =>
  axios.create({
    baseURL: api.publicStore,
    timeout: 60000,
    headers: {
      accept: "application/json",
    },
    ...options,
  });

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await createInstance().get("/public");

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
