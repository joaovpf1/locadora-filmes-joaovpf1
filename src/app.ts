import express from "express";
import "dotenv/config";
import { connectDatabase } from "./database";
import { moviesRoutes } from "./routers/movies.routes";

const app = express();

app.use(express.json());

app.use("/movies", moviesRoutes);

app.listen(3000, async () => {
  console.log("API started sucessfully in port 3000!");
  connectDatabase();
});
