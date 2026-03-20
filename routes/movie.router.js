import { Router } from "express";
import { getMovies } from "../controller/movie.controller.js";

const getMovie=Router()

getMovie.get("/",getMovies)

export default getMovie