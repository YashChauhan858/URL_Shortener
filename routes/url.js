import express from "express";
import {
  redirectToOrignalURL,
  getURLInfoById,
  postURL,
  deleteURLInfoById,
} from "../controllers/url.js";

const urlRouter = express.Router();

urlRouter.post("/", postURL);
urlRouter.get("/:id", redirectToOrignalURL);
urlRouter.get("/analytics/:id", getURLInfoById);
urlRouter.delete("/delete/:id", deleteURLInfoById);

export default urlRouter;
