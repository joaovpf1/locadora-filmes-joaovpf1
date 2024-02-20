import { NextFunction, Request, Response, query } from "express";
import { client } from "./database";
import { QueryConfig } from "pg";

export const newMovieValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = [];
  if (req.body.name?.length > 50) {
    errors.push("Name with a max of 50 characters.");
  }
  if (req.body.category?.length > 20) {
    errors.push("Category with a max of 20 characters. ");
  }
  if (!req.body.duration) {
    errors.push("Duration is required");
  }
  if (!req.body.price) {
    errors.push("Price is required");
  }
  if (errors.length > 0) {
    return res.status(409).json(errors);
  }
  return next();
};

export const idVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = `SELECT * FROM movies WHERE id = $1;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.id],
  };
  const query = await client.query(queryConfig);

  if (!query.rows[0]) {
    return res.status(404).json({ message: "Movie not found!" });
  }
  return next();
};

export const nameVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = `SELECT * FROM movies WHERE name = $1;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.name],
  };
  const query = await client.query(queryConfig);

  if (query.rows.length > 0) {
    return res.status(409).json({ message: "Movie name already exists!" });
  }
  return next();
};
