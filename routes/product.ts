import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import { check, validationResult } from "express-validator";

import { api } from "../consts";
import { AppError, HttpCode } from "../utils/errors";

const router = express.Router();

const createInstance = (options = {}) =>
  axios.create({
    baseURL: api.product,
    timeout: 60000,
    headers: {
      accept: "application/json",
    },
    ...options,
  });

router.get(
  "/:id",
  [check("id").exists().isNumeric()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        throw new AppError({
          name: "ValidationError",
          description: "id not found",
          httpCode: HttpCode.BAD_REQUEST,
        });
      }

      const response = await createInstance().get(`/${req.params.id}`); //1000143859

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
