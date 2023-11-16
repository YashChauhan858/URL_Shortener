import { URL } from "../models/url.js";
import { nanoid } from "nanoid";

export const postURL = async (req, res, next) => {
  try {
    const { url: redirectUrl } = req.body;
    if (!redirectUrl) {
      res.status(400).json({ message: "URL is required" });
    }
    const shortId = nanoid(8);
    await URL.create({
      shortId,
      redirectUrl,
      visitedHistory: [],
    });
    res.status(201).json({ shortId });
  } catch (error) {
    next(error);
  }
};

export const redirectToOrignalURL = async (req, res, next) => {
  try {
    const shortId = req.params.id;
    if (!shortId) {
      res.status(400).json({ message: "please provide short id" });
    }
    // first param is the condition for finding and second is for updating
    // we are using $push as we are pushing Date.now() to visitHistory which is
    // an array
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: { timestamp: Date.now(), ip: req.socket.remoteAddress },
        },
      }
    );
    res.redirect(entry?.redirectUrl);
  } catch (error) {
    next(error);
  }
};

export const getURLInfoById = async (req, res, next) => {
  try {
    const shortId = req.params.id;
    if (!shortId) {
      res.status(400).json({ message: "please provide short id" });
    }
    const entry = await URL.findOne({
      shortId,
    });
    res.status(200).json({
      totalClicks: entry?.visitHistory.length ?? 0,
      analytics: entry?.visitHistory ?? [],
    });
  } catch (error) {
    next(error);
  }
};
