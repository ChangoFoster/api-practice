import express, { NextFunction, Request, Response } from "express";
import axios from "axios";

import { api } from "../consts";

const router = express.Router();

const createInstance = (options = {}) =>
  axios.create({
    baseURL: api.publicApi,
    timeout: 60000,
    headers: {
      accept: "application/json",
    },
    ...options,
  });

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await createInstance().post("/check-availability", {
      catagory: "Mattresses",
      store: "dunelm.com",
      team: "default",
    });

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
