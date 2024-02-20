import { Router } from "express";
import {
  changeMovie,
  createMovie,
  deleteMovie,
  getMovies,
  getMoviesById,
} from "../logic";
import {
  idVerification,
  nameVerification,
  newMovieValidation,
} from "../middlewares";

export const moviesRoutes = Router();

moviesRoutes.post("/", nameVerification, newMovieValidation, createMovie);
moviesRoutes.get("/", getMovies);
moviesRoutes.get("/:id", idVerification, getMoviesById);
moviesRoutes.delete("/:id", idVerification, deleteMovie);
moviesRoutes.patch("/:id", idVerification, nameVerification, changeMovie);
