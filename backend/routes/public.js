import express from "express";
import {
  startApi,
  postYoutube,
  postTwitter,
  postFb,
  otherPost,
} from "../controller/public.js";

const routes = express.Router();

routes.get("/", startApi);

routes.post("/api/v1/yt", postYoutube);

routes.post("/api/v1/tw", postTwitter);

routes.post("/api/v1/fb", postFb);

routes.post("/api/v1/ig", otherPost);

export default routes;
