import express from "express";
import {
  redirectToOrignalURL,
  getURLInfoById,
  postURL,
} from "../controllers/url.js";

const urlRouter = express.Router();

urlRouter.post("/", postURL);
urlRouter.get("/:id", redirectToOrignalURL);
urlRouter.get("/analytics/:id", getURLInfoById);

export default urlRouter;
